import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-background transition-colors duration-500">
      {/* Left section: Form */}
      <div className="flex w-full flex-col justify-center bg-background px-6 py-12 md:w-1/2 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          <Link href="/" className="mb-10 flex items-center gap-3 group">
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
          {children}
        </div>
      </div>

      {/* Right section: Illustration */}
      <div className="relative hidden w-1/2 flex-col items-center justify-center bg-muted md:flex overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-primary/5" />
        <div className="relative z-10 w-full max-w-xl p-12">
          <div className="relative aspect-square w-full">
            <Image
              src="/auth-illustration.png"
              alt="Auth Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="mt-12 space-y-4 text-center">
            <h2 className="text-3xl font-black tracking-tight text-foreground">
              Engineering Excellence
            </h2>
            <p className="mx-auto max-w-sm text-lg font-medium text-muted-foreground">
              Rejoignez la communauté d'élite des développeurs qui construisent
              le futur de l'innovation.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>
    </div>
  );
}
