'use client';

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/features/auth/auth-card";
import { SocialAuth } from "@/components/features/auth/social-auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BookOpen, Feather } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = React.useState<'reader' | 'storyteller'>('storyteller');
  const [name, setName] = React.useState("");
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
      title="Join the Griot Circle"
      description="Create an account to read branching African folklore, choose story endings, or write your own lore."
      footerText="Already part of the guild?"
      footerLinkText="Sign in to your account"
      footerLinkHref="/login"
    >
      {/* Role Selector */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-folklore-night rounded-xl border border-white/10 mb-4">
        <button
          type="button"
          onClick={() => setRole('reader')}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
            role === 'reader'
              ? 'bg-folklore-amber text-folklore-night font-bold shadow'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <BookOpen className="h-3.5 w-3.5" />
          <span>Explorer / Reader</span>
        </button>

        <button
          type="button"
          onClick={() => setRole('storyteller')}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
            role === 'storyteller'
              ? 'bg-folklore-amber text-folklore-night font-bold shadow'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Feather className="h-3.5 w-3.5" />
          <span>Griot / Author</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="text-xs font-semibold text-neutral-300 block mb-1">
            Storyteller Alias / Full Name
          </label>
          <Input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Kwaku Anansi or Amina Diallo"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-neutral-300 block mb-1">
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
          <label className="text-xs font-semibold text-neutral-300 block mb-1">
            Secret Key (Password)
          </label>
          <Input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 8 characters"
          />
        </div>

        <Button type="submit" variant="folklore" className="w-full h-11 text-sm mt-2" disabled={loading}>
          {loading ? "Forging Griot Scroll..." : "Initiate Guild Membership"}
        </Button>
      </form>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-[10px] uppercase">
          <span className="bg-folklore-obsidian px-2 text-neutral-400">Or register with</span>
        </div>
      </div>

      <SocialAuth />
    </AuthCard>
  );
}
