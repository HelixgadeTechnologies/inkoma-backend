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
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
            <Feather className="h-3.5 w-3.5 text-folklore-amber" />
            <span>Griot Creator Hub</span>
          </div>
          <h1 className="text-3xl font-serif font-extrabold text-stone-900">Storyteller Studio</h1>
          <p className="text-sm text-stone-600 mt-1">
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
        <div className="rounded-2xl border border-stone-200 bg-white p-5 space-y-1 shadow-sm">
          <span className="text-xs text-stone-500 font-medium">Total Tale Reads</span>
          <p className="text-2xl font-bold font-serif text-amber-900">38.4K</p>
          <span className="text-[11px] text-emerald-700 font-semibold">+18% this moon cycle</span>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 space-y-1 shadow-sm">
          <span className="text-xs text-stone-500 font-medium">Listener Blessings</span>
          <p className="text-2xl font-bold font-serif text-orange-900">428</p>
          <span className="text-[11px] text-stone-500 font-medium">98% reader appreciation</span>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 space-y-1 shadow-sm">
          <span className="text-xs text-stone-500 font-medium">Choice Paths Explored</span>
          <p className="text-2xl font-bold font-serif text-stone-900">14 Nodes</p>
          <span className="text-[11px] text-amber-800 font-semibold">3 Alternate Endings</span>
        </div>
      </div>

      {/* Active Drafts Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
            <Edit3 className="h-4 w-4 text-folklore-amber" />
            Manuscript Drafts in Progress
          </h2>
          <span className="text-xs text-stone-500 font-medium">{drafts.length} active manuscripts</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {drafts.map((draft) => (
            <Card key={draft.id} className="border-stone-200 bg-white shadow-sm hover:shadow-md hover:border-amber-300 transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="amber">{draft.tradition}</Badge>
                  <span className="text-xs text-stone-500 flex items-center gap-1 font-medium">
                    <Clock className="h-3 w-3" /> {draft.lastEdited}
                  </span>
                </div>
                <CardTitle className="text-base mt-2 text-stone-900 hover:text-folklore-amber cursor-pointer font-serif font-bold">
                  {draft.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-700 font-medium">
                  <span className="flex items-center gap-1">
                    <GitBranch className="h-3.5 w-3.5 text-folklore-amber" />
                    {draft.nodesCount} Narrative Nodes
                  </span>
                  <span>{draft.progress}% Complete</span>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 w-full rounded-full bg-stone-100 border border-stone-200 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-600 to-amber-600 rounded-full"
                    style={{ width: `${draft.progress}%` }}
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <Link href="/studio/new">
                    <Button variant="outline" size="sm" className="text-xs bg-white border-stone-200 text-stone-800 hover:bg-stone-50">
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
        <h2 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-folklore-amber" />
          Published Living Lore
        </h2>

        <div className="space-y-3">
          {published.map((pub) => (
            <div
              key={pub.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-5 hover:border-amber-300 shadow-sm transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="gold">{pub.tradition}</Badge>
                  <span className="text-xs text-stone-500 font-medium">• Published {pub.publishedDate}</span>
                </div>
                <h3 className="font-serif font-bold text-base text-stone-900">{pub.title}</h3>
              </div>

              <div className="flex items-center gap-6 text-xs text-stone-700 font-medium">
                <div className="flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5 text-stone-400" />
                  <span>{pub.reads.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Heart className="h-3.5 w-3.5 text-folklore-terracotta" />
                  <span>{pub.upvotes}</span>
                </div>
                <Link href={`/story/${pub.id}`}>
                  <Button variant="outline" size="sm" className="text-xs bg-white border-stone-200 text-stone-800 hover:bg-stone-50">
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
