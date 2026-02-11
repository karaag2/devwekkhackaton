"use client";

import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NAV_ITEMS, type UserRole } from "@/types";
import { useState } from "react";
import { useUserStore } from "@/store";
import { useTranslations } from "next-intl";

export function DashboardMobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const t = useTranslations();

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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 md:hidden"
        >
          <Menu className="h-5 w-5" />
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
