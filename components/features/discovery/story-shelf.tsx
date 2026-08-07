"use client";

import Link from "next/link";
import Image from "next/image";
import { Story } from "@/types";
import { Heart, Eye, Clock, Bookmark, Sparkles, Volume2, GitFork } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLibrary } from "@/hooks/useLibrary";

interface StoryShelfProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  stories: Story[];
  viewAllHref?: string;
}

export function StoryShelf({ title, subtitle, icon, stories, viewAllHref }: StoryShelfProps) {
  const { isBookmarked, toggleBookmark } = useLibrary();

  if (!stories || stories.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            {icon}
            <h2 className="text-xl font-extrabold text-stone-900 font-serif tracking-tight">
              {title}
            </h2>
          </div>
          {subtitle && <p className="text-xs text-stone-500">{subtitle}</p>}
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="text-xs font-semibold text-amber-700 hover:text-amber-800 transition-colors"
          >
            Explore all →
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stories.map((story) => {
          const bookmarked = isBookmarked(story.id);

          return (
            <div
              key={story.id}
              className="group relative flex flex-col bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              {/* Cover Image */}
              <Link href={`/story/${story.id}`} className="relative h-48 w-full overflow-hidden bg-stone-100 block">
                <Image
                  src={story.coverImage}
                  alt={story.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <Badge className="bg-amber-600/90 text-white backdrop-blur-xs text-[10px] font-medium border-0 shadow-xs">
                    {story.tradition}
                  </Badge>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleBookmark(story.id);
                    }}
                    className={`p-1.5 rounded-full backdrop-blur-md transition-all ${
                      bookmarked
                        ? "bg-amber-600 text-white shadow-xs"
                        : "bg-stone-900/60 text-stone-200 hover:bg-stone-900/90 hover:text-white"
                    }`}
                    aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-white" : ""}`} />
                  </button>
                </div>

                {/* Feature Icons on image */}
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium">
                  <span className="flex items-center gap-1 drop-shadow-xs">
                    <Clock className="w-3 h-3 text-amber-300" /> {story.estimatedReadTime} min
                  </span>
                  <div className="flex items-center gap-2">
                    {story.hasAudioNarration && (
                      <span className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded-md text-[10px] text-amber-300">
                        <Volume2 className="w-2.5 h-2.5" /> Audio
                      </span>
                    )}
                    {story.isInteractive && (
                      <span className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded-md text-[10px] text-amber-300">
                        <GitFork className="w-2.5 h-2.5" /> {story.totalBranches} paths
                      </span>
                    )}
                  </div>
                </div>
              </Link>

              {/* Story Content Info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                      {story.mainGenre}
                    </span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      story.status === "completed" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}>
                      {story.status === "completed" ? "Completed" : "Ongoing"}
                    </span>
                  </div>

                  <Link href={`/story/${story.id}`}>
                    <h3 className="text-base font-bold text-stone-900 line-clamp-1 group-hover:text-amber-700 transition-colors font-serif">
                      {story.title}
                    </h3>
                  </Link>

                  <Link
                    href={`/profile/kwame_asante`}
                    className="text-xs text-stone-500 hover:text-stone-800 transition-colors block line-clamp-1"
                  >
                    by {story.authorPenName || story.authorName}
                  </Link>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {story.synopsis}
                  </p>
                </div>

                {/* Footer Metrics */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-stone-400" />
                      {story.readsCount > 1000 ? `${(story.readsCount / 1000).toFixed(1)}k` : story.readsCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-amber-600" />
                      {story.likesCount}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-stone-400">
                    {story.totalChapters} {story.totalChapters === 1 ? "Chap" : "Chaps"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
