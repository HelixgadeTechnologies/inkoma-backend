export interface LoreBadge {
  id: string;
  name: string;
  description: string;
  iconName: string;
  tier: 'bronze' | 'silver' | 'gold' | 'elder';
  unlockedAt: string;
}

export interface CreatorSupportDetails {
  paystackLink?: string;
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
  isAcceptingSupport?: boolean;
  totalTipsReceived?: number;
}

export interface WritingStatistics {
  storiesPublished: number;
  storiesAuthored?: number;
  draftStories: number;
  totalChaptersPublished: number;
  chaptersAuthored?: number;
  totalReads: number;
  totalLikes: number;
  totalComments: number;
}

export interface ReadingStatistics {
  booksRead: number;
  storiesRead?: number;
  chaptersRead: number;
  readingStreakDays: number;
  hoursRead?: number;
  branchesDiscovered?: number;
  favoriteGenres: string[];
  interests?: string[];
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  penName?: string;
  bio?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  country?: string;
  role: 'reader' | 'writer' | 'griot' | 'elder_admin';
  traditionSpecialty?: string;
  createdAt: string;
  
  // Social metrics
  followersCount: number;
  followingCount: number;
  isFollowing?: boolean;
  publishedStoriesCount?: number;
  totalReadsCount?: number;
  email?: string;
  
  // Stats
  writingStats?: WritingStatistics;
  readingStats?: ReadingStatistics;
  
  // Support & Badges
  supportDetails?: CreatorSupportDetails;
  badges: LoreBadge[];
  
  // Custom links
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    website?: string;
  };
  
  onboardingCompleted?: boolean;
}
