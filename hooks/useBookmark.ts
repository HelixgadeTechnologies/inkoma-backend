'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { toggleBookmark as firestoreToggleBookmark } from '@/src/services/storyService';

export function useBookmark(storyId: string) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { user } = useAuth();

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

  const toggleBookmark = async () => {
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

      if (user?.id) {
        await firestoreToggleBookmark(user.id, storyId).catch((err) => {
          console.warn('[useBookmark] Firestore toggle warning:', err);
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return { isBookmarked, toggleBookmark };
}
