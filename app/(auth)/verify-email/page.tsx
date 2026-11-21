"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "@/components/features/auth/auth-card";
import { OtpInput } from "@/components/features/auth/otp-input";
import { Button } from "@/components/ui/button";
import {
  Mail,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  Sparkles,
  AlertCircle,
  LogOut,
  KeyRound,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { verifyEmailWithOtp, resendVerificationOtp } from "@/src/services/authService";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, emailVerified, signOut } = useAuth();

  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(60);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  const displayEmail =
    searchParams.get("email") ||
    user?.email ||
    (typeof window !== "undefined" ? sessionStorage.getItem("inkoma_registered_email") : "") ||
    "";

  const redirectTarget = searchParams.get("redirect");
  const onboardingUrl = redirectTarget
    ? `/onboarding?redirect=${encodeURIComponent(redirectTarget)}`
    : "/onboarding";

  // Countdown timer for resend button
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  // Already verified redirect
  useEffect(() => {
    if (emailVerified) {
      setIsVerified(true);
      const timer = setTimeout(() => router.push(onboardingUrl), 1500);
      return () => clearTimeout(timer);
    }
  }, [emailVerified, router, onboardingUrl]);

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayEmail) {
      setErrorMessage("No email specified. Please return to sign up.");
      return;
    }
    if (otp.length !== 6) {
      setErrorMessage("Please enter the complete 6-digit confirmation code.");
      return;
    }

    setIsVerifying(true);
    setErrorMessage(null);

    try {
      await verifyEmailWithOtp(displayEmail, otp);
      setIsVerified(true);
      setTimeout(() => {
        router.push(onboardingUrl);
      }, 1500);
    } catch (err: unknown) {
      console.error("[VerifyEmail] Verification error:", err);
      const msg =
        err instanceof Error ? err.message : "Invalid or expired confirmation code.";
      setErrorMessage(msg);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || resending || !displayEmail) return;
    setResending(true);
    setErrorMessage(null);
    setResendSuccess(false);

    try {
      await resendVerificationOtp(displayEmail);
      setResendSuccess(true);
      setCooldown(60);
    } catch (err: unknown) {
      console.error("[VerifyEmail] Resend error:", err);
      const msg =
        err instanceof Error ? err.message : "Failed to resend confirmation code.";
      setErrorMessage(msg);
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
          <div className="space-y-1">
            <p className="text-sm font-bold text-stone-900">Welcome to Inkoma</p>
            <p className="text-xs text-stone-600 font-medium">
              Redirecting you to choose your favorite storytelling genres...
            </p>
          </div>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Verify Your Hearth Fire"
      description="Enter the 6-digit confirmation code sent to your email to activate your account."
    >
      {/* Target Email Banner */}
      <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-[#1a1813] border border-[#D4AF37]/30 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center shrink-0 text-[#D4AF37]">
          <Mail className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
            Confirmation code sent to
          </p>
          <p className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
            {displayEmail || "No email provided"}
          </p>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {resendSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
          <span>A fresh 6-digit code has been dispatched to your email address.</span>
        </div>
      )}

      <form onSubmit={handleVerifyOtp} className="space-y-4">
        {/* OTP Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-[#D4AF37]" />
              6-Digit Confirmation Code
            </label>
            <button
              type="button"
              disabled={resending || cooldown > 0 || !displayEmail}
              onClick={handleResend}
              className="text-[11px] font-semibold text-[#D4AF37] hover:underline disabled:text-stone-400 disabled:no-underline flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed"
            >
              {resending ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  Sending...
                </>
              ) : cooldown > 0 ? (
                `Resend in ${cooldown}s`
              ) : (
                "Resend Code"
              )}
            </button>
          </div>

          <OtpInput
            length={6}
            value={otp}
            onChange={(val) => {
              setOtp(val);
              if (errorMessage) setErrorMessage(null);
            }}
            disabled={isVerifying}
            autoFocus
          />
        </div>

        <Button
          type="submit"
          disabled={isVerifying || otp.length !== 6}
          className="w-full bg-[#D4AF37] hover:bg-[#B89628] text-stone-950 font-bold shadow-md py-5 cursor-pointer mt-2"
        >
          {isVerifying ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Verifying Code...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2 text-stone-950" />
              Activate Account
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </form>

      {/* Switch Account / Sign Out */}
      <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
        <span>Wrong email address?</span>
        <button
          type="button"
          onClick={handleSignOut}
          className="inline-flex items-center gap-1 text-[#D4AF37] hover:underline font-semibold cursor-pointer"
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
          <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#D4AF37]" />
          Loading verification status...
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
