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
    <div className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-all hover:border-amber-300 hover:shadow-md">
      {/* Upvote Pill */}
      <button
        onClick={handleUpvote}
        className={`flex flex-col items-center justify-center h-16 w-12 rounded-xl border transition-all ${
          hasUpvoted
            ? "border-amber-400 bg-amber-100 text-amber-900 font-bold"
            : "border-stone-200 bg-stone-50 text-stone-600 hover:text-stone-900 hover:border-stone-300"
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
            <span className="text-xs font-semibold text-stone-800">{discussion.authorName}</span>
            <span className="text-[11px] text-stone-500">• {formatDate(discussion.createdAt)}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {discussion.isPinned && (
              <Badge variant="gold" className="text-[10px] gap-1 py-0">
                <Pin className="h-2.5 w-2.5" /> Pinned
              </Badge>
            )}
            <Badge variant="secondary" className="text-[10px] bg-stone-100 text-stone-700">
              {discussion.traditionCategory}
            </Badge>
          </div>
        </div>

        <h3 className="font-serif text-base font-bold text-stone-900 hover:text-folklore-amber transition-colors cursor-pointer">
          {discussion.title}
        </h3>

        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
          {discussion.content}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-stone-100">
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>{discussion.repliesCount} community responses</span>
          </div>

          <div className="flex gap-1">
            {discussion.tags.map((tag) => (
              <span key={tag} className="text-[10px] text-amber-900 bg-amber-100 px-2 py-0.5 rounded font-medium">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
