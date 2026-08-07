import Link from "next/link";
import { Sparkles, BookOpen, GitBranch, Mic, Flame, Shield, ArrowRight, Star, Heart, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { TRADITIONS, GENRES } from "@/config/genres";

const FEATURED_TALES = [
  {
    id: "anansi-and-the-pot-of-wisdom",
    title: "Anansi and the Pot of Wisdom",
    tradition: "Ashanti/Akan",
    synopsis: "The spider Kwaku Anansi sought to gather all the world's wisdom into a clay calabash, only to discover wisdom cannot be hoarded alone on a high tree.",
    readTime: 6,
    branches: 14,
    upvotes: 428,
    difficulty: "Intermediate",
    hasAudio: true,
    coverColor: "from-amber-600/30 to-orange-950/80",
  },
  {
    id: "sundiata-the-lion-king-of-mali",
    title: "Sundiata: The Lion of Mali",
    tradition: "Pan-African",
    synopsis: "From a boy who could not walk to the legendary founder of the Mali Empire. Forge alliances with royal blacksmiths and defeat the sorcerer king Soumaoro.",
    readTime: 12,
    branches: 28,
    upvotes: 612,
    difficulty: "Elderly / Complex",
    hasAudio: true,
    coverColor: "from-red-600/30 to-zinc-950/80",
  },
  {
    id: "orunmila-and-the-sacred-palm-nuts",
    title: "Orunmila & The 16 Sacred Odu",
    tradition: "Yoruba",
    synopsis: "A mystical exploration of Ifá divination where each branching choice corresponds to an ancient Odu verse and ancestral guidance.",
    readTime: 8,
    branches: 20,
    upvotes: 389,
    difficulty: "Intermediate",
    hasAudio: false,
    coverColor: "from-emerald-600/30 to-slate-950/80",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-24 md:pb-32">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-folklore-amber/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-folklore-terracotta/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-6xl px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-folklore-amber/30 bg-folklore-amber/10 px-4 py-1.5 text-xs font-semibold text-folklore-gold mb-8 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 animate-spin" />
            <span>Interactive African Folklore & Choice Narratives</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl font-serif max-w-4xl mx-auto leading-tight">
            Step into the Web of <br />
            <span className="text-gold-gradient">Timeless African Tales</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-neutral-300 leading-relaxed font-sans">
            Where oral tradition meets interactive choice nodes. Listen to ancient griot voices, decide the fate of mythical heroes, and craft your own legendary folklore.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/explore">
              <Button variant="folklore" size="lg" className="w-full sm:w-auto gap-2">
                <BookOpen className="h-5 w-5" />
                Explore Interactive Library
              </Button>
            </Link>
            <Link href="/studio">
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                <GitBranch className="h-5 w-5 text-folklore-gold" />
                Enter Creator Studio
              </Button>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-white/10 text-center">
            <div>
              <p className="text-2xl font-bold text-folklore-gold font-serif">500+</p>
              <p className="text-xs text-neutral-400">Interactive Lore Paths</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-folklore-amber font-serif">9</p>
              <p className="text-xs text-neutral-400">African Traditions</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-folklore-terracotta font-serif">100%</p>
              <p className="text-xs text-neutral-400">Oral Narration Ready</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-400 font-serif">1,200+</p>
              <p className="text-xs text-neutral-400">Storyteller Griots</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Anansi Tales Section */}
      <section className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-folklore-amber uppercase tracking-wider mb-2">
              <Flame className="h-4 w-4 text-folklore-terracotta" />
              <span>Griot Masterpieces</span>
            </div>
            <h2 className="text-3xl font-bold font-serif text-white">Featured Legendary Tales</h2>
          </div>
          <Link href="/explore">
            <Button variant="ghost" className="text-folklore-gold hover:text-white gap-1 text-sm">
              <span>View All 500+ Stories</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_TALES.map((tale) => (
            <Card key={tale.id} className="group relative flex flex-col overflow-hidden">
              <div className={`h-40 w-full bg-gradient-to-br ${tale.coverColor} p-5 flex flex-col justify-between relative`}>
                <div className="flex items-center justify-between z-10">
                  <Badge variant="gold">{tale.tradition}</Badge>
                  {tale.hasAudio && (
                    <span className="flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 text-[10px] text-folklore-gold backdrop-blur-sm">
                      <Mic className="h-3 w-3" /> Audio Griot
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-neutral-200 z-10">
                  <span className="flex items-center gap-1">
                    <GitBranch className="h-3.5 w-3.5 text-folklore-amber" />
                    {tale.branches} Choice Paths
                  </span>
                  <span>• {tale.readTime} min read</span>
                </div>
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="group-hover:text-folklore-gold transition-colors">
                  {tale.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 mt-2">
                  {tale.synopsis}
                </CardDescription>
              </CardHeader>

              <CardFooter className="pt-4 flex items-center justify-between">
                <span className="text-xs text-neutral-400 flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5 text-folklore-terracotta" />
                  {tale.upvotes} blessings
                </span>
                <Link href={`/story/${tale.id}`}>
                  <Button variant="folklore" size="sm" className="gap-1 text-xs">
                    <span>Read Tale</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Mythological Traditions Grid */}
      <section className="container mx-auto max-w-6xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="amber" className="mb-3">Cosmologies & Lineages</Badge>
          <h2 className="text-3xl font-bold font-serif text-white">Explore Mythological Traditions</h2>
          <p className="text-sm text-neutral-400 mt-2">
            Every tradition carries distinct moral philosophies, oral melodies, and legendary creatures.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {TRADITIONS.map((tradition) => (
            <Link
              key={tradition}
              href={`/explore?tradition=${encodeURIComponent(tradition)}`}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-folklore-obsidian/60 p-4 transition-all hover:border-folklore-amber/50 hover:bg-folklore-amber/5 hover:scale-[1.02]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-folklore-amber/15 text-folklore-gold">
                  <Flame className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-white">{tradition}</h4>
                  <p className="text-[11px] text-neutral-400">Oral wisdom tales</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-neutral-400" />
            </Link>
          ))}
        </div>
      </section>

      {/* Griot Creator Callout */}
      <section className="container mx-auto max-w-6xl px-4">
        <div className="relative rounded-3xl border border-folklore-amber/30 bg-gradient-to-r from-folklore-obsidian via-folklore-indigo to-folklore-night p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <Badge variant="gold">For Authors & Mythmakers</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white leading-tight">
              Are you a Modern Griot? <br />
              Weave Your Own Branching Tales
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Use our visual node editor to build multi-ending interactive stories, record oral audio narrations, and publish to thousands of folklore readers worldwide.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link href="/studio/new">
                <Button variant="folklore" size="lg">
                  Launch Visual Node Editor
                </Button>
              </Link>
              <Link href="/community">
                <Button variant="secondary" size="lg">
                  Join Storyteller Forum
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
