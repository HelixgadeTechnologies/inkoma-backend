export type Tradition =
  | 'Ashanti/Akan'
  | 'Yoruba'
  | 'Zulu'
  | 'Nubian'
  | 'Dogon'
  | 'Kikuyu'
  | 'Swahili'
  | 'Khoisan'
  | 'Pan-African';

export type StoryDifficulty = 'Beginner' | 'Intermediate' | 'Elderly / Complex';
export type StoryStatus = 'draft' | 'ongoing' | 'completed' | 'published';

export interface StoryChoice {
  id: string;
  label: string;
  targetNodeId: string;
  moralWeight?: number;
  consequenceHint?: string;
  requiredItem?: string;
}

export interface StoryNode {
  id: string;
  title: string;
  content: string;
  illustrationUrl?: string;
  audioNarrationUrl?: string;
  choices: StoryChoice[];
  isEnding?: boolean;
  endingType?: 'triumph' | 'folly' | 'lesson' | 'mystery';
  moralLesson?: string;
}

export interface StoryChapter {
  id: string;
  number: number;
  title: string;
  summary: string;
  content?: string;
  rootNodeId: string;
  nodes: Record<string, StoryNode>;
  readTimeMinutes: number;
  status: 'draft' | 'published';
  likesCount: number;
  commentsCount?: number;
  publishedAt?: string;
  updatedAt: string;
}

export interface Story {
  id: string;
  slug?: string;
  title: string;
  subtitle?: string;
  synopsis: string;
  coverImage: string;
  tradition: Tradition;
  mainGenre: string;
  subGenres: string[];
  tags: string[];
  difficulty: StoryDifficulty;
  status: StoryStatus;
  
  // Author
  authorId: string;
  authorName: string;
  authorPenName?: string;
  authorAvatar?: string;
  authorBio?: string;
  
  // Metrics & Chapters
  createdAt?: string;
  publishedAt: string;
  updatedAt: string;
  estimatedReadTime: number; // in minutes
  totalChapters: number;
  chapters?: StoryChapter[];
  totalBranches: number;
  rootNodeId?: string;
  content?: string;
  
  // Engagement
  readsCount: number;
  likesCount: number;
  bookmarksCount: number;
  favoritesCount?: number;
  commentsCount: number;
  
  // Flags
  isFeatured?: boolean;
  isRecentlyUpdated?: boolean;
  isNewRelease?: boolean;
  isInteractive: boolean;
  hasAudioNarration: boolean;
}

export interface StoryFilterOptions {
  searchQuery?: string;
  searchScope?: 'all' | 'title' | 'author' | 'genre';
  titleSearch?: string;
  authorSearch?: string;
  genreSearch?: string;
  genre?: string;
  subGenre?: string;
  tradition?: Tradition | 'all';
  status?: StoryStatus | 'all';
  interactiveOnly?: boolean;
  audioOnly?: boolean;
  sortBy?: 'trending' | 'newest' | 'most_read' | 'most_liked' | 'readTime';
}
