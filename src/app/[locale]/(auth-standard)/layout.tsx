import { Link } from "@/i18n/routing";
import {
  AuthIllustration,
} from "@/components/auth/auth-client-components";

export default function StandardAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-0 md:p-6 lg:p-8 xl:p-12 relative overflow-hidden">
      {/* High-End Dynamic Background */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.2] pointer-events-none" />
      <div className="absolute top-[-15%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full animate-pulse delay-700 pointer-events-none" />
      
      {/* Perspective Grid Background */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-background to-transparent pointer-events-none opacity-50 transition-opacity duration-1000" />

      {/* Glassmorphic Shell Container */}
      <div className="w-full max-w-[1300px] h-full md:h-[min(880px,92vh)] flex flex-col md:flex-row bg-background/40 backdrop-blur-3xl md:rounded-[3.5rem] overflow-hidden shadow-[0_48px_160px_-24px_rgba(0,0,0,0.4)] border border-white/10 relative z-10 transition-all duration-1000">
        
        {/* Left: Enhanced Interactive Illustration Area */}
        <div className="hidden md:flex md:w-[58%] relative overflow-hidden border-r border-white/5">
           <AuthIllustration />
           


           {/* Architectural Overlay */}
           <div className="absolute inset-0 pointer-events-none bg-linear-to-tr from-background/60 via-transparent to-primary/5" />
           <div className="absolute inset-0 pointer-events-none border-[32px] border-transparent border-t-white/5" />
        </div>

        {/* Right: Premium Form Portal */}
        <div className="flex-1 flex flex-col justify-between items-center bg-background px-8 py-10 md:px-12 lg:px-20 relative overflow-hidden gap-6">
          {/* Subtle Ambient Light */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
          
          {/* Right Header: Brand Portal - Now correctly placed in the form side */}
          <div className="w-full max-w-[420px] flex items-center justify-center md:justify-start z-30 mb-8 md:mb-0">
             <Link href="/" className="flex items-center gap-4 group">
               <div className="relative flex items-center justify-center">
                 <div className="h-5 w-5 rounded-full bg-primary shadow-[0_0_20px_var(--app-primary)] animate-pulse" />
                 <div className="absolute inset-0 h-5 w-5 rounded-full border border-primary animate-ping opacity-40" />
                 <div className="ml-2 h-5 w-5 rounded-full bg-primary/20 backdrop-blur-xl border border-border group-hover:scale-110 transition-transform" />
               </div>
               <span className="text-2xl font-black tracking-tighter text-foreground uppercase">
                 DevWeek<span className="text-primary tracking-[0.2em] ml-2">2026</span>
               </span>
             </Link>
          </div>

          <div className="w-full max-w-[420px] relative z-10 flex flex-col items-center flex-1 justify-center">
             {children}
          </div>


        </div>
      </div>
    </div>
  );
}
