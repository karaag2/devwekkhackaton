"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  ArrowRight,
  ArrowLeft,
  Terminal,
  User,
  Rocket,
  CheckCircle2,
  Globe,
  Utensils,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  hackathonInscriptionSchema,
  type HackathonInscriptionInput,
} from "@/lib/validations";
import { signUp } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store";

export default function HackathonRegistration() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const { visualStyle } = useUIStore();

  const STEPS = [
    { id: 1, title: t("auth.enrollment.step1"), desc: "Account", icon: User },
    {
      id: 2,
      title: t("auth.enrollment.step2"),
      desc: "Tech Stack",
      icon: Terminal,
    },
    { id: 3, title: t("auth.enrollment.step3"), desc: "Socials", icon: Globe },
    {
      id: 4,
      title: t("auth.enrollment.step4"),
      desc: "Motivation",
      icon: Rocket,
    },
  ];

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm<HackathonInscriptionInput>({
    resolver: zodResolver(hackathonInscriptionSchema),
    defaultValues: {
      hasTeam: false,
      agreeToRules: false,
    },
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof HackathonInscriptionInput)[] = [];
    if (step === 1) {
      fieldsToValidate = [
        "name",
        "email",
        "password",
        "confirmPassword",
        "phone",
        "city",
        "country",
      ];
    } else if (step === 2) {
      fieldsToValidate = [
        "status",
        "schoolOrCompany",
        "role",
        "level",
        "skills",
      ];
    } else if (step === 3) {
      fieldsToValidate = [
        "github",
        "linkedin",
        "portfolio",
        "trackInterest",
        "tshirtSize",
        "dietaryRestrictions",
      ];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setDirection(1);
      setStep((s) => s + 1);
    } else {
      toast.error("Please fill all required fields correctly.");
    }
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  async function onSubmit(data: HackathonInscriptionInput) {
    setIsLoading(true);
    try {
      await signUp.email(
        {
          email: data.email,
          password: data.password,
          name: data.name,
          callbackURL: "/dashboard",
        },
        {
          onSuccess: () => {
            toast.success("Welcome aboard!");
            router.push("/dashboard");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Internal error.");
          },
        },
      );
    } catch (error) {
      toast.error("System error.");
    } finally {
      setIsLoading(false);
    }
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 20 : -20,
      opacity: 0,
      transition: { duration: 0.2 },
    }),
  };

  const progress = (step / STEPS.length) * 100;

  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row h-screen lg:h-[calc(100vh-6rem)] max-h-[850px] w-full bg-background lg:rounded-4xl overflow-hidden shadow-2xl border border-border transition-all duration-700 font-sans",
        visualStyle === "matrix" && "font-mono",
      )}
    >
      {/* Sidebar - Using theme variables */}
      <div className="w-full lg:w-72 p-6 lg:p-10 flex flex-col border-b lg:border-r border-border shrink-0 bg-muted/30 transition-colors duration-500">
        <div className="flex items-center justify-between lg:block mb-8 lg:mb-12">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 shrink-0 transition-all duration-500">
              <Rocket className="text-primary-foreground h-4.5 w-4.5" />
            </div>
            <span className="font-black text-sm uppercase tracking-tighter text-foreground transition-colors duration-500">
              DevWeek <span className="text-primary">2026</span>
            </span>
          </div>
          <div className="lg:hidden">
            <Link
              href="/login"
              className="text-[10px] font-black uppercase tracking-widest text-primary hover:opacity-80 transition-all bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20"
            >
              Log in
            </Link>
          </div>
        </div>

        {/* Stepper Navigation */}
        <nav className="flex flex-row lg:flex-col items-center lg:items-start justify-between lg:justify-start gap-4 lg:gap-8 flex-1">
          {STEPS.map((s) => (
            <div key={s.id} className="flex items-center gap-4 group">
              <div
                className={cn(
                  "h-10 w-10 lg:h-11 lg:w-11 rounded-full flex items-center justify-center text-xs lg:text-sm font-black border-2 transition-all duration-500",
                  step === s.id
                    ? "bg-primary border-primary text-primary-foreground shadow-xl shadow-primary/20 scale-110"
                    : step > s.id
                      ? "bg-primary/20 border-primary/20 text-primary"
                      : "bg-background border-border text-foreground/40",
                )}
              >
                {step > s.id ? <CheckCircle2 className="h-5 w-5" /> : s.id}
              </div>
              <div className="hidden lg:flex flex-col">
                <span
                  className={cn(
                    "text-[10px] font-black uppercase tracking-widest leading-none mb-1 transition-colors duration-500",
                    step === s.id ? "text-primary" : "text-foreground/50",
                  )}
                >
                  {s.title}
                </span>
                <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-tight">
                  {s.desc}
                </span>
              </div>
            </div>
          ))}
        </nav>

        <div className="hidden lg:block mt-auto pt-8 border-t border-border">
          <Link
            href="/login"
            className="text-[10px] font-black uppercase tracking-widest text-foreground/60 hover:text-primary transition-colors flex items-center gap-2 group"
          >
            <div className="h-1 w-1 rounded-full bg-border group-hover:bg-primary transition-colors" />
            {t("auth.register.hasAccount")}
          </Link>
        </div>
      </div>

      {/* Main Content Scroll Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-background relative overflow-hidden transition-colors duration-500">
        {/* Responsive Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-muted/30 z-50">
          <motion.div
            className="h-full bg-primary shadow-[0_0_10px_var(--app-primary)] transition-all duration-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        {/* Header - Fixed Height */}
        <header className="px-6 lg:px-12 py-6 lg:py-8 border-b border-border flex items-center justify-between shrink-0 bg-background/80 backdrop-blur-sm z-20 transition-all duration-500">
          <div className="min-w-0">
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">
              Mission Registration
            </p>
            <h2 className="text-xl lg:text-2xl font-black text-foreground uppercase tracking-tight truncate">
              {STEPS[step - 1].title}
            </h2>
          </div>
          <div className="lg:hidden text-[10px] font-black text-foreground/60 uppercase tracking-widest">
            Step {step} / {STEPS.length}
          </div>
        </header>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 lg:px-12 py-8 lg:py-10 scroll-smooth custom-scrollbar">
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  {step === 1 && (
                    <>
                      <div className="col-span-full space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/60 ml-1">
                          {t("auth.register.name")}
                        </Label>
                        <Input
                          {...register("name")}
                          className="h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-bold focus:ring-primary/20 transition-all placeholder:text-foreground/30"
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <p className="text-[10px] text-rose-500 font-bold ml-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      {[
                        {
                          name: "email",
                          label: t("auth.register.email"),
                          type: "email",
                          placeholder: "john@example.com",
                        },
                        {
                          name: "phone",
                          label: t("auth.register.phone"),
                          placeholder: "+1 234...",
                        },
                        {
                          name: "password",
                          label: t("auth.register.password"),
                          type: "password",
                          placeholder: "••••••••",
                        },
                        {
                          name: "confirmPassword",
                          label: t("auth.register.confirm"),
                          type: "password",
                          placeholder: "••••••••",
                        },
                        {
                          name: "city",
                          label: t("auth.register.city"),
                          placeholder: "City",
                        },
                        {
                          name: "country",
                          label: t("auth.register.country"),
                          placeholder: "Country",
                        },
                      ].map((field) => (
                        <div key={field.name} className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/60 ml-1">
                            {field.label}
                          </Label>
                          <Input
                            {...register(field.name as any)}
                            type={field.type}
                            className="h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-bold focus:ring-primary/20 transition-all placeholder:text-foreground/30"
                            placeholder={field.placeholder}
                          />
                        </div>
                      ))}
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/60 ml-1">
                          Status
                        </Label>
                        <Select
                          defaultValue={watch("status")}
                          onValueChange={(v) => setValue("status", v as any)}
                        >
                          <SelectTrigger className="h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-bold">
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-border bg-background focus:ring-primary/20">
                            <SelectItem value="STUDENT">Student</SelectItem>
                            <SelectItem value="PROFESSIONAL">Pro</SelectItem>
                            <SelectItem value="OTHER">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/60 ml-1">
                          Org
                        </Label>
                        <Input
                          {...register("schoolOrCompany")}
                          className="h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-bold placeholder:text-foreground/30"
                          placeholder="Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/60 ml-1">
                          Role
                        </Label>
                        <Select
                          defaultValue={watch("role")}
                          onValueChange={(v) => setValue("role", v as any)}
                        >
                          <SelectTrigger className="h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-bold">
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-border bg-background max-h-[300px]">
                            <SelectItem value="FRONTEND">Frontend</SelectItem>
                            <SelectItem value="BACKEND">Backend</SelectItem>
                            <SelectItem value="FULLSTACK">Fullstack</SelectItem>
                            <SelectItem value="AI">AI / ML</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/60 ml-1">
                          Level
                        </Label>
                        <Select
                          defaultValue={watch("level")}
                          onValueChange={(v) => setValue("level", v as any)}
                        >
                          <SelectTrigger className="h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-bold">
                            <SelectValue placeholder="Select Level" />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-border bg-background">
                            <SelectItem value="BEGINNER">Lvl 1</SelectItem>
                            <SelectItem value="INTERMEDIATE">Lvl 10</SelectItem>
                            <SelectItem value="ADVANCED">Lvl 50</SelectItem>
                            <SelectItem value="EXPERT">Lvl 100</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-full space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/60 ml-1">
                          Skills
                        </Label>
                        <Input
                          {...register("skills")}
                          className="h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-bold placeholder:text-foreground/30"
                          placeholder="React, Next.js, Python..."
                        />
                      </div>
                      <div className="col-span-full space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/60 ml-1">
                          Bio
                        </Label>
                        <Textarea
                          {...register("bio")}
                          className="min-h-[100px] lg:min-h-[120px] rounded-2xl bg-muted/20 border-border text-foreground font-bold resize-none p-4 placeholder:text-foreground/30"
                          placeholder="Describe your profile..."
                        />
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/60 ml-1">
                          GitHub
                        </Label>
                        <Input
                          {...register("github")}
                          className="h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-bold placeholder:text-foreground/30"
                          placeholder="URL"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/60 ml-1">
                          LinkedIn
                        </Label>
                        <Input
                          {...register("linkedin")}
                          className="h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-bold placeholder:text-foreground/30"
                          placeholder="URL"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/60 ml-1">
                          Track
                        </Label>
                        <Select
                          defaultValue={watch("trackInterest")}
                          onValueChange={(v) =>
                            setValue("trackInterest", v as any)
                          }
                        >
                          <SelectTrigger className="h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-bold">
                            <SelectValue placeholder="Select Track" />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-border bg-background">
                            <SelectItem value="AI">AI Innovation</SelectItem>
                            <SelectItem value="SECURITY">
                              Cybersecurity
                            </SelectItem>
                            <SelectItem value="INTERFACE">
                              UI/UX Interaction
                            </SelectItem>
                            <SelectItem value="GENERAL">General</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/60 ml-1">
                          Size
                        </Label>
                        <Select
                          defaultValue={watch("tshirtSize")}
                          onValueChange={(v) =>
                            setValue("tshirtSize", v as any)
                          }
                        >
                          <SelectTrigger className="h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-bold">
                            <SelectValue placeholder="Size" />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-border bg-background max-h-48">
                            {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                              <SelectItem key={s} value={s}>
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-full space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/60 ml-1">
                          Dietary
                        </Label>
                        <div className="relative">
                          <Utensils className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40 z-10" />
                          <Input
                            {...register("dietaryRestrictions")}
                            className="pl-12 h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-bold placeholder:text-foreground/30"
                            placeholder="Vegan, None, Allergic..."
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {step === 4 && (
                    <div className="col-span-full space-y-6 lg:space-y-8">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/60 ml-1">
                          Motivation
                        </Label>
                        <Textarea
                          {...register("motivation")}
                          className="min-h-[160px] lg:min-h-[220px] rounded-3xl bg-muted/20 border-border text-foreground font-medium p-6 resize-none transition-all placeholder:text-foreground/30"
                          placeholder="Tell us what you want to achieve..."
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div
                          className={cn(
                            "flex items-center gap-4 p-5 rounded-2xl border transition-all cursor-pointer",
                            watch("hasTeam")
                              ? "bg-primary/10 border-primary text-primary"
                              : "bg-muted/10 border-border shadow-sm",
                          )}
                          onClick={() => setValue("hasTeam", !watch("hasTeam"))}
                        >
                          <div
                            className={cn(
                              "h-6 w-6 rounded-lg border-2 flex items-center justify-center transition-all",
                              watch("hasTeam")
                                ? "bg-primary border-primary text-primary-foreground"
                                : "border-border bg-background",
                            )}
                          >
                            {watch("hasTeam") && (
                              <CheckCircle2 className="h-4 w-4" />
                            )}
                          </div>
                          <Label className="font-black text-[10px] uppercase tracking-widest cursor-pointer leading-none">
                            In a team
                          </Label>
                        </div>
                        <div
                          className={cn(
                            "flex items-center gap-4 p-5 rounded-2xl border transition-all cursor-pointer",
                            watch("agreeToRules")
                              ? "bg-primary/10 border-primary text-primary"
                              : "bg-muted/10 border-border shadow-sm",
                          )}
                          onClick={() =>
                            setValue("agreeToRules", !watch("agreeToRules"))
                          }
                        >
                          <div
                            className={cn(
                              "h-6 w-6 rounded-lg border-2 flex items-center justify-center transition-all",
                              watch("agreeToRules")
                                ? "bg-primary border-primary text-primary-foreground"
                                : "border-border bg-background",
                            )}
                          >
                            {watch("agreeToRules") && (
                              <CheckCircle2 className="h-4 w-4" />
                            )}
                          </div>
                          <Label className="font-black text-[10px] uppercase tracking-widest cursor-pointer leading-none">
                            Accept Rules
                          </Label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer - Use theme variables */}
        <footer className="px-6 lg:px-12 py-5 lg:py-6 border-t border-border flex items-center gap-4 shrink-0 bg-muted/30 backdrop-blur-sm z-20 transition-all duration-500">
          <div className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-foreground/40 flex-1">
            Mission {step} of {STEPS.length}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {step > 1 && (
              <Button
                onClick={prevStep}
                variant="outline"
                className="h-12 lg:h-14 px-6 lg:px-8 rounded-2xl font-black uppercase tracking-widest text-[11px] border-border bg-background text-foreground/70 hover:bg-muted transition-all active:scale-95"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            )}

            <Button
              onClick={
                step === STEPS.length ? handleSubmit(onSubmit as any) : nextStep
              }
              disabled={isLoading}
              className="flex-1 sm:flex-initial h-12 lg:h-14 px-8 lg:px-12 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl bg-primary text-primary-foreground hover:opacity-90 transition-all active:scale-95 group"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  {step === STEPS.length ? "Complete Mission" : "Next Mission"}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}
