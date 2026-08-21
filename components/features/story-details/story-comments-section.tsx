"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { StoryComment } from "@/types";
import { MOCK_CURRENT_USER } from "@/config/mock-data";
import {
  MessageSquare,
  ThumbsUp,
  CornerDownRight,
  Send,
  Sparkles,
  MoreHorizontal,
  Trash2,
  CheckCircle2,
  Heart,
  Smile,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface StoryCommentsSectionProps {
  storyId: string;
  storyTitle: string;
  initialCommentsCount?: number;
}

const INITIAL_COMMENTS_DATA: Record<string, StoryComment[]> = {
  "sundiata-the-lion-king-of-mali": [
    {
      id: "comment-1",
      storyId: "sundiata-the-lion-king-of-mali",
      authorId: "user-amina-02",
      authorName: "Amina Diallo (Author)",
      authorAvatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop",
      content: "Welcome to the Manden epic! In Chapter 1, the iron rod choice reflects historical oral accounts recorded by Mandinka griots. I would love to hear which branch path resonated most with you!",
      upvotesCount: 42,
      hasUpvoted: true,
      createdAt: "3 hours ago",
      replies: [
        {
          id: "reply-1-1",
          storyId: "sundiata-the-lion-king-of-mali",
          authorId: "user-kofi",
          authorName: "Kofi Mensah",
          authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
          content: "The invocation of Sogolon's buffalo spirit was breathtaking! The sound of the iron rod bending brought cold shivers.",
          upvotesCount: 18,
          hasUpvoted: false,
          createdAt: "2 hours ago",
        },
      ],
    },
    {
      id: "comment-2",
      storyId: "sundiata-the-lion-king-of-mali",
      authorId: "user-zola",
      authorName: "Zola Dlamini",
      authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      content: "The imagery of uprooting the baobab tree for Sogolon is such a powerful testament to filial devotion and resilience. Magnificent writing!",
      upvotesCount: 29,
      hasUpvoted: false,
      createdAt: "5 hours ago",
    },
    {
      id: "comment-3",
      storyId: "sundiata-the-lion-king-of-mali",
      authorId: "user-tunde",
      authorName: "Tunde Bakare",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
      content: "I cannot wait for the clash against Soumaoro Kanté in the next chapter update! Does Sundiata obtain the sacred arrow in Chapter 2?",
      upvotesCount: 14,
      hasUpvoted: false,
      createdAt: "1 day ago",
    },
  ],
  default: [
    {
      id: "comment-def-1",
      storyId: "default",
      authorId: "user-amara",
      authorName: "Amara Okafor",
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      content: "An absolute masterpiece of traditional African lore! The moral depth and choice consequences make this manuscript unforgettable.",
      upvotesCount: 34,
      hasUpvoted: false,
      createdAt: "4 hours ago",
    },
    {
      id: "comment-def-2",
      storyId: "default",
      authorId: "user-nii",
      authorName: "Elder Nii Armah",
      authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      content: "As a preserver of oral traditions, I am deeply moved by the care taken to honor the ancestral wisdom embedded within this tale.",
      upvotesCount: 21,
      hasUpvoted: true,
      createdAt: "1 day ago",
    },
  ],
};

export function StoryCommentsSection({
  storyId,
  storyTitle,
  initialCommentsCount = 0,
}: StoryCommentsSectionProps) {
  const initialList = INITIAL_COMMENTS_DATA[storyId] || INITIAL_COMMENTS_DATA.default;
  const [comments, setComments] = useState<StoryComment[]>(initialList);
  const [newCommentText, setNewCommentText] = useState("");
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sortBy, setSortBy] = useState<"top" | "newest">("top");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalCount = comments.reduce(
    (acc, c) => acc + 1 + (c.replies ? c.replies.length : 0),
    0
  );

  const handleUpvote = (commentId: string, isReply = false, parentId?: string) => {
    if (isReply && parentId) {
      setComments((prev) =>
        prev.map((parent) => {
          if (parent.id === parentId && parent.replies) {
            return {
              ...parent,
              replies: parent.replies.map((reply) => {
                if (reply.id === commentId) {
                  const hasUpvoted = !reply.hasUpvoted;
                  return {
                    ...reply,
                    hasUpvoted,
                    upvotesCount: hasUpvoted
                      ? reply.upvotesCount + 1
                      : reply.upvotesCount - 1,
                  };
                }
                return reply;
              }),
            };
          }
          return parent;
        })
      );
    } else {
      setComments((prev) =>
        prev.map((c) => {
          if (c.id === commentId) {
            const hasUpvoted = !c.hasUpvoted;
            return {
              ...c,
              hasUpvoted,
              upvotesCount: hasUpvoted ? c.upvotesCount + 1 : c.upvotesCount - 1,
            };
          }
          return c;
        })
      );
    }
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    setIsSubmitting(true);

    const newComment: StoryComment = {
      id: `comment-${Date.now()}`,
      storyId,
      authorId: MOCK_CURRENT_USER.id,
      authorName: `${MOCK_CURRENT_USER.displayName} (You)`,
      authorAvatar: MOCK_CURRENT_USER.avatarUrl,
      content: newCommentText.trim(),
      upvotesCount: 1,
      hasUpvoted: true,
      createdAt: "Just now",
      replies: [],
    };

    setTimeout(() => {
      setComments((prev) => [newComment, ...prev]);
      setNewCommentText("");
      setIsSubmitting(false);
    }, 400);
  };

  const handlePostReply = (parentId: string) => {
    if (!replyText.trim()) return;

    const newReply: StoryComment = {
      id: `reply-${Date.now()}`,
      storyId,
      authorId: MOCK_CURRENT_USER.id,
      authorName: `${MOCK_CURRENT_USER.displayName} (You)`,
      authorAvatar: MOCK_CURRENT_USER.avatarUrl,
      content: replyText.trim(),
      upvotesCount: 1,
      hasUpvoted: true,
      createdAt: "Just now",
    };

    setComments((prev) =>
      prev.map((parent) => {
        if (parent.id === parentId) {
          return {
            ...parent,
            replies: [...(parent.replies || []), newReply],
          };
        }
        return parent;
      })
    );

    setReplyText("");
    setReplyingToId(null);
  };

  const handleDeleteComment = (commentId: string, parentId?: string) => {
    if (parentId) {
      setComments((prev) =>
        prev.map((p) => {
          if (p.id === parentId && p.replies) {
            return {
              ...p,
              replies: p.replies.filter((r) => r.id !== commentId),
            };
          }
          return p;
        })
      );
    } else {
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    }
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === "top") return b.upvotesCount - a.upvotesCount;
    return 0; // default order
  });

  return (
    <div className="space-y-6 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#680C07] text-white shadow-md">
            <MessageSquare className="h-5 w-5 fill-current" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-serif text-stone-900 tracking-tight">
              Reader Reflections & Discussion
            </h2>
            <p className="text-xs text-stone-500 font-medium">
              Join the storyteller circle and share your thoughts on &ldquo;{storyTitle}&rdquo;
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge className="bg-[#680C07]/10 text-[#680C07] border border-[#680C07]/20 text-xs px-3 py-1 font-semibold">
            {totalCount} Comments
          </Badge>
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-stone-50 border border-stone-200 rounded-lg px-2 py-1 text-stone-800 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#680C07]"
            >
              <option value="top">🔥 Top Upvoted</option>
              <option value="newest">✨ Newest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* New Comment Input Box */}
      <form onSubmit={handlePostComment} className="space-y-3 p-4 bg-stone-50/80 rounded-2xl border border-stone-200">
        <div className="flex items-start gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#680C07]/30 flex-shrink-0">
            <Image
              src={MOCK_CURRENT_USER.avatarUrl}
              alt={MOCK_CURRENT_USER.displayName}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 space-y-2">
            <textarea
              rows={3}
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder={`Share your thoughts on ${storyTitle}, moral choices, or cultural connections...`}
              className="w-full p-3 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#680C07]/20 focus:border-[#680C07] text-stone-900 placeholder:text-stone-400 resize-none"
            />

            {/* Quick Emoji Reaction Shortcuts */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-1 text-xs">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mr-1">
                  Quick React:
                </span>
                {["📜 Magnificent Lore!", "👏 Spoken like a Griot", "🕷️ Anansi approved!", "❤️ Deeply moving"].map(
                  (reaction) => (
                    <button
                      key={reaction}
                      type="button"
                      onClick={() =>
                        setNewCommentText((prev) => (prev ? `${prev} ${reaction}` : reaction))
                      }
                      className="px-2.5 py-1 rounded-full bg-white border border-stone-200 text-[11px] font-medium text-stone-600 hover:border-[#680C07] hover:text-[#680C07] transition-all"
                    >
                      {reaction}
                    </button>
                  )
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !newCommentText.trim()}
                className="bg-[#680C07] hover:bg-[#520905] text-white font-semibold text-xs px-5 py-2 rounded-xl shadow-md gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Post Comment
              </Button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4 pt-2">
        {sortedComments.length === 0 ? (
          <div className="text-center py-8 text-stone-500 text-xs font-medium">
            Be the first storyteller to leave a comment on this manuscript!
          </div>
        ) : (
          sortedComments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 sm:p-5 bg-white rounded-2xl border border-stone-200/90 shadow-xs space-y-3 transition-all hover:border-stone-300"
            >
              {/* Comment Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-stone-200 shrink-0">
                    <Image
                      src={
                        comment.authorAvatar ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200"
                      }
                      alt={comment.authorName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-900 font-serif">
                        {comment.authorName}
                      </span>
                      {comment.authorName.includes("(Author)") && (
                        <Badge className="bg-[#680C07] text-white text-[10px] py-0 px-2 font-bold">
                          Author
                        </Badge>
                      )}
                    </div>
                    <span className="text-[11px] text-stone-400 font-medium">
                      {comment.createdAt}
                    </span>
                  </div>
                </div>

                {comment.authorId === MOCK_CURRENT_USER.id && (
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                    title="Delete comment"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Comment Text */}
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal pl-1">
                {comment.content}
              </p>

              {/* Actions Bar */}
              <div className="flex items-center gap-4 text-xs pt-1 border-t border-stone-100">
                <button
                  onClick={() => handleUpvote(comment.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    comment.hasUpvoted
                      ? "bg-[#680C07]/10 text-[#680C07] border border-[#680C07]/20"
                      : "bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200"
                  }`}
                >
                  <ThumbsUp
                    className={`w-3.5 h-3.5 ${
                      comment.hasUpvoted ? "fill-[#680C07] text-[#680C07]" : ""
                    }`}
                  />
                  <span>{comment.upvotesCount}</span>
                </button>

                <button
                  onClick={() =>
                    setReplyingToId(replyingToId === comment.id ? null : comment.id)
                  }
                  className="flex items-center gap-1 text-stone-500 hover:text-[#680C07] font-semibold text-xs transition-colors"
                >
                  <CornerDownRight className="w-3.5 h-3.5" />
                  Reply
                </button>
              </div>

              {/* Inline Reply Input Box */}
              {replyingToId === comment.id && (
                <div className="mt-3 pl-4 border-l-2 border-[#680C07] space-y-2 animate-in fade-in duration-150">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`Replying to ${comment.authorName}...`}
                      className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#680C07]"
                    />
                    <Button
                      size="sm"
                      onClick={() => handlePostReply(comment.id)}
                      className="bg-[#680C07] hover:bg-[#520905] text-white text-xs h-8 px-3 rounded-lg"
                    >
                      Reply
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setReplyingToId(null)}
                      className="text-stone-500 text-xs h-8 px-2"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Nested Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-3 pt-3 border-t border-stone-100 space-y-3 pl-4 sm:pl-6 border-l-2 border-stone-200/80">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="relative w-7 h-7 rounded-full overflow-hidden border border-stone-200">
                            <Image
                              src={
                                reply.authorAvatar ||
                                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200"
                              }
                              alt={reply.authorName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-xs font-bold text-stone-900 font-serif">
                            {reply.authorName}
                          </span>
                          <span className="text-[10px] text-stone-400">
                            {reply.createdAt}
                          </span>
                        </div>

                        {reply.authorId === MOCK_CURRENT_USER.id && (
                          <button
                            onClick={() => handleDeleteComment(reply.id, comment.id)}
                            className="text-stone-400 hover:text-rose-600 p-0.5"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      <p className="text-xs text-stone-700 pl-9 leading-relaxed">
                        {reply.content}
                      </p>

                      <div className="pl-9 pt-0.5">
                        <button
                          onClick={() => handleUpvote(reply.id, true, comment.id)}
                          className={`inline-flex items-center gap-1 text-[11px] font-semibold transition-colors ${
                            reply.hasUpvoted ? "text-[#680C07]" : "text-stone-500 hover:text-stone-800"
                          }`}
                        >
                          <ThumbsUp className={`w-3 h-3 ${reply.hasUpvoted ? "fill-[#680C07]" : ""}`} />
                          <span>{reply.upvotesCount}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
