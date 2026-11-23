import { apiClient } from "@/src/services/api";
import { Story } from "@/types";
import { normalizeStory } from "@/src/services/storyService";
import { TopAuthor } from "@/src/services/userService";

export interface HomeFeedData {
  featured: Story[];
  recommended: Story[];
  newReleases: Story[];
  recentlyUpdated: Story[];
  topAuthors: TopAuthor[];
}

/**
 * 1. Home / Landing Page Feed (GET /api/v1/stories/feed/home) — Public
 * Returns curated payload in a single network request:
 * featured, recommended, newReleases, recentlyUpdated, and topAuthors.
 */
export async function getHomeFeed(): Promise<HomeFeedData> {
  try {
    const res = await apiClient.get<any>("/stories/feed/home");
    const data = res?.data || res || {};

    const normalizeList = (list: any): Story[] => {
      if (!Array.isArray(list)) return [];
      return list.map(normalizeStory);
    };

    const normalizeAuthors = (list: any): TopAuthor[] => {
      if (!Array.isArray(list)) return [];
      return list.map((a: any, idx: number) => ({
        id: String(a._id || a.id || `author-${idx}`),
        rank: idx + 1,
        name: a.displayName || a.name || a.penName || a.username || "Storyteller",
        username: a.username || "",
        penName: a.penName || a.displayName || a.name,
        avatarUrl:
          a.avatarUrl ||
          a.avatar ||
          a.photoURL ||
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
        avatar: a.avatarUrl || a.avatar,
        followersCount: Number(a.followersCount || 0),
        readsCount: Number(a.readsCount || a.totalReads || 0),
        totalReads: Number(a.totalReads || a.readsCount || 0),
        reads: `${Number(a.totalReads || a.readsCount || 0)} Reads`,
        storiesCount: Number(a.storiesCount || 0),
        bio: a.bio || "Storyteller preserving African oral lore.",
      }));
    };

    return {
      featured: normalizeList(data.featured),
      recommended: normalizeList(data.recommended),
      newReleases: normalizeList(data.newReleases),
      recentlyUpdated: normalizeList(data.recentlyUpdated),
      topAuthors: normalizeAuthors(data.topAuthors),
    };
  } catch (error) {
    console.warn("[HomeFeedService] Failed to fetch home feed:", error);
    return {
      featured: [],
      recommended: [],
      newReleases: [],
      recentlyUpdated: [],
      topAuthors: [],
    };
  }
}
