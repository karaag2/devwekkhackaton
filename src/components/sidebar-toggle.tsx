"use client";

import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store";
import { ChevronLeft, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export function SidebarToggle() {
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className="hidden md:flex text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
      title={sidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
    >
      {sidebarOpen ? (
        <PanelLeftClose className="h-5 w-5" />
      ) : (
        <PanelLeftOpen className="h-5 w-5" />
      )}
    </Button>
  );
}
