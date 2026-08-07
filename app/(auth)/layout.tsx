import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-[#FAF8F5] text-stone-900 overflow-hidden">
      {/* Return home link */}
      <Link
        href="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-folklore-amber transition-colors z-20"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Inkoma Hub</span>
      </Link>

      {/* Ambient Folklore Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full flex justify-center">{children}</div>
    </div>
  );
}
