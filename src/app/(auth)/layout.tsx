"use client";

import Image from "next/image";
import Link from "next/link";
import { useUIStore } from "@/store";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

const THEME_DATA = {
  minimal: {
    title: "Engineering Excellence",
    desc: "Rejoignez l'élite des bâtisseurs numérique.",
    img: "/auth-illustration.png",
  },
  cyber: {
    title: "Enter the Matrix",
    desc: "Decode the future of decentralized systems.",
    img: "/hero-cube.png",
  },
  matrix: {
    title: "Digital Awakening",
    desc: "Follow the white rabbit into the code.",
    img: "/hero-cube.png",
  }, // Matrix specific?
  synthwave: {
    title: "Neon Horizons",
    desc: "Build the retro-future of the web.",
    img: "/auth-illustration.png",
  },
  nature: {
    title: "Organic Growth",
    desc: "Sustainable code for a greener earth.",
    img: "/auth-illustration.png",
  },
  sunset: {
    title: "Creative Dusk",
    desc: "Turn your visions into reality.",
    img: "/auth-illustration.png",
  },
  royal: {
    title: "Golden Standard",
    desc: "Premium architecture for high-end systems.",
    img: "/hero-cube.png",
  },
  playful: {
    title: "Pure Joy",
    desc: "Make coding fun again.",
    img: "/auth-illustration.png",
  },
  elegant: {
    title: "Editorial Design",
    desc: "Crafting beautiful digital experiences.",
    img: "/auth-illustration.png",
  },
  mono: {
    title: "Technical Purity",
    desc: "Strictly focus on logic and performance.",
    img: "/auth-illustration.png",
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

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { visualStyle, language, setLanguage } = useUIStore();

  const themeInfo = THEME_DATA[visualStyle] || THEME_DATA.minimal;

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row bg-background transition-colors duration-500 overflow-x-hidden">
      {/* Top Header for Mobile */}
      <div className="md:hidden p-6 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-primary" />
          <span className="text-xl font-black tracking-tighter uppercase">
            DevWeek
          </span>
        </Link>
        <LanguageSwitcher current={language} set={setLanguage} />
      </div>

      {/* Left section: Form */}
      <div className="flex w-full flex-col justify-center bg-background px-6 py-12 md:w-1/2 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          {/* Desktop Logo */}
          <div className="hidden md:flex flex-col gap-8 mb-10">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="grid grid-cols-2 gap-1">
                  <div className="h-4 w-4 rounded-sm bg-primary" />
                  <div className="h-4 w-4 rounded-sm bg-primary/40" />
                  <div className="h-4 w-4 rounded-sm bg-primary/20" />
                  <div className="h-4 w-4 rounded-sm bg-primary/60" />
                </div>
                <span className="text-2xl font-black tracking-tighter text-foreground uppercase">
                  DevWeek <span className="text-primary">2026</span>
                </span>
              </Link>
              <LanguageSwitcher current={language} set={setLanguage} />
            </div>
          </div>

          <div className="relative z-10">{children}</div>
        </div>
      </div>

      {/* Right section: Illustration */}
      <div className="relative hidden w-1/2 flex-col items-center justify-center bg-muted md:flex overflow-hidden">
        {/* Dynamic Theme Background */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-primary/5 transition-colors duration-700" />

        <div className="relative z-10 w-full max-w-xl p-12 animate-in fade-in zoom-in-95 duration-700">
          <div className="relative aspect-square w-full drop-shadow-2xl">
            <Image
              key={visualStyle} // Force re-animation on theme change
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

        {/* Decorative elements per theme */}
        <div className="absolute top-0 right-0 p-8 opacity-20">
          <span className="text-[14rem] font-black pointer-events-none select-none">
            {visualStyle.substring(0, 1).toUpperCase()}
          </span>
        </div>

        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse" />
      </div>
    </div>
  );
}

function LanguageSwitcher({
  current,
  set,
}: {
  current: string;
  set: (l: any) => void;
}) {
  return (
    <div className="flex items-center gap-1 bg-muted rounded-full p-1 border border-border">
      {(["fr", "en", "es"] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => set(lang)}
          className={cn(
            "px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full transition-all",
            current === lang
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
