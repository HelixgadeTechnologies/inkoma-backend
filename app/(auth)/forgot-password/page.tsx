"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "@/components/features/auth/auth-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, Loader2, AlertCircle, Sparkles } from "lucide-react";
import { sendPasswordResetOtp } from "@/src/services/authService";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      await sendPasswordResetOtp(cleanEmail);
      // Store in sessionStorage as well for easy retrieval
      if (typeof window !== "undefined") {
        sessionStorage.setItem("inkoma_reset_email", cleanEmail);
      }
      // Redirect to the OTP verification page
      router.push(`/forgot-password/otp?email=${encodeURIComponent(cleanEmail)}`);
    } catch (err: unknown) {
      console.error("[ForgotPassword] Error sending OTP:", err);
      const msg =
        err instanceof Error ? err.message : "Failed to dispatch verification code. Please try again.";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Recover Your Lore Key"
      description="Enter your registered email address and we will dispatch a 6-digit sacred verification code."
      footerText="Remembered your password?"
      footerLinkText="Back to Login"
      footerLinkHref="/login"
    >
      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
            Email Address
          </label>
          <div className="relative">
            <Input
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="storyteller@inkoma.app"
              className="bg-white border-stone-300 text-stone-900 placeholder:text-stone-400 pl-10 h-11"
            />
            <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <p className="text-[11px] text-stone-500 font-medium">
            We will send a one-time 6-digit code (OTP) valid for 10 minutes.
          </p>
        </div>

        <Button
          type="submit"
          disabled={isLoading || !email.trim()}
          className="w-full bg-[#D4AF37] hover:bg-[#B89628] text-stone-950 font-bold shadow-md h-12 text-sm cursor-pointer transition-all duration-150"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Dispatching Code...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2 text-stone-950" />
              Send Verification Code
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </form>
    </AuthCard>
  );
}
