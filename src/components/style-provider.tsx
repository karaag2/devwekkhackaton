"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store";
import { StyleSwitcher } from "@/components/style-switcher";

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
    <>
      {children}
      <StyleSwitcher />
    </>
  );
}
