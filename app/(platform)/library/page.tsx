"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLibrary } from "@/hooks/useLibrary";
import { MOCK_STORIES } from "@/config/mock-data";
import {
  BookOpen,
  Bookmark,
  Heart,
  History,
  Quote,
  Play,
  Trash2,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type LibraryTab = "continue" | "bookmarks" | "favorites" | "history" | "quotes";

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<LibraryTab>("continue");
  const {
    bookmarks,
    favorites,
    readingHistory,
    savedQuotes,
    continueReading,
    toggleBookmark,
    toggleFavorite,
    removeSavedQuote,
    isLoaded,
  } = useLibrary();

  const [copiedQuoteId, setCopiedQuoteId] = useState<string | null>(null);

  const handleCopyQuote = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedQuoteId(id);
    setTimeout(() => setCopiedQuoteId(null), 2500);
  };

  const bookmarkedStories = MOCK_STORIES.filter((s) => bookmarks.includes(s.id));
  const favoriteStories = MOCK_STORIES.filter((s) => favorites.includes(s.id));
  const historyStories = MOCK_STORIES.filter((s) => readingHistory.includes(s.id));

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-amber-600" />
          Personal Archive
        </div>
        <h1 className="text-3xl font-extrabold text-stone-900 font-serif tracking-tight">
          Your Folklore Library
        </h1>
        <p className="text-sm text-stone-600">
          Manage your saved tales, continue active chapters, and revisit memorable quotations.
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab("continue")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "continue"
              ? "bg-amber-600 text-white shadow-sm"
              : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
          }`}
        >
          <Play className="w-3.5 h-3.5" />
          Continue Reading ({continueReading.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("bookmarks")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "bookmarks"
              ? "bg-amber-600 text-white shadow-sm"
              : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          Bookmarks ({bookmarkedStories.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("favorites")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "favorites"
              ? "bg-amber-600 text-white shadow-sm"
              : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          Favorites ({favoriteStories.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("history")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "history"
              ? "bg-amber-600 text-white shadow-sm"
              : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
          }`}
        >
          <History className="w-3.5 h-3.5" />
          Recently Read ({historyStories.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("quotes")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "quotes"
              ? "bg-amber-600 text-white shadow-sm"
              : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
          }`}
        >
          <Quote className="w-3.5 h-3.5" />
          Saved Quotes ({savedQuotes.length})
        </button>
      </div>

      {/* Tab 1: Continue Reading */}
      {activeTab === "continue" && (
        <div className="space-y-4">
          {continueReading.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
              <BookOpen className="w-10 h-10 text-stone-400 mx-auto" />
              <h3 className="text-base font-bold text-stone-900 font-serif">No stories in progress</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Explore the archive to start your first interactive folklore journey.
              </p>
              <Link href="/explore">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white text-xs">
                  Explore Stories
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {continueReading.map((item) => (
                <div
                  key={item.storyId}
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-all group"
                >
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden shrink-0 border border-stone-200 bg-stone-100">
                    <Image
                      src={item.coverImage}
                      alt={item.storyTitle}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-2">
                    <div>
                      <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                        Chapter {item.lastChapterNumber}
                      </span>
                      <h3 className="text-sm font-bold text-stone-900 truncate font-serif">
                        {item.storyTitle}
                      </h3>
                      <p className="text-xs text-stone-500 truncate">
                        by {item.authorPenName}
                      </p>
                    </div>

                    {/* Progress */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-stone-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-400" /> {item.lastReadAt}
                        </span>
                        <span className="font-semibold text-stone-700">
                          {item.progressPercentage}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                          style={{ width: `${item.progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <Link href={`/story/${item.storyId}/read`}>
                    <Button
                      size="sm"
                      className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-xs shrink-0"
                    >
                      <Play className="w-3.5 h-3.5 fill-white mr-1" />
                      Resume
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Bookmarks */}
      {activeTab === "bookmarks" && (
        <div className="space-y-4">
          {bookmarkedStories.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
              <Bookmark className="w-10 h-10 text-stone-400 mx-auto" />
              <h3 className="text-base font-bold text-stone-900 font-serif">No Bookmarks Saved</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Bookmark stories while browsing to keep them easily accessible in your circle.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookmarkedStories.map((story) => (
                <div
                  key={story.id}
                  className="flex flex-col bg-white rounded-2xl border border-stone-200 p-4 justify-between space-y-3 shadow-xs hover:shadow-md transition-all"
                >
                  <div className="flex gap-3">
                    <div className="relative w-16 h-20 rounded-xl overflow-hidden shrink-0 border border-stone-200">
                      <Image src={story.coverImage} alt={story.title} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <Badge className="bg-amber-100 text-amber-900 text-[10px]">
                        {story.tradition}
                      </Badge>
                      <Link href={`/story/${story.id}`}>
                        <h4 className="text-sm font-bold text-stone-900 truncate font-serif hover:text-amber-700">
                          {story.title}
                        </h4>
                      </Link>
                      <p className="text-xs text-stone-500 truncate">
                        by {story.authorPenName || story.authorName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={() => toggleBookmark(story.id)}
                      className="text-xs text-stone-400 hover:text-red-600 flex items-center gap-1 font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                    <Link href={`/story/${story.id}`}>
                      <Button size="sm" variant="outline" className="text-xs rounded-xl">
                        View Details <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Favorites */}
      {activeTab === "favorites" && (
        <div className="space-y-4">
          {favoriteStories.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
              <Heart className="w-10 h-10 text-stone-400 mx-auto" />
              <h3 className="text-base font-bold text-stone-900 font-serif">No Favorites Yet</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Mark your most treasured African folklore titles as favorites.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteStories.map((story) => (
                <div
                  key={story.id}
                  className="flex flex-col bg-white rounded-2xl border border-stone-200 p-4 justify-between space-y-3 shadow-xs hover:shadow-md transition-all"
                >
                  <div className="flex gap-3">
                    <div className="relative w-16 h-20 rounded-xl overflow-hidden shrink-0 border border-stone-200">
                      <Image src={story.coverImage} alt={story.title} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <Badge className="bg-amber-100 text-amber-900 text-[10px]">
                        {story.mainGenre}
                      </Badge>
                      <Link href={`/story/${story.id}`}>
                        <h4 className="text-sm font-bold text-stone-900 truncate font-serif hover:text-amber-700">
                          {story.title}
                        </h4>
                      </Link>
                      <p className="text-xs text-stone-500 truncate">
                        by {story.authorPenName || story.authorName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={() => toggleFavorite(story.id)}
                      className="text-xs text-stone-400 hover:text-red-600 flex items-center gap-1 font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                    <Link href={`/story/${story.id}/read`}>
                      <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white text-xs rounded-xl">
                        Read Story
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Recently Read History */}
      {activeTab === "history" && (
        <div className="space-y-4">
          <div className="divide-y divide-stone-200 bg-white rounded-2xl border border-stone-200 p-2">
            {historyStories.map((story) => (
              <div
                key={story.id}
                className="flex items-center justify-between p-4 hover:bg-stone-50 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-12 h-16 rounded-lg overflow-hidden shrink-0 border border-stone-200">
                    <Image src={story.coverImage} alt={story.title} fill className="object-cover" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <h4 className="text-sm font-bold text-stone-900 truncate font-serif">
                      {story.title}
                    </h4>
                    <p className="text-xs text-stone-500 truncate">
                      by {story.authorPenName || story.authorName} • {story.tradition}
                    </p>
                  </div>
                </div>
                <Link href={`/story/${story.id}/read`}>
                  <Button size="sm" variant="outline" className="text-xs rounded-xl">
                    Revisit Tale
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Saved Quotes & Highlights */}
      {activeTab === "quotes" && (
        <div className="space-y-4">
          {savedQuotes.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
              <Quote className="w-10 h-10 text-stone-400 mx-auto" />
              <h3 className="text-base font-bold text-stone-900 font-serif">No Saved Quotes</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Highlight memorable prose inside the reader to save pearls of traditional wisdom here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedQuotes.map((q) => (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3 flex flex-col justify-between shadow-xs hover:shadow-md transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-stone-400">
                      <span className="font-semibold text-amber-800">
                        {q.storyTitle} • Ch. {q.chapterNumber}
                      </span>
                      <span>{q.savedAt}</span>
                    </div>

                    <p className="text-stone-800 text-sm font-serif italic leading-relaxed">
                      &ldquo;{q.quoteText}&rdquo;
                    </p>
                    <p className="text-xs text-stone-500">— {q.authorPenName}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs">
                    <button
                      type="button"
                      onClick={() => handleCopyQuote(q.quoteText, q.id)}
                      className="text-stone-600 hover:text-amber-700 flex items-center gap-1 font-medium"
                    >
                      {copiedQuoteId === q.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy Quote
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => removeSavedQuote(q.id)}
                      className="text-stone-400 hover:text-red-600 flex items-center gap-1 font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
