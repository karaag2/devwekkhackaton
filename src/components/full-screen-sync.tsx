"use client";

import { useUIStore } from "@/store";
import { useEffect } from "react";

export function FullScreenSync() {
  const { workspaceFullScreen } = useUIStore();

  useEffect(() => {
    if (workspaceFullScreen) {
      document.documentElement.classList.add("workspace-full-screen");
    } else {
      document.documentElement.classList.remove("workspace-full-screen");
    }
  }, [workspaceFullScreen]);

  return null;
}
