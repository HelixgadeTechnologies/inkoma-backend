"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthCard } from "@/components/features/auth/auth-card";
import { SocialAuth } from "@/components/features/auth/social-auth";
import { PasswordInput } from "@/components/features/auth/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
        </div>
      }
    >
      <SignupForm />
    </Suspense>
  );
}

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/explore";

  const { signUp } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [penName, setPenName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const displayName = penName.trim() || `${firstName} ${lastName}`.trim() || "Storyteller";
      await signUp(email, password, displayName, "author");
      router.push(
        `/verify-email?email=${encodeURIComponent(email)}&redirect=${encodeURIComponent(redirectTarget)}`
      );
    } catch (err: unknown) {
      console.error("[SignupPage] Registration error:", err);
      const message =
        err instanceof Error ? err.message : "Failed to create account. Please try again.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Join the Inkoma Circle"
      description="Begin your journey as a reader or traditional storyteller in our digital folklore archive."
    >
      {errorMessage && (
        <div className="mb-4 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
              First Name
            </label>
            <Input
              type="text"
              placeholder="Kwame"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="bg-white border-stone-300 text-stone-900 placeholder:text-stone-400"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
              Last Name
            </label>
            <Input
              type="text"
              placeholder="Mensah"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="bg-white border-stone-300 text-stone-900 placeholder:text-stone-400"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
              Author Pen Name <span className="text-stone-400 font-normal">(Optional)</span>
            </label>
            <span className="text-[10px] text-stone-600">Displayed on stories</span>
          </div>
          <Input
            type="text"
            placeholder="e.g. Nana Kwaku"
            value={penName}
            onChange={(e) => setPenName(e.target.value)}
            className="bg-white border-stone-300 text-stone-900 placeholder:text-stone-400"
          />
        </div>

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
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
            Password
          </label>
          <PasswordInput
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="pt-2 text-[11px] text-stone-700 leading-tight">
          By signing up, you agree to our Terms of Service and acknowledge that you are entering a community of oral tradition and literature.
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#D4AF37] hover:bg-[#B89628] text-stone-950 font-bold shadow-md py-5 cursor-pointer mt-2"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <>
              Create Storyteller Account
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
          <span className="bg-stone-50 px-2 text-stone-500 font-medium">Or sign up with</span>
        </div>
      </div>

      <SocialAuth />

      <p className="text-center text-xs text-stone-600 mt-6">
        Already have an account?{" "}
        <Link
          href={`/login${redirectTarget ? `?redirect=${encodeURIComponent(redirectTarget)}` : ""}`}
          className="text-[#D4AF37] hover:underline font-semibold underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}
