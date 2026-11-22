"use client";

import { useState, useEffect, useCallback } from "react";
import { SavedQuote, ReadingProgress, Story } from "@/types";
import {
  getLibraryOverview,
  clearLibrary,
  upsertReadingProgress,
  deleteReadingProgress,
  addStoryBookmark,
  removeStoryBookmark,
addStoryFavorite,
  removeStoryFavorite,
  saveUserQuote,
  deleteUserQuote,
  LibraryCounters,
} from "@/src/services/libraryService";

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
  const [bookmarkedStories, setBookmarkedStories] = useState<Story[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoriteStories, setFavoriteStories] = useState<Story[]>([]);
  const [readingHistory, setReadingHistory] = useState<string[]>([]);
  const [savedQuotes, setSavedQuotes] = useState<SavedQuote[]>([]);
  const [continueReading, setContinueReading] = useState<ReadingProgress[]>([]);
  const [counters, setCounters] = useState<LibraryCounters>({
    recentlyRead: 0,
    bookmarks: 0,
    favorites: 0,
    quotes: 0,
    total: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

    // 1. Initial Load: Load local cache immediately, then sync with GET /api/v1/users/library
    const loadLibraryData = useCallback(async () => {
      // A. Read local storage cache first
      try {
        const storedBookmarks = localStorage.getItem("inkoma_bookmarks");
        const storedFavorites = localStorage.getItem("inkoma_favorites");
        const storedHistory = localStorage.getItem("inkoma_history");
        const storedQuotes = localStorage.getItem("inkoma_quotes");
        const storedProgress = localStorage.getItem("inkoma_progress");

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

        setBookmarks(cleanBookmarks);
        setFavorites(cleanFavorites);
        setReadingHistory(cleanHistory);
        setSavedQuotes(cleanQuotes);
        setContinueReading(cleanProgress);
        setCounters({
          recentlyRead: cleanProgress.length,
          bookmarks: cleanBookmarks.length,
          favorites: cleanFavorites.length,
          quotes: cleanQuotes.length,
          total: cleanProgress.length + cleanBookmarks.length + cleanFavorites.length + cleanQuotes.length,
        });
      } catch {
        // Fallback
      } finally {
        setIsLoaded(true);
      }

      // B. Fetch remote aggregate library overview (GET /api/v1/users/library)
      const token = typeof window !== "undefined" ? localStorage.getItem("inkoma_auth_token") : null;
      if (token) {
        setIsLoading(true);
        try {
          const overview = await getLibraryOverview();

          // Update Reading Progress
          if (Array.isArray(overview.progress)) {
            setContinueReading(overview.progress);
            try {
              localStorage.setItem("inkoma_progress", JSON.stringify(overview.progress));
            } catch { }
          }

          // Update Bookmarks
          if (Array.isArray(overview.bookmarks)) {
            setBookmarkedStories(overview.bookmarks);
            const bookmarkIds = overview.bookmarks.map((s) => s.id).filter(Boolean);
            setBookmarks((prev) => {
              const merged = Array.from(new Set([...prev, ...bookmarkIds]));
              try {
                localStorage.setItem("inkoma_bookmarks", JSON.stringify(merged));
              } catch { }
              return merged;
            });
          }

          // Update Favorites
          if (Array.isArray(overview.favorites)) {
            setFavoriteStories(overview.favorites);
            const favoriteIds = overview.favorites.map((s) => s.id).filter(Boolean);
            setFavorites((prev) => {
              const merged = Array.from(new Set([...prev, ...favoriteIds]));
              try {
                localStorage.setItem("inkoma_favorites", JSON.stringify(merged));
              } catch { }
              return merged;
            });
          }

          // Update Saved Quotes
          if (Array.isArray(overview.quotes)) {
            setSavedQuotes(overview.quotes);
            try {
              localStorage.setItem("inkoma_quotes", JSON.stringify(overview.quotes));
            } catch { }
          }

          // Update Counters
          if (overview.counters) {
            setCounters(overview.counters);
          }
        } catch (err) {
          console.warn("[useLibrary] Backend library sync warning:", err);
        } finally {
          setIsLoading(false);
        }
      }
    }, []);

    useEffect(() => {
      loadLibraryData();
    }, [loadLibraryData]);

    // 2. Bookmark Synchronization (POST / DELETE /api/v1/users/bookmarks/:storyId)
    const toggleBookmark = useCallback((storyId: string) => {
      if (!storyId) return;

      setBookmarks((prev) => {
        const willBookmark = !prev.includes(storyId);
        const next = willBookmark ? [...prev, storyId] : prev.filter((id) => id !== storyId);
        try {
          localStorage.setItem("inkoma_bookmarks", JSON.stringify(next));
        } catch { }

        // Update counters
        setCounters((c) => ({
          ...c,
          bookmarks: next.length,
          total: c.recentlyRead + next.length + c.favorites + c.quotes,
        }));

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

      // Also update bookmarkedStories if unbookmarking
      setBookmarkedStories((prev) => prev.filter((s) => s.id !== storyId));
    }, []);

    // 3. Favorites Collection Management (POST / DELETE /api/v1/users/favorites/:storyId)
    const toggleFavorite = useCallback((storyId: string) => {
      if (!storyId) return;

      setFavorites((prev) => {
        const willFavorite = !prev.includes(storyId);
        const next = willFavorite ? [...prev, storyId] : prev.filter((id) => id !== storyId);
        try {
          localStorage.setItem("inkoma_favorites", JSON.stringify(next));
        } catch { }

        // Update counters
        setCounters((c) => ({
          ...c,
          favorites: next.length,
          total: c.recentlyRead + c.bookmarks + next.length + c.quotes,
        }));

        // Background API sync
        const token = typeof window !== "undefined" ? localStorage.getItem("inkoma_auth_token") : null;
        if (token) {
          if (willFavorite) {
            addStoryFavorite(storyId).catch((err) => {
              console.warn("[useLibrary] Failed to add favorite on server:", err);
            });
          } else {
            removeStoryFavorite(storyId).catch((err) => {
              console.warn("[useLibrary] Failed to remove favorite on server:", err);
            });
          }
        }

        return next;
      });

      setFavoriteStories((prev) => prev.filter((s) => s.id !== storyId));
    }, []);

    // 4. Saved Quotes Creation & Deletion (POST / DELETE /api/v1/users/quotes)
    const addSavedQuote = useCallback((quote: Omit<SavedQuote, "id" | "savedAt">) => {
      const tempId = `quote-${Date.now()}`;
      const newQuote: SavedQuote = {
        ...quote,
        id: tempId,
        savedAt: new Date().toISOString().split("T")[0],
      };

      setSavedQuotes((prev) => {
        const next = [newQuote, ...prev.filter((q) => !isDummyQuote(q))];
        try {
          localStorage.setItem("inkoma_quotes", JSON.stringify(next));
        } catch { }

        setCounters((c) => ({
          ...c,
          quotes: next.length,
          total: c.recentlyRead + c.bookmarks + c.favorites + next.length,
        }));

        return next;
      });

      // Background API call
      const token = typeof window !== "undefined" ? localStorage.getItem("inkoma_auth_token") : null;
      if (token) {
        saveUserQuote({
          storyId: quote.storyId,
          storyTitle: quote.storyTitle,
          chapterNumber: quote.chapterNumber,
          quoteText: quote.quoteText,
          authorPenName: quote.authorPenName,
          chapterTitle: quote.chapterTitle,
        })
          .then((saved) => {
            if (saved && saved.id) {
              setSavedQuotes((prev) =>
                prev.map((q) => (q.id === tempId ? { ...q, id: saved.id } : q))
              );
            }
          })
          .catch((err) => {
            console.warn("[useLibrary] Failed to save quote on server:", err);
          });
      }

      return newQuote;
    }, []);

    const removeSavedQuote = useCallback((quoteId: string) => {
      setSavedQuotes((prev) => {
        const next = prev.filter((q) => q.id !== quoteId);
        try {
          localStorage.setItem("inkoma_quotes", JSON.stringify(next));
        } catch { }

        setCounters((c) => ({
          ...c,
          quotes: next.length,
          total: c.recentlyRead + c.bookmarks + c.favorites + next.length,
        }));

        return next;
      });

      const token = typeof window !== "undefined" ? localStorage.getItem("inkoma_auth_token") : null;
      if (token && quoteId && !quoteId.startsWith("quote-")) {
        deleteUserQuote(quoteId).catch((err) => {
          console.warn("[useLibrary] Failed to delete quote on server:", err);
        });
      }
    }, []);

    // 5. Reading Progress & Recently Read Management (PUT / DELETE /api/v1/users/library/progress/:storyId)
    const updateReadingProgress = useCallback((progress: ReadingProgress) => {
      if (isDummyProgress(progress)) return;

      setContinueReading((prev) => {
        const filtered = prev.filter((p) => p.storyId !== progress.storyId && !isDummyProgress(p));
        const next = [progress, ...filtered];
        try {
          localStorage.setItem("inkoma_progress", JSON.stringify(next));
        } catch { }

        setCounters((c) => ({
          ...c,
          recentlyRead: next.length,
          total: next.length + c.bookmarks + c.favorites + c.quotes,
        }));

        return next;
      });

      // Background API sync
      const token = typeof window !== "undefined" ? localStorage.getItem("inkoma_auth_token") : null;
      if (token && progress.storyId) {
        upsertReadingProgress(progress.storyId, {
          lastChapterNumber: progress.lastChapterNumber,
          progressPercentage: progress.progressPercentage,
          lastReadNodeId: progress.lastChapterId,
          lastChapterId: progress.lastChapterId,
          lastChapterTitle: progress.lastChapterTitle,
        }).catch((err) => {
          console.warn("[useLibrary] Failed to sync reading progress on server:", err);
        });
      }
    }, []);

    const removeReadingProgress = useCallback((storyId: string) => {
      setContinueReading((prev) => {
        const next = prev.filter((p) => p.storyId !== storyId);
        try {
          localStorage.setItem("inkoma_progress", JSON.stringify(next));
        } catch { }

        setCounters((c) => ({
          ...c,
          recentlyRead: next.length,
          total: next.length + c.bookmarks + c.favorites + c.quotes,
        }));

        return next;
      });

      const token = typeof window !== "undefined" ? localStorage.getItem("inkoma_auth_token") : null;
      if (token && storyId) {
        deleteReadingProgress(storyId).catch((err) => {
          console.warn("[useLibrary] Failed to remove reading progress on server:", err);
        });
      }
    }, []);

      // 6. Complete Library Reset ("Clear Library" button: DELETE /api/v1/users/library)
      const clearAllLibraryData = useCallback(async () => {
        setBookmarks([]);
        setBookmarkedStories([]);
        setFavorites([]);
        setFavoriteStories([]);
        setReadingHistory([]);
        setSavedQuotes([]);
        setContinueReading([]);
        setCounters({
          recentlyRead: 0,
          bookmarks: 0,
          favorites: 0,
          quotes: 0,
          total: 0,
        });

        try {
          localStorage.removeItem("inkoma_bookmarks");
          localStorage.removeItem("inkoma_favorites");
          localStorage.removeItem("inkoma_history");
          localStorage.removeItem("inkoma_quotes");
          localStorage.removeItem("inkoma_progress");
        } catch { }

        const token = typeof window !== "undefined" ? localStorage.getItem("inkoma_auth_token") : null;
        if (token) {
          try {
            await clearLibrary();
          } catch (err) {
            console.warn("[useLibrary] Failed to clear library on server:", err);
          }
        }
      }, []);

      return {
        bookmarks,
        bookmarkedStories,
        favorites,
        favoriteStories,
        readingHistory,
        savedQuotes,
        continueReading,
        counters,
        isLoaded,
        isLoading,
        refetchLibrary: loadLibraryData,
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
