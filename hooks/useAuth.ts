'use client';

import { useState, useEffect } from 'react';
import { UserProfile } from '@/types';

export function useAuth() {
  const [user, setUser] = useState<{ id: string; email?: string } | null>({
    id: 'user-kwame-01',
    email: 'kwame@inkoma.app',
  });
  const [profile, setProfile] = useState<UserProfile | null>({
    id: 'user-kwame-01',
    username: 'kwame_griot',
    displayName: 'Kwame Asante',
    bio: 'Keeper of Ashanti trickster lore and ancient Dogon constellation myths.',
    role: 'griot',
    followersCount: 1420,
    followingCount: 89,
    publishedStoriesCount: 12,
    totalReadsCount: 38400,
    badges: [
      {
        id: 'badge-1',
        name: 'Spider Web Weaver',
        description: 'Authored 5+ multi-branch interactive tales',
        iconName: 'Sparkles',
        tier: 'gold',
        unlockedAt: '2026-01-15',
      },
      {
        id: 'badge-2',
        name: 'Master Griot',
        description: 'Reached 25,000 oral story listeners',
        iconName: 'Volume2',
        tier: 'elder',
        unlockedAt: '2026-03-20',
      },
    ],
    createdAt: '2025-10-01',
  });
  const [loading, setLoading] = useState(false);

  const signOut = async () => {
    setUser(null);
  };

  const signIn = async (email: string) => {
    setUser({ id: 'user-kwame-01', email });
  };

  return {
    user,
    profile,
    loading,
    signIn,
    signOut,
  };
}
