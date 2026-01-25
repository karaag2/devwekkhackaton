"use client";

import { Card } from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";
import { Link } from "@/i18n/routing";
import { Calendar, Users, Trophy, AlertCircle, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const { data: session } = useSession();
  const t = useTranslations();

  // @ts-ignore
  const isOnboarded = session?.user?.onboarded;

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto py-6 px-4">
      {/* Welcome Header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-black tracking-tight text-foreground leading-none uppercase">
          {t("dashboard.home.welcome")}{" "}
          <span className="text-primary">{session?.user?.name?.split(' ')[0] || "Hacker"}!</span>
        </h1>
        <div className="h-1.5 w-24 bg-primary rounded-full" />
        <p className="text-lg font-medium text-muted-foreground max-w-2xl italic">
          {t("dashboard.home.overview")}
        </p>
      </div>

      {/* Onboarding Notification */}
      {!isOnboarded && session && (
        <div className="relative group overflow-hidden rounded-[2.5rem] bg-amber-500/10 border border-amber-500/20 p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:bg-amber-500/15">
          <div className="flex items-center gap-6">
            <div className="h-14 w-14 rounded-3xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <AlertCircle className="h-8 w-8 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-black text-amber-600 uppercase tracking-tight">Inscription incomplète</h3>
              <p className="text-sm font-bold text-amber-700/70">Finalisez votre profil pour participer officiellement au hackathon et rejoindre une équipe.</p>
            </div>
          </div>
          <Link 
            href="/hackatonInscriptionForm"
            className="flex items-center gap-3 px-8 py-4 bg-amber-500 text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-amber-500/20"
          >
            Compléter maintenant
            <ArrowRight className="h-4 w-4" />
          </Link>
          
          {/* Decorative Background element */}
          <div className="absolute -right-12 -top-12 h-40 w-40 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-primary/5 overflow-hidden bg-card p-8 group hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-500">
          <div className="flex items-center justify-between mb-8">
            <div className="p-4 rounded-3xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
              <Calendar className="h-7 w-7" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-primary text-primary-foreground">
              {t("dashboard.home.stats.new")}
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
              {t("dashboard.home.stats.upcoming")}
            </h3>
            <div className="text-5xl font-black text-foreground">3</div>
          </div>
        </Card>

        <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-green-500/5 overflow-hidden bg-card p-8 group hover:shadow-green-500/10 hover:-translate-y-1 transition-all duration-500">
          <div className="flex items-center justify-between mb-8">
            <div className="p-4 rounded-3xl bg-green-500/10 text-green-500 group-hover:scale-110 transition-transform">
              <Users className="h-7 w-7" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-green-500 text-white">
              {t("dashboard.home.stats.pending")}
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
              {t("dashboard.nav.teams")}
            </h3>
            <div className="text-2xl font-black text-foreground opacity-80 uppercase leading-tight">
              {t("dashboard.home.stats.noTeam")}
            </div>
          </div>
        </Card>

        <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-yellow-500/5 overflow-hidden bg-card p-8 group hover:shadow-yellow-500/10 hover:-translate-y-1 transition-all duration-500">
          <div className="flex items-center justify-between mb-8">
            <div className="p-4 rounded-3xl bg-yellow-500/10 text-yellow-500 group-hover:scale-110 transition-transform">
              <Trophy className="h-7 w-7" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-yellow-500 text-white">
              {t("dashboard.home.stats.locked")}
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
              {t("dashboard.nav.submissions")}
            </h3>
            <div className="text-5xl font-black text-foreground leading-none">0</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
