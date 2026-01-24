"use client";

import Image from "next/image";
import { useUIStore } from "@/store";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const THEME_DATA = {
  minimal: {
    title: "Engineering Excellence",
    desc: "Rejoignez l'élite des bâtisseurs numérique.",
    img: "/auth-illustration.png",
  },
  cyber: {
    title: "Enter the Matrix",
    desc: "Decode the future of decentralized systems.",
    img: "/theme-cyber.png",
  },
  matrix: {
    title: "Digital Awakening",
    desc: "Follow the white rabbit into the code.",
    img: "/theme-matrix.png",
  },
  synthwave: {
    title: "Neon Horizons",
    desc: "Build the retro-future of the web.",
    img: "/theme-synthwave.png",
  },
  nature: {
    title: "Organic Growth",
    desc: "Sustainable code for a greener earth.",
    img: "/hero-cube.png",
  },
  sunset: {
    title: "Creative Dusk",
    desc: "Turn your visions into reality.",
    img: "/hero-cube.png",
  },
  royal: {
    title: "Golden Standard",
    desc: "Premium architecture for high-end systems.",
    img: "/hero-cube.png",
  },
  playful: {
    title: "Pure Joy",
    desc: "Make coding fun again.",
    img: "/hero-cube.png",
  },
  elegant: {
    title: "Editorial Design",
    desc: "Crafting beautiful digital experiences.",
    img: "/hero-cube.png",
  },
  mono: {
    title: "Technical Purity",
    desc: "Strictly focus on logic and performance.",
    img: "/hero-cube.png",
  },
  glass: {
    title: "Translucent Future",
    desc: "Clear visions require deep architectures.",
    img: "/auth-illustration.png",
  },
  blueprint: {
    title: "Master Plan",
    desc: "Architecting the impossible.",
    img: "/auth-illustration.png",
  },
  brutalist: {
    title: "Raw Power",
    desc: "Honest structures, direct impact.",
    img: "/auth-illustration.png",
  },
  midnight: {
    title: "Deep Focus",
    desc: "The best code is written at night.",
    img: "/auth-illustration.png",
  },
};

export function AuthIllustration() {
  const { visualStyle } = useUIStore();
  const themeInfo = THEME_DATA[visualStyle] || THEME_DATA.minimal;

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center bg-muted overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-primary/5 transition-colors duration-700" />

      <div className="relative z-10 w-full max-w-xl p-12 animate-in fade-in zoom-in-95 duration-700">
        <div className="relative aspect-square w-full drop-shadow-2xl">
          <Image
            key={visualStyle}
            src={themeInfo.img}
            alt={themeInfo.title}
            fill
            className="object-contain animate-float"
            priority
          />
        </div>
        <div className="mt-12 space-y-4 text-center">
          <h2 className="text-4xl font-black tracking-tight text-foreground uppercase">
            {themeInfo.title}
          </h2>
          <p className="mx-auto max-w-sm text-lg font-medium text-muted-foreground italic">
            {themeInfo.desc}
          </p>
        </div>
      </div>

      <div className="absolute top-0 right-0 p-8 opacity-20">
        <span className="text-[14rem] font-black pointer-events-none select-none uppercase">
          {visualStyle.substring(0, 1)}
        </span>
      </div>

      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse" />
    </div>
  );
}

export function ShellLanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 bg-muted rounded-full p-1 border border-border">
      {(["fr", "en", "es"] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => router.replace(pathname, { locale: lang })}
          className={cn(
            "px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full transition-all",
            locale === lang
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:bg-background",
          )}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
