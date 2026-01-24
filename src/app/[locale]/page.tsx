"use client"
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";
import {
  ArrowRight,
  Zap,
  Calendar,
  Users,
  Rocket,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import  TrophyCard  from "@/components/scroll-trophy";
import { DynamicHero } from "@/components/hero/dynamic-hero";

import DynamicAuraGradiant from "@/components/hero-dynamic-aura-gradiant";

export default function LandingPage() {
  const t = useTranslations();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-500 overflow-x-hidden">
      {/* Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-dot-grid opacity-30" />

      {/* Dynamic Aura Gradient */}
      <DynamicAuraGradiant />

      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-12">
          <Link className="flex items-center gap-2 group" href="/">
            <div className="flex -space-x-1">
              <div className="h-5 w-5 rounded-full bg-primary" />
              <div className="h-5 w-5 rounded-full bg-primary/20 backdrop-blur-sm" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground ml-1 uppercase">
              DevWeek <span className="text-primary">2026</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {[
              { label: t("landing.nav.event"), href: "#event" },
              { label: t("landing.nav.path"), href: "#path" },
              { label: t("landing.nav.prizes"), href: "#prizes" },
              { label: t("landing.nav.faq"), href: "#faq" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[13px] font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/login" className="hidden sm:block">
              <Button
                variant="ghost"
                className="text-[13px] font-bold text-muted-foreground uppercase tracking-wider"
              >
                {t("auth.login.signIn")}
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg px-6 h-11 transition-all active:scale-95 shadow-xl shadow-primary/20 uppercase tracking-wider">
                {t("auth.login.signUp")}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative pt-44 pb-32 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {t("landing.hero.badge")}
              </span>
            </div>

            <h1 className="text-6xl md:text-[7rem] font-black text-foreground tracking-[-0.05em] mb-12 leading-[0.9] animate-in fade-in slide-in-from-bottom-6 duration-1000">
              {t("landing.hero.title")} <br />
              <span className="text-primary">
                {t("landing.hero.titleAccent")}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-16 font-medium leading-relaxed animate-in fade-in duration-1000 delay-200">
              {t("landing.hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in duration-1000 delay-300">
              <Link href="/hackatonInscriptionForm">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-12 h-20 text-md font-black shadow-2xl shadow-primary/30 group uppercase tracking-widest"
                >
                  {t("landing.hero.ctaPrimary")}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Button
                size="lg"
                variant="outline"
                className="border-border bg-background/50 backdrop-blur-sm rounded-lg h-20 px-12 text-md font-black text-foreground hover:bg-muted transition-all uppercase tracking-widest"
              >
                {t("landing.hero.ctaSecondary")}
              </Button>
            </div>

            <div className="relative mt-24 max-w-6xl mx-auto">
              <div className="aspect-video rounded-[3rem] bg-muted border border-border shadow-2xl overflow-hidden relative group">
                <DynamicHero />
              </div>

              {/* ILLUSTRATIVE FLOATING CARDS */}
              <TrophyCard />

              <div
                className="absolute -bottom-12 -right-12 floating-card p-6 rounded-3xl hidden xl:block shadow-2xl bg-float-card"
                style={{
                  transform: `translateY(${scrollY * 0.12}px)`,
                  borderRadius: "var(--radius)",
                }}
              >
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-4 text-foreground">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-black uppercase tracking-widest">
                      {t("landing.hero.liveRegistration")}
                    </span>
                  </div>
                  <div className="flex -space-x-3 items-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="h-12 w-12 rounded-full border-4 border-background bg-muted overflow-hidden"
                      >
                        <img
                          src={`https://i.pravatar.cc/150?u=devweek${i}`}
                          alt="user"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                    <div className="h-12 w-12 rounded-full border-4 border-background bg-primary flex items-center justify-center text-[12px] font-black text-primary-foreground uppercase shadow-lg">
                      +1k
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE STATS */}
        <div className="py-20 border-y border-border mb-32 bg-muted/20 relative z-20">
          <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              {
                icon: Users,
                title: "1000+",
                label: t("landing.stats.participants"),
              },
              { icon: Rocket, title: "30+", label: t("landing.stats.experts") },
              {
                icon: Calendar,
                title: "48H",
                label: t("landing.stats.nonstop"),
              },
              { icon: Zap, title: "100+", label: t("landing.stats.projects") },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center group border-r border-border last:border-0 md:border-r-0 md:bg-muted/50 md:p-8 rounded-3xl transition-all hover:bg-muted"
                style={{ borderRadius: "calc(var(--radius) * 1.5)" }}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-background flex items-center justify-center border border-border shadow-sm group-hover:scale-110 transition-transform">
                    <stat.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-4xl font-black tracking-tighter text-foreground">
                      {stat.title}
                    </h4>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-1">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PARCOURS (TRACKS) */}
        <section id="parcours" className="py-20 mb-32">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
              <div className="space-y-6">
                <Badge
                  variant="outline"
                  className="border-primary/30 text-primary px-5 py-2 rounded-full font-black uppercase tracking-[0.2em] text-[10px] bg-primary/5"
                >
                  {t("landing.tracks.badge")}
                </Badge>
                <h2 className="text-5xl md:text-8xl font-black text-foreground tracking-tighter leading-[0.85]">
                  {t("landing.tracks.title")} <br />{" "}
                  <span className="text-muted-foreground/40 italic">
                    {t("landing.tracks.titleItalic")}
                  </span>
                </h2>
              </div>
              <p className="text-xl text-muted-foreground font-semibold leading-relaxed max-w-lg">
                {t("landing.tracks.subtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  icon: Cpu,
                  title: t("landing.tracks.ai.title"),
                  desc: t("landing.tracks.ai.desc"),
                  theme: "primary",
                },
                {
                  icon: ShieldCheck,
                  title: t("landing.tracks.sec.title"),
                  desc: t("landing.tracks.sec.desc"),
                  theme: "primary",
                },
                {
                  icon: Zap,
                  title: t("landing.tracks.ux.title"),
                  desc: t("landing.tracks.ux.desc"),
                  theme: "primary",
                },
              ].map((track, i) => (
                <div
                  key={i}
                  className="floating-card p-12 group h-[500px] flex flex-col justify-between overflow-hidden relative"
                  style={{ borderRadius: "var(--radius)" }}
                >
                  <div className="absolute -top-10 -right-10 opacity-[0.05] group-hover:opacity-[0.1] group-hover:scale-125 transition-all duration-700">
                    <track.icon className="h-64 w-64 rotate-12" />
                  </div>
                  <div className="space-y-12 relative z-10">
                    <div className="h-20 w-20 rounded-3xl flex items-center justify-center text-primary-foreground bg-primary shadow-2xl shadow-primary/20 group-hover:rotate-6 transition-transform">
                      <track.icon className="h-10 w-10" />
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-3xl font-black tracking-tight text-foreground leading-none">
                        {track.title}
                      </h3>
                      <p className="text-muted-foreground font-bold text-lg leading-relaxed">
                        {track.desc}
                      </p>
                    </div>
                  </div>
                  <div className="mt-12 flex items-center gap-3 text-sm font-black cursor-pointer group-hover:gap-6 transition-all text-primary uppercase tracking-[0.2em] relative z-10">
                    <span>{t("landing.tracks.explore")}</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-48 px-6">
          <div
            className="container mx-auto max-w-5xl bg-foreground p-24 md:p-32 text-center relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transition-all"
            style={{ borderRadius: "var(--radius)" }}
          >
            <div
              className="absolute inset-0 bg-linear-to-tr from-primary/30 to-transparent transition-opacity duration-1000"
              style={{ opacity: 0.2 }}
            />
            <div className="relative z-10 space-y-16">
              <h2 className="text-6xl md:text-[8rem] font-black text-background tracking-[-0.05em] leading-none uppercase">
                {t("landing.cta.title")} <br />{" "}
                <span className="text-muted-foreground/50">
                  {t("landing.cta.titleAccent")}
                </span>
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <Link href="/register">
                  <Button
                    className="bg-background text-foreground hover:bg-muted rounded-xl px-16 h-24 text-xl font-black transition-all active:scale-95 uppercase tracking-widest shadow-2xl"
                    style={{ borderRadius: "calc(var(--radius) / 2)" }}
                  >
                    {t("landing.cta.button")}
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                <p className="text-muted-foreground text-xs font-black uppercase tracking-[0.5em]">
                  {t("landing.cta.limited")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-background border-t border-border py-32 relative z-10">
        <div className="container mx-auto px-6 lg:px-12 grid md:grid-cols-4 gap-24 text-foreground">
          <div className="md:col-span-2 space-y-12">
            <Link className="flex items-center gap-3" href="/">
              <div className="h-10 w-10 rounded-xl bg-primary shadow-xl shadow-primary/20" />
              <span className="text-2xl font-black tracking-tighter text-foreground uppercase">
                DevWeek
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm font-bold text-xl leading-relaxed">
              {t("landing.footer.description")}
            </p>
            <div className="flex gap-10">
              {["Twitter", "GitHub", "Discord"].map((social) => (
                <span
                  key={social}
                  className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-primary cursor-pointer transition-colors px-1 py-1"
                >
                  {social}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-10 font-black">
            <h5 className="text-[11px] uppercase tracking-[0.5em] text-muted-foreground/40">
              {t("landing.footer.navigation")}
            </h5>
            <ul className="space-y-6 text-lg">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Programme
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Hackathon
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Mentors
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-10 font-black">
            <h5 className="text-[11px] uppercase tracking-[0.5em] text-muted-foreground/40">
              {t("landing.footer.legal")}
            </h5>
            <ul className="space-y-6 text-lg">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 lg:px-12 pt-24 mt-24 border-t border-border text-center flex justify-between">
          <p className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.6em]">
            {t("landing.footer.rights")}
          </p>
          <p className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.6em]">
            {t("landing.footer.madeBy")}{" "}
            <a href="https://github.com/karaag2">Amos Issa</a> &{" "}
            <a href="https://github.com/nazir">Nazir</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
