"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthCard } from "@/components/features/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle2, RefreshCw } from "lucide-react";

export default function VerifyEmailPage() {
  const [isResent, setIsResent] = useState(false);

  const handleResend = () => {
    setIsResent(true);
    setTimeout(() => setIsResent(false), 4000);
  };

  return (
    <AuthCard
      title="Verify Your Email"
      description="We sent a confirmation link to your inbox. Verify your email to activate your Griot Circle account."
    >
      <div className="flex flex-col items-center text-center space-y-4 py-4">
        <div className="w-16 h-16 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700">
          <Mail className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-stone-900">
            Check your email inbox
          </p>
          <p className="text-xs text-stone-500 max-w-xs">
            Click the link in the email to confirm your account and personalize your folklore preferences.
          </p>
        </div>

        <div className="w-full space-y-3 pt-4">
          <Link href="/onboarding" className="w-full block">
            <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-5">
              Continue to Onboarding
            </Button>
          </Link>

          <Button
            variant="outline"
            onClick={handleResend}
            disabled={isResent}
            className="w-full border-stone-300 text-stone-700 hover:bg-stone-100"
          >
            {isResent ? (
              <span className="flex items-center gap-2 text-emerald-600">
                <CheckCircle2 className="w-4 h-4" /> Link Resent!
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" /> Resend Verification Email
              </span>
            )}
          </Button>
        </div>

        <p className="text-xs text-stone-500 pt-2">
          Wrong email address?{" "}
          <Link href="/signup" className="text-amber-700 font-semibold underline underline-offset-4">
            Sign up again
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}
