"use client";

import { useState, useEffect, useCallback } from "react";
import { SavedQuote, ReadingProgress, Story } from "@/types";
import {
  getUserBookmarks,
  addStoryBookmark,
  removeStoryBookmark,
} from "@/src/services/userService";

// Known dummy / mock identifiers to purge automatically from browser storage
const DUMMY_STORY_IDS = new Set([
  "anansi-and-the-pot-of-wisdom",
  "sundiata-the-lion-king-of-mali",
]);

const isDummyQuote = (q: SavedQuote): boolean => {
  if (!q) return true;
  if (q.id === "quote-1" || q.id === "quote-2") return true;
  if (DUMMY_STORY_IDS.has(q.storyId)) return true;
  if (q.quoteText?.includes("Wisdom is like water")) return true;
  if (q.quoteText?.includes("The tree does not fear the tempest")) return true;
  if (q.storyTitle?.includes("Anansi and the Pot of Wisdom")) return true;
  if (q.storyTitle?.includes("Sundiata: The Lion King of Mali")) return true;
  return false;
};

const isDummyProgress = (p: ReadingProgress): boolean => {
  if (!p) return true;
  if (DUMMY_STORY_IDS.has(p.storyId)) return true;
  if (p.storyTitle?.includes("Anansi and the Pot of Wisdom")) return true;
  if (p.storyTitle?.includes("Sundiata: The Lion King of Mali")) return true;
  return false;
};

export function useLibrary() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [readingHistory, setReadingHistory] = useState<string[]>([]);
  const [savedQuotes, setSavedQuotes] = useState<SavedQuote[]>([]);
  const [continueReading, setContinueReading] = useState<ReadingProgress[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedBookmarks = localStorage.getItem("inkoma_bookmarks");
      const storedFavorites = localStorage.getItem("inkoma_favorites");
      const storedHistory = localStorage.getItem("inkoma_history");
      const storedQuotes = localStorage.getItem("inkoma_quotes");
      const storedProgress = localStorage.getItem("inkoma_progress");

      // Filter out any legacy dummy / mock items
      const parsedBookmarks: string[] = storedBookmarks ? JSON.parse(storedBookmarks) : [];
      const cleanBookmarks = parsedBookmarks.filter((id) => !DUMMY_STORY_IDS.has(id));

      const parsedFavorites: string[] = storedFavorites ? JSON.parse(storedFavorites) : [];
      const cleanFavorites = parsedFavorites.filter((id) => !DUMMY_STORY_IDS.has(id));

      const parsedHistory: string[] = storedHistory ? JSON.parse(storedHistory) : [];
      const cleanHistory = parsedHistory.filter((id) => !DUMMY_STORY_IDS.has(id));

      const parsedQuotes: SavedQuote[] = storedQuotes ? JSON.parse(storedQuotes) : [];
      const cleanQuotes = parsedQuotes.filter((q) => !isDummyQuote(q));

      const parsedProgress: ReadingProgress[] = storedProgress ? JSON.parse(storedProgress) : [];
      const cleanProgress = parsedProgress.filter((p) => !isDummyProgress(p));

      // Synchronize cleaned storage if dummy items were stripped
      if (cleanBookmarks.length !== parsedBookmarks.length) {
        localStorage.setItem("inkoma_bookmarks", JSON.stringify(cleanBookmarks));
      }
      if (cleanFavorites.length !== parsedFavorites.length) {
        localStorage.setItem("inkoma_favorites", JSON.stringify(cleanFavorites));
      }
      if (cleanHistory.length !== parsedHistory.length) {
        localStorage.setItem("inkoma_history", JSON.stringify(cleanHistory));
      }
      if (cleanQuotes.length !== parsedQuotes.length) {
        localStorage.setItem("inkoma_quotes", JSON.stringify(cleanQuotes));
      }
      if (cleanProgress.length !== parsedProgress.length) {
        localStorage.setItem("inkoma_progress", JSON.stringify(cleanProgress));
      }

      setBookmarks(cleanBookmarks);
      setFavorites(cleanFavorites);
      setReadingHistory(cleanHistory);
      setSavedQuotes(cleanQuotes);
      setContinueReading(cleanProgress);

      // Fetch remote bookmarks if user is logged in
      const token = localStorage.getItem("inkoma_auth_token");
      if (token) {
        getUserBookmarks()
          .then((remoteStories) => {
            if (Array.isArray(remoteStories) && remoteStories.length > 0) {
              const remoteIds = remoteStories.map((s) => s.id).filter(Boolean);
              setBookmarks((prev) => {
                const merged = Array.from(new Set([...prev, ...remoteIds]));
                try {
                  localStorage.setItem("inkoma_bookmarks", JSON.stringify(merged));
                } catch {}
                return merged;
              });
            }
          })
          .catch((err) => {
            console.warn("[useLibrary] Remote bookmarks sync warning:", err);
          });
      }
    } catch {
      setBookmarks([]);
      setFavorites([]);
      setReadingHistory([]);
      setSavedQuotes([]);
      setContinueReading([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const toggleBookmark = useCallback((storyId: string) => {
    if (!storyId) return;

    setBookmarks((prev) => {
      const willBookmark = !prev.includes(storyId);
      const next = willBookmark ? [...prev, storyId] : prev.filter((id) => id !== storyId);
      try {
        localStorage.setItem("inkoma_bookmarks", JSON.stringify(next));
      } catch {}

      // Background API sync
      const token = typeof window !== "undefined" ? localStorage.getItem("inkoma_auth_token") : null;
      if (token) {
        if (willBookmark) {
          addStoryBookmark(storyId).catch((err) => {
            console.warn("[useLibrary] Failed to add bookmark on server:", err);
          });
        } else {
          removeStoryBookmark(storyId).catch((err) => {
            console.warn("[useLibrary] Failed to remove bookmark on server:", err);
          });
        }
      }

      return next;
    });
  }, []);

  const toggleFavorite = useCallback((storyId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(storyId) ? prev.filter((id) => id !== storyId) : [...prev, storyId];
      localStorage.setItem("inkoma_favorites", JSON.stringify(next));
      return next;
    });
  }, []);

  const addSavedQuote = useCallback((quote: Omit<SavedQuote, "id" | "savedAt">) => {
    const newQuote: SavedQuote = {
      ...quote,
      id: `quote-${Date.now()}`,
      savedAt: new Date().toISOString().split("T")[0],
    };
    setSavedQuotes((prev) => {
      const next = [newQuote, ...prev.filter((q) => !isDummyQuote(q))];
      localStorage.setItem("inkoma_quotes", JSON.stringify(next));
      return next;
    });
    return newQuote;
  }, []);

  const removeSavedQuote = useCallback((quoteId: string) => {
    setSavedQuotes((prev) => {
      const next = prev.filter((q) => q.id !== quoteId);
      localStorage.setItem("inkoma_quotes", JSON.stringify(next));
      return next;
    });
  }, []);

  const updateReadingProgress = useCallback((progress: ReadingProgress) => {
    if (isDummyProgress(progress)) return;
    setContinueReading((prev) => {
      const filtered = prev.filter((p) => p.storyId !== progress.storyId && !isDummyProgress(p));
      const next = [progress, ...filtered];
      localStorage.setItem("inkoma_progress", JSON.stringify(next));
      return next;
    });
  }, []);

  const removeReadingProgress = useCallback((storyId: string) => {
    setContinueReading((prev) => {
      const next = prev.filter((p) => p.storyId !== storyId);
      localStorage.setItem("inkoma_progress", JSON.stringify(next));
      return next;
    });
  }, []);

  const clearAllLibraryData = useCallback(() => {
    setBookmarks([]);
    setFavorites([]);
    setReadingHistory([]);
    setSavedQuotes([]);
    setContinueReading([]);
    localStorage.removeItem("inkoma_bookmarks");
    localStorage.removeItem("inkoma_favorites");
    localStorage.removeItem("inkoma_history");
    localStorage.removeItem("inkoma_quotes");
    localStorage.removeItem("inkoma_progress");
  }, []);

  return {
    bookmarks,
    favorites,
    readingHistory,
    savedQuotes,
    continueReading,
    isLoaded,
    isBookmarked: (storyId: string) => bookmarks.includes(storyId),
    isFavorited: (storyId: string) => favorites.includes(storyId),
    toggleBookmark,
    toggleFavorite,
    addSavedQuote,
    removeSavedQuote,
    updateReadingProgress,
    removeReadingProgress,
    clearAllLibraryData,
  };
}
