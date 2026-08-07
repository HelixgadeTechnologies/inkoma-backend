import * as React from "react";
import { Users, Sparkles, Shield, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function CharacterTree({
  characters = [
    { name: "Kwaku Anansi", role: "Trickster Protagonist", archetype: "Akan Folk Hero", motif: "Wisdom & Folly" },
    { name: "Nyame", role: "Sky God & Sovereign", archetype: "Supreme Diety", motif: "Celestial Authority" },
    { name: "Osebo", role: "The Leopard of Sharp Claws", archetype: "Formidable Adversary", motif: "Raw Strength" },
    { name: "Aso", role: "Anansi's Clever Wife", archetype: "Sage Strategist", motif: "Pragmatism" },
  ],
}: {
  characters?: Array<{ name: string; role: string; archetype: string; motif: string }>;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-folklore-amber" />
        <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
          Mythological Character Dramatis Personae
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {characters.map((char, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-xl border border-white/10 bg-folklore-night/70 p-3.5 hover:border-folklore-amber/30 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-sm text-folklore-gold">{char.name}</span>
              <Badge variant="secondary" className="text-[10px]">
                {char.archetype}
              </Badge>
            </div>
            <p className="text-xs text-neutral-300 mt-1">{char.role}</p>
            <div className="mt-2 flex items-center gap-1 text-[10px] text-folklore-amber font-medium">
              <Sparkles className="h-3 w-3" />
              <span>Theme: {char.motif}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
