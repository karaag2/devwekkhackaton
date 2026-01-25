"use client";

import { useEffect, useState } from "react";
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
  LogOut,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";

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
import { signUp, useSession, signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store";
import { submitHackathonRegistration } from "@/app/actions/hackathon";

export default function HackathonRegistration() {
  const { data: session, isPending: isSessionPending } = useSession();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();
  const t = useTranslations();
  const locale = useLocale();
  const { visualStyle } = useUIStore();

  const STEPS = [
    { id: 1, title: t("auth.enrollment.step1"), desc: "Identité", icon: User },
    { id: 2, title: t("auth.enrollment.step2"), desc: "Expérience", icon: Terminal },
    { id: 3, title: t("auth.enrollment.step3"), desc: "Préférence", icon: Globe },
    { id: 4, title: t("auth.enrollment.step4"), desc: "Mission", icon: Rocket },
  ];

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<HackathonInscriptionInput>({
    resolver: zodResolver(hackathonInscriptionSchema) as any,
    defaultValues: {
      hasTeam: false,
      agreeToRules: false,
      status: "STUDENT",
      role: "FULLSTACK",
      level: "BEGINNER",
      trackInterest: "GENERAL",
      tshirtSize: "L",
    },
  });

  useEffect(() => {
    if (session?.user) {
      reset({
        name: session.user.name || "",
        email: session.user.email || "",
        // @ts-ignore
        phone: session.user.phone || "",
        // @ts-ignore
        city: session.user.city || "",
        // @ts-ignore
        country: session.user.country || "",
        // @ts-ignore
        status: session.user.status || "STUDENT",
        // @ts-ignore
        schoolOrCompany: session.user.schoolOrCompany || "",
        // @ts-ignore
        role: session.user.role || "FULLSTACK",
        // @ts-ignore
        level: session.user.experienceLevel || "BEGINNER",
        // @ts-ignore
        skills: session.user.skills || "",
        // @ts-ignore
        bio: session.user.bio || "",
        // @ts-ignore
        github: session.user.github || "",
        // @ts-ignore
        linkedin: session.user.linkedin || "",
        // @ts-ignore
        portfolio: session.user.portfolio || "",
        // @ts-ignore
        trackInterest: session.user.trackInterest || "GENERAL",
        // @ts-ignore
        tshirtSize: session.user.tshirtSize || "L",
        // @ts-ignore
        dietaryRestrictions: session.user.dietaryRestrictions || "",
        // @ts-ignore
        motivation: session.user.motivation || "",
        // @ts-ignore
        hasTeam: session.user.hasTeam || false,
        // @ts-ignore
        agreeToRules: session.user.agreeToRules || false,
      });
    }
  }, [session, reset]);

  const nextStep = async () => {
    let fieldsToValidate: (keyof HackathonInscriptionInput)[] = [];
    if (step === 1) {
      fieldsToValidate = ["name", "email", "phone", "city", "country"];
      if (!session) {
        fieldsToValidate.push("password", "confirmPassword");
      }
    } else if (step === 2) {
      fieldsToValidate = ["status", "schoolOrCompany", "role", "level", "skills"];
    } else if (step === 3) {
      fieldsToValidate = ["trackInterest", "tshirtSize"];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setDirection(1);
      setStep((s) => s + 1);
      setServerError(null);
    } else {
      toast.error("Veuillez corriger les erreurs avant de continuer.");
    }
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  async function onSubmit(data: HackathonInscriptionInput) {
    setIsLoading(true);
    setServerError(null);

    try {
      if (session) {
        const res = await submitHackathonRegistration(data);
        if (res.error) {
          setServerError(res.error);
          toast.error(res.error);
        } else {
          toast.success("Inscription terminée avec succès !");
          router.push("/dashboard");
        }
      } else {
        await signUp.email({
          email: data.email,
          password: data.password!,
          name: data.name,
          // @ts-ignore
          phone: data.phone,
          // @ts-ignore
          city: data.city,
          // @ts-ignore
          country: data.country,
          // @ts-ignore
          status: data.status,
          // @ts-ignore
          schoolOrCompany: data.schoolOrCompany,
          // @ts-ignore
          role: data.role,
          // @ts-ignore
          skills: data.skills,
          // @ts-ignore
          bio: data.bio,
          // @ts-ignore
          github: data.github,
          // @ts-ignore
          linkedin: data.linkedin,
          // @ts-ignore
          portfolio: data.portfolio,
          // @ts-ignore
          trackInterest: data.trackInterest,
          // @ts-ignore
          tshirtSize: data.tshirtSize,
          // @ts-ignore
          dietaryRestrictions: data.dietaryRestrictions,
          // @ts-ignore
          motivation: data.motivation,
          // @ts-ignore
          hasTeam: data.hasTeam,
          // @ts-ignore
          agreeToRules: data.agreeToRules,
          // @ts-ignore
          onboarded: true,
          callbackURL: `/${locale}/dashboard`,
        }, {
          onSuccess: () => {
            toast.success("Bienvenue ! Votre compte et votre inscription sont validés.");
            router.push("/dashboard");
          },
          onError: (ctx) => {
            setServerError(ctx.error.message || "Erreur lors de la création du compte.");
            toast.error(ctx.error.message || "Erreur interne.");
          },
        });
      }
    } catch (error) {
      toast.error("Erreur système.");
    } finally {
      setIsLoading(false);
    }
  }

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 20 : -20, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" as any } },
    exit: (direction: number) => ({ x: direction < 0 ? 20 : -20, opacity: 0, transition: { duration: 0.2 } }),
  };

  const progress = (step / STEPS.length) * 100;

  const LabelStyled = ({ children, htmlFor, className }: any) => (
    <Label 
      htmlFor={htmlFor}
      className={cn("text-[11px] font-black uppercase tracking-[0.1em] text-foreground/80 ml-1", className)}
    >
      {children}
    </Label>
  );

  const ErrorMsg = ({ name }: { name: keyof HackathonInscriptionInput }) => {
    const error = errors[name];
    if (!error) return null;

    return (
      <motion.div 
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-2 p-2.5 rounded-xl bg-red-500/10 border-l-4 border-red-500 flex items-start gap-3 shadow-sm shadow-red-500/5 group transition-all"
      >
        <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
        <span className="text-[11px] font-black uppercase tracking-tight leading-tight text-red-600">
          {error.message as string}
        </span>
      </motion.div>
    );
  };

  if (isSessionPending) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row h-screen lg:h-[calc(100vh-6rem)] max-h-[850px] w-full bg-background lg:rounded-4xl overflow-hidden shadow-2xl border border-border transition-all duration-700 font-sans",
        visualStyle === "matrix" && "font-mono",
      )}
    >
      {/* Sidebar - Navigation ONLY */}
      <div className="w-full lg:w-72 p-6 lg:p-10 flex flex-col border-b lg:border-r border-border shrink-0 bg-muted/30 transition-colors duration-500">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-9 w-9 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 shrink-0 transition-all duration-500">
            <Rocket className="text-primary-foreground h-4.5 w-4.5" />
          </div>
          <span className="font-black text-sm uppercase tracking-tighter text-foreground">
            DevWeek <span className="text-primary">2026</span>
          </span>
        </div>

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
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-widest leading-none mb-1 transition-colors duration-500",
                  step === s.id ? "text-primary" : "text-foreground/50",
                )}>
                  {s.title}
                </span>
                <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-tight">
                  {s.desc}
                </span>
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-background relative overflow-hidden transition-colors duration-500">
        <div className="absolute top-0 left-0 w-full h-1 bg-muted/30 z-50">
          <motion.div
            className="h-full bg-primary shadow-[0_0_10px_var(--app-primary)] transition-all duration-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        <header className="px-6 lg:px-12 py-6 lg:py-8 border-b border-border flex items-center justify-between shrink-0 bg-background/80 backdrop-blur-sm z-20 transition-all duration-500">
          <div className="min-w-0">
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">
              Mission Registration
            </p>
            <h2 className="text-xl lg:text-2xl font-black text-foreground uppercase tracking-tight truncate">
              {STEPS[step - 1].title}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em] mr-4">
              ÉTAPE {step} SUR {STEPS.length}
            </div>
            
            {session ? (
              <button
                onClick={() => signOut({ fetchOptions: { onSuccess: () => router.push("/login") } })}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-red-500/5 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all transform active:scale-95 group"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Déconnexion</span>
              </button>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-primary/5 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all transform active:scale-95 group"
              >
                <User className="h-3.5 w-3.5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Login</span>
              </Link>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 lg:px-12 py-8 lg:py-10 scroll-smooth custom-scrollbar">
          <div className="max-w-3xl mx-auto">
            {serverError && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-10 flex items-start gap-5 p-6 rounded-3xl bg-red-500 text-white shadow-2xl shadow-red-500/30"
              >
                <AlertCircle className="h-6 w-6 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">Erreur Critique</span>
                  <p className="text-[15px] font-black leading-tight uppercase tracking-tight">{serverError}</p>
                </div>
              </motion.div>
            )}

            {session && step === 1 && (
                <div className="mb-10 p-6 rounded-[2rem] bg-primary text-white flex items-start gap-6 shadow-2xl shadow-primary/20 animate-in fade-in slide-in-from-bottom-4">
                    <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                        <User className="h-6 w-6" />
                    </div>
                    <div>
                        <h4 className="text-[13px] font-black uppercase tracking-widest">Connecté : {session.user.name}</h4>
                        <p className="text-[11px] font-bold opacity-80 pt-1 leading-snug">Vos données enregistrées ont été injectées. Gagnez du temps et validez votre mission.</p>
                    </div>
                </div>
            )}

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                  {step === 1 && (
                    <>
                      <div className="col-span-full space-y-3">
                        <LabelStyled>{t("auth.register.name")}</LabelStyled>
                        <Input
                          {...register("name")}
                          className={cn(
                            "h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-black text-[14px] focus:ring-red-500/20 transition-all placeholder:text-foreground/30",
                            errors.name && "border-red-500 ring-2 ring-red-500/10 shadow-lg shadow-red-500/5"
                          )}
                          placeholder="John Doe"
                        />
                        <ErrorMsg name="name" />
                      </div>
                      
                      <div className="space-y-3">
                          <LabelStyled>{t("auth.register.email")}</LabelStyled>
                         <Input
                            {...register("email")}
                            type="email"
                            disabled={!!session}
                            className={cn(
                              "h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-black text-[14px] focus:ring-red-500/20 transition-all placeholder:text-foreground/30",
                              errors.email && "border-red-500 ring-2 ring-red-500/10 shadow-lg shadow-red-500/5",
                              session && "opacity-50"
                            )}
                            placeholder="john@example.com"
                          />
                          <ErrorMsg name="email" />
                      </div>

                      <div className="space-y-3">
                          <LabelStyled>{t("auth.register.phone")}</LabelStyled>
                         <Input
                            {...register("phone")}
                            className={cn(
                              "h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-black text-[14px] focus:ring-red-500/20 transition-all placeholder:text-foreground/30",
                              errors.phone && "border-red-500 ring-2 ring-red-500/10 shadow-lg shadow-red-500/5"
                            )}
                            placeholder="+1 234..."
                          />
                          <ErrorMsg name="phone" />
                      </div>

                      {!session && (
                          <>
                            <div className="space-y-3">
                                <LabelStyled>{t("auth.register.password")}</LabelStyled>
                                <Input
                                    {...register("password")}
                                    type="password"
                                    className={cn(
                                    "h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-black text-[14px] focus:ring-red-500/20 transition-all placeholder:text-foreground/30",
                                    errors.password && "border-red-500 ring-2 ring-red-500/10 shadow-lg shadow-red-500/5"
                                    )}
                                    placeholder="••••••••"
                                />
                                <ErrorMsg name="password" />
                            </div>
                            <div className="space-y-3">
                                <LabelStyled>{t("auth.register.confirm")}</LabelStyled>
                                <Input
                                    {...register("confirmPassword")}
                                    type="password"
                                    className={cn(
                                    "h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-black text-[14px] focus:ring-red-500/20 transition-all placeholder:text-foreground/30",
                                    errors.confirmPassword && "border-red-500 ring-2 ring-red-500/10 shadow-lg shadow-red-500/5"
                                    )}
                                    placeholder="••••••••"
                                />
                                <ErrorMsg name="confirmPassword" />
                            </div>
                          </>
                      )}

                      <div className="space-y-3">
                          <LabelStyled>{t("auth.register.city")}</LabelStyled>
                         <Input
                            {...register("city")}
                            className={cn(
                              "h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-black text-[14px] focus:ring-red-500/20 transition-all placeholder:text-foreground/30",
                              errors.city && "border-red-500 ring-2 ring-red-500/10 shadow-lg shadow-red-500/5"
                            )}
                            placeholder="Ex: Paris"
                          />
                          <ErrorMsg name="city" />
                      </div>
                      <div className="space-y-3">
                          <LabelStyled>{t("auth.register.country")}</LabelStyled>
                         <Input
                            {...register("country")}
                            className={cn(
                              "h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-black text-[14px] focus:ring-red-500/20 transition-all placeholder:text-foreground/30",
                              errors.country && "border-red-500 ring-2 ring-red-500/10 shadow-lg shadow-red-500/5"
                            )}
                            placeholder="Ex: France"
                          />
                          <ErrorMsg name="country" />
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="space-y-3">
                        <LabelStyled>Status</LabelStyled>
                        <Select
                          value={watch("status")}
                          onValueChange={(v) => { setValue("status", v as any); trigger("status"); }}
                        >
                          <SelectTrigger className={cn(
                            "h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-black text-[14px]",
                            errors.status && "border-red-500 ring-2 ring-red-500/10"
                          )}>
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-border bg-background">
                            <SelectItem value="STUDENT">Étudiant</SelectItem>
                            <SelectItem value="PROFESSIONAL">Professionnel</SelectItem>
                            <SelectItem value="OTHER">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                        <ErrorMsg name="status" />
                      </div>
                      <div className="space-y-3">
                        <LabelStyled>Organisation / École</LabelStyled>
                        <Input
                          {...register("schoolOrCompany")}
                          className={cn(
                            "h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-black text-[14px] placeholder:text-foreground/30",
                            errors.schoolOrCompany && "border-red-500 ring-2 ring-red-500/10"
                          )}
                          placeholder="Nom"
                        />
                        <ErrorMsg name="schoolOrCompany" />
                      </div>
                      <div className="space-y-3">
                        <LabelStyled>Rôle Principal</LabelStyled>
                        <Select
                          value={watch("role")}
                          onValueChange={(v) => { setValue("role", v as any); trigger("role"); }}
                        >
                          <SelectTrigger className={cn(
                            "h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-black text-[14px]",
                            errors.role && "border-red-500 ring-2 ring-red-500/10"
                          )}>
                            <SelectValue placeholder="Rôle" />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-border bg-background max-h-[300px]">
                            <SelectItem value="FRONTEND">Frontend</SelectItem>
                            <SelectItem value="BACKEND">Backend</SelectItem>
                            <SelectItem value="FULLSTACK">Fullstack</SelectItem>
                            <SelectItem value="AI">AI / ML</SelectItem>
                          </SelectContent>
                        </Select>
                        <ErrorMsg name="role" />
                      </div>
                      <div className="space-y-3">
                        <LabelStyled>Expérience</LabelStyled>
                        <Select
                          value={watch("level")}
                          onValueChange={(v) => { setValue("level", v as any); trigger("level"); }}
                        >
                          <SelectTrigger className={cn(
                            "h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-black text-[14px]",
                            errors.level && "border-red-500 ring-2 ring-red-500/10"
                          )}>
                            <SelectValue placeholder="Niveau" />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-border bg-background">
                            <SelectItem value="BEGINNER">DÉBUTANT</SelectItem>
                            <SelectItem value="INTERMEDIATE">INTERMÉDIAIRE</SelectItem>
                            <SelectItem value="ADVANCED">AVANCÉ</SelectItem>
                            <SelectItem value="EXPERT">EXPERT</SelectItem>
                          </SelectContent>
                        </Select>
                        <ErrorMsg name="level" />
                      </div>
                      <div className="col-span-full space-y-3">
                        <LabelStyled>Compétences (CSV - ex: React, Node)</LabelStyled>
                        <Input
                          {...register("skills")}
                          className={cn(
                            "h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-black text-[14px] placeholder:text-foreground/30",
                            errors.skills && "border-red-500 ring-2 ring-red-500/10"
                          )}
                          placeholder="Compétences"
                        />
                        <ErrorMsg name="skills" />
                      </div>
                      <div className="col-span-full space-y-3">
                        <LabelStyled>Bio Rapide</LabelStyled>
                        <Textarea
                          {...register("bio")}
                          className={cn(
                            "min-h-[100px] lg:min-h-[120px] rounded-2xl bg-muted/20 border-border text-foreground font-black text-[14px] resize-none p-5 placeholder:text-foreground/30",
                            errors.bio && "border-red-500 ring-2 ring-red-500/10"
                          )}
                          placeholder="Parlez-nous de vous..."
                        />
                        <ErrorMsg name="bio" />
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div className="space-y-3">
                        <LabelStyled>GitHub</LabelStyled>
                        <Input
                          {...register("github")}
                          className={cn(
                            "h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-black text-[14px] placeholder:text-foreground/30",
                            errors.github && "border-red-500 ring-2 ring-red-500/10"
                          )}
                          placeholder="Lien Profil"
                        />
                        <ErrorMsg name="github" />
                      </div>
                      <div className="space-y-3">
                        <LabelStyled>LinkedIn</LabelStyled>
                        <Input
                          {...register("linkedin")}
                          className={cn(
                            "h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-black text-[14px] placeholder:text-foreground/30",
                            errors.linkedin && "border-red-500 ring-2 ring-red-500/10"
                          )}
                          placeholder="Lien Profil"
                        />
                        <ErrorMsg name="linkedin" />
                      </div>
                      <div className="space-y-3">
                        <LabelStyled>Track Souhaitée</LabelStyled>
                        <Select
                          value={watch("trackInterest")}
                          onValueChange={(v) => { setValue("trackInterest", v as any); trigger("trackInterest"); }}
                        >
                          <SelectTrigger className={cn(
                            "h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-black text-[14px]",
                            errors.trackInterest && "border-red-500 ring-2 ring-red-500/10"
                          )}>
                            <SelectValue placeholder="Track" />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-border bg-background">
                            <SelectItem value="AI">AI Innovation</SelectItem>
                            <SelectItem value="SECURITY">Cybersecurity</SelectItem>
                            <SelectItem value="INTERFACE">UI/UX Interaction</SelectItem>
                            <SelectItem value="GENERAL">Général</SelectItem>
                          </SelectContent>
                        </Select>
                        <ErrorMsg name="trackInterest" />
                      </div>
                      <div className="space-y-3">
                        <LabelStyled>Taille T-Shirt</LabelStyled>
                        <Select
                          value={watch("tshirtSize")}
                          onValueChange={(v) => { setValue("tshirtSize", v as any); trigger("tshirtSize"); }}
                        >
                          <SelectTrigger className={cn(
                            "h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-black text-[14px]",
                            errors.tshirtSize && "border-red-500 ring-2 ring-red-500/10"
                          )}>
                            <SelectValue placeholder="Taille" />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-border bg-background">
                            {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <ErrorMsg name="tshirtSize" />
                      </div>
                      <div className="col-span-full space-y-3">
                        <LabelStyled>Allergies / Régime</LabelStyled>
                        <div className="relative">
                          <Utensils className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40 z-10" />
                          <Input
                            {...register("dietaryRestrictions")}
                            className={cn(
                              "pl-12 h-12 lg:h-14 rounded-2xl bg-muted/20 border-border text-foreground font-black text-[14px] placeholder:text-foreground/30",
                              errors.dietaryRestrictions && "border-red-500 ring-2 ring-red-500/10"
                            )}
                            placeholder="Ex: Vegan, No Peanut..."
                          />
                        </div>
                        <ErrorMsg name="dietaryRestrictions" />
                      </div>
                    </>
                  )}

                  {step === 4 && (
                    <div className="col-span-full space-y-8 lg:space-y-10">
                      <div className="space-y-4">
                        <LabelStyled>Pourquoi vous ? (Motivation)</LabelStyled>
                        <Textarea
                          {...register("motivation")}
                          className={cn(
                            "min-h-[160px] lg:min-h-[220px] rounded-[2rem] bg-muted/20 border-border text-foreground font-black text-[15px] p-8 resize-none transition-all placeholder:text-foreground/30",
                            errors.motivation && "border-red-500 ring-2 ring-red-500/10"
                          )}
                          placeholder="Racontez votre histoire..."
                        />
                        <ErrorMsg name="motivation" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div
                          className={cn(
                            "flex items-center gap-5 p-6 rounded-3xl border transition-all cursor-pointer",
                            watch("hasTeam") ? "bg-primary/10 border-primary text-primary shadow-xl shadow-primary/5" : "bg-muted/10 border-border",
                          )}
                          onClick={() => setValue("hasTeam", !watch("hasTeam"))}
                        >
                          <div className={cn(
                            "h-7 w-7 rounded-lg border-2 flex items-center justify-center transition-all",
                            watch("hasTeam") ? "bg-primary border-primary text-primary-foreground" : "border-border bg-background",
                          )}>
                            {watch("hasTeam") && <CheckCircle2 className="h-5 w-5" />}
                          </div>
                          <span className="font-black uppercase tracking-widest text-[11px] cursor-pointer">J'ai une équipe</span>
                        </div>
                        <div
                          className={cn(
                            "flex items-center gap-5 p-6 rounded-3xl border transition-all cursor-pointer",
                            watch("agreeToRules") ? "bg-primary/10 border-primary text-primary shadow-xl shadow-primary/5" : "bg-muted/10 border-border",
                            errors.agreeToRules && "border-red-500/50 bg-red-500/5"
                          )}
                          onClick={() => { setValue("agreeToRules", !watch("agreeToRules")); trigger("agreeToRules"); }}
                        >
                          <div className={cn(
                            "h-7 w-7 rounded-lg border-2 flex items-center justify-center transition-all",
                            watch("agreeToRules") ? "bg-primary border-primary text-primary-foreground" : "border-border bg-background",
                            errors.agreeToRules && "border-red-500"
                          )}>
                            {watch("agreeToRules") && <CheckCircle2 className="h-5 w-5" />}
                          </div>
                          <span className="font-black uppercase tracking-widest text-[11px] cursor-pointer text-foreground">J'accepte le règlement</span>
                        </div>
                      </div>
                      <ErrorMsg name="agreeToRules" />
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <footer className="px-6 lg:px-12 py-5 lg:py-6 border-t border-border flex items-center gap-4 shrink-0 bg-muted/30 backdrop-blur-sm z-20 transition-all duration-500">
          <div className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-foreground/40 flex-1">
            MISSION {step} SUR {STEPS.length}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {step > 1 && (
              <Button
                onClick={prevStep}
                variant="outline"
                className="h-12 lg:h-14 px-8 lg:px-10 rounded-2xl font-black uppercase tracking-widest text-[11px] border-border bg-background text-foreground/70 hover:bg-muted transition-all active:scale-95"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Retour
              </Button>
            )}

            <Button
              onClick={step === STEPS.length ? handleSubmit(onSubmit) : nextStep}
              disabled={isLoading}
              className="flex-1 sm:flex-initial h-12 lg:h-14 px-8 lg:px-14 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl bg-primary text-primary-foreground hover:opacity-90 transition-all active:scale-95 group"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                <>
                  {step === STEPS.length ? "VALIDER L'INSCRIPTION" : "ÉTAPE SUIVANTE"}
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
