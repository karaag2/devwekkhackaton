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

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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
            toast.error(ctx.error.message || "Échec de l'inscription");
          },
          onSuccess: () => {
            toast.success("Compte créé avec succès");
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
      toast.error(`Échec de l'inscription avec ${provider}`);
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-left">
        <h1 className="text-4xl font-black tracking-tight text-foreground transition-colors">
          Rejoindre DevWeek
        </h1>
        <p className="text-lg font-medium text-muted-foreground">
          Devenez un bâtisseur de la future génération numérique.
        </p>
      </div>

      <div className="grid gap-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2 text-left">
              <Label
                htmlFor="name"
                className="text-sm font-bold text-foreground"
              >
                Nom complet
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                type="text"
                className="h-12 rounded-xl border-border bg-muted/30 transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
                disabled={isLoading}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs font-medium text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 text-left">
                <Label
                  htmlFor="password"
                  className="text-sm font-bold text-foreground"
                >
                  Mot de passe
                </Label>
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
              <div className="space-y-2 text-left">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-bold text-foreground"
                >
                  Confirmation
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  className="h-12 rounded-xl border-border bg-muted/30 transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
                  disabled={isLoading}
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-xs font-medium text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="h-14 w-full rounded-xl bg-primary font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl active:scale-[0.98] uppercase tracking-widest text-xs mt-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Créer mon compte"
            )}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-4 text-muted-foreground font-medium">
              Ou s&apos;inscrire avec
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Button
            variant="outline"
            className="h-12 rounded-xl border-border font-bold text-foreground transition-all hover:bg-muted bg-background"
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
        Déjà inscrit ?{" "}
        <Link href="/login" className="font-black text-primary hover:underline">
          Se connecter
        </Link>
      </div>
    </div>
  );
}
