export interface PlatformKPIs {
  totalUsers: number;
  totalWriters: number;
  totalReaders: number;
  totalStories: number;
  totalChapters: number;
  totalReads: number;
  totalTipsDonatedUsd: number;
  totalSupportGeneratedUSD: number;
  activeReadersToday: number;
}

export interface ModerationReport {
  id: string;
  storyId?: string;
  storyTitle?: string;
  itemType?: string;
  title?: string;
  authorName?: string;
  reason: string;
  details?: string;
  reportedBy: string;
  reportedAt?: string;
  createdAt?: string;
  status: 'pending' | 'reviewed' | 'dismissed' | 'resolved';
}

export interface AdminUserRecord {
  id: string;
  username: string;
  displayName: string;
  penName?: string;
  email: string;
  role: 'reader' | 'writer' | 'griot' | 'elder_admin' | string;
  storiesCount?: number;
  storiesAuthored?: number;
  joinedAt?: string;
  createdAt?: string;
  isVerifiedGriot?: boolean;
  status: 'active' | 'suspended' | 'banned' | string;
}
