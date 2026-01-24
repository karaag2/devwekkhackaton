import Link from "next/link";
import {
  AuthIllustration,
  ShellLanguageSwitcher,
} from "@/components/auth/auth-client-components";

export default function StandardAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row bg-background overflow-x-hidden">
      {/* Top Header for Mobile */}
      <div className="md:hidden p-6 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-primary" />
          <span className="text-xl font-black tracking-tighter uppercase">
            DevWeek
          </span>
        </Link>
      </div>

      {/* Main Form Section */}
      <div className="flex w-full flex-col justify-center bg-background px-6 py-12 md:w-1/2 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          <div className="hidden md:flex items-center justify-between mb-10">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="grid grid-cols-2 gap-1">
                <div className="h-4 w-4 rounded-sm bg-primary" />
                <div className="h-4 w-4 rounded-sm bg-primary/40" />
                <div className="h-4 w-4 rounded-sm bg-primary/20" />
                <div className="h-4 w-4 rounded-sm bg-primary/60" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-foreground uppercase">
                DevWeek <span className="text-primary">2026</span>
              </span>
            </Link>
          </div>

          <div className="relative z-10">{children}</div>
        </div>
      </div>

      {/* Right Illustration Section */}
      <div className="hidden md:flex md:w-1/2 overflow-hidden">
        <AuthIllustration />
      </div>
    </div>
  );
}
