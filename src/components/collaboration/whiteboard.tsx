"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import "@excalidraw/excalidraw/index.css";
// Dynamically import Excalidraw with SSR disabled
const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-muted/10">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    ),
  },
);

export function Whiteboard() {
  return (
    <div className="h-[600px] w-full border rounded-md overflow-hidden">
      <Excalidraw
        initialData={{
          appState: {
            viewBackgroundColor: "#ffffff",
          },
        }}
      />
    </div>
  );
}
