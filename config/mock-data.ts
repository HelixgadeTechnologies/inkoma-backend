import { Story, UserProfile, SavedQuote, ReadingProgress } from '@/types';

export const MOCK_STORIES: Story[] = [];

export const MOCK_CURRENT_USER: UserProfile = {
  id: "",
  username: "storyteller",
  displayName: "Storyteller",
  email: "",
  avatarUrl: "",
  bio: "",
  country: "",
  traditionSpecialty: "",
  role: "storyteller",
  followersCount: 0,
  followingCount: 0,
  badges: [],
  createdAt: new Date().toISOString(),
};

export const MOCK_SAVED_QUOTES: SavedQuote[] = [];

export const MOCK_READING_PROGRESS: ReadingProgress[] = [];
