'use client';

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { User, Sparkles, Award, BookOpen, Heart, Eye, Feather, Calendar, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const params = useParams();
  const { profile } = useAuth();

  const author = profile || {
    id: "user-kwame-01",
    username: "kwame_griot",
    displayName: "Kwame Asante",
    bio: "Keeper of Ashanti trickster lore and ancient Dogon constellation myths. Crafting multi-branch tales for digital griots.",
    role: "griot",
    followersCount: 1420,
    followingCount: 89,
    publishedStoriesCount: 12,
    totalReadsCount: 38400,
    badges: [
      {
        id: "badge-1",
        name: "Spider Web Weaver",
        description: "Authored 5+ multi-branch interactive tales",
        iconName: "Sparkles",
        tier: "gold",
        unlockedAt: "2026-01-15",
      },
      {
        id: "badge-2",
        name: "Master Griot",
        description: "Reached 25,000 oral story listeners",
        iconName: "Volume2",
        tier: "elder",
        unlockedAt: "2026-03-20",
      },
      {
        id: "badge-3",
        name: "Baobab Guardian",
        description: "Preserved 10 historical folklore variations",
        iconName: "Trees",
        tier: "silver",
        unlockedAt: "2026-02-10",
      },
    ],
    createdAt: "2025-10-01",
  };

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      {/* Profile Header Banner */}
      <div className="relative rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 overflow-hidden shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
          <Avatar
            fallback="KA"
            className="h-20 w-20 text-xl border-2 border-amber-400 bg-amber-100 text-amber-900 shadow-sm"
          />

          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-stone-900">
                {author.displayName}
              </h1>
              <Badge variant="gold" className="gap-1 text-xs uppercase font-bold">
                <ShieldCheck className="h-3 w-3" /> Griot Master
              </Badge>
            </div>

            <p className="text-xs text-amber-800 font-mono font-semibold">@{author.username}</p>

            <p className="text-xs sm:text-sm text-stone-700 max-w-lg leading-relaxed font-medium">
              {author.bio}
            </p>

            <div className="flex items-center gap-4 text-xs text-stone-600 pt-1 font-medium">
              <span><strong className="text-stone-900">{author.followersCount}</strong> Disciples</span>
              <span><strong className="text-stone-900">{author.totalReadsCount.toLocaleString()}</strong> Listeners</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3 text-stone-400" /> Member since Oct 2025
              </span>
            </div>
          </div>

          <Link href="/studio/new">
            <Button variant="folklore" size="sm" className="gap-1.5 self-start">
              <Feather className="h-4 w-4" />
              <span>Weave Tale</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Unlocked Griot Badges & Achievements */}
      <div className="space-y-4">
        <h2 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
          <Award className="h-4 w-4 text-folklore-amber" />
          Unlocked Folklore Honors & Badges
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {author.badges.map((badge) => (
            <div
              key={badge.id}
              className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-white p-4 transition-all hover:border-amber-300 shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-serif text-sm font-bold text-stone-900">{badge.name}</h4>
                <p className="text-[11px] text-stone-600 leading-relaxed">{badge.description}</p>
                <span className="text-[10px] text-amber-800 font-bold block pt-1">
                  Tier: {badge.tier.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Published Works by Author */}
      <div className="space-y-4">
        <h2 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-folklore-amber" />
          Authored Interactive Lore
        </h2>

        <Card className="border-stone-200 bg-white shadow-sm hover:shadow-md hover:border-amber-300 transition-all">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="gold">Ashanti/Akan</Badge>
              <span className="text-xs text-stone-500 font-medium">14 Choice Paths</span>
            </div>
            <CardTitle className="text-lg mt-2 text-stone-900">Anansi and the Pot of Wisdom</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between pt-0">
            <div className="flex items-center gap-4 text-xs text-stone-600 font-medium">
              <span className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5 text-stone-400" /> 38.4K reads
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-3.5 w-3.5 text-folklore-terracotta" /> 428 blessings
              </span>
            </div>

            <Link href="/story/anansi-and-the-pot-of-wisdom">
              <Button variant="outline" size="sm" className="text-xs bg-white border-stone-200 text-stone-800 hover:bg-stone-50">
                Enter Tale
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
