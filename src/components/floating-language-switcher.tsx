"use client";

import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function FloatingLanguageSwitcher() {
  const { i18n } = useTranslation();

  const languages = [
    { code: "fr", label: "Français" },
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
  ];

  return (
    <div className="fixed bottom-24 right-6 z-100">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full shadow-2xl bg-background text-foreground border-border hover:bg-muted group transition-all duration-300 active:scale-95"
          >
            <Languages className="h-5 w-5 text-gray-700 group-hover:text-indigo-600 transition-colors" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="rounded-2xl border-none shadow-2xl bg-white/95 backdrop-blur-xl p-2 min-w-[120px]"
        >
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => i18n.changeLanguage(lang.code)}
              className={cn(
                "rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest cursor-pointer transition-colors",
                i18n.language === lang.code
                  ? "bg-indigo-600 text-white"
                  : "text-gray-500 hover:bg-gray-100",
              )}
            >
              {lang.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
