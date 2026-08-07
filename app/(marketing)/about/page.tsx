import { Sparkles, Globe, Heart, Shield, Feather, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-24 space-y-16">
      {/* Title */}
      <div className="text-center space-y-4">
        <Badge variant="gold">Oral Heritage & Digital Preservation</Badge>
        <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-stone-900">
          Revitalizing Africa&apos;s Oral Storytelling Traditions
        </h1>
        <p className="text-base sm:text-lg text-stone-700 max-w-2xl mx-auto leading-relaxed font-medium">
          For thousands of years, African storytellers, bards, and elders preserved history, ethics, and philosophy through spoken word, drum rhythms, and community dialogue. Inkoma bridges ancient oral storytelling with modern interactive software.
        </p>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 space-y-3 shadow-sm hover:shadow-md hover:border-[#680C07]/30 transition-all">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#680C07]/10 text-[#680C07]">
            <Feather className="h-5 w-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-stone-900">Storyteller Authorship</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Empowering authentic storytellers, community folklorists, and indigenous writers to publish and monetize their cultural narratives.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 space-y-3 shadow-sm hover:shadow-md hover:border-[#680C07]/30 transition-all">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#680C07]/10 text-[#680C07]">
            <Sparkles className="h-5 w-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-stone-900">Interactive Choice</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Folktales are living organisms shaped by the audience. Readers actively make ethical decisions, revealing consequences and moral lessons.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 space-y-3 shadow-sm hover:shadow-md hover:border-[#680C07]/30 transition-all">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
            <Globe className="h-5 w-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-stone-900">Oral & Audio First</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Preserving authentic cadence, vocal tone, and rhythmic accompaniment through our built-in oral narration player.
          </p>
        </div>
      </div>
    </div>
  );
}
