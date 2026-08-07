import { Sparkles, Globe, Heart, Shield, Feather, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-24 space-y-16">
      {/* Title */}
      <div className="text-center space-y-4">
        <Badge variant="gold">Oral Heritage & Digital Preservation</Badge>
        <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-white">
          Revitalizing Africa&apos;s Oral Storytelling Traditions
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          For thousands of years, African griots, jalis, and elders preserved history, ethics, and philosophy through spoken word, drum rhythms, and community dialogue. Inkoma bridges ancient oral storytelling with modern interactive software.
        </p>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-folklore-amber/20 bg-folklore-obsidian/70 p-6 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-folklore-amber/15 text-folklore-gold">
            <Feather className="h-5 w-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-white">Griot Authorship</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Empowering authentic storytellers, community folklorists, and indigenous writers to publish and monetize their cultural narratives.
          </p>
        </div>

        <div className="rounded-2xl border border-folklore-amber/20 bg-folklore-obsidian/70 p-6 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-folklore-terracotta/20 text-folklore-terracotta">
            <Sparkles className="h-5 w-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-white">Interactive Choice</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Folktales are living organisms shaped by the audience. Readers actively make ethical decisions, revealing consequences and moral lessons.
          </p>
        </div>

        <div className="rounded-2xl border border-folklore-amber/20 bg-folklore-obsidian/70 p-6 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
            <Globe className="h-5 w-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-white">Oral & Audio First</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Preserving authentic cadence, vocal tone, and rhythmic accompaniment through our built-in oral narration player.
          </p>
        </div>
      </div>
    </div>
  );
}
