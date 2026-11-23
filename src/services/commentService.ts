import { apiClient } from "@/src/services/api";
import { StoryComment } from "@/types";

export interface CommentPayload {
  content: string;
  chapterNumber?: number;
  nodeId?: string;
  parentCommentId?: string;
}

export interface GetCommentsOptions {
  chapterNumber?: number;
  page?: number;
  limit?: number;
}

export function normalizeComment(c: any, storyIdFallback: string = ""): StoryComment {
  if (!c) return {} as StoryComment;
  const id = String(c._id || c.id || "");
  const author = c.author || {};
  const authorName =
    typeof c.authorName === "string"
      ? c.authorName
      : author.displayName || author.name || author.username || "Reader";
  const authorAvatar =
    typeof c.authorAvatar === "string"
      ? c.authorAvatar
      : author.avatarUrl || author.avatar || "";

  const replies = Array.isArray(c.replies)
    ? c.replies.map((r: any) => normalizeComment(r, storyIdFallback))
    : [];

  return {
    id,
    storyId: String(c.storyId || storyIdFallback || ""),
    nodeId: c.nodeId ? String(c.nodeId) : undefined,
    authorId: String(c.authorId || author._id || author.id || ""),
    authorName,
    authorAvatar,
    content: c.content || "",
    upvotesCount: Number(c.likesCount ?? c.likes ?? c.upvotesCount ?? 0),
    hasUpvoted: Boolean(c.isLiked ?? c.hasUpvoted),
    createdAt: c.createdAt || new Date().toISOString(),
    replies,
  };
}

/**
 * 2. Story Comments & Reader Inline Comments
 * GET /api/v1/stories/:storyId/comments (Public with optional Auth)
 * Returns root comments and populated replies, likes count, and viewer's isLiked state.
 */
export async function getStoryComments(
  storyId: string,
  options: GetCommentsOptions = {}
): Promise<StoryComment[]> {
  if (!storyId) return [];
  try {
    const params: Record<string, string | number> = {};
    if (options.chapterNumber !== undefined) params.chapterNumber = options.chapterNumber;
    if (options.page) params.page = options.page;
    if (options.limit) params.limit = options.limit;

    const res = await apiClient.get<any>(`/stories/${encodeURIComponent(storyId)}/comments`, {
      params,
    });
    const data = res?.data || res || {};
    const rawList = Array.isArray(data.comments)
      ? data.comments
      : Array.isArray(data)
      ? data
      : [];

    return rawList.map((c: any) => normalizeComment(c, storyId));
  } catch (error) {
    console.warn(`[CommentService] Failed to fetch comments for story ${storyId}:`, error);
    return [];
  }
}

/**
 * POST /api/v1/stories/:storyId/comments (Protected)
 * Posts story or chapter comments, or replies to a parentCommentId.
 */
export async function postStoryComment(
  storyId: string,
  payload: CommentPayload
): Promise<StoryComment | null> {
  if (!storyId || !payload.content) return null;
  try {
    const res = await apiClient.post<any>(
      `/stories/${encodeURIComponent(storyId)}/comments`,
      payload
    );
    const data = res?.data?.comment || res?.data || res;
    return normalizeComment(data, storyId);
  } catch (error) {
    console.error(`[CommentService] Failed to post comment on story ${storyId}:`, error);
    throw error;
  }
}

/**
 * POST /api/v1/stories/comments/:commentId/like (Protected)
 * Toggles like/unlike and notifies comment author.
 */
export async function toggleCommentLike(
  commentId: string
): Promise<{ isLiked: boolean; likesCount: number }> {
  if (!commentId) return { isLiked: false, likesCount: 0 };
  const res = await apiClient.post<any>(
    `/stories/comments/${encodeURIComponent(commentId)}/like`,
    {}
  );
  const data = res?.data || res || {};
  return {
    isLiked: Boolean(data.isLiked),
    likesCount: Number(data.likesCount ?? 0),
  };
}

/**
 * DELETE /api/v1/stories/comments/:commentId (Protected)
 * Removes comment and any threaded replies.
 */
export async function deleteStoryComment(commentId: string): Promise<boolean> {
  if (!commentId) return false;
  try {
    await apiClient.delete(`/stories/comments/${encodeURIComponent(commentId)}`);
    return true;
  } catch (error) {
    console.error(`[CommentService] Failed to delete comment ${commentId}:`, error);
    throw error;
  }
}
