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

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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
            toast.error(ctx.error.message || "Échec de la connexion");
          },
          onSuccess: () => {
            toast.success("Connexion réussie");
            router.push("/dashboard");
          },
        },
      );
    } catch {
      toast.error("Une erreur inattendue est survenue");
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
      toast.error(`Échec de la connexion avec ${provider}`);
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-left">
        <h1 className="text-4xl font-black tracking-tight text-foreground transition-colors">
          Bon retour
        </h1>
        <p className="text-lg font-medium text-muted-foreground">
          Saisissez vos identifiants pour accéder à la grille.
        </p>
      </div>

      <div className="grid gap-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2 text-left">
              <Label
                htmlFor="email"
                className="text-sm font-bold text-foreground"
              >
                Adresse E-mail
              </Label>
              <Input
                id="email"
                placeholder="nom@exemple.com"
                type="email"
                className="h-12 rounded-xl border-border bg-muted/30 transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
                disabled={isLoading}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs font-medium text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2 text-left">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-sm font-bold text-foreground"
                >
                  Mot de passe
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-bold text-primary hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                className="h-12 rounded-xl border-border bg-muted/30 transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
                disabled={isLoading}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs font-medium text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="h-14 w-full rounded-xl bg-primary font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl active:scale-[0.98] uppercase tracking-widest text-xs"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Se connecter"
            )}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-4 text-muted-foreground font-medium">
              Ou continuer avec
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Button
            variant="outline"
            className="h-12 rounded-xl border-border font-bold text-foreground transition-all hover:bg-muted hover:border-muted-foreground/30 bg-background"
            onClick={() => handleSocialLogin("google")}
            disabled={isLoading}
          >
            <FcGoogle className="mr-2 h-5 w-5" />
            Google
          </Button>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-12 rounded-xl border-border font-bold text-foreground transition-all hover:bg-muted bg-background"
              onClick={() => handleSocialLogin("github")}
              disabled={isLoading}
            >
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-xl border-border font-bold text-foreground transition-all hover:bg-muted bg-background"
              onClick={() => handleSocialLogin("gitlab")}
              disabled={isLoading}
            >
              <Gitlab className="mr-2 h-4 w-4" />
              GitLab
            </Button>
          </div>
        </div>
      </div>

      <div className="text-center text-sm font-medium text-muted-foreground font-bold">
        Pas encore membre ?{" "}
        <Link
          href="/register"
          className="font-black text-primary hover:underline"
        >
          Créer un compte
        </Link>
      </div>
    </div>
  );
}
