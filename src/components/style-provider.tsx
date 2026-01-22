"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store";
import { StyleSwitcher } from "@/components/style-switcher";
import i18n from "@/lib/i18n";
import { I18nextProvider } from "react-i18next";

export function StyleProvider({ children }: { children: React.ReactNode }) {
  const { visualStyle } = useUIStore();

  useEffect(() => {
    // Apply to both html and body to ensure all selectors work
    document.documentElement.setAttribute("data-style", visualStyle);
    document.body.setAttribute("data-style", visualStyle);

    // Debug log to confirm style change
    console.log(`🎨 Visual style changed to: ${visualStyle}`);
  }, [visualStyle]);

  return (
    <I18nextProvider i18n={i18n}>
      {children}
      <StyleSwitcher />
    </I18nextProvider>
  );
}
