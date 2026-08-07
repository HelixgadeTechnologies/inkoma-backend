"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sparkles, Compass, Check, ArrowRight, BookOpen, Volume2, TreePine, Flame } from "lucide-react";

const AVAILABLE_GENRES = [
  { id: "trickster", name: "Trickster Lore", description: "Anansi, Tortoise, and cunning animal tales", icon: "🕷️" },
  { id: "epics", name: "Historical Epics", description: "Sundiata, Shaka Zulu, and royal Sahel chronicles", icon: "👑" },
  { id: "spiritual", name: "Spiritual & Deities", description: "Orishas, Mami Wata, and sacred ancestor spirits", icon: "🌊" },
  { id: "cosmology", name: "Cosmology & Stars", description: "Dogon Sirius secrets, creation myths, astronomy", icon: "✨" },
  { id: "warrior", name: "Warrior Legends", description: "Queen Amina, Dahomey Amazons, epic battles", icon: "⚔️" },
  { id: "fables", name: "Animal Fables", description: "Moral lessons from the savanna and jungle fauna", icon: "🦁" },
  { id: "courtship", name: "Love & Courtship", description: "Ancient romantic ballads and wedding rites", icon: "🕊️" },
  { id: "philosophy", name: "Proverbs & Wisdom", description: "Philosophical debates and elder riddles", icon: "📜" },
];

const READING_INTERESTS = [
  { id: "audio", label: "Oral Griot Narration", icon: Volume2 },
  { id: "branching", label: "Interactive Choice Quests", icon: Compass },
  { id: "heritage", label: "Cultural Lore Preservation", icon: TreePine },
  { id: "writing", label: "Authoring My Own Tales", icon: Flame },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedGenres, setSelectedGenres] = useState<string[]>(["trickster", "epics"]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["audio", "branching"]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleGenre = (genreId: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId]
    );
  };

  const toggleInterest = (interestId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId) ? prev.filter((id) => id !== interestId) : [...prev, interestId]
    );
  };

  const handleFinish = (skipped = false) => {
    setIsSubmitting(true);
    try {
      if (!skipped) {
        localStorage.setItem(
          "inkoma_onboarding_prefs",
          JSON.stringify({
            genres: selectedGenres,
            interests: selectedInterests,
          })
        );
      }
    } catch {
      // fallback
    }
    setTimeout(() => {
      router.push("/explore");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center items-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-3xl border border-stone-200 shadow-xl p-8 sm:p-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Step 1 of 1 • Personalize Your Circle
          </div>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight font-serif">
            Welcome to Inkoma
          </h1>
          <p className="text-stone-600 text-sm max-w-md mx-auto">
            Choose your favorite traditions and storytelling formats so we can curate the right folklore for your hearth fire.
          </p>
        </div>

        {/* Favorite Genres Selection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-600" />
              Select Favorite Genres ({selectedGenres.length} selected)
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {AVAILABLE_GENRES.map((genre) => {
              const isSelected = selectedGenres.includes(genre.id);
              return (
                <button
                  key={genre.id}
                  type="button"
                  onClick={() => toggleGenre(genre.id)}
                  className={`flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? "border-amber-600 bg-amber-50/60 ring-2 ring-amber-500/20 shadow-sm"
                      : "border-stone-200 bg-stone-50 hover:bg-stone-100/70 hover:border-stone-300"
                  }`}
                >
                  <span className="text-2xl mt-0.5">{genre.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900">{genre.name}</span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-amber-600 text-white flex items-center justify-center">
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
            })}
          </div>
        </div>

        {/* Reading Interests */}
        <div className="space-y-3 pt-2 border-t border-stone-100">
          <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-600" />
            What excites you most?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {READING_INTERESTS.map((interest) => {
              const Icon = interest.icon;
              const isSelected = selectedInterests.includes(interest.id);
              return (
                <button
                  key={interest.id}
                  type="button"
                  onClick={() => toggleInterest(interest.id)}
                  className={`flex flex-col items-center justify-center text-center p-3 rounded-2xl border transition-all ${
                    isSelected
                      ? "border-amber-600 bg-amber-50 text-amber-950 font-semibold ring-1 ring-amber-500/30 shadow-xs"
                      : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? "text-amber-600" : "text-stone-400"}`} />
                  <span className="text-xs leading-tight">{interest.label}</span>
                </button>
              );
            })}
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
            className="w-full sm:w-auto px-8 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold shadow-md py-5"
          >
            Explore Living Tales
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
