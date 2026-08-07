'use client';

import * as React from "react";
import Link from "next/link";
import { PlusCircle, Feather, GitBranch, Eye, Heart, BookOpen, Clock, MoreVertical, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function StudioPage() {
  const drafts = [
    {
      id: "draft-1",
      title: "The Legend of the Golden Stool (Sika Dwa Kofi)",
      tradition: "Ashanti/Akan",
      lastEdited: "2 hours ago",
      progress: 75,
      nodesCount: 18,
      status: "In Progress",
    },
    {
      id: "draft-2",
      title: "Mami Wata: Secrets of the Whispering Current",
      tradition: "Pan-African",
      lastEdited: "Yesterday",
      progress: 40,
      nodesCount: 9,
      status: "Draft",
    },
  ];

  const published = [
    {
      id: "anansi-and-the-pot-of-wisdom",
      title: "Anansi and the Pot of Wisdom",
      tradition: "Ashanti/Akan",
      reads: 38400,
      upvotes: 428,
      branches: 14,
      publishedDate: "Jan 10, 2026",
    },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-folklore-amber uppercase tracking-wider mb-1">
            <Feather className="h-3.5 w-3.5" />
            <span>Griot Creator Hub</span>
          </div>
          <h1 className="text-3xl font-serif font-extrabold text-white">Storyteller Studio</h1>
          <p className="text-sm text-neutral-400">
            Craft branching lore, manage character webs, and inspect listener analytics.
          </p>
        </div>

        <Link href="/studio/new">
          <Button variant="folklore" className="gap-2">
            <PlusCircle className="h-4 w-4" />
            <span>Create New Tale</span>
          </Button>
        </Link>
      </div>

      {/* Analytics Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-folklore-amber/20 bg-folklore-obsidian/70 p-5 space-y-1">
          <span className="text-xs text-neutral-400">Total Tale Reads</span>
          <p className="text-2xl font-bold font-serif text-folklore-gold">38.4K</p>
          <span className="text-[11px] text-emerald-400">+18% this moon cycle</span>
        </div>

        <div className="rounded-2xl border border-folklore-amber/20 bg-folklore-obsidian/70 p-5 space-y-1">
          <span className="text-xs text-neutral-400">Listener Blessings</span>
          <p className="text-2xl font-bold font-serif text-folklore-terracotta">428</p>
          <span className="text-[11px] text-neutral-400">98% reader appreciation</span>
        </div>

        <div className="rounded-2xl border border-folklore-amber/20 bg-folklore-obsidian/70 p-5 space-y-1">
          <span className="text-xs text-neutral-400">Choice Paths Explored</span>
          <p className="text-2xl font-bold font-serif text-amber-300">14 Nodes</p>
          <span className="text-[11px] text-folklore-amber">3 Alternate Endings</span>
        </div>
      </div>

      {/* Active Drafts Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
            <Edit3 className="h-4 w-4 text-folklore-amber" />
            Manuscript Drafts in Progress
          </h2>
          <span className="text-xs text-neutral-400">{drafts.length} active manuscripts</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {drafts.map((draft) => (
            <Card key={draft.id} className="border-folklore-amber/20 bg-folklore-obsidian/80">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="amber">{draft.tradition}</Badge>
                  <span className="text-xs text-neutral-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {draft.lastEdited}
                  </span>
                </div>
                <CardTitle className="text-base mt-2 text-white hover:text-folklore-gold cursor-pointer">
                  {draft.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-300">
                  <span className="flex items-center gap-1">
                    <GitBranch className="h-3.5 w-3.5 text-folklore-gold" />
                    {draft.nodesCount} Narrative Nodes
                  </span>
                  <span>{draft.progress}% Complete</span>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-folklore-terracotta to-folklore-amber rounded-full"
                    style={{ width: `${draft.progress}%` }}
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <Link href="/studio/new">
                    <Button variant="outline" size="sm" className="text-xs">
                      Resume Editing
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Published Works */}
      <div className="space-y-4">
        <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-folklore-gold" />
          Published Living Lore
        </h2>

        <div className="space-y-3">
          {published.map((pub) => (
            <div
              key={pub.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-folklore-obsidian/60 p-5 hover:border-folklore-amber/30 transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="gold">{pub.tradition}</Badge>
                  <span className="text-xs text-neutral-400">• Published {pub.publishedDate}</span>
                </div>
                <h3 className="font-serif font-bold text-base text-white">{pub.title}</h3>
              </div>

              <div className="flex items-center gap-6 text-xs text-neutral-300">
                <div className="flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5 text-neutral-400" />
                  <span>{pub.reads.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Heart className="h-3.5 w-3.5 text-folklore-terracotta" />
                  <span>{pub.upvotes}</span>
                </div>
                <Link href={`/story/${pub.id}`}>
                  <Button variant="outline" size="sm" className="text-xs">
                    View in Reader
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
