'use client';

import { useState, useEffect } from 'react';

export function useBookmark(storyId: string) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('inkoma_bookmarks');
      if (saved) {
        const parsed: string[] = JSON.parse(saved);
        setIsBookmarked(parsed.includes(storyId));
      }
    } catch {
      // LocalStorage access fallback
    }
  }, [storyId]);

  const toggleBookmark = () => {
    try {
      const saved = localStorage.getItem('inkoma_bookmarks');
      let parsed: string[] = saved ? JSON.parse(saved) : [];

      if (parsed.includes(storyId)) {
        parsed = parsed.filter((id) => id !== storyId);
        setIsBookmarked(false);
      } else {
        parsed.push(storyId);
        setIsBookmarked(true);
      }

      localStorage.setItem('inkoma_bookmarks', JSON.stringify(parsed));
    } catch (e) {
      console.error(e);
    }
  };

  return { isBookmarked, toggleBookmark };
}
