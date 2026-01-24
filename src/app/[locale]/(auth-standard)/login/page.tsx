"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginInput = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

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
          onSuccess: () => {
            toast.success("Welcome back!");
            router.push("/dashboard");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Invalid credentials");
          },
        }
      );
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="space-y-3 md:text-left">
        <h1 className="text-4xl font-black tracking-tighter uppercase text-foreground">
          Welcome Back
        </h1>
        <p className="text-muted-foreground font-medium text-lg leading-relaxed max-w-sm">
          Access your mission control and track your hackathon progress.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label className="font-black uppercase text-[11px] tracking-widest text-muted-foreground/70 ml-1">
            Email Address
          </Label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
            <Input
              {...register("email")}
              className="pl-12 h-14 rounded-2xl bg-muted/30 border-2 border-transparent focus:border-primary/20 focus:bg-background hover:bg-muted/50 font-bold transition-all duration-300"
              placeholder="user@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
            />
          </div>
          {errors.email && (
            <p className="text-[10px] font-black text-rose-500 uppercase tracking-wide ml-1 slide-in-from-left-2 fade-in animate-in">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between ml-1 mr-1">
            <Label className="font-black uppercase text-[11px] tracking-widest text-muted-foreground/70">
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-[10px] font-black uppercase tracking-widest text-primary/80 hover:text-primary transition-colors hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
            <Input
              {...register("password")}
              className="pl-12 h-14 rounded-2xl bg-muted/30 border-2 border-transparent focus:border-primary/20 focus:bg-background hover:bg-muted/50 font-bold transition-all duration-300"
              placeholder="••••••••"
              type="password"
              autoComplete="current-password"
            />
          </div>
          {errors.password && (
            <p className="text-[10px] font-black text-rose-500 uppercase tracking-wide ml-1 slide-in-from-left-2 fade-in animate-in">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <span className="flex items-center gap-2">
              Sign In <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </Button>
      </form>

      <div className="text-center pt-4">
        <p className="text-sm font-medium text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-primary font-black uppercase tracking-wide hover:underline decoration-2 underline-offset-4 transition-all"
          >
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
}
