import { apiClient } from "@/src/services/api";
import { Story, SavedQuote, ReadingProgress } from "@/types";
import { normalizeStory } from "@/src/services/storyService";

export interface LibraryCounters {
  recentlyRead: number;
  bookmarks: number;
  favorites: number;
  quotes: number;
  total: number;
}

export interface LibraryOverview {
  progress: ReadingProgress[];
  bookmarks: Story[];
  favorites: Story[];
  quotes: SavedQuote[];
  counters: LibraryCounters;
}

export interface UpsertProgressPayload {
  lastChapterNumber: number;
  progressPercentage: number;
  lastReadNodeId?: string;
  lastChapterId?: string;
  lastChapterTitle?: string;
}

export interface SaveQuotePayload {
  storyId: string;
  storyTitle: string;
  chapterNumber: number;
  quoteText: string;
  authorPenName?: string;
  chapterTitle?: string;
}

/**
 * Normalizes reading progress from MongoDB / Render backend
 */
export function normalizeProgress(data: any): ReadingProgress {
  if (!data) return {} as ReadingProgress;
  const story = data.story || {};
  const storyId = String(data.storyId || story._id || story.id || data.id || "");
  const storyTitle = data.storyTitle || story.title || "Untitled Story";
  const coverImage =
    data.coverImage ||
    story.coverImage ||
    story.coverImageUrl ||
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop";
  const authorPenName =
    data.authorPenName ||
    story.authorPenName ||
    story.authorName ||
    "Storyteller";

  return {
    storyId,
    storyTitle,
    coverImage,
    authorPenName,
    lastChapterId: String(data.lastChapterId || data.lastReadNodeId || "node-1"),
    lastChapterNumber: Number(data.lastChapterNumber || 1),
    lastChapterTitle: data.lastChapterTitle || `Chapter ${data.lastChapterNumber || 1}`,
    progressPercentage: Number(data.progressPercentage || 0),
    lastReadAt: data.lastReadAt || data.updatedAt || new Date().toISOString().split("T")[0],
  };
}

/**
 * Normalizes saved quote from MongoDB / Render backend
 */
export function normalizeQuote(data: any): SavedQuote {
  if (!data) return {} as SavedQuote;
  return {
    id: String(data._id || data.id || `quote-${Date.now()}`),
    storyId: String(data.storyId || data.story?._id || data.story?.id || ""),
    storyTitle: data.storyTitle || data.story?.title || "Folklore Story",
    chapterNumber: Number(data.chapterNumber || 1),
    chapterTitle: data.chapterTitle || `Chapter ${data.chapterNumber || 1}`,
    authorPenName: data.authorPenName || data.story?.authorPenName || data.story?.authorName || "Storyteller",
    quoteText: data.quoteText || "",
    savedAt: data.savedAt || data.createdAt || new Date().toISOString().split("T")[0],
  };
}

/**
 * 1. GET /api/v1/users/library: Aggregate library overview with live counters for all 4 tabs
 */
export async function getLibraryOverview(): Promise<LibraryOverview> {
  const res = await apiClient.get<any>("/users/library");
  const data = res?.data || res || {};

  const rawProgress = Array.isArray(data.progress)
    ? data.progress
    : Array.isArray(data.recentlyRead)
    ? data.recentlyRead
    : [];

  const rawBookmarks = Array.isArray(data.bookmarks)
    ? data.bookmarks
    : [];

  const rawFavorites = Array.isArray(data.favorites)
    ? data.favorites
    : [];

  const rawQuotes = Array.isArray(data.quotes)
    ? data.quotes
    : Array.isArray(data.savedQuotes)
    ? data.savedQuotes
    : [];

  const progress = rawProgress.map(normalizeProgress);
  const bookmarks = rawBookmarks.map(normalizeStory);
  const favorites = rawFavorites.map(normalizeStory);
  const quotes = rawQuotes.map(normalizeQuote);

  const counters: LibraryCounters = {
    recentlyRead: data.counters?.recentlyRead ?? data.counters?.progress ?? progress.length,
    bookmarks: data.counters?.bookmarks ?? bookmarks.length,
    favorites: data.counters?.favorites ?? favorites.length,
    quotes: data.counters?.quotes ?? quotes.length,
    total:
      data.counters?.total ??
      (progress.length + bookmarks.length + favorites.length + quotes.length),
  };

  return {
    progress,
    bookmarks,
    favorites,
    quotes,
    counters,
  };
}

/**
 * 2. DELETE /api/v1/users/library: Complete library reset ("Clear Library" button)
 */
export async function clearLibrary(): Promise<void> {
  await apiClient.delete<any>("/users/library");
}

/**
 * 3. GET /api/v1/users/library/progress: Reading progress list
 */
export async function getReadingProgressList(): Promise<ReadingProgress[]> {
  const res = await apiClient.get<any>("/users/library/progress");
  const list = res?.data?.progress || res?.data || (Array.isArray(res) ? res : []);
  return list.map(normalizeProgress);
}

/**
 * 4. PUT /api/v1/users/library/progress/:storyId: Upsert reading progress
 */
export async function upsertReadingProgress(
  storyId: string,
  payload: UpsertProgressPayload
): Promise<void> {
  await apiClient.put<any>(`/users/library/progress/${encodeURIComponent(storyId)}`, {
    lastChapterNumber: Math.max(1, payload.lastChapterNumber),
    progressPercentage: Math.min(100, Math.max(0, payload.progressPercentage)),
    lastReadNodeId: payload.lastReadNodeId,
  });
}

/**
 * 5. DELETE /api/v1/users/library/progress/:storyId: Remove story from reading progress
 */
export async function deleteReadingProgress(storyId: string): Promise<void> {
  await apiClient.delete<any>(`/users/library/progress/${encodeURIComponent(storyId)}`);
}

/**
 * 6. GET /api/v1/users/bookmarks: Get user bookmarks
 */
export async function getUserBookmarks(): Promise<Story[]> {
  const res = await apiClient.get<any>("/users/bookmarks");
  const list =
    res?.data?.bookmarks ||
    res?.data?.stories ||
    res?.bookmarks ||
    res?.stories ||
    (Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : []);
  return list.map(normalizeStory);
}

/**
 * 7. POST /api/v1/users/bookmarks/:storyId: Bookmark a story
 */
export async function addStoryBookmark(storyId: string): Promise<void> {
  await apiClient.post<any>(`/users/bookmarks/${encodeURIComponent(storyId)}`, {});
}

/**
 * 8. DELETE /api/v1/users/bookmarks/:storyId: Remove bookmark
 */
export async function removeStoryBookmark(storyId: string): Promise<void> {
  await apiClient.delete<any>(`/users/bookmarks/${encodeURIComponent(storyId)}`);
}

/**
 * 9. GET /api/v1/users/favorites: Get favorited stories
 */
export async function getUserFavorites(): Promise<Story[]> {
  const res = await apiClient.get<any>("/users/favorites");
  const list =
    res?.data?.favorites ||
    res?.data?.stories ||
    res?.favorites ||
    res?.stories ||
    (Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : []);
  return list.map(normalizeStory);
}

/**
 * 10. POST /api/v1/users/favorites/:storyId: Add story to favorites
 */
export async function addStoryFavorite(storyId: string): Promise<void> {
  await apiClient.post<any>(`/users/favorites/${encodeURIComponent(storyId)}`, {});
}

/**
 * 11. DELETE /api/v1/users/favorites/:storyId: Remove story from favorites
 */
export async function removeStoryFavorite(storyId: string): Promise<void> {
  await apiClient.delete<any>(`/users/favorites/${encodeURIComponent(storyId)}`);
}

/**
 * 12. GET /api/v1/users/quotes: Get saved quotes
 */
export async function getUserQuotes(): Promise<SavedQuote[]> {
  const res = await apiClient.get<any>("/users/quotes");
  const list =
    res?.data?.quotes ||
    res?.data?.savedQuotes ||
    res?.quotes ||
    res?.savedQuotes ||
    (Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : []);
  return list.map(normalizeQuote);
}

/**
 * 13. POST /api/v1/users/quotes: Save a new quote
 */
export async function saveUserQuote(payload: SaveQuotePayload): Promise<SavedQuote> {
  const res = await apiClient.post<any>("/users/quotes", payload);
  const rawQuote = res?.data?.quote || res?.data || res?.quote || res;
  return normalizeQuote(rawQuote);
}

/**
 * 14. DELETE /api/v1/users/quotes/:quoteId: Delete a saved quote
 */
export async function deleteUserQuote(quoteId: string): Promise<void> {
  await apiClient.delete<any>(`/users/quotes/${encodeURIComponent(quoteId)}`);
}
