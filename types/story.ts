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
  rootNodeId: string;
  nodes: Record<string, StoryNode>;
  readTimeMinutes: number;
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  synopsis: string;
  coverImage: string;
  tradition: Tradition;
  genres: string[];
  tags: string[];
  difficulty: StoryDifficulty;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  publishedAt: string;
  updatedAt: string;
  estimatedReadTime: number; // in minutes
  totalChapters: number;
  chapters?: StoryChapter[];
  totalBranches: number;
  upvotesCount: number;
  bookmarksCount: number;
  commentsCount: number;
  isFeatured?: boolean;
  isInteractive: boolean;
  hasAudioNarration: boolean;
  status: 'draft' | 'published' | 'archived';
}

export interface StoryFilterOptions {
  genre?: string;
  tradition?: Tradition | 'all';
  searchQuery?: string;
  interactiveOnly?: boolean;
  audioOnly?: boolean;
  sortBy?: 'trending' | 'newest' | 'upvotes' | 'readTime';
}
