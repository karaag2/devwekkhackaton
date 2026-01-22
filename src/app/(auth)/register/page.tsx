"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Github, Gitlab } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema, type RegisterInput } from "@/lib/validations";
import { signUp, signIn } from "@/lib/auth-client";
import { useUIStore } from "@/store";
import { translations } from "@/lib/translations";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useUIStore();
  const t = translations[language].auth.register;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterInput) {
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
          onError: (ctx) => {
            toast.error(ctx.error.message || "Registration failed.");
          },
          onSuccess: () => {
            toast.success("Account created successfully!");
            router.push("/dashboard");
          },
        },
      );
    } catch {
      toast.error("Unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSocialLogin(provider: "github" | "gitlab" | "google") {
    setIsLoading(true);
    try {
      await signIn.social({
        provider: provider === "google" ? "google" : provider,
        callbackURL: "/dashboard",
      });
    } catch {
      toast.error(`Registration failed with ${provider}`);
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-left">
        <h1 className="text-4xl font-black tracking-tight text-foreground transition-colors uppercase">
          {t.title}
        </h1>
        <p className="text-lg font-medium text-muted-foreground italic">
          {t.subtitle}
        </p>
      </div>

      <div className="grid gap-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2 text-left">
              <Label
                htmlFor="name"
                className="text-xs font-black uppercase tracking-widest text-foreground ml-1"
              >
                {t.name}
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                type="text"
                className="h-14 rounded-2xl border-none bg-muted/30 transition-all focus:bg-background focus:ring-2 focus:ring-primary/20 text-lg font-bold"
                disabled={isLoading}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs font-bold text-destructive ml-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-2 text-left">
              <Label
                htmlFor="email"
                className="text-xs font-black uppercase tracking-widest text-foreground ml-1"
              >
                {t.email}
              </Label>
              <Input
                id="email"
                placeholder="nom@exemple.com"
                type="email"
                className="h-14 rounded-2xl border-none bg-muted/30 transition-all focus:bg-background focus:ring-2 focus:ring-primary/20 text-lg font-bold"
                disabled={isLoading}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs font-bold text-destructive ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 text-left">
                <Label
                  htmlFor="password"
                  className="text-xs font-black uppercase tracking-widest text-foreground ml-1"
                >
                  {t.password}
                </Label>
                <Input
                  id="password"
                  type="password"
                  className="h-14 rounded-2xl border-none bg-muted/30 transition-all focus:bg-background focus:ring-2 focus:ring-primary/20 text-lg font-bold"
                  placeholder="••••••••"
                  disabled={isLoading}
                  {...register("password")}
                />
              </div>
              <div className="space-y-2 text-left">
                <Label
                  htmlFor="confirmPassword"
                  className="text-xs font-black uppercase tracking-widest text-foreground ml-1"
                >
                  {t.confirm}
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  className="h-14 rounded-2xl border-none bg-muted/30 transition-all focus:bg-background focus:ring-2 focus:ring-primary/20 text-lg font-bold"
                  placeholder="••••••••"
                  disabled={isLoading}
                  {...register("confirmPassword")}
                />
              </div>
            </div>
            {(errors.password || errors.confirmPassword) && (
              <p className="text-xs font-bold text-destructive ml-1">
                {errors.password?.message || errors.confirmPassword?.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="h-14 w-full rounded-2xl bg-primary font-black text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-2xl active:scale-[0.98] uppercase tracking-widest"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              t.signUp
            )}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
            <span className="bg-background px-4 text-muted-foreground/50">
              {language === "fr"
                ? "Ou s'inscrire avec"
                : language === "es"
                  ? "O registrarse con"
                  : "Or register with"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Button
            variant="outline"
            className="h-14 rounded-2xl border-border font-black text-foreground transition-all hover:bg-muted bg-background uppercase tracking-widest text-xs"
            onClick={() => handleSocialLogin("google")}
            disabled={isLoading}
          >
            <FcGoogle className="mr-2 h-5 w-5" />
            Google
          </Button>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-14 rounded-2xl border-border font-black text-foreground transition-all hover:bg-muted bg-background uppercase tracking-widest text-[10px]"
              onClick={() => handleSocialLogin("github")}
              disabled={isLoading}
            >
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button
              variant="outline"
              className="h-14 rounded-2xl border-border font-black text-foreground transition-all hover:bg-muted bg-background uppercase tracking-widest text-[10px]"
              onClick={() => handleSocialLogin("gitlab")}
              disabled={isLoading}
            >
              <Gitlab className="mr-2 h-4 w-4" />
              GitLab
            </Button>
          </div>
        </div>
      </div>

      <div className="text-center text-xs font-black text-muted-foreground uppercase tracking-widest">
        {t.hasAccount}{" "}
        <Link
          href="/login"
          className="text-primary hover:underline decoration-2 underline-offset-4"
        >
          {t.signIn}
        </Link>
      </div>
    </div>
  );
}
