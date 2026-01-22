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
  Briefcase,
  GraduationCap,
  Code2,
  Trophy,
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

const STEPS = [
  { id: 1, title: "Compte", icon: User, description: "Identité Numérique" },
  {
    id: 2,
    title: "Profil Tech",
    icon: Terminal,
    description: "Super-pouvoirs",
  },
  {
    id: 3,
    title: "Mission",
    icon: Sparkles,
    description: "Objectifs & Équipe",
  },
];

export default function HackathonRegistration() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
      // 1. Send to Google Form (Simulation)
      // IMPORTANT: Remplacer par vos ENTRY IDs réels
      // URL: https://docs.google.com/forms/d/e/ID_FORM/formResponse
      const GOOGLE_FORM_URL =
        "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfD.../formResponse";

      const formData = new URLSearchParams();
      formData.append("entry.1000001", data.name);
      formData.append("entry.1000002", data.email);
      formData.append("entry.1000003", data.role);
      formData.append("entry.1000004", data.level);
      formData.append("entry.1000005", data.github || "N/A");
      formData.append("entry.1000006", data.motivation);

      // Submission via fetch mode: no-cors pour éviter les blocages de domaine
      fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      }).catch((e) => console.error("Google Form submission hidden error:", e));

      // 2. Register user in internal Database
      await signUp.email(
        {
          email: data.email,
          password: data.password,
          name: data.name,
          callbackURL: "/dashboard",
        },
        {
          onSuccess: () => {
            toast.success(
              "Bienvenue dans la bataille, " + data.name.split(" ")[0] + " !",
            );
            router.push("/dashboard");
          },
          onError: (ctx) => {
            toast.error(
              ctx.error.message || "Erreur lors de l'inscription technique.",
            );
          },
        },
      );
    } catch (error) {
      toast.error("Un problème système est survenu. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-dot-grid opacity-10 pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="max-w-xl w-full relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center p-2 group-hover:scale-110 transition-transform">
              <Trophy className="h-6 w-6 text-primary-foreground font-black" />
            </div>
            <span className="text-2xl font-black uppercase tracking-tighter">
              DevWeek <span className="text-primary">2026</span>
            </span>
          </Link>
          <h1 className="text-4xl font-black uppercase tracking-tight leading-none mb-4">
            Rejoindre la Bataille
          </h1>
          <p className="text-muted-foreground font-medium">
            Inscrivez-vous pour marquer l'histoire de l'ingénierie.
          </p>
        </div>

        {/* Stepper Header */}
        <div className="mb-8 flex justify-between relative px-2">
          <div className="absolute top-5 left-8 right-8 h-[2px] bg-muted z-0" />
          <div
            className="absolute top-5 left-8 h-[2px] bg-primary z-0 transition-all duration-500 ease-in-out"
            style={{
              width: `calc(${((step - 1) / (STEPS.length - 1)) * 100}% - 4rem)`,
            }}
          />
          {STEPS.map((s) => (
            <div
              key={s.id}
              className="relative z-10 flex flex-col items-center w-24"
            >
              <div
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                  step >= s.id
                    ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-background border-muted text-muted-foreground",
                )}
              >
                {step > s.id ? (
                  <Rocket className="h-5 w-5" />
                ) : (
                  <s.icon className="h-5 w-5" />
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-[9px] font-black uppercase tracking-widest text-center",
                  step >= s.id ? "text-primary" : "text-muted-foreground",
                )}
              >
                {s.title}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 flex flex-col"
          >
            <div className="p-8 md:p-10 flex-1 relative overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full flex flex-col gap-6"
                >
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                          <User className="h-5 w-5 text-primary" /> Identité
                          Principale
                        </h3>
                        <p className="text-sm text-muted-foreground font-medium">
                          Ces informations serviront à votre badge officiel.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1">
                            Nom du Guerrier / Guerrière
                          </Label>
                          <Input
                            {...register("name")}
                            placeholder="Alexandre Legrand"
                            className="h-14 rounded-2xl bg-muted/30 border-none focus:ring-2 focus:ring-primary/20 transition-all text-lg font-bold"
                          />
                          {errors.name && (
                            <p className="text-xs text-destructive font-bold ml-1">
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1">
                            Email de Commandement
                          </Label>
                          <Input
                            {...register("email")}
                            type="email"
                            placeholder="command@devweek.io"
                            className="h-14 rounded-2xl bg-muted/30 border-none focus:ring-2 focus:ring-primary/20 transition-all text-lg font-bold"
                          />
                          {errors.email && (
                            <p className="text-xs text-destructive font-bold ml-1">
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1">
                              Code d'accès
                            </Label>
                            <Input
                              {...register("password")}
                              type="password"
                              placeholder="••••••••"
                              className="h-14 rounded-2xl bg-muted/30 border-none focus:ring-2 focus:ring-primary/20 transition-all text-lg font-bold"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1">
                              Confirmation
                            </Label>
                            <Input
                              {...register("confirmPassword")}
                              type="password"
                              placeholder="••••••••"
                              className="h-14 rounded-2xl bg-muted/30 border-none focus:ring-2 focus:ring-primary/20 transition-all text-lg font-bold"
                            />
                          </div>
                        </div>
                        {(errors.password || errors.confirmPassword) && (
                          <p className="text-xs text-destructive font-bold ml-1">
                            {errors.password?.message ||
                              errors.confirmPassword?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                          <Terminal className="h-5 w-5 text-primary" /> Arsenal
                          Technique
                        </h3>
                        <p className="text-sm text-muted-foreground font-medium">
                          Spécifiez votre rôle tactique dans le hackathon.
                        </p>
                      </div>

                      <div className="space-y-5">
                        <div className="space-y-2 text-left">
                          <Label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1">
                            Spécialisation
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
                              <SelectItem value="MOBILE">
                                Pocket Device Master
                              </SelectItem>
                              <SelectItem value="AI">
                                Neural Network Sage
                              </SelectItem>
                              <SelectItem value="DESIGN">
                                UX/UI Alchemist
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2 text-left">
                          <Label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1">
                            Grade d'Expérience
                          </Label>
                          <Select
                            defaultValue={watch("level")}
                            onValueChange={(v) => setValue("level", v as any)}
                          >
                            <SelectTrigger className="h-14 rounded-2xl bg-muted/30 border-none font-bold text-lg">
                              <SelectValue placeholder="Niveau" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-border">
                              <SelectItem value="BEGINNER">
                                Recrue (0-1 an)
                              </SelectItem>
                              <SelectItem value="INTERMEDIATE">
                                Vétéran (1-3 ans)
                              </SelectItem>
                              <SelectItem value="ADVANCED">
                                Companions (3+ ans)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1">
                            Archive de Guerre (GitHub)
                          </Label>
                          <div className="relative group">
                            <Github className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground duration-300 group-focus-within:text-primary transition-colors" />
                            <Input
                              {...register("github")}
                              placeholder="github.com/votre-nom"
                              className="h-14 rounded-2xl bg-muted/30 border-none focus:ring-2 focus:ring-primary/20 transition-all text-lg font-bold pl-12"
                            />
                          </div>
                          {errors.github && (
                            <p className="text-xs text-destructive font-bold ml-1">
                              {errors.github.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-primary" />{" "}
                          Transmission Finale
                        </h3>
                        <p className="text-sm text-muted-foreground font-medium">
                          Convainquez-nous de votre détermination.
                        </p>
                      </div>

                      <div className="space-y-5">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1">
                            Déclaration d'intention (Motivation)
                          </Label>
                          <Textarea
                            {...register("motivation")}
                            placeholder="Qu'allez-vous construire pour changer le monde numérique ?"
                            className="min-h-[140px] rounded-3xl bg-muted/30 border-none focus:ring-2 focus:ring-primary/20 transition-all font-medium p-6 resize-none"
                          />
                          {errors.motivation && (
                            <p className="text-xs text-destructive font-bold ml-1">
                              {errors.motivation.message}
                            </p>
                          )}
                        </div>

                        <div
                          className={cn(
                            "flex items-center gap-4 p-5 rounded-3xl border transition-all duration-300",
                            watch("hasTeam")
                              ? "bg-primary/5 border-primary/20"
                              : "bg-muted/10 border-transparent",
                          )}
                        >
                          <input
                            type="checkbox"
                            id="hasTeam"
                            className="h-6 w-6 rounded-lg border-primary/30 text-primary focus:ring-primary/20 cursor-pointer"
                            {...register("hasTeam")}
                          />
                          <div className="space-y-0.5">
                            <Label
                              htmlFor="hasTeam"
                              className="font-black text-sm cursor-pointer uppercase tracking-tight"
                            >
                              Escouade déjà formée
                            </Label>
                            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                              Cochez si vous avez déjà un groupe.
                            </p>
                          </div>
                        </div>

                        <AnimatePresence>
                          {watch("hasTeam") && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="space-y-2 overflow-hidden"
                            >
                              <Label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1">
                                Nom de votre équipe
                              </Label>
                              <Input
                                {...register("teamName")}
                                placeholder="Ex: CyberDragons"
                                className="h-14 rounded-2xl bg-muted/30 border-none focus:ring-2 focus:ring-primary/20 transition-all text-lg font-bold"
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer / Buttons */}
            <div className="p-8 md:p-10 bg-muted/20 border-t border-border flex gap-4">
              {step > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={prevStep}
                  disabled={isLoading}
                  className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest hover:bg-background transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Retour
                </Button>
              )}

              <Button
                type="button"
                onClick={
                  step === STEPS.length ? handleSubmit(onSubmit) : nextStep
                }
                disabled={isLoading}
                className={cn(
                  "flex-1 h-14 rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all active:scale-[0.98] group",
                  step === STEPS.length
                    ? "bg-primary text-primary-foreground shadow-primary/20"
                    : "bg-foreground text-background",
                )}
              >
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <>
                    {step === STEPS.length ? "Lancer l'assaut" : "Suivant"}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground/60 text-xs font-black uppercase tracking-widest">
            Déjà un compte ?{" "}
            <Link
              href="/login"
              className="text-primary hover:text-primary/80 underline decoration-2 underline-offset-4 transition-colors"
            >
              Portail de Connexion
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
