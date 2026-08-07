export interface SavedQuote {
  id: string;
  storyId: string;
  storyTitle: string;
  chapterNumber: number;
  chapterTitle: string;
  authorPenName: string;
  quoteText: string;
  savedAt: string;
}

export interface ReadingProgress {
  storyId: string;
  storyTitle: string;
  coverImage: string;
  authorPenName: string;
  lastChapterId: string;
  lastChapterNumber: number;
  lastChapterTitle: string;
  progressPercentage: number;
  lastReadAt: string;
}

export interface LibraryItem {
  storyId: string;
  addedAt: string;
  category: 'bookmark' | 'favorite' | 'history';
}
