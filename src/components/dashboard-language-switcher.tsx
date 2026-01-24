"use client";

import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

export function DashboardLanguageSwitcher() {
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
            "px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-full transition-all",
            locale === lang
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
