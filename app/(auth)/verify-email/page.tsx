"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "@/components/features/auth/auth-card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  Sparkles,
  AlertCircle,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, emailVerified, checkVerification, sendVerification, signOut } = useAuth();

  const [checking, setChecking] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [notice, setNotice] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  const displayEmail = user?.email || searchParams.get("email") || "your email";

  // Countdown timer for resend button
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  // Reactive verification polling (checks every 4 seconds in background)
  useEffect(() => {
    let isMounted = true;
    let pollInterval: NodeJS.Timeout;

    const performCheck = async () => {
      if (emailVerified) {
        if (isMounted) {
          setIsVerified(true);
          setTimeout(() => router.push("/onboarding"), 1000);
        }
        return;
      }

      const verified = await checkVerification();
      if (verified && isMounted) {
        setIsVerified(true);
        setTimeout(() => router.push("/onboarding"), 1000);
      }
    };

    performCheck();
    pollInterval = setInterval(performCheck, 4000);

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
    };
  }, [checkVerification, emailVerified, router]);

  const handleManualCheck = async () => {
    setChecking(true);
    setNotice(null);
    try {
      const verified = await checkVerification();
      if (verified) {
        setIsVerified(true);
        setTimeout(() => router.push("/onboarding"), 800);
      } else {
        setNotice(
          "We haven't detected your verification yet. If you just clicked the link, please give it a few seconds and try again."
        );
      }
    } catch {
      setNotice("Could not check verification status at this moment. Please retry.");
    } finally {
      setChecking(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || resending) return;
    setResending(true);
    setNotice(null);
    setResendSuccess(false);

    try {
      await sendVerification();
      setResendSuccess(true);
      setCooldown(60);
    } catch (err: unknown) {
      console.error("[VerifyEmail] Resend error:", err);
      const msg = err instanceof Error ? err.message : "Failed to resend verification email.";
      setNotice(msg);
    } finally {
      setResending(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/signup");
  };

  if (isVerified) {
    return (
      <AuthCard
        title="Email Verified!"
        description="Your circle is now authenticated. Preparing your hearth fire..."
      >
        <div className="py-6 flex flex-col items-center justify-center space-y-3 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 animate-bounce">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <p className="text-xs text-stone-600 font-medium">
            Redirecting you to choose your favorite storytelling genres...
          </p>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Verify Your Hearth Fire"
      description="We sent a sacred activation link to your email to verify your place in the Inkoma storytelling circle."
    >
      {/* Target Email Banner */}
      <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-[#1a1813] border border-[#D4AF37]/30 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center shrink-0 text-[#D4AF37]">
          <Mail className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
            Verification link sent to
          </p>
          <p className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
            {displayEmail}
          </p>
        </div>
      </div>

      {notice && (
        <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
          <span>{notice}</span>
        </div>
      )}

      {resendSuccess && (
        <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-700 dark:text-emerald-300 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
          <span>A fresh verification link was dispatched to your email address.</span>
        </div>
      )}

      {/* Instructions */}
      <div className="text-xs text-stone-600 dark:text-stone-400 space-y-2 leading-relaxed">
        <p>
          1. Open your inbox and look for the verification email from <strong>Inkoma</strong>.
        </p>
        <p>
          2. Click the verification link to confirm your account.
        </p>
        <p className="text-[11px] text-stone-500 italic">
          This page will automatically detect when you verify and continue to genre selection.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 pt-2">
        <Button
          type="button"
          onClick={handleManualCheck}
          disabled={checking}
          className="w-full bg-[#D4AF37] hover:bg-[#B89628] text-stone-950 font-bold shadow-md py-5 cursor-pointer"
        >
          {checking ? (
            <RefreshCw className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Sparkles className="w-4 h-4 mr-2 text-stone-950" />
          )}
          I&apos;ve Verified My Email
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={handleResend}
          disabled={resending || cooldown > 0}
          className="w-full border-stone-200 hover:bg-stone-50 text-xs py-4 text-stone-700 font-semibold"
        >
          {resending ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin mr-2" />
          ) : (
            <Mail className="w-3.5 h-3.5 mr-2 text-stone-500" />
          )}
          {cooldown > 0
            ? `Resend link in ${cooldown}s`
            : "Resend Verification Email"}
        </Button>
      </div>

      {/* Switch Account / Sign Out */}
      <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
        <span>Wrong email address?</span>
        <button
          type="button"
          onClick={handleSignOut}
          className="inline-flex items-center gap-1 text-[#D4AF37] hover:underline font-semibold"
        >
          <LogOut className="w-3 h-3" />
          Sign out & re-register
        </button>
      </div>
    </AuthCard>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-md p-8 bg-white rounded-3xl border border-stone-200 text-center text-xs text-stone-500">
          Loading verification status...
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
