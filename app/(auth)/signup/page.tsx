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

export default function SignupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [penName, setPenName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate user registration and proceed to onboarding
    setTimeout(() => {
      setIsLoading(false);
      router.push("/onboarding");
    }, 800);
  };

  return (
    <AuthCard
      title="Join the Storyteller Circle"
      description="Begin your journey as a reader or traditional storyteller in our digital folklore archive."
    >
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
              placeholder="Asante"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="bg-white border-stone-300 text-stone-900 placeholder:text-stone-400"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
            Pen Name <span className="text-stone-400 font-normal">(Optional)</span>
          </label>
          <Input
            type="text"
            placeholder="Storyteller Kwame"
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
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>

        <p className="text-[11px] text-stone-500 leading-tight">
          By continuing, you agree to Inkoma&apos;s Terms of Lore Preservation and Privacy Policy.
        </p>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold shadow-md py-5"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <>
              Create Account
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
          href="/login"
          className="text-amber-700 hover:text-amber-800 font-semibold underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}
