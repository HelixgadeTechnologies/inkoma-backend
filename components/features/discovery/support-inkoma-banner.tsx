"use client";

import { useState } from "react";
import { Heart, Sparkles, X, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SupportInkomaBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#D4AF37] text-stone-950 p-6 sm:p-8 shadow-lg border border-[#B89628]/40">
      <button
        type="button"
        onClick={() => setIsVisible(false)}
        className="absolute top-4 right-4 text-stone-800 hover:text-stone-950 transition-colors p-1"
        aria-label="Dismiss banner"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-950/10 border border-stone-950/20 text-stone-950 text-xs font-semibold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-stone-950 text-stone-950" />
            Support Living African Lore
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-stone-950">
            Empower Independent African Storytellers
          </h3>
          <p className="text-stone-900 text-xs sm:text-sm leading-relaxed font-medium">
            Inkoma is 100% committed to digitizing oral traditions, indigenous dialects, and structured folklore book chapters. Your patron support directly funds creator stipends, elder audio recording sessions, and open folklore archives.
          </p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-stone-900/90 font-semibold pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-950" /> Secure Paystack Patron
            </span>
            <span>• Direct Creator Royalties</span>
            <span>• Zero Subscription Paywalls</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
          <a
            href="https://paystack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button className="w-full sm:w-auto bg-stone-950 hover:bg-stone-900 text-white font-bold px-6 py-5 shadow-md">
              <Sparkles className="w-4 h-4 mr-2 text-[#D4AF37]" />
              Support INKOMA
              <ArrowRight className="w-4 h-4 ml-2 text-white" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
