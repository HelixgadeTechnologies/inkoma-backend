"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "@/components/features/auth/auth-card";
import { OtpInput } from "@/components/features/auth/otp-input";
import { PasswordInput } from "@/components/features/auth/password-input";
import { Button } from "@/components/ui/button";
import {
  Mail,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  Sparkles,
  AlertCircle,
  KeyRound,
  Check,
  Edit2,
  Loader2,
} from "lucide-react";
import {
  sendPasswordResetOtp,
  resetPasswordWithOtp,
} from "@/src/services/authService";

function ForgotPasswordOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Retrieve email from URL params or sessionStorage
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(60);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const queryEmail = searchParams.get("email");
    if (queryEmail) {
      setEmail(queryEmail);
    } else if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("inkoma_reset_email");
      if (stored) setEmail(stored);
    }
  }, [searchParams]);

  // Resend cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  // Auto-redirect to login after successful reset
  useEffect(() => {
    if (!isSuccess) return;
    const timer = setTimeout(() => {
      router.push("/login");
    }, 3000);
    return () => clearTimeout(timer);
  }, [isSuccess, router]);

  const handleResendOtp = async () => {
    if (cooldown > 0 || isResending || !email) return;

    setIsResending(true);
    setErrorMessage(null);
    setResendSuccess(false);

    try {
      await sendPasswordResetOtp(email);
      setResendSuccess(true);
      setCooldown(60);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to resend verification code.";
      setErrorMessage(msg);
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setResendSuccess(false);

    if (!email) {
      setErrorMessage("Email address is missing. Please return and enter your email.");
      return;
    }

    if (otp.length !== 6) {
      setErrorMessage("Please enter the complete 6-digit verification code.");
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage("New password must be at least 8 characters long.");
      return;
    }

    if (
      !/[A-Z]/.test(newPassword) ||
      !/[a-z]/.test(newPassword) ||
      !/[0-9]/.test(newPassword)
    ) {
      setErrorMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please re-enter.");
      return;
    }

    setIsLoading(true);

    try {
      await resetPasswordWithOtp(email, otp, newPassword);
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("inkoma_reset_email");
      }
      setIsSuccess(true);
    } catch (err: unknown) {
      console.error("[ForgotPasswordOtp] Reset error:", err);
      const msg =
        err instanceof Error ? err.message : "Failed to reset password. Please check your OTP and try again.";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Password rules validation helpers
  const hasMinLength = newPassword.length >= 8;
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasLower = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const passwordsMatch = newPassword && newPassword === confirmPassword;

  if (isSuccess) {
    return (
      <AuthCard
        title="Lore Key Restored!"
        description="Your password has been successfully reset. The sacred circle welcomes your return."
      >
        <div className="py-6 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-600 animate-bounce">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div className="space-y-1">
            <p className="text-base font-bold text-stone-900">
              Password Reset Complete
            </p>
            <p className="text-xs text-stone-600 font-medium max-w-xs mx-auto">
              You can now sign into your Inkoma chronicle with your new password. Redirecting to login in moments...
            </p>
          </div>
          <Link href="/login" className="w-full pt-2">
            <Button className="w-full bg-[#D4AF37] hover:bg-[#B89628] text-stone-950 font-bold shadow-md py-5 cursor-pointer">
              Continue to Login
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Enter Verification Code"
      description="Enter the 6-digit sacred code dispatched to your email along with your new password."
      footerText="Remembered your password?"
      footerLinkText="Back to Login"
      footerLinkHref="/login"
    >
      {/* Target Email Banner */}
      <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-[#D4AF37]/30 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center shrink-0 text-[#D4AF37]">
            <Mail className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
              Verification sent to
            </p>
            <p className="text-xs font-bold text-stone-900 truncate">
              {email || "No email specified"}
            </p>
          </div>
        </div>
        <Link
          href="/forgot-password"
          className="text-[11px] font-semibold text-[#D4AF37] hover:underline flex items-center gap-1 shrink-0"
        >
          <Edit2 className="w-3 h-3" />
          Change
        </Link>
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
          <span>A fresh 6-digit verification code was dispatched to your email.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* 6-Digit OTP Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-[#D4AF37]" />
              6-Digit Recovery Code (OTP)
            </label>
            <button
              type="button"
              disabled={isResending || cooldown > 0 || !email}
              onClick={handleResendOtp}
              className="text-[11px] font-semibold text-[#D4AF37] hover:underline disabled:text-stone-400 disabled:no-underline flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed"
            >
              {isResending ? (
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
            disabled={isLoading}
            autoFocus
          />
        </div>

        {/* New Password Fields */}
        <div className="space-y-3 pt-1">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
              New Password
            </label>
            <PasswordInput
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
              Confirm New Password
            </label>
            <PasswordInput
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {/* Password Requirements Checklist */}
          {newPassword.length > 0 && (
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-1.5 text-[11px]">
              <div className="flex items-center gap-1.5">
                <Check
                  className={`w-3.5 h-3.5 ${hasMinLength ? "text-emerald-600" : "text-stone-400"}`}
                />
                <span className={hasMinLength ? "text-emerald-700 font-medium" : "text-stone-500"}>
                  At least 8 characters
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check
                  className={`w-3.5 h-3.5 ${hasUpper && hasLower ? "text-emerald-600" : "text-stone-400"}`}
                />
                <span
                  className={
                    hasUpper && hasLower ? "text-emerald-700 font-medium" : "text-stone-500"
                  }
                >
                  Uppercase and lowercase letters
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check
                  className={`w-3.5 h-3.5 ${hasNumber ? "text-emerald-600" : "text-stone-400"}`}
                />
                <span className={hasNumber ? "text-emerald-700 font-medium" : "text-stone-500"}>
                  At least one number (0-9)
                </span>
              </div>
              {confirmPassword.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <Check
                    className={`w-3.5 h-3.5 ${passwordsMatch ? "text-emerald-600" : "text-stone-400"}`}
                  />
                  <span
                    className={
                      passwordsMatch ? "text-emerald-700 font-medium" : "text-stone-500"
                    }
                  >
                    Passwords match
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading || otp.length !== 6 || !newPassword || !confirmPassword}
          className="w-full bg-[#D4AF37] hover:bg-[#B89628] text-stone-950 font-bold shadow-md h-12 text-sm cursor-pointer transition-all duration-150"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Resetting Password...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2 text-stone-950" />
              Reset Lore Key
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </form>
    </AuthCard>
  );
}

export default function ForgotPasswordOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-md p-8 bg-white rounded-3xl border border-stone-200 text-center text-xs text-stone-500">
          <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#D4AF37]" />
          Loading verification...
        </div>
      }
    >
      <ForgotPasswordOtpContent />
    </Suspense>
  );
}
