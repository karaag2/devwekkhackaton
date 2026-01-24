"use client";

import { useEffect, useRef } from "react";
import { useUIStore } from "@/store";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function DynamicHero() {
  const { visualStyle } = useUIStore();

  if (visualStyle === "matrix") return <MatrixRain />;
  if (visualStyle === "cyber") return <CyberGrid />;
  if (visualStyle === "synthwave") return <SynthwaveSun />;
  if (visualStyle === "nature") return <NatureFlow />;
  if (visualStyle === "minimal") return <ChronoDial />; // Was MinimalZen
  if (visualStyle === "playful") return <PlayfulBouncers />;
  if (visualStyle === "elegant") return <PremiumSilk />; // Was ElegantMarble
  if (visualStyle === "midnight") return <MidnightStars />;
  if (visualStyle === "sunset") return <SunsetVibes />; // Was SunsetHorizon
  if (visualStyle === "mono") return <MonoScan />;
  if (visualStyle === "glass") return <GlassPrism />; // Was GlassRefraction
  if (visualStyle === "blueprint") return <BlueprintTech />;
  if (visualStyle === "royal") return <RoyalVelvet />;
  if (visualStyle === "brutalist") return <BrutalistConstruct />; // Was BrutalistRaw

  // Ultimate Fallback
  return <GeometricFlow style={visualStyle} />;
}

// === UNCHANGED ENGINES ===

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    const columns = Math.floor(width / 20);
    const drops: number[] = new Array(columns).fill(1);
    const charArray = "01ABCDEF".split("");

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#0F0";
      ctx.font = "15px monospace";
      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * 20, drops[i] * 20);
        if (drops[i] * 20 > height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return <canvas ref={canvasRef} className="w-full h-full bg-black" />;
}

function CyberGrid() {
  return (
    <div className="w-full h-full bg-slate-950 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,#06b6d4_100%)] opacity-10 animate-pulse" />
      <div className="relative z-10 grid grid-cols-2 gap-8">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="w-32 h-32 rounded-xl border border-cyan-500/50 bg-cyan-900/10 backdrop-blur-md shadow-[0_0_30px_rgba(6,182,212,0.3)]"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="w-32 h-32 rounded-full border border-pink-500/50 bg-pink-900/10 backdrop-blur-md shadow-[0_0_30px_rgba(236,72,153,0.3)]"
        />
      </div>
    </div>
  );
}

function SynthwaveSun() {
  return (
    <div className="w-full h-full bg-[#1a0b2e] relative overflow-hidden flex items-end justify-center">
      <div className="absolute top-10 w-64 h-64 rounded-full bg-linear-to-b from-[#ffed00] to-[#ff0000] blur-sm shadow-[0_0_100px_rgba(255,100,0,0.5)]" />
      <div className="absolute bottom-0 w-full h-[50%] bg-[linear-gradient(transparent_0%,#ff00ff_100%)] opacity-20" />
      <div className="w-full h-full absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(255,0,255,.3)_25%,rgba(255,0,255,.3)_26%,transparent_27%,transparent_74%,rgba(255,0,255,.3)_75%,rgba(255,0,255,.3)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(255,0,255,.3)_25%,rgba(255,0,255,.3)_26%,transparent_27%,transparent_74%,rgba(255,0,255,.3)_75%,rgba(255,0,255,.3)_76%,transparent_77%,transparent)] bg-size-[50px_50px] perspective-[1000px] transform-[rotateX(60deg)_translateY(-100px)] opacity-50" />
    </div>
  );
}

function PlayfulBouncers() {
  return (
    <div className="w-full h-full bg-[#fffcf0] relative overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={cn(
            "absolute rounded-full mix-blend-multiply",
            i % 3 === 0
              ? "bg-rose-300"
              : i % 3 === 1
                ? "bg-yellow-300"
                : "bg-blue-300",
          )}
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
          animate={{
            y: [0, -100, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

function MidnightStars() {
  return (
    <div className="w-full h-full bg-[#0b011d] relative overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-linear-to-t from-purple-900/20 to-transparent" />
    </div>
  );
}

function MonoScan() {
  return (
    <div className="w-full h-full bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-size-[100%_4px] opacity-20" />
      <motion.div
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-32 bg-linear-to-b from-transparent via-white/10 to-transparent blur-sm"
      />
    </div>
  );
}

function BlueprintTech() {
  return (
    <div className="w-full h-full bg-[#1a365d] relative overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-size-[20px_20px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-size-[100px_100px]" />

      {/* Drawing Lines */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.path
          d="M100 100 H 300 V 300 H 100 Z"
          fill="transparent"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.circle
          cx="50%"
          cy="50%"
          r="50"
          fill="transparent"
          stroke="white"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 3,
            delay: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </svg>
    </div>
  );
}

function RoyalVelvet() {
  return (
    <div className="w-full h-full bg-[#0a0a0a] relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#d4af3720_0%,transparent_70%)]" />
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-64 h-64 border border-[#d4af37] rotate-45 opacity-50"
      />
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute w-48 h-48 border border-[#d4af37] rotate-45 opacity-80"
      />
    </div>
  );
}

// === UPDATED ENGINES ===

function ChronoDial() {
  return (
    <div className="w-full h-full bg-slate-50 relative overflow-hidden flex items-center justify-center">
      {/* Concentric Time Circles */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 10 * i, repeat: Infinity, ease: "linear" }}
          className={cn(
            "absolute rounded-full border border-slate-900/10",
            i === 3 ? "border-dashed" : "border-solid",
          )}
          style={{ width: `${i * 120}px`, height: `${i * 120}px` }}
        />
      ))}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="w-1 h-32 bg-linear-to-b from-blue-600 to-transparent absolute top-[calc(50%-128px)] origin-bottom dark:from-blue-400"
      />
      <div className="w-4 h-4 bg-slate-900 rounded-full z-10" />
    </div>
  );
}

function PremiumSilk() {
  return (
    <div className="w-full h-full bg-[#1a1a1a] relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-linear-to-b from-[#1a1a1a] to-black" />

      {/* Golden Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-amber-400 rounded-full shadow-[0_0_10px_#fbbf24]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Elegant Crown Abstract */}
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="w-64 h-64 border border-amber-500/20 rounded-full blur-sm flex items-center justify-center"
      >
        <div className="w-48 h-48 border border-amber-500/40 rounded-full rotate-45" />
      </motion.div>
    </div>
  );
}

function NatureFlow() {
  return (
    <div className="w-full h-full bg-[#f0fdf4] relative overflow-hidden">
      {/* Floating Leaves approx */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-emerald-500/20 rounded-tr-[50%] rounded-bl-[50%]"
          style={{
            width: Math.random() * 40 + 20,
            height: Math.random() * 40 + 20,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, 50, 100],
            x: [0, 20, -20],
            rotate: [0, 90, 180],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
      {/* Breathe effect */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute inset-0 bg-radial-at-center from-emerald-400 to-transparent"
      />
    </div>
  );
}




function SunsetVibes() {
  return (
    <div className="w-full h-full bg-[#fffcf0] relative overflow-hidden flex items-center justify-center">
      {/* 1. La source de chaleur (fixe mais pulsante) */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 w-96 h-96 bg-orange-200 rounded-full blur-[100px]"
      />

      {/* 2. Ligne d'horizon minimaliste (S'étire comme BlueprintTech) */}
      <motion.div 
        initial={{ width: "0%" }}
        animate={{ width: "60%" }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute h-[1px] bg-linear-to-r from-transparent via-orange-400/40 to-transparent bottom-1/3"
      />

      {/* 3. Les Orbes de Réfraction (Mouvement diagonal visible) */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-orange-300/20 blur-xl"
          style={{
            width: 100 + i * 50,
            height: 100 + i * 50,
          }}
          animate={{
            x: i % 2 === 0 ? [-100, 100] : [100, -100],
            y: i % 2 === 0 ? [-50, 50] : [50, -50],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 4. Le "Scan" de chaleur (Inspiré de ton MonoScan mais horizontal et doux) */}
      <motion.div 
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent skew-x-12"
      />

      {/* 5. Particules de lumière (Comme MidnightStars mais version "Poussière d'or") */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-orange-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Grain de finition */}
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
function GlassPrism() {
  return (
    <div className="w-full h-full bg-slate-100 relative overflow-hidden flex items-center justify-center">
      {/* Background blobs */}
      <motion.div
        animate={{ x: [-50, 50, -50] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-10 left-10 w-64 h-64 bg-blue-400/40 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [50, -50, 50] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-10 right-10 w-64 h-64 bg-purple-400/40 rounded-full blur-3xl"
      />

      {/* Pane 1 */}
      <motion.div
        animate={{ rotateY: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="w-80 h-48 bg-white/10 backdrop-blur-xl border border-white/60 shadow-xl rounded-2xl z-10 flex items-center justify-center relative"
      >
        <div className="w-full h-1/2 bg-linear-to-b from-white/20 to-transparent absolute top-0" />
      </motion.div>

      {/* Pane 2 overlap */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="w-64 h-64 bg-white/20 backdrop-blur-md border border-white/40 shadow-lg rounded-full absolute z-0 ml-48 mb-24"
      />
    </div>
  );
}

function BrutalistConstruct() {
  return (
    <div className="w-full h-full bg-stone-300 relative overflow-hidden flex flex-col items-center justify-center">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #fff 25%, #fff 75%, #000 75%, #000)",
          backgroundPosition: "0 0, 10px 10px",
          backgroundSize: "20px 20px",
        }}
      />

      <motion.div
        className="bg-black text-white p-4 text-4xl font-black uppercase tracking-tighter mix-blend-hard-light z-10"
        animate={{ scaleX: [1, 1.2, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
      >
        SYSTEM_Core
      </motion.div>

      <motion.div
        className="w-64 h-2 bg-black mt-4"
        animate={{ width: ["0%", "100%", "0%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Glitch Block */}
      <motion.div
        className="absolute top-10 left-10 w-24 h-24 bg-red-600 mix-blend-multiply"
        animate={{ opacity: [0, 1, 0, 1] }}
        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
      />
    </div>
  );
}

function GeometricFlow({ style }: { style: string }) {
  const isDark = ["midnight", "royal", "blueprint", "mono"].includes(style);

  return (
    <div
      className={cn(
        "w-full h-full relative overflow-hidden flex items-center justify-center transition-colors duration-500",
        isDark ? "bg-slate-950" : "bg-slate-50",
      )}
    >
      {/* Abstract Shapes */}
      <div className="relative w-full max-w-lg aspect-square">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={cn(
            "absolute inset-0 rounded-full border border-dashed opacity-20",
            isDark ? "border-white" : "border-black",
          )}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className={cn(
            "absolute inset-8 rounded-full border opacity-10",
            isDark ? "border-white" : "border-black",
          )}
        />

        {/* Floating Core */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute inset-[30%] rounded-full bg-linear-to-tr from-primary/80 to-primary/0 blur-2xl opacity-50"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={cn(
              "w-32 h-32 rounded-4xl bg-background/50 backdrop-blur-xl border shadow-2xl flex items-center justify-center",
              isDark ? "border-white/10" : "border-black/5",
            )}
          >
            <div className="w-16 h-16 bg-primary rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
