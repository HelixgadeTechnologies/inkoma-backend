export interface LoreBadge {
  id: string;
  name: string;
  description: string;
  iconName: string;
  tier: 'bronze' | 'silver' | 'gold' | 'elder';
  unlockedAt: string;
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  role: 'reader' | 'storyteller' | 'griot' | 'elder_admin';
  traditionSpecialty?: string;
  followersCount: number;
  followingCount: number;
  publishedStoriesCount: number;
  totalReadsCount: number;
  badges: LoreBadge[];
  createdAt: string;
  socialLinks?: {
    twitter?: string;
    website?: string;
    github?: string;
  };
}

export interface StoryDraft {
  id: string;
  title: string;
  synopsis: string;
  tradition: string;
  lastEdited: string;
  completionPercentage: number;
  nodesCount: number;
}
