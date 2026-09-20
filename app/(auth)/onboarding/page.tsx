"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  Check,
  ArrowRight,
  BookOpen,
  Search,
  X,
} from "lucide-react";
import { MAIN_GENRES } from "@/config/genres";
import { useAuth } from "@/hooks/useAuth";
import { updateUserProfileDoc } from "@/src/services/authService";

// Metadata mapping for icons & descriptions for genres from Add Story
const GENRE_METADATA: Record<string, { icon: string; description: string }> = {
  "Romance": { icon: "🌹", description: "Passionate bonds, heartfelt devotion, and emotional connections" },
  "Fantasy": { icon: "🔮", description: "Mythic realms, enchanted powers, and legendary quests" },
  "Science Fiction": { icon: "🚀", description: "Futuristic societies, cosmic travel, and speculative tech" },
  "Afrofuturism": { icon: "🌌", description: "African heritage, cosmology, and visionary technological futures" },
  "African Mythology & Folklore": { icon: "🏺", description: "Ancestral spirits, deities, tricksters, and sacred lore" },
  "Thriller": { icon: "⚡", description: "High-stakes suspense, gripping tension, and edge-of-seat twists" },
  "Mystery": { icon: "🔍", description: "Enigmatic puzzles, crime solving, and hidden secrets" },
  "Horror": { icon: "🕯️", description: "Eerie supernatural terrors, psychological chills, and dread" },
  "Drama": { icon: "🎭", description: "Deeply moving character conflicts, relationships, and human struggles" },
  "Action": { icon: "💥", description: "Adrenaline-fueled conflicts, martial skill, and heroic feats" },
  "Adventure": { icon: "🗺️", description: "Epic journeys into uncharted lands, peril, and discovery" },
  "Crime": { icon: "🕵️", description: "Underworlds, detective procedurals, corruption, and justice" },
  "Historical Fiction": { icon: "📜", description: "Rich period stories faithful to historical ages and empires" },
  "Literary Fiction": { icon: "📖", description: "Artful prose, psychological nuance, and philosophical themes" },
  "Young Adult": { icon: "🎒", description: "Coming-of-age journeys, identity discovery, and youth adventures" },
  "New Adult": { icon: "🎓", description: "Early adulthood crossroads, university life, and independence" },
  "Children’s Fiction": { icon: "🎈", description: "Imaginative wonder, moral fables, and inspiring tales for young minds" },
  "Dystopian": { icon: "🏙️", description: "Defying oppressive regimes and surviving fractured worlds" },
  "Contemporary Fiction": { icon: "☕", description: "Vibrant snapshots of modern lives, society, and cultures" },
  "Epic": { icon: "👑", description: "Grand generational sagas, dynasties, and world-shaping destinies" },
  "Short Stories": { icon: "📝", description: "Concise, punchy narratives delivering powerful emotional resonance" },
  "Poetry": { icon: "🪶", description: "Lyrical verses, rhythmic cadence, and expressive beauty" },
  "Fan Fiction": { icon: "✍️", description: "Creative twists and reimaginings of cherished worlds" },
  "Paranormal": { icon: "👁️", description: "Unseen entities, shape-shifters, vampires, and ethereal mysteries" },
  "Western": { icon: "🤠", description: "Frontier survival, outlaws, dusty trails, and rugged honor" },
};

// Generates the genre items directly from the Add Story source of truth
const AVAILABLE_GENRES = MAIN_GENRES.map((name) => ({
  id: name,
  name,
  icon: GENRE_METADATA[name]?.icon || "📚",
  description: GENRE_METADATA[name]?.description || `Engaging ${name} stories and tales`,
}));

export default function OnboardingPage() {
  const router = useRouter();
  const { user, emailVerified, loading } = useAuth();
  const [selectedGenres, setSelectedGenres] = useState<string[]>([
    "African Mythology & Folklore",
    "Afrofuturism",
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email verification gate
  useEffect(() => {
    if (!loading && user && !emailVerified) {
      router.push(`/verify-email?email=${encodeURIComponent(user.email || "")}`);
    }
  }, [loading, user, emailVerified, router]);

  const filteredGenres = useMemo(() => {
    if (!searchQuery.trim()) return AVAILABLE_GENRES;
    const query = searchQuery.toLowerCase().trim();
    return AVAILABLE_GENRES.filter(
      (g) =>
        g.name.toLowerCase().includes(query) ||
        g.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const toggleGenre = (genreName: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genreName)
        ? prev.filter((name) => name !== genreName)
        : [...prev, genreName]
    );
  };

  const handleSelectAll = () => {
    if (selectedGenres.length === AVAILABLE_GENRES.length) {
      setSelectedGenres([]);
    } else {
      setSelectedGenres(AVAILABLE_GENRES.map((g) => g.name));
    }
  };

  const handleFinish = async (skipped = false) => {
    setIsSubmitting(true);
    const chosen = skipped ? [] : selectedGenres;

    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "inkoma_onboarding_prefs",
          JSON.stringify({ genres: chosen })
        );
        localStorage.setItem(
          "inkoma_favorite_genres",
          JSON.stringify(chosen)
        );
      }

      // If user is signed in to Firebase, sync preferences to Firestore profile
      if (user?.id && chosen.length > 0) {
        await updateUserProfileDoc(user.id, {
          favoriteGenres: chosen,
        });
      }
    } catch (err) {
      console.warn("[Onboarding] Error persisting preferences:", err);
    }

    setTimeout(() => {
      router.push("/explore");
    }, 400);
  };

  return (
    <div className="w-full flex justify-center items-center py-2 sm:py-4">
      <div className="max-w-3xl w-full bg-white rounded-3xl border border-stone-200 shadow-2xl p-6 sm:p-10 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            Step 1 of 1 • Personalize Your Circle
          </div>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight font-serif">
            Welcome to Inkoma
          </h1>
          <p className="text-stone-600 text-sm max-w-md mx-auto">
            Choose your favorite genres from our storytelling repertoire so we can curate the right folklore and tales for your hearth fire.
          </p>
        </div>

        {/* Favorite Genres Selection */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#D4AF37]" />
              Select Favorite Genres ({selectedGenres.length} selected)
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-xs font-medium text-[#D4AF37] hover:underline"
              >
                {selectedGenres.length === AVAILABLE_GENRES.length ? "Deselect All" : "Select All"}
              </button>
            </div>
          </div>

          {/* Search Filter */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search genres (e.g. Fantasy, Romance, Sci-Fi, Afrofuturism)..."
              className="pl-9 pr-8 py-2 bg-stone-50 border-stone-200 text-xs rounded-xl focus-visible:ring-[#D4AF37]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Genres Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[440px] overflow-y-auto pr-1">
            {filteredGenres.length === 0 ? (
              <div className="col-span-full py-8 text-center text-xs text-stone-400">
                No genres matching &ldquo;{searchQuery}&rdquo;.
              </div>
            ) : (
              filteredGenres.map((genre) => {
                const isSelected = selectedGenres.includes(genre.name);
                return (
                  <button
                    key={genre.id}
                    type="button"
                    onClick={() => toggleGenre(genre.name)}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? "border-[#D4AF37] bg-[#D4AF37]/10 ring-2 ring-[#D4AF37]/20 shadow-sm"
                        : "border-stone-200 bg-stone-50 hover:bg-stone-100/70 hover:border-stone-300"
                    }`}
                  >
                    <span className="text-2xl mt-0.5 select-none">{genre.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-900 truncate">
                          {genre.name}
                        </span>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-[#D4AF37] text-stone-950 flex items-center justify-center font-bold shrink-0 ml-1">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                        {genre.description}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-stone-200">
          <button
            type="button"
            onClick={() => handleFinish(true)}
            className="text-xs font-semibold text-stone-500 hover:text-stone-800 transition-colors py-2 px-3"
          >
            Skip for now
          </button>
          <Button
            onClick={() => handleFinish(false)}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 bg-[#D4AF37] hover:bg-[#B89628] text-stone-950 font-bold shadow-md py-5"
          >
            Explore Living Tales
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
