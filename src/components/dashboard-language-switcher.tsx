"use client";

import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export function DashboardLanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center gap-1 bg-muted rounded-full p-1 border border-border">
      {(["fr", "en", "es"] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => i18n.changeLanguage(lang)}
          className={cn(
            "px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-full transition-all",
            i18n.language === lang
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:bg-background/80",
          )}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
