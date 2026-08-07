import Link from "next/link";
import { Check, Sparkles, Feather, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PricingPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16 sm:py-24 space-y-16">
      <div className="text-center space-y-4">
        <Badge variant="amber">Storyteller Guilds & Reader Access</Badge>
        <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-stone-900">
          Simple, Community-First Tiers
        </h1>
        <p className="text-base text-stone-700 max-w-xl mx-auto font-medium">
          Read endless tales for free or join the Storyteller Guild to create branching choices and earn royalties.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Free Reader */}
        <div className="rounded-3xl border border-stone-200 bg-white p-8 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-stone-900">Listener / Reader</h3>
            <p className="text-xs text-stone-500">For explorers of ancient folklore and myth.</p>
            <div className="text-3xl font-extrabold text-stone-900 font-serif">$0 <span className="text-xs text-stone-500 font-sans">/ forever</span></div>

            <ul className="space-y-2.5 text-xs text-stone-700 pt-4 border-t border-stone-100">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-folklore-amber font-bold" /> Unlimited reading of all public tales
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-folklore-amber font-bold" /> Interactive choice branch navigation
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-folklore-amber font-bold" /> Community discussions and upvotes
              </li>
            </ul>
          </div>

          <Link href="/signup" className="mt-8">
            <Button variant="outline" className="w-full bg-white border-stone-300 text-stone-800 hover:bg-stone-50">Get Started Free</Button>
          </Link>
        </div>

        {/* Storyteller Creator */}
        <div className="relative rounded-3xl border-2 border-[#680C07] bg-white p-8 flex flex-col justify-between shadow-lg">
          <div className="absolute -top-3.5 right-6">
            <Badge variant="gold" className="px-3 py-1 font-bold">Most Popular</Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#680C07] font-bold text-xs uppercase tracking-wider">
              <Feather className="h-4 w-4" /> Storyteller Creator
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">Author & Weaver</h3>
            <p className="text-xs text-stone-600">For storytellers crafting multi-branch folklore.</p>
            <div className="text-3xl font-extrabold text-[#680C07] font-serif">$9 <span className="text-xs text-stone-600 font-sans">/ month</span></div>

            <ul className="space-y-2.5 text-xs text-stone-700 pt-4 border-t border-stone-200">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-folklore-amber font-bold" /> Unlimited interactive story nodes
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-folklore-amber font-bold" /> Visual branch node creator & validator
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-folklore-amber font-bold" /> AI Lore inspiration & character trees
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-folklore-amber font-bold" /> 85% reader patron monetization split
              </li>
            </ul>
          </div>

          <Link href="/signup?plan=creator" className="mt-8">
            <Button variant="folklore" className="w-full">Join Storyteller Guild</Button>
          </Link>
        </div>

        {/* Elder Patron */}
        <div className="rounded-3xl border border-stone-200 bg-white p-8 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#680C07] font-bold text-xs uppercase tracking-wider">
              <Crown className="h-4 w-4" /> Elder Patron
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">Cultural Heritage Guild</h3>
            <p className="text-xs text-stone-500">For institutions, festivals, and folklore archives.</p>
            <div className="text-3xl font-extrabold text-stone-900 font-serif">$29 <span className="text-xs text-stone-500 font-sans">/ month</span></div>

            <ul className="space-y-2.5 text-xs text-stone-700 pt-4 border-t border-stone-100">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#680C07] font-bold" /> High-fidelity audio narration hosting
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#680C07] font-bold" /> Custom folklore badge issuance
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#680C07] font-bold" /> Priority Paystack tip placement
              </li>
            </ul>
          </div>

          <Link href="/signup?plan=elder" className="mt-8">
            <Button variant="outline" className="w-full bg-white border-stone-300 text-stone-800 hover:bg-stone-50">Become a Patron</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
