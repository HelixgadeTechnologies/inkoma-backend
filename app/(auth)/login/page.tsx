'use client';

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/features/auth/auth-card";
import { SocialAuth } from "@/components/features/auth/social-auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/explore");
    }, 1000);
  };

  return (
    <AuthCard
      title="Enter the Griot Circle"
      description="Sign in to continue exploring interactive folktales and manage your storytelling drafts."
      footerText="Do not have an account yet?"
      footerLinkText="Join the Storyteller Guild"
      footerLinkHref="/signup"
    >
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

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-stone-700">Password</label>
            <Link
              href="/forgot-password"
              className="text-[11px] text-amber-800 font-semibold hover:underline"
            >
              Forgot secret key?
            </Link>
          </div>
          <Input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <Button type="submit" variant="folklore" className="w-full h-11 text-sm" disabled={loading}>
          {loading ? "Opening Portal..." : "Enter Inkoma"}
        </Button>
      </form>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-stone-200" />
        </div>
        <div className="relative flex justify-center text-[10px] uppercase">
          <span className="bg-white px-2 text-stone-500 font-medium">Or continue with</span>
        </div>
      </div>

      <SocialAuth />
    </AuthCard>
  );
}
