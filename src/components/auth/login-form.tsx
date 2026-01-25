"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { useRouter } from "@/i18n/routing";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Github, Gitlab, AtSign, Lock, AlertCircle } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { useTranslations, useLocale } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginInput } from "@/lib/validations";
import { signIn } from "@/lib/auth-client";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations();
  const locale = useLocale();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const [serverError, setServerError] = useState<string | null>(null);

  async function onSubmit(data: LoginInput) {
    setIsLoading(true);
    try {
      await signIn.email(
        {
          email: data.email,
          password: data.password,
          callbackURL: `/${locale}/dashboard`,
        },
        {
          onError: (ctx) => {
            setServerError(ctx.error.message || "Error");
            toast.error(ctx.error.message || "Error");
          },
          onSuccess: () => {
            toast.success("Welcome back!");
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
        callbackURL: `/${locale}/dashboard`,
      });
    } catch {
      toast.error(`Login failed with ${provider}`);
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="space-y-3 text-center w-full">
        <h1 className="text-4xl font-black tracking-tight text-foreground uppercase leading-none">
          {t("auth.login.title")}
        </h1>
        <p className="text-sm font-medium text-muted-foreground italic">
          {t("auth.login.subtitle")}
        </p>
      </div>

      <div className="w-full grid gap-8">
        {serverError && (
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-red-500/5 border border-red-500/30 text-red-500 animate-in fade-in slide-in-from-top-2 duration-300 shadow-sm">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] leading-none mb-0.5">Authentication Error</span>
              <p className="text-[11px] font-bold leading-tight">{serverError}</p>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-xs font-black uppercase tracking-[0.1em] text-foreground/80 ml-1"
              >
                {t("auth.login.email")}
              </Label>
              <div className="relative group">
                <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="email"
                  placeholder="nom@exemple.com"
                  type="email"
                  className="h-12 pl-12 rounded-2xl border-none bg-muted/50 transition-all focus:bg-background focus:ring-2 focus:ring-primary/20 text-[14px] font-bold text-foreground placeholder:text-muted-foreground/50"
                  disabled={isLoading}
                  {...register("email")}
                />
              </div>
               {errors.email && (
                <div className="flex items-center gap-1.5 mt-1.5 px-1 animate-in fade-in slide-in-from-top-0.5 duration-200 text-red-500">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  <span className="text-[10px] font-black uppercase tracking-tight leading-tight">
                    {errors.email.message}
                  </span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-xs font-black uppercase tracking-[0.1em] text-foreground/80 ml-1"
                >
                  {t("auth.login.password")}
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  type="password"
                  className="h-12 pl-12 rounded-2xl border-none bg-muted/50 transition-all focus:bg-background focus:ring-2 focus:ring-primary/20 text-[14px] font-bold text-foreground placeholder:text-muted-foreground/50"
                  placeholder="••••••••"
                  disabled={isLoading}
                  {...register("password")}
                />
              </div>
               {errors.password && (
                <div className="flex items-center gap-1.5 mt-1.5 px-1 animate-in fade-in slide-in-from-top-0.5 duration-200 text-red-500">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  <span className="text-[10px] font-black uppercase tracking-tight leading-tight">
                    {errors.password.message}
                  </span>
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="h-12 w-full rounded-2xl bg-primary font-black text-primary-foreground shadow-2xl shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/40 active:scale-[0.98] uppercase tracking-widest text-[11px]"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              t("auth.login.signIn")
            )}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
            <span className="bg-background px-4 text-muted-foreground/40 italic">
              {t("auth.login.social")}
            </span>
          </div>
        </div>

        {/* Enhanced OAuth Grid */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { id: "google", icon: FcGoogle, label: "Google", color: "" },
            { id: "github", icon: Github, label: "GitHub", color: "text-foreground" },
            { id: "gitlab", icon: Gitlab, label: "GitLab", color: "text-orange-500" },
          ].map((provider) => (
            <button
              key={provider.id}
              onClick={() => handleSocialLogin(provider.id as any)}
              disabled={isLoading}
              className="group flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-muted/30 border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all active:scale-95"
            >
              <provider.icon className={`h-6 w-6 ${provider.color}`} />
              <span className="text-[9px] font-black uppercase tracking-widest text-foreground/40 group-hover:text-primary transition-colors">{provider.label}</span>
            </button>
          ))}
        </div>

        <p className="text-center text-[11px] font-black text-muted-foreground uppercase tracking-widest pt-4">
          {t("auth.login.noAccount")}{" "}
          <Link
            href="/register"
            className="text-primary hover:underline decoration-2 underline-offset-4 ml-2"
          >
            {t("auth.login.signUp")}
          </Link>
        </p>
      </div>
    </div>
  );
}
