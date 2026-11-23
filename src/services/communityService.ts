import { apiClient } from "@/src/services/api";
import { CommunityDiscussion } from "@/types";

export interface DiscussionReply {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  likesCount: number;
  isLiked?: boolean;
  createdAt: string;
}

export interface DetailedDiscussion extends CommunityDiscussion {
  repliesList?: DiscussionReply[];
  isLiked?: boolean;
}

export interface GetDiscussionsOptions {
  tradition?: string;
  search?: string;
  sortBy?: "recent" | "popular";
  page?: number;
  limit?: number;
}

export function normalizeDiscussion(raw: any): DetailedDiscussion {
  if (!raw) return {} as DetailedDiscussion;
  const id = String(raw._id || raw.id || "");
  const author = raw.author || {};
  const authorName =
    typeof raw.authorName === "string"
      ? raw.authorName
      : author.displayName || author.name || author.penName || author.username || "Storyteller";
  const authorAvatar =
    typeof raw.authorAvatar === "string"
      ? raw.authorAvatar
      : author.avatarUrl || author.avatar || "";

  const repliesList: DiscussionReply[] = Array.isArray(raw.replies)
    ? raw.replies.map((r: any) => ({
        id: String(r._id || r.id || ""),
        authorId: String(r.authorId || r.author?._id || r.author?.id || ""),
        authorName:
          r.authorName ||
          r.author?.displayName ||
          r.author?.name ||
          r.author?.username ||
          "Storyteller",
        authorAvatar: r.authorAvatar || r.author?.avatarUrl || r.author?.avatar || "",
        content: r.content || "",
        likesCount: Number(r.likesCount ?? r.likes ?? 0),
        isLiked: Boolean(r.isLiked),
        createdAt: r.createdAt || new Date().toISOString(),
      }))
    : [];

  return {
    id,
    title: raw.title || "Untitled Discussion",
    content: raw.content || "",
    authorId: String(raw.authorId || author._id || author.id || ""),
    authorName,
    authorAvatar,
    traditionCategory: raw.traditionCategory || raw.tradition || "Pan-African",
    tags: Array.isArray(raw.tags) ? raw.tags : ["Folklore"],
    repliesCount: Number(raw.repliesCount ?? repliesList.length),
    upvotesCount: Number(raw.upvotesCount ?? raw.likesCount ?? 0),
    isPinned: Boolean(raw.isPinned),
    isLiked: Boolean(raw.isLiked),
    createdAt: raw.createdAt || new Date().toISOString(),
    repliesList,
  };
}

/**
 * 4. Community Lore Agora
 * GET /api/v1/community/discussions (Public with optional Auth)
 * Paginated discussion threads with ?tradition=, ?search=, and ?sortBy=recent|popular.
 */
export async function getDiscussions(
  options: GetDiscussionsOptions = {}
): Promise<DetailedDiscussion[]> {
  try {
    const params: Record<string, string | number> = {
      page: options.page || 1,
      limit: options.limit || 30,
    };
    if (options.tradition && options.tradition !== "All") {
      params.tradition = options.tradition;
    }
    if (options.search && options.search.trim()) {
      params.search = options.search.trim();
    }
    if (options.sortBy) {
      params.sortBy = options.sortBy;
    }

    const res = await apiClient.get<any>("/community/discussions", { params });
    const data = res?.data || res || {};
    const rawList: any[] =
      data.discussions || data.items || (Array.isArray(data) ? data : []);

    return rawList.map(normalizeDiscussion);
  } catch (error) {
    console.warn("[CommunityService] Failed to fetch discussions:", error);
    return [];
  }
}

/**
 * POST /api/v1/community/discussions (Protected)
 * Start a new lore topic with tags.
 */
export async function createDiscussion(payload: {
  title: string;
  content: string;
  tradition?: string;
  tags?: string[];
}): Promise<DetailedDiscussion | null> {
  try {
    const res = await apiClient.post<any>("/community/discussions", payload);
    const data = res?.data?.discussion || res?.data || res;
    return normalizeDiscussion(data);
  } catch (error) {
    console.error("[CommunityService] Failed to create discussion:", error);
    throw error;
  }
}

/**
 * GET /api/v1/community/discussions/:id (Public with optional Auth)
 * Full thread with replies.
 */
export async function getDiscussionById(id: string): Promise<DetailedDiscussion | null> {
  if (!id) return null;
  try {
    const res = await apiClient.get<any>(`/community/discussions/${encodeURIComponent(id)}`);
    const data = res?.data?.discussion || res?.data || res;
    return normalizeDiscussion(data);
  } catch (error) {
    console.warn(`[CommunityService] Failed to get discussion ${id}:`, error);
    return null;
  }
}

/**
 * POST /api/v1/community/discussions/:id/replies (Protected)
 * Post reply to topic.
 */
export async function replyToDiscussion(
  id: string,
  content: string
): Promise<DiscussionReply | null> {
  if (!id || !content.trim()) return null;
  try {
    const res = await apiClient.post<any>(
      `/community/discussions/${encodeURIComponent(id)}/replies`,
      { content: content.trim() }
    );
    const r = res?.data?.reply || res?.data || res;
    return {
      id: String(r._id || r.id || `reply-${Date.now()}`),
      authorId: String(r.authorId || r.author?._id || ""),
      authorName:
        r.authorName ||
        r.author?.displayName ||
        r.author?.name ||
        "Storyteller",
      authorAvatar: r.authorAvatar || r.author?.avatarUrl || "",
      content: r.content || content,
      likesCount: Number(r.likesCount || 0),
      createdAt: r.createdAt || new Date().toISOString(),
    };
  } catch (error) {
    console.error(`[CommunityService] Failed to post reply to discussion ${id}:`, error);
    throw error;
  }
}

/**
 * POST /api/v1/community/discussions/:id/like (Protected)
 * Toggle upvote on thread.
 */
export async function toggleDiscussionLike(
  id: string
): Promise<{ isLiked: boolean; upvotesCount: number }> {
  if (!id) return { isLiked: false, upvotesCount: 0 };
  const res = await apiClient.post<any>(
    `/community/discussions/${encodeURIComponent(id)}/like`,
    {}
  );
  const data = res?.data || res || {};
  return {
    isLiked: Boolean(data.isLiked),
    upvotesCount: Number(data.upvotesCount ?? data.likesCount ?? 0),
  };
}

/**
 * DELETE /api/v1/community/discussions/:id (Protected)
 * Delete thread (author only).
 */
export async function deleteDiscussion(id: string): Promise<boolean> {
  if (!id) return false;
  try {
    await apiClient.delete(`/community/discussions/${encodeURIComponent(id)}`);
    return true;
  } catch (error) {
    console.error(`[CommunityService] Failed to delete discussion ${id}:`, error);
    throw error;
  }
}
