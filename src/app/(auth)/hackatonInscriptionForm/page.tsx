"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  ArrowRight,
  ArrowLeft,
  Github,
  Terminal,
  Sparkles,
  User,
  Rocket,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
import { translations } from "@/lib/translations";

export default function HackathonRegistration() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { language } = useUIStore();

  const tAuth = translations[language].auth.enrollment;
  const tCommon = translations[language].common;

  const STEPS = [
    { id: 1, title: tAuth.step1, icon: User },
    { id: 2, title: tAuth.step2, icon: Terminal },
    { id: 3, title: tAuth.step3, icon: Sparkles },
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
      role: "FULLSTACK",
      level: "INTERMEDIATE",
      hasTeam: false,
    },
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof HackathonInscriptionInput)[] = [];
    if (step === 1)
      fieldsToValidate = ["name", "email", "password", "confirmPassword"];
    if (step === 2) fieldsToValidate = ["role", "level", "github"];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  async function onSubmit(data: HackathonInscriptionInput) {
    setIsLoading(true);
    try {
      const GOOGLE_FORM_URL =
        "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfD.../formResponse";
      const formData = new URLSearchParams();
      formData.append("entry.1000001", data.name);
      formData.append("entry.1000002", data.email);
      formData.append("entry.1000003", data.role);
      formData.append("entry.1000004", data.level);
      formData.append("entry.1000005", data.github || "N/A");
      formData.append("entry.1000006", data.motivation);

      fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      }).catch((e) => console.error("Google Form error:", e));

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
    enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      transition: { duration: 0.2 },
    }),
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-left mb-4">
        <h1 className="text-4xl font-black uppercase tracking-tight leading-none mb-2">
          {tAuth.title}
        </h1>
        <p className="text-muted-foreground font-medium italic">
          {tAuth.subtitle}
        </p>
      </div>

      {/* Stepper Header */}
      <div className="mb-6 flex justify-between relative px-2">
        <div className="absolute top-5 left-8 right-8 h-[2px] bg-muted z-0" />
        <div
          className="absolute top-5 left-8 h-[2px] bg-primary z-0 transition-all duration-500"
          style={{
            width: `calc(${((step - 1) / (STEPS.length - 1)) * 100}% - 4rem)`,
          }}
        />
        {STEPS.map((s) => (
          <div
            key={s.id}
            className="relative z-10 flex flex-col items-center w-20"
          >
            <div
              className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 bg-background",
                step >= s.id
                  ? "border-primary text-primary shadow-lg shadow-primary/20"
                  : "border-muted text-muted-foreground",
              )}
            >
              {step > s.id ? (
                <Rocket className="h-5 w-5" />
              ) : (
                <s.icon className="h-4 w-4" />
              )}
            </div>
            <span
              className={cn(
                "mt-2 text-[8px] font-black uppercase tracking-widest text-center",
                step >= s.id ? "text-primary" : "text-muted-foreground",
              )}
            >
              {s.title}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-card/50 border border-border rounded-4xl overflow-hidden flex flex-col shadow-xl">
        <form
          onSubmit={handleSubmit(onSubmit as any)}
          className="flex-1 flex flex-col"
        >
          <div className="p-6 md:p-8 flex-1 relative overflow-hidden min-h-[400px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full space-y-6"
              >
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest ml-1">
                        Warrior Name
                      </Label>
                      <Input
                        {...register("name")}
                        placeholder="Alexandre Legrand"
                        className="h-14 rounded-2xl bg-muted/30 border-none font-bold text-lg"
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive font-bold ml-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest ml-1">
                        Email
                      </Label>
                      <Input
                        {...register("email")}
                        type="email"
                        placeholder="command@devweek.io"
                        className="h-14 rounded-2xl bg-muted/30 border-none font-bold text-lg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1">
                          Password
                        </Label>
                        <Input
                          {...register("password")}
                          type="password"
                          placeholder="••••••••"
                          className="h-14 rounded-2xl bg-muted/30 border-none font-bold text-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1">
                          Confirm
                        </Label>
                        <Input
                          {...register("confirmPassword")}
                          type="password"
                          placeholder="••••••••"
                          className="h-14 rounded-2xl bg-muted/30 border-none font-bold text-lg"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2 text-left">
                      <Label className="text-[10px] font-black uppercase tracking-widest ml-1">
                        Specialization
                      </Label>
                      <Select
                        defaultValue={watch("role")}
                        onValueChange={(v) => setValue("role", v as any)}
                      >
                        <SelectTrigger className="h-14 rounded-2xl bg-muted/30 border-none font-bold text-lg">
                          <SelectValue placeholder="Rôle" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-border">
                          <SelectItem value="FRONTEND">
                            Interface Wizard (FE)
                          </SelectItem>
                          <SelectItem value="BACKEND">
                            Logic Architect (BE)
                          </SelectItem>
                          <SelectItem value="FULLSTACK">
                            Multiclass Hero (FS)
                          </SelectItem>
                          <SelectItem value="AI">Neural Sage</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest ml-1">
                        GitHub URL
                      </Label>
                      <Input
                        {...register("github")}
                        placeholder="github.com/alex"
                        className="h-14 rounded-2xl bg-muted/30 border-none font-bold text-lg"
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest ml-1">
                        Motivation
                      </Label>
                      <Textarea
                        {...register("motivation")}
                        placeholder="..."
                        className="min-h-[120px] rounded-2xl bg-muted/30 border-none p-4 font-medium resize-none text-lg"
                      />
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-muted/10">
                      <input
                        type="checkbox"
                        id="hasTeam"
                        className="h-5 w-5 rounded border-primary"
                        {...register("hasTeam")}
                      />
                      <Label
                        htmlFor="hasTeam"
                        className="font-black text-xs uppercase tracking-widest cursor-pointer"
                      >
                        I have a team
                      </Label>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="p-6 bg-muted/20 border-t border-border flex gap-4">
            {step > 1 && (
              <Button
                type="button"
                variant="ghost"
                onClick={prevStep}
                className="h-14 rounded-2xl font-black uppercase tracking-widest"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> {tCommon.back}
              </Button>
            )}
            <Button
              type={step === 3 ? "submit" : "button"}
              onClick={step === 3 ? undefined : nextStep}
              disabled={isLoading}
              className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest bg-primary text-primary-foreground"
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  {step === 3 ? tCommon.finish : tCommon.next}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      <div className="text-center mt-4">
        <Link
          href="/login"
          className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
        >
          {language === "fr"
            ? "Déjà inscrit ? Connexion"
            : "Already registered? Sign In"}
        </Link>
      </div>
    </div>
  );
}
