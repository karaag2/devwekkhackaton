"use client";

import { useUIStore } from "@/store";
import { Button } from "@/components/ui/button";
import {
  Palette,
  Monitor,
  Gamepad2,
  Crown,
  Check,
  Moon,
  Leaf,
  Sun,
  Layout,
  GlassWater,
  Sparkles,
  Waves,
  Ruler,
  Gem,
  Terminal,
  Shapes,
  Gamepad,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";

const styles = [
  { id: "minimal", name: "Chrono", icon: Monitor, color: "bg-blue-600" },
  { id: "cyber", name: "TheCube", icon: Gamepad2, color: "bg-indigo-900" },
  { id: "playful", name: "Vibrant", icon: Sparkles, color: "bg-rose-500" },
  { id: "elegant", name: "Premium", icon: Crown, color: "bg-amber-800" },
  { id: "midnight", name: "Midnight", icon: Moon, color: "bg-purple-950" },
  { id: "nature", name: "Nature", icon: Leaf, color: "bg-emerald-600" },
  { id: "sunset", name: "Sunset", icon: Sun, color: "bg-orange-600" },
  { id: "mono", name: "Mono", icon: Layout, color: "bg-black" },
  { id: "glass", name: "Glass", icon: GlassWater, color: "bg-sky-400" },
  { id: "synthwave", name: "Synthwave", icon: Waves, color: "bg-fuchsia-600" },
  { id: "blueprint", name: "Blueprint", icon: Ruler, color: "bg-blue-800" },
  { id: "royal", name: "Royal", icon: Gem, color: "bg-zinc-900" },
  { id: "matrix", name: "Matrix", icon: Terminal, color: "bg-green-900" },
  { id: "brutalist", name: "Brutalist", icon: Shapes, color: "bg-yellow-400" },
] as const;

export function StyleSwitcher() {
  const { visualStyle, setVisualStyle } = useUIStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-style", visualStyle);
    document.body.setAttribute("data-style", visualStyle);
  }, [visualStyle]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="h-14 w-14 rounded-full shadow-2xl bg-white text-gray-900 hover:bg-gray-50 border border-gray-200 transition-all hover:scale-110 active:scale-95 group"
          >
            <Palette className="h-6 w-6 group-hover:rotate-12 transition-transform" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-64 p-2 rounded-2xl shadow-2xl border-border bg-background/95 backdrop-blur-md"
        >
          <div className="px-2 py-2 mb-1 border-b border-border/50">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">
              Atmosphere Engine v2.0
            </p>
          </div>
          <div className="grid grid-cols-1 gap-1 max-h-[450px] overflow-y-auto pr-1 mt-1">
            {styles.map((style) => (
              <DropdownMenuItem
                key={style.id}
                className="flex items-center justify-between py-2 px-3 rounded-xl cursor-pointer focus:bg-muted group transition-all"
                onClick={() => setVisualStyle(style.id as any)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-8 w-8 rounded-lg ${style.color} flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform`}
                  >
                    <style.icon className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`text-[13px] font-black uppercase tracking-tight ${visualStyle === style.id ? "text-primary" : "text-foreground/70"}`}
                    >
                      {style.name}
                    </span>
                  </div>
                </div>
                {visualStyle === style.id && (
                  <Check className="h-4 w-4 text-primary animate-in zoom-in" />
                )}
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
