"use client";

import { useState, useMemo } from 'react';
import { create } from 'zustand';
import { Story, StoryFilterOptions, StoryChapter, StoryNode } from '@/types';
import { MOCK_STORIES } from '@/config/mock-data';

interface StoryStoreState {
  activeChapterIndex: number;
  currentNodeId: string;
  fontSize: 'sm' | 'md' | 'lg' | 'xl';
  readingTheme: 'parchment' | 'night' | 'sandstone';
  setChapterIndex: (index: number) => void;
  setCurrentNodeId: (nodeId: string) => void;
  setFontSize: (size: 'sm' | 'md' | 'lg' | 'xl') => void;
  setReadingTheme: (theme: 'parchment' | 'night' | 'sandstone') => void;
}

export const useStoryStore = create<StoryStoreState>((set) => ({
  activeChapterIndex: 0,
  currentNodeId: 'node-1',
  fontSize: 'md',
  readingTheme: 'parchment',
  setChapterIndex: (index) => set({ activeChapterIndex: index }),
  setCurrentNodeId: (nodeId) => set({ currentNodeId: nodeId }),
  setFontSize: (size) => set({ fontSize: size }),
  setReadingTheme: (theme) => set({ readingTheme: theme }),
}));

export function useStory(storyId?: string) {
  const [stories, setStories] = useState<Story[]>(MOCK_STORIES);
  const [filters, setFilters] = useState<StoryFilterOptions>({
    sortBy: 'trending',
  });

  const currentStory = useMemo(() => {
    if (!storyId) return undefined;
    return stories.find(
      (s) =>
        s.id === storyId ||
        s.slug === storyId ||
        (s.aliases && s.aliases.includes(storyId))
    );
  }, [stories, storyId]);

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = story.title.toLowerCase().includes(query);
        const matchesAuthor = (story.authorPenName || story.authorName).toLowerCase().includes(query);
        const matchesGenre = story.mainGenre.toLowerCase().includes(query) || story.subGenres.some(sg => sg.toLowerCase().includes(query));
        const matchesTag = story.tags.some(t => t.toLowerCase().includes(query));

        if (filters.searchScope === 'title' && !matchesTitle) return false;
        if (filters.searchScope === 'author' && !matchesAuthor) return false;
        if (filters.searchScope === 'genre' && !matchesGenre) return false;
        if (!filters.searchScope || filters.searchScope === 'all') {
          if (!matchesTitle && !matchesAuthor && !matchesGenre && !matchesTag) {
            return false;
          }
        }
      }

      if (filters.titleSearch) {
        const titleQuery = filters.titleSearch.toLowerCase();
        if (!story.title.toLowerCase().includes(titleQuery)) return false;
      }

      if (filters.authorSearch) {
        const authorQuery = filters.authorSearch.toLowerCase();
        const authorName = (story.authorPenName || story.authorName).toLowerCase();
        if (!authorName.includes(authorQuery)) return false;
      }

      if (filters.genreSearch) {
        const genreQuery = filters.genreSearch.toLowerCase();
        const matchesGenre = story.mainGenre.toLowerCase().includes(genreQuery) || story.subGenres.some(sg => sg.toLowerCase().includes(genreQuery));
        if (!matchesGenre) return false;
      }

      if (filters.tradition && filters.tradition !== 'all') {
        if (story.tradition !== filters.tradition) return false;
      }

      if (filters.genre) {
        if (story.mainGenre !== filters.genre && !story.subGenres.includes(filters.genre)) {
          return false;
        }
      }

      if (filters.status && filters.status !== 'all') {
        if (story.status !== filters.status) return false;
      }

      if (filters.interactiveOnly && !story.isInteractive) {
        return false;
      }

      if (filters.audioOnly && !story.hasAudioNarration) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'newest') {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
      if (filters.sortBy === 'most_read') {
        return b.readsCount - a.readsCount;
      }
      if (filters.sortBy === 'most_liked') {
        return b.likesCount - a.likesCount;
      }
      if (filters.sortBy === 'readTime') {
        return a.estimatedReadTime - b.estimatedReadTime;
      }
      // default trending
      return (b.readsCount + b.likesCount * 3) - (a.readsCount + a.likesCount * 3);
    });
  }, [stories, filters]);

  const featuredStories = useMemo(() => stories.filter((s) => s.isFeatured), [stories]);
  const recentlyUpdated = useMemo(() => stories.filter((s) => s.isRecentlyUpdated || s.status === 'ongoing'), [stories]);
  const newReleases = useMemo(() => stories.filter((s) => s.isNewRelease || new Date(s.publishedAt).getFullYear() === 2026), [stories]);

  const getChapter = (chapterIdOrNum: string | number): StoryChapter | undefined => {
    if (!currentStory?.chapters) return undefined;
    if (typeof chapterIdOrNum === 'number') {
      return currentStory.chapters.find((c) => c.number === chapterIdOrNum);
    }
    return currentStory.chapters.find((c) => c.id === chapterIdOrNum);
  };

  const getNode = (nodeId: string): StoryNode | undefined => {
    if (!currentStory?.chapters) return undefined;
    for (const chapter of currentStory.chapters) {
      if (chapter.nodes?.[nodeId]) {
        return chapter.nodes[nodeId];
      }
    }
    return undefined;
  };

  return {
    stories,
    currentStory,
    filteredStories,
    featuredStories,
    recentlyUpdated,
    newReleases,
    filters,
    setFilters,
    getChapter,
    getNode,
  };
}
