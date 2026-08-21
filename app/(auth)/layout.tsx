import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-stone-900 overflow-hidden bg-stone-950">
      {/* Full Page Background Image */}
      <Image
        src="/images/loginimage.jpeg"
        alt="Inkoma Folklore Background"
        fill
        priority
        quality={95}
        sizes="100vw"
        className="object-cover object-center opacity-95 transition-opacity duration-700 pointer-events-none"
      />

      {/* Lightweight Atmospheric Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/40 pointer-events-none z-0" />

      {/* Return home link */}
      <Link
        href="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-semibold text-stone-200 hover:text-white bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-md transition-all z-20 hover:bg-black/60"
      >
        <ArrowLeft className="h-4 w-4 text-amber-300" />
        <span>Return to Inkoma Hub</span>
      </Link>

      {/* Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#680C07]/25 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full flex justify-center py-6">
        {children}
      </div>
    </div>
  );
}

