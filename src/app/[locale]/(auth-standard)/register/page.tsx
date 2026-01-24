"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Mail, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterInput = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

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
          onSuccess: () => {
            toast.success("Account created successfully!");
            router.push("/dashboard");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Something went wrong");
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
          Create Account
        </h1>
        <p className="text-muted-foreground font-medium text-lg leading-relaxed max-w-sm">
          Join the elite developers building the future of the web.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label className="font-black uppercase text-[11px] tracking-widest text-muted-foreground/70 ml-1">
            Full Name
          </Label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
            <Input
              {...register("name")}
              className="pl-12 h-14 rounded-2xl bg-muted/30 border-2 border-transparent focus:border-primary/20 focus:bg-background hover:bg-muted/50 font-bold transition-all duration-300"
              placeholder="John Doe"
              autoComplete="name"
            />
          </div>
          {errors.name && (
            <p className="text-[10px] font-black text-rose-500 uppercase tracking-wide ml-1 slide-in-from-left-2 fade-in animate-in">
              {errors.name.message}
            </p>
          )}
        </div>

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
              autoComplete="email"
            />
          </div>
          {errors.email && (
            <p className="text-[10px] font-black text-rose-500 uppercase tracking-wide ml-1 slide-in-from-left-2 fade-in animate-in">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="font-black uppercase text-[11px] tracking-widest text-muted-foreground/70 ml-1">
              Password
            </Label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
              <Input
                {...register("password")}
                className="pl-12 h-14 rounded-2xl bg-muted/30 border-2 border-transparent focus:border-primary/20 focus:bg-background hover:bg-muted/50 font-bold transition-all duration-300"
                placeholder="••••••••"
                type="password"
                autoComplete="new-password"
              />
            </div>
            {errors.password && (
              <p className="text-[10px] font-black text-rose-500 uppercase tracking-wide ml-1 slide-in-from-left-2 fade-in animate-in">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="font-black uppercase text-[11px] tracking-widest text-muted-foreground/70 ml-1">
              Confirm
            </Label>
            <div className="relative group">
              <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
              <Input
                {...register("confirmPassword")}
                className="pl-12 h-14 rounded-2xl bg-muted/30 border-2 border-transparent focus:border-primary/20 focus:bg-background hover:bg-muted/50 font-bold transition-all duration-300"
                placeholder="••••••••"
                type="password"
                autoComplete="new-password"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-[10px] font-black text-rose-500 uppercase tracking-wide ml-1 slide-in-from-left-2 fade-in animate-in">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
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
              Create Account <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </Button>
      </form>

      <div className="text-center pt-4">
        <p className="text-sm font-medium text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-black uppercase tracking-wide hover:underline decoration-2 underline-offset-4 transition-all"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
