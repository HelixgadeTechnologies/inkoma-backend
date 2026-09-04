"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useStory } from "@/hooks/useStory";
import { useLibrary } from "@/hooks/useLibrary";
import { MOCK_CURRENT_USER } from "@/config/mock-data";
import { SupportAuthorDialog } from "@/components/features/story-details/support-author-dialog";
import { StoryCommentsSection } from "@/components/features/story-details/story-comments-section";
import { RecommendedCategoriesSection } from "@/components/features/story-details/recommended-categories";
import {
  BookOpen,
  Heart,
  Bookmark,
  Share2,
  Volume2,
  Clock,
  Eye,
  MessageSquare,
  Sparkles,
  GitFork,
  ArrowRight,
  Play,
  UserCheck,
  UserPlus,
  ShieldCheck,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function StoryDetailsPage() {
  const params = useParams();
  const storyId = params?.storyId as string;
  const { currentStory } = useStory(storyId);
  const { isBookmarked, toggleBookmark, isFavorited, toggleFavorite } = useLibrary();

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(currentStory?.likesCount || 0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  if (!currentStory) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 space-y-4">
        <h2 className="text-2xl font-bold text-stone-900 font-serif">Story Not Found</h2>
        <p className="text-stone-500 text-sm">
          The requested folklore manuscript could not be found in our digital archives.
        </p>
        <Link href="/explore">
          <Button className="bg-[#D4AF37] hover:bg-[#B89628] text-stone-950 font-bold">
            Return to Explore
          </Button>
        </Link>
      </div>
    );
  }

  const bookmarked = isBookmarked(currentStory.id);
  const favorited = isFavorited(currentStory.id);

  const handleLikeToggle = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentStory.title,
        text: currentStory.synopsis,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const chapters = currentStory.chapters || [
    {
      id: "chap-1",
      number: 1,
      title: "Chapter 1: The First Crossing",
      summary: currentStory.synopsis,
      readTimeMinutes: currentStory.estimatedReadTime,
      status: "published" as const,
      likesCount: currentStory.likesCount,
      commentsCount: currentStory.commentsCount,
      updatedAt: currentStory.updatedAt,
      rootNodeId: "node-1",
      nodes: {},
    },
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* Story Header Hero */}
      <div className="relative overflow-hidden bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Cover Art */}
          <div className="md:col-span-4 lg:col-span-3 space-y-3">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-stone-200 shadow-md bg-stone-100">
              <Image
                src={currentStory.coverImage}
                alt={currentStory.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-stone-900/80 text-white backdrop-blur-xs text-[10px]">
                  {currentStory.tradition}
                </Badge>
              </div>
            </div>

            {/* Read CTA button under cover */}
            <Link href={`/story/${currentStory.id}/read`} className="block">
              <Button className="w-full bg-[#D4AF37] hover:bg-[#B89628] text-stone-950 font-bold py-6 text-sm rounded-xl shadow-md">
                <Play className="w-4 h-4 fill-stone-950 mr-2" />
                Start Reading (Chap 1)
              </Button>
            </Link>
          </div>

          {/* Details & Metadata */}
          <div className="md:col-span-8 lg:col-span-9 space-y-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold">
                  {currentStory.mainGenre}
                </Badge>
                <span
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                    currentStory.status === "completed"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20"
                  }`}
                >
                  {currentStory.status === "completed" ? "Completed Story" : "Ongoing Manuscript"}
                </span>
                <span className="text-xs text-stone-400">•</span>
                <span className="text-xs text-stone-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {currentStory.estimatedReadTime} min read
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif tracking-tight">
                {currentStory.title}
              </h1>
              {currentStory.subtitle && (
                <p className="text-base text-stone-500 font-serif italic">
                  {currentStory.subtitle}
                </p>
              )}
            </div>

            {/* Author Profile Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <div className="flex items-center gap-3">
                <Link href={`/profile/kwame_asante`} className="relative w-12 h-12 rounded-full overflow-hidden border border-[#D4AF37]/30">
                  <Image
                    src={
                      currentStory.authorAvatar ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                    }
                    alt={currentStory.authorPenName || currentStory.authorName}
                    fill
                    className="object-cover"
                  />
                </Link>
                <div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/profile/kwame_asante`}
                      className="text-sm font-bold text-stone-900 hover:text-[#D4AF37] font-serif"
                    >
                      {currentStory.authorPenName || currentStory.authorName}
                    </Link>
                    <Badge className="bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 text-[10px]">
                      Storyteller
                    </Badge>
                  </div>
                  <p className="text-xs text-stone-500 line-clamp-1 max-w-sm">
                    {currentStory.authorBio || "Living folklore archivist and traditional storyteller."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`border-stone-300 text-xs rounded-xl ${
                    isFollowing
                      ? "bg-[#D4AF37]/10 border-[#D4AF37]/20 text-[#D4AF37] font-semibold"
                      : "bg-white text-stone-700"
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <UserCheck className="w-3.5 h-3.5 mr-1 text-[#D4AF37]" /> Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5 mr-1" /> Follow Author
                    </>
                  )}
                </Button>

                <Button
                  size="sm"
                  onClick={() => setShowSupportModal(true)}
                  className="bg-[#D4AF37] hover:bg-[#B89628] text-stone-950 text-xs font-bold rounded-xl shadow-xs"
                >
                  <Heart className="w-3.5 h-3.5 mr-1 fill-stone-950" />
                  Support Author
                </Button>
              </div>
            </div>

            {/* Synopsis */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Synopsis
              </h2>
              <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line">
                {currentStory.synopsis}
              </p>
            </div>

            {/* Sub-genres & Tags */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                Sub-genres & Folklore Themes
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentStory.subGenres.map((sub) => (
                  <span
                    key={sub}
                    className="text-xs px-2.5 py-1 bg-stone-100 text-stone-700 rounded-lg border border-stone-200 font-medium"
                  >
                    {sub}
                  </span>
                ))}
                {currentStory.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 bg-stone-50 text-stone-500 rounded-lg border border-stone-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Metrics & Social Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-100 text-xs">
              <div className="flex items-center gap-4 text-stone-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-stone-400" />
                  <strong className="text-stone-900">{currentStory.readsCount.toLocaleString()}</strong> Reads
                </span>
                <span className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#D4AF37]" />
                  <strong className="text-stone-900">{likesCount}</strong> Likes
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-stone-400" />
                  <strong className="text-stone-900">{currentStory.commentsCount}</strong> Comments
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleLikeToggle}
                  className={`border-stone-300 rounded-xl ${
                    isLiked ? "bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#D4AF37] font-semibold" : "bg-white text-stone-700"
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 mr-1.5 ${isLiked ? "fill-[#D4AF37] text-[#D4AF37]" : ""}`} />
                  {isLiked ? "Liked" : "Like"}
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleBookmark(currentStory.id)}
                  className={`border-stone-300 rounded-xl ${
                    bookmarked ? "bg-[#D4AF37]/10 border-[#D4AF37]/20 text-[#D4AF37] font-semibold" : "bg-white text-stone-700"
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 mr-1.5 ${bookmarked ? "fill-[#D4AF37] text-[#D4AF37]" : ""}`} />
                  {bookmarked ? "Bookmarked" : "Bookmark"}
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleFavorite(currentStory.id)}
                  className={`border-stone-300 rounded-xl ${
                    favorited ? "bg-[#D4AF37]/10 border-[#D4AF37]/20 text-[#D4AF37] font-semibold" : "bg-white text-stone-700"
                  }`}
                >
                  <Sparkles className={`w-3.5 h-3.5 mr-1.5 ${favorited ? "fill-[#D4AF37] text-[#D4AF37]" : ""}`} />
                  {favorited ? "Favorited" : "Favorite"}
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleShare}
                  className="border-stone-300 bg-white text-stone-700 rounded-xl"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" /> Copied
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 mr-1.5" /> Share
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter List & Table of Contents */}
      <div className="space-y-4 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="space-y-0.5">
            <h2 className="text-xl font-bold text-stone-900 font-serif">
              Chapters & Oral Episodes ({chapters.length})
            </h2>
            <p className="text-xs text-stone-500">
              Select any chapter to begin or resume your interactive narrative.
            </p>
          </div>
          <Link href={`/story/${currentStory.id}/read`}>
            <Button size="sm" className="bg-[#D4AF37] hover:bg-[#B89628] text-stone-950 font-bold rounded-xl">
              Read Chapter 1
            </Button>
          </Link>
        </div>

        <div className="divide-y divide-stone-100">
          {chapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/story/${currentStory.id}/read`}
              className="flex items-center justify-between p-4 hover:bg-stone-50 rounded-2xl transition-all group"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center font-bold text-sm shrink-0 font-serif">
                  {chapter.number}
                </div>
                <div className="space-y-1 min-w-0">
                  <h3 className="text-sm font-bold text-stone-900 group-hover:text-[#D4AF37] transition-colors truncate">
                    {chapter.title}
                  </h3>
                  <p className="text-xs text-stone-500 truncate max-w-xl">
                    {chapter.summary}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-stone-400 shrink-0 ml-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {chapter.readTimeMinutes}m
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-stone-300 group-hover:text-[#D4AF37]" /> {chapter.likesCount}
                </span>
                <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Reader Comments & Reflections Section */}
      <StoryCommentsSection
        storyId={currentStory.id}
        storyTitle={currentStory.title}
        initialCommentsCount={currentStory.commentsCount}
      />

      {/* Recommended Book Categories & Mythos Lineages */}
      <RecommendedCategoriesSection
        currentStoryId={currentStory.id}
        currentGenre={currentStory.mainGenre}
        currentTradition={currentStory.tradition}
      />

      {/* Support Author Dialog */}
      <SupportAuthorDialog
        story={currentStory}
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
      />
    </div>
  );
}
