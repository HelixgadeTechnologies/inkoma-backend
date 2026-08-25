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
  ArrowRight,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type LibraryTab = "recently_read" | "bookmarks" | "favorites" | "quotes";

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<LibraryTab>("recently_read");
  const {
    bookmarks,
    favorites,
    savedQuotes,
    continueReading,
    toggleBookmark,
    toggleFavorite,
    removeSavedQuote,
  } = useLibrary();

  const [copiedQuoteId, setCopiedQuoteId] = useState<string | null>(null);

  const handleCopyQuote = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedQuoteId(id);
    setTimeout(() => setCopiedQuoteId(null), 2500);
  };

  const bookmarkedStories = MOCK_STORIES.filter((s) => bookmarks.includes(s.id));
  const favoriteStories = MOCK_STORIES.filter((s) => favorites.includes(s.id));

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#680C07]/10 dark:bg-red-500/20 border border-[#680C07]/20 dark:border-red-500/30 text-[#680C07] dark:text-red-400 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-[#680C07] dark:text-red-400" />
          Personal Reading Desk
        </div>
        <h1 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 font-serif tracking-tight">
          Your Library
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          Access your recently read books, bookmarked titles, favorite stories, and saved quotes.
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200 dark:border-stone-800 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab("recently_read")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "recently_read"
              ? "bg-[#680C07] dark:bg-red-700 text-white shadow-sm"
              : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800"
          }`}
        >
          <History className="w-3.5 h-3.5" />
          Recently Read ({continueReading.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("bookmarks")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "bookmarks"
              ? "bg-[#680C07] dark:bg-red-700 text-white shadow-sm"
              : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800"
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
              ? "bg-[#680C07] dark:bg-red-700 text-white shadow-sm"
              : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800"
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          Favorites ({favoriteStories.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("quotes")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "quotes"
              ? "bg-[#680C07] dark:bg-red-700 text-white shadow-sm"
              : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800"
          }`}
        >
          <Quote className="w-3.5 h-3.5" />
          Saved Quotes ({savedQuotes.length})
        </button>
      </div>

      {/* Tab 1: Recently Read */}
      {activeTab === "recently_read" && (
        <div className="space-y-4">
          {continueReading.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 space-y-3">
              <BookOpen className="w-10 h-10 text-stone-400 mx-auto" />
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif">No recently read stories</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
                Explore our catalog to start reading your first book.
              </p>
              <Link href="/explore">
                <Button className="bg-[#680C07] hover:bg-[#520905] dark:bg-red-700 dark:hover:bg-red-800 text-white text-xs font-bold">
                  Explore Stories
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {continueReading.map((item) => (
                <div
                  key={item.storyId}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs hover:shadow-md transition-all group"
                >
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden shrink-0 border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-800">
                    <Image
                      src={item.coverImage}
                      alt={item.storyTitle}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-2">
                    <div>
                      <span className="text-[10px] font-bold text-[#680C07] dark:text-red-400 uppercase tracking-wider">
                        Chapter {item.lastChapterNumber}
                      </span>
                      <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate font-serif">
                        {item.storyTitle}
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                        by {item.authorPenName}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-stone-500 dark:text-stone-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-400" /> {item.lastReadAt}
                        </span>
                        <span className="font-semibold text-stone-700 dark:text-stone-300">
                          {item.progressPercentage}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden border border-stone-200 dark:border-stone-700">
                        <div
                          className="h-full bg-[#680C07] dark:bg-red-600 rounded-full"
                          style={{ width: `${item.progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <Link href={`/story/${item.storyId}/read`}>
                    <Button
                      size="sm"
                      className="bg-[#680C07] hover:bg-[#520905] dark:bg-red-700 dark:hover:bg-red-800 text-white rounded-xl shadow-xs shrink-0 font-bold text-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-white mr-1" />
                      Read
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
            <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 space-y-3">
              <Bookmark className="w-10 h-10 text-stone-400 mx-auto" />
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif">No Bookmarks Saved</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
                Bookmark stories while exploring to save them for later reading.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookmarkedStories.map((story) => (
                <div
                  key={story.id}
                  className="flex flex-col bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-4 justify-between space-y-3 shadow-xs hover:shadow-md transition-all"
                >
                  <div className="flex gap-3">
                    <div className="relative w-16 h-20 rounded-xl overflow-hidden shrink-0 border border-stone-200 dark:border-stone-800">
                      <Image src={story.coverImage} alt={story.title} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <Badge className="bg-[#680C07]/10 dark:bg-red-500/20 text-[#680C07] dark:text-red-400 border border-[#680C07]/20 dark:border-red-500/30 text-[10px]">
                        {story.mainGenre}
                      </Badge>
                      <Link href={`/story/${story.id}`}>
                        <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate font-serif hover:text-[#680C07] dark:hover:text-red-400">
                          {story.title}
                        </h4>
                      </Link>
                      <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                        by {story.authorPenName || story.authorName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
                    <button
                      type="button"
                      onClick={() => toggleBookmark(story.id)}
                      className="text-xs text-stone-400 hover:text-red-600 flex items-center gap-1 font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                    <Link href={`/story/${story.id}`}>
                      <Button size="sm" variant="outline" className="text-xs rounded-xl border-stone-300 dark:border-stone-700">
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
            <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 space-y-3">
              <Heart className="w-10 h-10 text-stone-400 mx-auto" />
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif">No Favorites Yet</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
                Mark stories as favorites to keep your most loved titles here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteStories.map((story) => (
                <div
                  key={story.id}
                  className="flex flex-col bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-4 justify-between space-y-3 shadow-xs hover:shadow-md transition-all"
                >
                  <div className="flex gap-3">
                    <div className="relative w-16 h-20 rounded-xl overflow-hidden shrink-0 border border-stone-200 dark:border-stone-800">
                      <Image src={story.coverImage} alt={story.title} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <Badge className="bg-[#680C07]/10 dark:bg-red-500/20 text-[#680C07] dark:text-red-400 border border-[#680C07]/20 dark:border-red-500/30 text-[10px]">
                        {story.mainGenre}
                      </Badge>
                      <Link href={`/story/${story.id}`}>
                        <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate font-serif hover:text-[#680C07] dark:hover:text-red-400">
                          {story.title}
                        </h4>
                      </Link>
                      <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                        by {story.authorPenName || story.authorName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
                    <button
                      type="button"
                      onClick={() => toggleFavorite(story.id)}
                      className="text-xs text-stone-400 hover:text-red-600 flex items-center gap-1 font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                    <Link href={`/story/${story.id}/read`}>
                      <Button size="sm" className="bg-[#680C07] hover:bg-[#520905] dark:bg-red-700 dark:hover:bg-red-800 text-white text-xs font-bold rounded-xl">
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

      {/* Tab 4: Saved Quotes */}
      {activeTab === "quotes" && (
        <div className="space-y-4">
          {savedQuotes.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 space-y-3">
              <Quote className="w-10 h-10 text-stone-400 mx-auto" />
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif">No Saved Quotes</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
                Save memorable sentences and quotes while reading to revisit them anytime.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedQuotes.map((q) => (
                <div
                  key={q.id}
                  className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 space-y-3 flex flex-col justify-between shadow-xs hover:shadow-md transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-stone-400">
                      <span className="font-semibold text-[#680C07] dark:text-red-400">
                        {q.storyTitle} • Ch. {q.chapterNumber}
                      </span>
                      <span>{q.savedAt}</span>
                    </div>

                    <p className="text-stone-800 dark:text-stone-200 text-sm font-serif italic leading-relaxed">
                      &ldquo;{q.quoteText}&rdquo;
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">— {q.authorPenName}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800 text-xs">
                    <button
                      type="button"
                      onClick={() => handleCopyQuote(q.quoteText, q.id)}
                      className="text-stone-600 dark:text-stone-400 hover:text-[#680C07] dark:hover:text-red-400 flex items-center gap-1 font-medium"
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
