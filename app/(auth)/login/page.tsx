"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/features/auth/auth-card";
import { SocialAuth } from "@/components/features/auth/social-auth";
import { PasswordInput } from "@/components/features/auth/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const result = await signIn(email, password);
      if (result?.user && !result.user.emailVerified) {
        router.push(`/verify-email?email=${encodeURIComponent(email)}`);
        return;
      }
      router.push("/explore");
    } catch (err: unknown) {
      console.error("[LoginPage] Sign in error:", err);
      const message =
        err instanceof Error ? err.message : "Failed to sign in. Please verify your email and password.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Welcome Back"
      description="Return to the hearth fire and continue your journey through living folklore."
    >
      {errorMessage && (
        <div className="mb-4 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
            Email Address
          </label>
          <Input
            type="email"
            placeholder="author@inkoma.org"
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
              className="text-xs text-[#D4AF37] hover:underline font-medium transition-colors"
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
              className="rounded border-stone-300 text-[#D4AF37] focus:ring-[#D4AF37] w-4 h-4"
            />
            Stay logged in
          </label>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#D4AF37] hover:bg-[#B89628] text-stone-950 font-bold shadow-md py-5 cursor-pointer"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <>
              Sign In
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
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-[#D4AF37] hover:underline font-semibold underline-offset-4"
        >
          Sign up for free
        </Link>
      </p>
    </AuthCard>
  );
}
