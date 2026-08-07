'use client';

import * as React from "react";
import { CommunityDiscussion } from "@/types";
import { MessageSquare, ArrowBigUp, Pin, Sparkles } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export function DiscussionCard({ discussion }: { discussion: CommunityDiscussion }) {
  const [upvotes, setUpvotes] = React.useState(discussion.upvotesCount);
  const [hasUpvoted, setHasUpvoted] = React.useState(false);

  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hasUpvoted) {
      setUpvotes(upvotes - 1);
      setHasUpvoted(false);
    } else {
      setUpvotes(upvotes + 1);
      setHasUpvoted(true);
    }
  };

  return (
    <div className="flex gap-4 rounded-2xl border border-folklore-amber/15 bg-folklore-obsidian/70 p-5 backdrop-blur-sm transition-all hover:border-folklore-amber/40 hover:shadow-lg hover:shadow-folklore-amber/5">
      {/* Upvote Pill */}
      <button
        onClick={handleUpvote}
        className={`flex flex-col items-center justify-center h-16 w-12 rounded-xl border transition-all ${
          hasUpvoted
            ? "border-folklore-amber bg-folklore-amber/20 text-folklore-amber"
            : "border-white/10 bg-white/5 text-neutral-400 hover:text-white hover:border-white/20"
        }`}
      >
        <ArrowBigUp className={`h-5 w-5 ${hasUpvoted ? "fill-current" : ""}`} />
        <span className="text-xs font-bold">{upvotes}</span>
      </button>

      {/* Discussion Content */}
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Avatar fallback={discussion.authorName.slice(0, 2).toUpperCase()} className="h-6 w-6 text-[10px]" />
            <span className="text-xs font-medium text-neutral-300">{discussion.authorName}</span>
            <span className="text-[11px] text-neutral-400">• {formatDate(discussion.createdAt)}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {discussion.isPinned && (
              <Badge variant="gold" className="text-[10px] gap-1 py-0">
                <Pin className="h-2.5 w-2.5" /> Pinned
              </Badge>
            )}
            <Badge variant="secondary" className="text-[10px]">
              {discussion.traditionCategory}
            </Badge>
          </div>
        </div>

        <h3 className="font-serif text-base font-bold text-white hover:text-folklore-gold transition-colors cursor-pointer">
          {discussion.title}
        </h3>

        <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
          {discussion.content}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>{discussion.repliesCount} griot responses</span>
          </div>

          <div className="flex gap-1">
            {discussion.tags.map((tag) => (
              <span key={tag} className="text-[10px] text-folklore-gold/70 bg-folklore-gold/10 px-2 py-0.5 rounded">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
