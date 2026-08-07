'use client';

import * as React from "react";
import Link from "next/link";
import { Sparkles, Filter, GitBranch, Mic, Heart, BookOpen, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { TRADITIONS, GENRES } from "@/config/genres";
import { Story } from "@/types";

const MOCK_STORIES: Story[] = [
  {
    id: "anansi-and-the-pot-of-wisdom",
    slug: "anansi-and-the-pot-of-wisdom",
    title: "Anansi and the Pot of Wisdom",
    subtitle: "The pride of Kwaku Anansi and the high baobab tree",
    synopsis: "The spider Kwaku Anansi sought to gather all the world's wisdom into a clay calabash, only to discover wisdom cannot be hoarded alone on a high tree.",
    coverImage: "",
    tradition: "Ashanti/Akan",
    genres: ["trickster-tales", "moral-fables"],
    tags: ["Anansi", "Wisdom", "Baobab", "Trickster"],
    difficulty: "Intermediate",
    authorId: "user-kwame-01",
    authorName: "Kwame Asante",
    publishedAt: "2026-01-10",
    updatedAt: "2026-02-01",
    estimatedReadTime: 6,
    totalChapters: 3,
    totalBranches: 14,
    upvotesCount: 428,
    bookmarksCount: 156,
    commentsCount: 38,
    isFeatured: true,
    isInteractive: true,
    hasAudioNarration: true,
    status: "published",
  },
  {
    id: "sundiata-the-lion-king-of-mali",
    slug: "sundiata-the-lion-king-of-mali",
    title: "Sundiata: The Lion of Mali",
    subtitle: "The epic ascension of the Mandinka sovereign",
    synopsis: "From a boy who could not walk to the legendary founder of the Mali Empire. Forge alliances with royal blacksmiths and defeat the sorcerer king Soumaoro.",
    coverImage: "",
    tradition: "Pan-African",
    genres: ["heroic-epics"],
    tags: ["Empire", "Griot", "Warriors", "Mali"],
    difficulty: "Elderly / Complex",
    authorId: "user-amina-02",
    authorName: "Amina Diallo",
    publishedAt: "2026-01-14",
    updatedAt: "2026-01-20",
    estimatedReadTime: 12,
    totalChapters: 5,
    totalBranches: 28,
    upvotesCount: 612,
    bookmarksCount: 290,
    commentsCount: 64,
    isFeatured: true,
    isInteractive: true,
    hasAudioNarration: true,
    status: "published",
  },
  {
    id: "orunmila-and-the-sacred-palm-nuts",
    slug: "orunmila-and-the-sacred-palm-nuts",
    title: "Orunmila & The 16 Sacred Odu",
    subtitle: "Divination through ancient Yoruba cosmologies",
    synopsis: "A mystical exploration of Ifá divination where each branching choice corresponds to an ancient Odu verse and ancestral guidance.",
    coverImage: "",
    tradition: "Yoruba",
    genres: ["creation-myths", "spirit-realms"],
    tags: ["Ifá", "Orisha", "Divination", "Sacred"],
    difficulty: "Intermediate",
    authorId: "user-babalawo-03",
    authorName: "Chief Adebayo",
    publishedAt: "2026-02-01",
    updatedAt: "2026-02-03",
    estimatedReadTime: 8,
    totalChapters: 4,
    totalBranches: 20,
    upvotesCount: 389,
    bookmarksCount: 178,
    commentsCount: 22,
    isFeatured: false,
    isInteractive: true,
    hasAudioNarration: false,
    status: "published",
  },
  {
    id: "nommo-and-the-water-of-life",
    slug: "nommo-and-the-water-of-life",
    title: "Nommo: Ancestral Water of the Dogon",
    subtitle: "Cosmic spirits of the Sirius star system",
    synopsis: "Dive into the deep astral astronomy of the Bandiagara escarpment. Speak with primordial amphibious spirits to restore rainfall to the earthly valley.",
    coverImage: "",
    tradition: "Dogon",
    genres: ["creation-myths", "afrofuturism"],
    tags: ["Sirius", "Astronomy", "Water Spirits", "Dogon"],
    difficulty: "Intermediate",
    authorId: "user-dogon-04",
    authorName: "Oumar Sangare",
    publishedAt: "2026-02-15",
    updatedAt: "2026-02-15",
    estimatedReadTime: 9,
    totalChapters: 3,
    totalBranches: 16,
    upvotesCount: 245,
    bookmarksCount: 94,
    commentsCount: 17,
    isFeatured: false,
    isInteractive: true,
    hasAudioNarration: true,
    status: "published",
  },
];

export default function ExplorePage() {
  const [selectedTradition, setSelectedTradition] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [interactiveOnly, setInteractiveOnly] = React.useState(false);

  const filteredStories = MOCK_STORIES.filter((story) => {
    if (selectedTradition !== "all" && story.tradition !== selectedTradition) {
      return false;
    }
    if (interactiveOnly && !story.isInteractive) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        story.title.toLowerCase().includes(q) ||
        story.synopsis.toLowerCase().includes(q) ||
        story.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-extrabold text-white">
            Explore Sacred Folklore
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Discover branching narratives across 9 ancient African storytelling traditions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword or tag..."
              className="pl-9 h-10 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Tradition Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedTradition("all")}
          className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            selectedTradition === "all"
              ? "bg-folklore-amber text-folklore-night font-bold shadow-md"
              : "bg-folklore-obsidian text-neutral-300 border border-white/10 hover:border-folklore-amber/40"
          }`}
        >
          All Traditions ({MOCK_STORIES.length})
        </button>

        {TRADITIONS.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTradition(t)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedTradition === t
                ? "bg-folklore-amber text-folklore-night font-bold shadow-md"
                : "bg-folklore-obsidian text-neutral-300 border border-white/10 hover:border-folklore-amber/40"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map((story) => (
          <Card
            key={story.id}
            className="flex flex-col justify-between overflow-hidden group hover:border-folklore-amber/50 transition-all duration-300"
          >
            <div className="h-32 bg-gradient-to-tr from-folklore-indigo via-folklore-obsidian to-folklore-night p-5 flex flex-col justify-between border-b border-white/5">
              <div className="flex items-center justify-between">
                <Badge variant="gold">{story.tradition}</Badge>
                {story.hasAudioNarration && (
                  <span className="flex items-center gap-1 text-[10px] text-folklore-gold bg-black/40 px-2 py-0.5 rounded-full border border-folklore-gold/20">
                    <Mic className="h-3 w-3" /> Griot Audio
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs text-neutral-400">
                <span className="flex items-center gap-1">
                  <GitBranch className="h-3.5 w-3.5 text-folklore-amber" />
                  {story.totalBranches} paths
                </span>
                <span>• {story.estimatedReadTime} min</span>
                <span>• {story.difficulty}</span>
              </div>
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="group-hover:text-folklore-gold transition-colors">
                {story.title}
              </CardTitle>
              <CardDescription className="line-clamp-2 mt-1">
                {story.synopsis}
              </CardDescription>
            </CardHeader>

            <CardFooter className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                <Heart className="h-3.5 w-3.5 text-folklore-terracotta" />
                <span>{story.upvotesCount}</span>
              </div>

              <Link href={`/story/${story.id}`}>
                <Button variant="folklore" size="sm" className="gap-1.5 text-xs">
                  <BookOpen className="h-3.5 w-3.5" />
                  Read Story
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
