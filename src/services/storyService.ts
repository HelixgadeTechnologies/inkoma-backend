import { apiClient } from "@/src/services/api";
import { uploadCoverImage } from "@/src/services/storageService";
import { Story, StoryChapter, StoryStatus } from "@/types";

export interface CreateStoryMetadata {
  id?: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorPenName?: string;
  title: string;
  subtitle?: string;
  synopsis: string;
  coverImageUrl?: string;
  mainGenre: string;
  subGenres: string[];
  triggerWarnings?: string[];
  ageRating?: string;
  targetAudience?: string;
  storyLanguage?: string;
  tradition?: string;
  status?: StoryStatus;
  chapters?: StoryChapter[];
}

export interface PaginatedStoriesResult {
  stories: Story[];
  lastDoc: any | null;
  hasMore: boolean;
}

/**
 * Creates or updates a draft story on the Render backend (MongoDB)
 */
export async function createDraftStory(
  metadata: CreateStoryMetadata,
  coverFile?: File | Blob
): Promise<string> {
  const storyId = metadata.id || `story-${Date.now()}`;

  let finalCoverUrl = metadata.coverImageUrl || "";
  if (coverFile) {
    try {
      finalCoverUrl = await uploadCoverImage(coverFile, metadata.authorId, storyId);
    } catch (e) {
      console.warn("[StoryService] Error uploading cover image:", e);
    }
  }

  const storyPayload: Record<string, unknown> = {
    id: storyId,
    authorId: metadata.authorId,
    authorName: metadata.authorName,
    authorAvatar: metadata.authorAvatar || "",
    authorPenName: metadata.authorPenName || metadata.authorName,
    title: metadata.title,
    subtitle: metadata.subtitle || "",
    synopsis: metadata.synopsis,
    coverImageUrl: finalCoverUrl,
    coverImage: finalCoverUrl,
    mainGenre: metadata.mainGenre || "Folklore",
    subGenres: metadata.subGenres || [],
    triggerWarnings: metadata.triggerWarnings || [],
    ageRating: metadata.ageRating || "General Audience",
    targetAudience: metadata.targetAudience || "All Readers",
    storyLanguage: metadata.storyLanguage || "English",
    tradition: metadata.tradition || "Pan-African",
    totalChapters: metadata.chapters?.length || 1,
    status: metadata.status || "draft",
    updatedAt: new Date().toISOString(),
  };

  try {
    const res = await apiClient.post<{ id?: string; _id?: string }>(
      "/stories",
      storyPayload
    );
    const returnedId = res.id || res._id || storyId;

    if (metadata.chapters && metadata.chapters.length > 0) {
      for (const chap of metadata.chapters) {
        await saveChapterDraft(returnedId, chap);
      }
    }
    return returnedId;
  } catch (err) {
    console.warn("[StoryService] Backend offline or error; storing draft locally:", err);
    if (typeof window !== "undefined") {
      const localDraft = { ...storyPayload, id: storyId, chapters: metadata.chapters || [] };
      localStorage.setItem("inkoma_draft_story", JSON.stringify(localDraft));

      const rawCustom = localStorage.getItem("inkoma_custom_stories");
      const list: Story[] = rawCustom ? JSON.parse(rawCustom) : [];
      const updatedList = [localDraft as unknown as Story, ...list.filter((s) => s.id !== storyId)];
      localStorage.setItem("inkoma_custom_stories", JSON.stringify(updatedList));
    }
    return storyId;
  }
}

/**
 * Saves a chapter draft into story chapters
 */
export async function saveChapterDraft(
  storyId: string,
  chapterData: Partial<StoryChapter>
): Promise<string> {
  const chapterId = chapterData.id || `chapter-${chapterData.number || Date.now()}`;
  const wordCount = chapterData.content
    ? chapterData.content.trim().split(/\s+/).filter(Boolean).length
    : 0;

  const payload = {
    id: chapterId,
    storyId,
    number: chapterData.number || chapterData.chapterNumber || 1,
    chapterNumber: chapterData.chapterNumber || chapterData.number || 1,
    title: chapterData.title || `Chapter ${chapterData.number || 1}`,
    summary: chapterData.summary || chapterData.synopsis || "",
    synopsis: chapterData.synopsis || chapterData.summary || "",
    content: chapterData.content || "",
    wordCount,
    estimatedReadTime: chapterData.estimatedReadTime || Math.max(1, Math.ceil(wordCount / 200)),
    status: chapterData.status || "draft",
    updatedAt: new Date().toISOString(),
  };

  try {
    await apiClient.put(`/stories/${storyId}/chapters/${chapterId}`, payload);
  } catch (error) {
    console.warn(`[StoryService] Backend save chapter ${chapterId} error, saving locally:`, error);
  }

  return chapterId;
}

/**
 * Fetches story preview with chapters
 */
export async function getStoryPreview(storyId: string): Promise<{
  story: Story | null;
  chapters: StoryChapter[];
}> {
  try {
    const res = await apiClient.get<{ story?: Story; chapters?: StoryChapter[] } | Story>(
      `/stories/${storyId}/preview`
    );
    if (res && "story" in res && res.story) {
      return {
        story: res.story,
        chapters: res.chapters || [],
      };
    }
    if (res && "title" in res) {
      const storyObj = res as Story;
      const chapters = await getStoryChapters(storyId);
      return { story: storyObj, chapters };
    }
  } catch (error) {
    console.warn("[StoryService] Error fetching story preview from backend:", error);
  }

  // Fallback to local draft
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("inkoma_draft_story");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.id === storyId) {
          return { story: parsed, chapters: parsed.chapters || [] };
        }
      }
    } catch {}
  }

  return { story: null, chapters: [] };
}

/**
 * Publishes a story by updating status to 'published'
 */
export async function publishStory(storyId: string): Promise<void> {
  try {
    await apiClient.patch(`/stories/${storyId}/publish`, { status: "published" });
  } catch (error) {
    console.warn("[StoryService] Failed to publish on backend, updating locally:", error);
  }

  if (typeof window !== "undefined") {
    try {
      const rawCustom = localStorage.getItem("inkoma_custom_stories");
      if (rawCustom) {
        const list: Story[] = JSON.parse(rawCustom);
        const updated = list.map((s) =>
          s.id === storyId
            ? { ...s, status: "published" as StoryStatus, publishedAt: new Date().toISOString() }
            : s
        );
        localStorage.setItem("inkoma_custom_stories", JSON.stringify(updated));
      }
    } catch {}
  }
}

/**
 * Fetches published stories for the Home / "For You" page (FYP)
 */
export async function getPublishedStories(options: {
  limitCount?: number;
  startAfterDoc?: any;
} = {}): Promise<PaginatedStoriesResult> {
  const { limitCount = 10 } = options;

  try {
    const res = await apiClient.get<{ stories: Story[]; hasMore?: boolean } | Story[]>("/stories", {
      params: { status: "published", limit: limitCount },
    });

    const storiesList: Story[] = Array.isArray(res) ? res : res?.stories || [];
    const normalized = storiesList.map((data: any) => ({
      ...data,
      id: data.id || data._id,
      coverImage: data.coverImageUrl || data.coverImage,
      publishedAt: data.publishedAt || new Date().toISOString(),
      updatedAt: data.updatedAt || new Date().toISOString(),
    }));

    return {
      stories: normalized,
      lastDoc: null,
      hasMore: Array.isArray(res) ? res.length === limitCount : Boolean(res?.hasMore),
    };
  } catch (error) {
    console.warn("[StoryService] Error fetching published stories from backend:", error);
    // Return empty array or local custom stories
    const localCustom: Story[] =
      typeof window !== "undefined"
        ? (() => {
            try {
              const raw = localStorage.getItem("inkoma_custom_stories");
              return raw ? JSON.parse(raw) : [];
            } catch {
              return [];
            }
          })()
        : [];

    return {
      stories: localCustom.filter((s) => s.status === "published"),
      lastDoc: null,
      hasMore: false,
    };
  }
}

/**
 * Fetches public story details by ID
 */
export async function getStoryById(storyId: string): Promise<Story | null> {
  try {
    const data = await apiClient.get<any>(`/stories/${storyId}`);
    if (data) {
      return {
        ...data,
        id: data.id || data._id,
        coverImage: data.coverImageUrl || data.coverImage,
      } as Story;
    }
  } catch (error) {
    console.warn("[StoryService] Backend getStoryById error:", error);
  }

  // Local storage check
  if (typeof window !== "undefined") {
    try {
      const rawCustom = localStorage.getItem("inkoma_custom_stories");
      if (rawCustom) {
        const list: Story[] = JSON.parse(rawCustom);
        const match = list.find((s) => s.id === storyId);
        if (match) return match;
      }
    } catch {}
  }

  return null;
}

/**
 * Fetches stories created by a specific author
 */
export async function getStoriesByAuthor(authorId: string): Promise<Story[]> {
  const localCustom: Story[] =
    typeof window !== "undefined"
      ? (() => {
          try {
            const raw = localStorage.getItem("inkoma_custom_stories");
            return raw ? JSON.parse(raw) : [];
          } catch {
            return [];
          }
        })()
      : [];

  try {
    const res = await apiClient.get<any[]>("/stories", {
      params: { authorId },
    });
    if (Array.isArray(res)) {
      const fetched: Story[] = res.map((data) => ({
        ...data,
        id: data.id || data._id,
        coverImage: data.coverImageUrl || data.coverImage,
      }));
      return fetched;
    }
  } catch (error) {
    console.warn("[StoryService] Error fetching author stories from backend:", error);
  }

  return localCustom.filter((s: Story) => s.authorId === authorId || !s.authorId);
}

/**
 * Fetches published chapter list for a story
 */
export async function getStoryChapters(storyId: string): Promise<StoryChapter[]> {
  try {
    const res = await apiClient.get<StoryChapter[]>(`/stories/${storyId}/chapters`);
    if (Array.isArray(res)) return res;
  } catch (error) {
    console.warn("[StoryService] Error fetching chapters from backend:", error);
  }

  return [];
}

/**
 * Fetches a single chapter's content
 */
export async function getChapterContent(
  storyId: string,
  chapterNumber: number
): Promise<StoryChapter | null> {
  try {
    const res = await apiClient.get<StoryChapter>(`/stories/${storyId}/chapters/${chapterNumber}`);
    if (res) return res;
  } catch (error) {
    console.warn("[StoryService] Error fetching chapter content from backend:", error);
  }

  return null;
}

/**
 * Toggle bookmark for a user on a story
 */
export async function toggleBookmark(
  userId: string,
  storyId: string
): Promise<{ isBookmarked: boolean }> {
  try {
    const res = await apiClient.post<{ isBookmarked: boolean }>(`/stories/${storyId}/bookmark`, {
      userId,
    });
    return res;
  } catch {
    // Local fallback
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("inkoma_bookmarks");
        const list: string[] = raw ? JSON.parse(raw) : [];
        const isBookmarked = list.includes(storyId);
        const next = isBookmarked ? list.filter((id) => id !== storyId) : [...list, storyId];
        localStorage.setItem("inkoma_bookmarks", JSON.stringify(next));
        return { isBookmarked: !isBookmarked };
      } catch {}
    }
    return { isBookmarked: true };
  }
}

/**
 * Toggle like for a user on a story
 */
export async function toggleLike(
  userId: string,
  storyId: string
): Promise<{ isLiked: boolean }> {
  try {
    const res = await apiClient.post<{ isLiked: boolean }>(`/stories/${storyId}/like`, {
      userId,
    });
    return res;
  } catch {
    // Local fallback
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("inkoma_likes");
        const list: string[] = raw ? JSON.parse(raw) : [];
        const isLiked = list.includes(storyId);
        const next = isLiked ? list.filter((id) => id !== storyId) : [...list, storyId];
        localStorage.setItem("inkoma_likes", JSON.stringify(next));
        return { isLiked: !isLiked };
      } catch {}
    }
    return { isLiked: true };
  }
}
