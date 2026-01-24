"use client";
import React from "react";
import { useState, useEffect } from "react";

const DynamicAuraGradiant = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className="fixed top-[-10%] right-[-5%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-0"
      style={{ transform: `translateY(${scrollY * 0.1}px)` }}
    />
  );
};
export default DynamicAuraGradiant;
