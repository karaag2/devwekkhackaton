"use client";

import { useUIStore } from "@/store";
import { cn } from "@/lib/utils";

export default function RegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { visualStyle } = useUIStore();

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-0 md:p-8 overflow-hidden transition-colors duration-500">
      {/* Dynamic Background Layer consistent with landing */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-dot-grid opacity-20" />

      {/* Aura Sphere */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none z-0 animate-pulse" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[100px] pointer-events-none z-0" />

      <div className="w-full max-w-6xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {children}
      </div>
    </div>
  );
}
