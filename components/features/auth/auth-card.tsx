import * as React from "react";
import Link from "next/link";
import Image from "next/image";

export interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footerText?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
}

export function AuthCard({
  title,
  description,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthCardProps) {
  return (
    <div className="relative w-full max-w-md my-4">
      {/* Card Container */}
      <div className="relative border border-stone-200/80 bg-white/95 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white p-2 border border-stone-200 shadow-lg shadow-[#680C07]/10 overflow-hidden">
            <Image
              src="/images/inkoma-logo.png"
              alt="Inkoma Logo"
              width={72}
              height={72}
              className="object-contain h-full w-full"
              priority
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight pt-1">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xs mx-auto font-medium leading-relaxed">
            {description}
          </p>
        </div>

        {/* Content / Form */}
        <div className="space-y-4">{children}</div>

        {/* Footer */}
        {footerText && footerLinkHref && (
          <div className="justify-center text-xs text-stone-600 pt-4 border-t border-stone-100 font-medium flex items-center gap-1 text-center">
            <span>{footerText}</span>{" "}
            <Link
              href={footerLinkHref}
              className="font-bold text-[#680C07] hover:underline underline-offset-4"
            >
              {footerLinkText}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}


