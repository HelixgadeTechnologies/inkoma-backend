"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/features/auth/auth-card";
import { SocialAuth } from "@/components/features/auth/social-auth";
import { PasswordInput } from "@/components/features/auth/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login & session persistence
    setTimeout(() => {
      setIsLoading(false);
      router.push("/explore");
    }, 800);
  };

  return (
    <AuthCard
      title="Welcome Back"
      description="Return to the hearth fire and continue your journey through living folklore."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
            Email Address
          </label>
          <Input
            type="email"
            placeholder="griot@inkoma.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white border-stone-300 text-stone-900 placeholder:text-stone-400"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-amber-700 hover:text-amber-800 font-medium transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between py-1">
          <label className="flex items-center gap-2 text-xs text-stone-600 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
            />
            Stay logged in
          </label>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold shadow-md py-5"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <>
              Enter the Agora
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-stone-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-stone-50 px-2 text-stone-500 font-medium">Or continue with</span>
        </div>
      </div>

      <SocialAuth />

      <p className="text-center text-xs text-stone-600 mt-6">
        New to Inkoma?{" "}
        <Link
          href="/signup"
          className="text-amber-700 hover:text-amber-800 font-semibold underline underline-offset-4"
        >
          Create an account
        </Link>
      </p>
    </AuthCard>
  );
}
