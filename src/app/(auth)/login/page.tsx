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
import { loginSchema, type LoginInput } from "@/lib/validations";
import { signIn } from "@/lib/auth-client";
import { useUIStore } from "@/store";
import { translations } from "@/lib/translations";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useUIStore();
  const t = translations[language].auth.login;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginInput) {
    setIsLoading(true);
    try {
      await signIn.email(
        {
          email: data.email,
          password: data.password,
          callbackURL: "/dashboard",
        },
        {
          onError: (ctx) => {
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
        callbackURL: "/dashboard",
      });
    } catch {
      toast.error(`Login failed with ${provider}`);
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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
            <div className="space-y-2 text-left">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-xs font-black uppercase tracking-widest text-foreground ml-1"
                >
                  {t.password}
                </Label>
              </div>
              <Input
                id="password"
                type="password"
                className="h-14 rounded-2xl border-none bg-muted/30 transition-all focus:bg-background focus:ring-2 focus:ring-primary/20 text-lg font-bold"
                placeholder="••••••••"
                disabled={isLoading}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs font-bold text-destructive ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="h-14 w-full rounded-2xl bg-primary font-black text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-2xl active:scale-[0.98] uppercase tracking-widest"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              t.signIn
            )}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
            <span className="bg-background px-4 text-muted-foreground/50">
              {t.social}
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
        {t.noAccount}{" "}
        <Link
          href="/register"
          className="text-primary hover:underline decoration-2 underline-offset-4"
        >
          {t.signUp}
        </Link>
      </div>
    </div>
  );
}
