"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store";
import { StyleSwitcher } from "@/components/style-switcher";

export function StyleProvider({ children }: { children: React.ReactNode }) {
  const { visualStyle } = useUIStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-style", visualStyle);
  }, [visualStyle]);

  return (
    <>
      {children}
      <StyleSwitcher />
    </>
  );
}
