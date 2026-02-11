import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { SidebarToggle } from "@/components/sidebar-toggle";
import { UserNav } from "@/components/user-nav";
import { FullScreenSync } from "@/components/full-screen-sync";
import { cn } from "@/lib/utils";
import { DashboardLanguageSwitcher } from "@/components/dashboard-language-switcher";
import { DashboardMobileNav } from "@/components/dashboard-mobile-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background md:flex-row transition-colors duration-500">
      <FullScreenSync />
      <div className="hide-in-full-screen">
        <DashboardSidebar />
      </div>
      <div className="flex flex-col w-full">
        <header className="hide-in-full-screen sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background px-6 backdrop-blur-md">
          <DashboardMobileNav />
          <SidebarToggle />
          <div className="ml-auto flex items-center gap-4">
            <DashboardLanguageSwitcher />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 p-6 md:p-8 no-padding-in-full-screen overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
