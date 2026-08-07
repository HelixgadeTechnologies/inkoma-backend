'use client';

import * as React from "react";
import Link from "next/link";
import { AuthCard } from "@/components/features/auth/auth-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AuthCard
      title="Recover Your Lore Key"
      description="Enter your registered email address and we will dispatch a sacred recovery link."
      footerText="Remembered your password?"
      footerLinkText="Back to Login"
      footerLinkHref="/login"
    >
      {submitted ? (
        <div className="rounded-xl border border-[#680C07]/30 bg-[#680C07]/10 p-4 text-center space-y-2">
          <p className="text-sm font-bold text-[#680C07]">Recovery Link Dispatched!</p>
          <p className="text-xs text-stone-700 font-medium">
            Check your inbox for instructions to reset your account key.
          </p>
          <Link href="/login" className="block pt-2">
            <Button variant="outline" size="sm" className="w-full bg-white border-stone-300 text-stone-800 hover:bg-stone-50">
              Return to Login
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Email Address
            </label>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="storyteller@inkoma.app"
            />
          </div>

          <Button type="submit" variant="folklore" className="w-full h-11 text-sm">
            Send Recovery Scroll
          </Button>
        </form>
      )}
    </AuthCard>
  );
}
