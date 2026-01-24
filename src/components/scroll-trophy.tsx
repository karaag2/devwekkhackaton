"use client"
import React from "react";
import { useState, useEffect } from "react";
import { Trophy } from "lucide-react";
import { useTranslations } from "next-intl";


const TrophyCard = () => {
  const t = useTranslations();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className="absolute -top-16 -left-16 floating-card p-8 rounded-3xl hidden xl:block min-w-[280px] bg-float-card"
      style={{
        transform: `translateY(${scrollY * -0.07}px)`,
        borderRadius: "var(--radius)",
      }}
    >
      <div className="flex items-center gap-5 mb-6">
        <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Trophy className="h-7 w-7 text-primary" />
        </div>
        <div className="text-left">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
            {t("landing.hero.prizePool")}
          </p>
          <p className="text-3xl font-black text-foreground mt-1 tracking-tighter">
            $50,000
          </p>
        </div>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div className="w-3/4 h-full bg-primary animate-pulse" />
      </div>
    </div>
  );
};

export default TrophyCard;
