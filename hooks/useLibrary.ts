"use client";

import { useState, useEffect, useCallback } from "react";
import { SavedQuote, ReadingProgress } from "@/types";
import { MOCK_SAVED_QUOTES, MOCK_READING_PROGRESS } from "@/config/mock-data";

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

      setBookmarks(storedBookmarks ? JSON.parse(storedBookmarks) : ["anansi-and-the-pot-of-wisdom"]);
      setFavorites(storedFavorites ? JSON.parse(storedFavorites) : ["anansi-and-the-pot-of-wisdom", "sundiata-the-lion-king-of-mali"]);
      setReadingHistory(storedHistory ? JSON.parse(storedHistory) : ["anansi-and-the-pot-of-wisdom", "sundiata-the-lion-king-of-mali"]);
      setSavedQuotes(storedQuotes ? JSON.parse(storedQuotes) : MOCK_SAVED_QUOTES);
      setContinueReading(storedProgress ? JSON.parse(storedProgress) : MOCK_READING_PROGRESS);
    } catch {
      setSavedQuotes(MOCK_SAVED_QUOTES);
      setContinueReading(MOCK_READING_PROGRESS);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const toggleBookmark = useCallback((storyId: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(storyId) ? prev.filter((id) => id !== storyId) : [...prev, storyId];
      localStorage.setItem("inkoma_bookmarks", JSON.stringify(next));
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
      const next = [newQuote, ...prev];
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
    setContinueReading((prev) => {
      const filtered = prev.filter((p) => p.storyId !== progress.storyId);
      const next = [progress, ...filtered];
      localStorage.setItem("inkoma_progress", JSON.stringify(next));
      return next;
    });
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
  };
}
