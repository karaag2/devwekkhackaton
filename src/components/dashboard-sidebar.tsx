"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NAV_ITEMS, type UserRole } from "@/types";
import { useState } from "react";
import { useUserStore, useUIStore } from "@/store";
import { useTranslation } from "react-i18next";

export function DashboardSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const { sidebarOpen } = useUIStore();
  const { t } = useTranslation();

  const translateLabel = (label: string) => {
    const map: Record<string, string> = {
      Home: t("dashboard.nav.home"),
      Events: t("dashboard.nav.events"),
      Resources: t("dashboard.nav.resources"),
      Dashboard: t("dashboard.nav.dashboard"),
      "My Team": t("dashboard.nav.teams"),
      Workspace: t("dashboard.nav.workspace"),
      Submissions: t("dashboard.nav.submissions"),
      Leaderboard: t("dashboard.nav.leaderboard"),
      Help: t("dashboard.nav.help"),
      Admin: t("dashboard.nav.admin"),
      Users: t("dashboard.nav.users"),
      Announcements: t("dashboard.nav.announcements"),
      Tickets: t("dashboard.nav.tickets"),
      Showcase: t("dashboard.nav.showcase"),
      Teams: t("dashboard.nav.teams"),
      Projects: t("dashboard.nav.workspace"),
      Scores: t("dashboard.nav.leaderboard"),
      Sessions: t("dashboard.nav.schedule"),
    };
    return map[label] || label;
  };

  const role = (user?.role as UserRole) || "PARTICIPANT";
  const items = NAV_ITEMS[role] || NAV_ITEMS.PARTICIPANT;

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent hover:text-primary md:hidden ml-4 mt-4"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="pr-0 bg-sidebar border-r border-border"
        >
          <MobileLink
            href="/"
            className="flex items-center"
            onOpenChange={setOpen}
          >
            <div className="h-6 w-6 rounded-md bg-primary mr-2" />
            <span className="font-bold text-foreground">DevWeek</span>
          </MobileLink>
          <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
            <div className="flex flex-col space-y-3">
              {items.map(
                (item) =>
                  item.href && (
                    <MobileLink
                      key={item.href}
                      href={item.href}
                      onOpenChange={setOpen}
                      className={cn(
                        "text-sm font-bold uppercase tracking-widest",
                        pathname === item.href
                          ? "text-primary"
                          : "text-muted-foreground",
                      )}
                    >
                      {translateLabel(item.label)}
                    </MobileLink>
                  ),
              )}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      <div className="sticky left-0 top-0 h-screen">
        <div
          className={cn(
            "hidden border-r border-border bg-sidebar md:block transition-all duration-300 ease-in-out overflow-hidden relative h-full",
            sidebarOpen ? "w-64 lg:w-72 opacity-100" : "w-0 opacity-0",
          )}
        >
          <div
            className={cn(
              "flex h-full max-h-screen flex-col gap-2 transition-transform duration-300 ease-in-out shrink-0",
              sidebarOpen
                ? "w-64 lg:w-72 translate-x-0"
                : "w-64 lg:w-72 -translate-x-full",
            )}
          >
            <div className="flex h-16 items-center border-b border-border px-6 justify-between">
              <Link
                href="/"
                className="flex items-center gap-2 group whitespace-nowrap"
              >
                <div className="rounded-lg bg-primary p-1.5 group-hover:scale-110 transition-transform">
                  <div className="h-4 w-4 rounded-sm border-2 border-primary-foreground" />
                </div>
                <span className="text-xl font-black tracking-tight text-foreground uppercase">
                  DevWeek
                </span>
              </Link>
            </div>
            <div className="flex-1 py-6 overflow-y-auto">
              <nav className="grid items-start px-4 text-[11px] font-black uppercase tracking-[0.2em] leading-none lg:px-4 gap-2">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-4 transition-all duration-200 whitespace-nowrap",
                      pathname === item.href
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "text-muted-foreground hover:text-primary hover:bg-muted",
                    )}
                  >
                    {translateLabel(item.label)}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface MobileLinkProps extends React.PropsWithChildren {
  href: string;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
