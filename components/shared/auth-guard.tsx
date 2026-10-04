"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { BookOpen, Lock, Sparkles, UserPlus, LogIn, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthGuardProps {
  children: React.ReactNode;
  featureName?: string;
  redirectTo?: string;
}

export function AuthGuard({
  children,
  featureName = "this protected section",
  redirectTo = "/signup",
}: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, loading } = useAuth();
  const [redirectScheduled, setRedirectScheduled] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      setRedirectScheduled(true);
      const targetUrl = `${redirectTo}?redirect=${encodeURIComponent(pathname || "/explore")}`;
      // Allow a brief moment so the user sees the gate or immediately transition
      const timer = setTimeout(() => {
        router.replace(targetUrl);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [loading, isAuthenticated, pathname, redirectTo, router]);

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-[55vh] w-full flex-col items-center justify-center space-y-4 px-4 py-16">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4AF37]/15 text-[#B8860B] shadow-inner">
          <BookOpen className="h-7 w-7 stroke-[2.2] animate-pulse" />
          <Loader2 className="absolute -bottom-1 -right-1 h-5 w-5 animate-spin text-[#B8860B]" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-bold text-stone-900 font-serif">Checking Digital Parchment...</p>
          <p className="text-xs text-stone-500">Verifying storyteller credentials</p>
        </div>
      </div>
    );
  }

  // Unauthenticated / Unregistered state: Display branded registration gate
  if (!isAuthenticated) {
    const targetUrl = `${redirectTo}?redirect=${encodeURIComponent(pathname || "/explore")}`;
    const loginUrl = `/login?redirect=${encodeURIComponent(pathname || "/explore")}`;

    return (
      <div className="flex min-h-[65vh] w-full items-center justify-center px-4 py-12">
        <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-stone-200 bg-white/95 p-8 text-center shadow-xl backdrop-blur-md">
          {/* Top Decorative Emblem */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[#B8860B] ring-8 ring-[#D4AF37]/10">
            <Lock className="h-7 w-7 stroke-[2.2]" />
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#B8860B] mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Storyteller Membership Required</span>
          </div>

          <h2 className="text-2xl font-extrabold text-stone-900 font-serif tracking-tight">
            Join the Inkoma Circle
          </h2>

          <p className="mt-2.5 text-sm text-stone-600 leading-relaxed">
            Access to <span className="font-semibold text-stone-800">{featureName}</span> is reserved exclusively for registered storytellers and readers.
          </p>

          <div className="mt-8 space-y-3">
            <Link href={targetUrl} className="block w-full">
              <Button className="w-full bg-[#D4AF37] hover:bg-[#c49f27] text-stone-950 font-bold py-2.5 rounded-xl shadow-md gap-2">
                <UserPlus className="h-4 w-4" />
                Register Free Account
              </Button>
            </Link>

            <Link href={loginUrl} className="block w-full">
              <Button
                variant="outline"
                className="w-full border-stone-300 text-stone-700 hover:bg-stone-100 font-semibold py-2.5 rounded-xl gap-2"
              >
                <LogIn className="h-4 w-4" />
                Sign In to Existing Account
              </Button>
            </Link>
          </div>

          {redirectScheduled && (
            <p className="mt-4 text-[11px] text-stone-400">
              Redirecting you to registration...
            </p>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
