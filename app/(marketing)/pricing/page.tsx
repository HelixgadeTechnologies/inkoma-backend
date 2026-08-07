import Link from "next/link";
import { Check, Sparkles, Feather, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PricingPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16 sm:py-24 space-y-16">
      <div className="text-center space-y-4">
        <Badge variant="amber">Storyteller Guilds & Reader Access</Badge>
        <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-white">
          Simple, Community-First Tiers
        </h1>
        <p className="text-base text-neutral-300 max-w-xl mx-auto">
          Read endless tales for free or join the Storyteller Guild to create branching choices and earn royalties.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Free Reader */}
        <div className="rounded-3xl border border-white/10 bg-folklore-obsidian/70 p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-white">Listener / Reader</h3>
            <p className="text-xs text-neutral-400">For explorers of ancient folklore and myth.</p>
            <div className="text-3xl font-extrabold text-white font-serif">$0 <span className="text-xs text-neutral-400 font-sans">/ forever</span></div>

            <ul className="space-y-2.5 text-xs text-neutral-300 pt-4 border-t border-white/10">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-folklore-gold" /> Unlimited reading of all public tales
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-folklore-gold" /> Interactive choice branch navigation
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-folklore-gold" /> Community discussions and upvotes
              </li>
            </ul>
          </div>

          <Link href="/signup" className="mt-8">
            <Button variant="outline" className="w-full">Get Started Free</Button>
          </Link>
        </div>

        {/* Storyteller Griot */}
        <div className="relative rounded-3xl border-2 border-folklore-amber bg-gradient-to-b from-folklore-obsidian to-folklore-night p-8 flex flex-col justify-between shadow-2xl shadow-folklore-amber/10">
          <div className="absolute -top-3.5 right-6">
            <Badge variant="gold" className="px-3 py-1 font-bold">Most Popular</Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-folklore-gold font-semibold text-xs uppercase tracking-wider">
              <Feather className="h-4 w-4" /> Griot Creator
            </div>
            <h3 className="font-serif text-xl font-bold text-white">Author & Weaver</h3>
            <p className="text-xs text-neutral-300">For storytellers crafting multi-branch folklore.</p>
            <div className="text-3xl font-extrabold text-folklore-gold font-serif">$9 <span className="text-xs text-neutral-400 font-sans">/ month</span></div>

            <ul className="space-y-2.5 text-xs text-neutral-200 pt-4 border-t border-folklore-amber/20">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-folklore-gold" /> Unlimited interactive story nodes
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-folklore-gold" /> Visual branch node creator & validator
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-folklore-gold" /> AI Lore inspiration & character trees
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-folklore-gold" /> 85% reader patron monetization split
              </li>
            </ul>
          </div>

          <Link href="/signup?plan=creator" className="mt-8">
            <Button variant="folklore" className="w-full">Join Griot Guild</Button>
          </Link>
        </div>

        {/* Elder Patron */}
        <div className="rounded-3xl border border-white/10 bg-folklore-obsidian/70 p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
              <Crown className="h-4 w-4" /> Elder Patron
            </div>
            <h3 className="font-serif text-xl font-bold text-white">Cultural Heritage Guild</h3>
            <p className="text-xs text-neutral-400">For institutions, festivals, and folklore archives.</p>
            <div className="text-3xl font-extrabold text-white font-serif">$29 <span className="text-xs text-neutral-400 font-sans">/ month</span></div>

            <ul className="space-y-2.5 text-xs text-neutral-300 pt-4 border-t border-white/10">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-folklore-gold" /> High-fidelity audio narration hosting
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-folklore-gold" /> Custom folklore badge issuance
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-folklore-gold" /> Direct collaboration rooms & forums
              </li>
            </ul>
          </div>

          <Link href="/signup?plan=elder" className="mt-8">
            <Button variant="outline" className="w-full">Become a Patron</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
