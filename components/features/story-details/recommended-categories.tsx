"use client";

import Link from "next/link";
import Image from "next/image";
import { Story } from "@/types";
import { MOCK_STORIES } from "@/config/mock-data";
import {
  Sparkles,
  Compass,
  Sun,
  Shield,
  Trees,
  Flame,
  Rocket,
  ArrowRight,
  BookOpen,
  Volume2,
  Clock,
  Heart,
  GitFork,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RecommendedCategoriesProps {
  currentStoryId: string;
  currentGenre?: string;
  currentTradition?: string;
}

const RECOMMENDED_CATEGORIES_DATA = [
  {
    id: "trickster-lore",
    title: "Trickster Lore & Moral Fables",
    description: "Anansi spider parables, Tortoise tricks, and clever animal folklore teaching communal ethics.",
    lineage: "Ashanti & Akan Traditions",
    count: "24 Manuscripts",
    genreParam: "Trickster Lore",
    bgGradient: "from-amber-900/90 via-[#680C07]/80 to-stone-900",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
    icon: Sparkles,
  },
  {
    id: "cosmology-astronomy",
    title: "Cosmology & Star Dancers",
    description: "Ancient Dogon star maps, celestial origin myths, and astronomical Sigui rituals.",
    lineage: "Dogon & Saharan Lineages",
    count: "18 Manuscripts",
    genreParam: "Cosmology & Astronomy",
    bgGradient: "from-indigo-950/90 via-purple-950/80 to-stone-900",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop",
    icon: Sun,
  },
  {
    id: "historical-epics",
    title: "Warrior & Kingdom Epics",
    description: "Heroic rises of Sundiata Keita, Shaka Zulu, and royal Manden dynasty accounts.",
    lineage: "Mali & Zulu Royal Epics",
    count: "32 Manuscripts",
    genreParam: "Historical Epics",
    bgGradient: "from-[#680C07]/90 via-amber-950/80 to-stone-900",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=800&auto=format&fit=crop",
    icon: Shield,
  },
  {
    id: "spiritual-lore",
    title: "Orisha Guardians & Deep Delta",
    description: "Sacred realm mysteries of Mami Wata, Olokun, Shango, and river spirit covenants.",
    lineage: "Yoruba & Coastal Lore",
    count: "19 Manuscripts",
    genreParam: "Spiritual Lore",
    bgGradient: "from-teal-950/90 via-emerald-950/80 to-stone-900",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=800&auto=format&fit=crop",
    icon: Flame,
  },
  {
    id: "afrofuturism",
    title: "Afrofuturist & Speculative Mythos",
    description: "Ancient African mythologies reimagined through futuristic tech and speculative lore.",
    lineage: "Speculative Pan-African",
    count: "15 Manuscripts",
    genreParam: "Afrofuturism",
    bgGradient: "from-violet-950/90 via-stone-900 to-black",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop",
    icon: Rocket,
  },
  {
    id: "oral-audio",
    title: "Audio Narration & Oral Chants",
    description: "Immersive audio-first folklore performances with authentic traditional drumming.",
    lineage: "Pan-African Oral Performance",
    count: "27 Audio Episodes",
    genreParam: "Audio Narration",
    bgGradient: "from-amber-950/90 via-stone-900 to-stone-950",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop",
    icon: Volume2,
  },
];

export function RecommendedCategoriesSection({
  currentStoryId,
  currentGenre,
  currentTradition,
}: RecommendedCategoriesProps) {
  // Filter related stories excluding the current story
  const relatedStories = MOCK_STORIES.filter((s) => s.id !== currentStoryId).slice(0, 3);

  return (
    <div className="space-y-10 pt-4">
      {/* SECTION 1: RECOMMENDED BOOK CATEGORIES GRID */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#680C07]" />
              <span className="text-xs font-bold text-[#680C07] uppercase tracking-wider">
                Explore The Archive
              </span>
            </div>
            <h2 className="text-2xl font-bold font-serif text-stone-900 tracking-tight">
              Recommended Book Categories & Mythos Lineages
            </h2>
            <p className="text-xs text-stone-500 max-w-xl">
              Discover oral traditions, trickster fables, and ancestral cosmologies curated across Pan-African heritage.
            </p>
          </div>

          <Link href="/browse">
            <Button
              variant="outline"
              size="sm"
              className="border-stone-300 text-stone-700 hover:text-[#680C07] text-xs rounded-xl font-semibold gap-1.5"
            >
              Browse All Categories <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {RECOMMENDED_CATEGORIES_DATA.map((cat) => {
            const IconComponent = cat.icon;
            const isCurrentMatched =
              currentGenre?.toLowerCase() === cat.genreParam.toLowerCase();

            return (
              <Link
                key={cat.id}
                href={`/browse?genre=${encodeURIComponent(cat.genreParam)}`}
                className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-md ${
                  isCurrentMatched
                    ? "border-[#680C07] ring-2 ring-[#680C07]/30"
                    : "border-stone-200 hover:border-stone-400"
                }`}
              >
                {/* Background Image & Gradient */}
                <div className="relative h-44 w-full bg-stone-900">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${cat.bgGradient} opacity-85 group-hover:opacity-75 transition-opacity`}
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <Badge className="bg-black/50 text-white backdrop-blur-md border border-white/20 text-[10px]">
                      {cat.lineage}
                    </Badge>
                    <span className="text-[10px] font-bold text-amber-200 bg-[#680C07]/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-amber-300/30">
                      {cat.count}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="absolute bottom-3 left-3 right-3 text-white space-y-1 z-10">
                    <div className="flex items-center gap-1.5 text-amber-300">
                      <IconComponent className="w-4 h-4 fill-current" />
                      <h3 className="text-base font-bold font-serif leading-tight group-hover:text-amber-200 transition-colors">
                        {cat.title}
                      </h3>
                    </div>
                    <p className="text-[11px] text-stone-200 line-clamp-2 leading-relaxed opacity-90">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="bg-white p-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-700 group-hover:text-[#680C07] transition-colors">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#680C07]" />
                    Explore Manuscripts
                  </span>
                  <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#680C07] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: MORE RECOMMENDED STORIES IN THIS CATEGORY */}
      {relatedStories.length > 0 && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <span className="text-xs font-bold text-[#680C07] uppercase tracking-wider block">
                Recommended Manuscripts
              </span>
              <h2 className="text-xl font-bold font-serif text-stone-900">
                You May Also Enjoy Reading
              </h2>
            </div>
            <Link href="/browse">
              <Button size="sm" variant="ghost" className="text-xs text-[#680C07] font-bold">
                View All Manuscripts →
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedStories.map((story) => (
              <Link
                key={story.id}
                href={`/story/${story.id}`}
                className="group flex flex-col bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all hover:border-[#680C07]/40"
              >
                <div className="relative aspect-[16/10] w-full bg-stone-100 overflow-hidden">
                  <Image
                    src={story.coverImage}
                    alt={story.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-80" />

                  <div className="absolute top-3 left-3">
                    <Badge className="bg-stone-900/80 text-white text-[10px] backdrop-blur-xs">
                      {story.tradition}
                    </Badge>
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-red-200" /> {story.estimatedReadTime} min read
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-red-400 fill-current" /> {story.likesCount}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#680C07] uppercase tracking-wider block">
                      {story.mainGenre}
                    </span>
                    <h3 className="text-sm font-bold text-stone-900 font-serif group-hover:text-[#680C07] transition-colors line-clamp-1">
                      {story.title}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {story.synopsis}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-medium">
                    <span>By {story.authorPenName || story.authorName}</span>
                    <span className="text-[#680C07] font-bold group-hover:translate-x-1 transition-transform">
                      Read Story →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
