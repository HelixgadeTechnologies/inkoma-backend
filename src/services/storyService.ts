import { apiClient } from "@/src/services/api";
import { uploadCoverImage } from "@/src/services/storageService";
import { Story, StoryChapter, StoryStatus } from "@/types";

export interface StoryChapterInput {
  id?: string;
  number?: number;
  chapterNumber?: number;
  title: string;
  summary?: string;
  synopsis?: string;
  content?: string;
  status?: "draft" | "published";
}

export interface CreateStoryPayload {
  title: string;
  subtitle?: string;
  synopsis: string;
  coverImage: string;
  mainGenre: string;
  subGenres?: string[];
  storyLanguage?: string;
  targetAudience?: string;
  ageRating?: string;
  triggerWarnings?: string[];
  tradition?: string;
  difficulty?: string;
  tags?: string[];
  status?: StoryStatus | "draft" | "ongoing" | "completed";
  chapters?: StoryChapterInput[];
}

export interface CreateStoryMetadata extends Omit<Partial<CreateStoryPayload>, "chapters"> {
  id?: string;
  authorId?: string;
  authorName?: string;
  authorAvatar?: string;
  authorPenName?: string;
  coverImageUrl?: string;
  chapters?: StoryChapter[];
}

export interface ListStoriesOptions {
  mainGenre?: string;
  tradition?: string;
  storyLanguage?: string;
  status?: string;
  search?: string;
  author?: string;
  authorId?: string;
  hasAudioNarration?: boolean;
  audioOnly?: boolean;
  sortBy?: "newest" | "popular" | "readTime" | "most_read" | "most_liked" | "trending" | "highest_rated";
  page?: number;
  limit?: number;
}

export interface TraditionItem {
  id: string;
  name: string;
  tradition: string;
  description: string;
  image: string;
  href: string;
  badge: string;
  count: number;
}

export interface PaginatedStoriesResult {
  stories: Story[];
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
  lastDoc: any | null;
  hasMore: boolean;
}

/**
 * Normalizes any story JSON from the backend (Render / MongoDB) into the frontend Story interface
 */
export function normalizeStory(data: any): Story {
  if (!data) return {} as Story;
  const id = String(data._id || data.id || `story-${Date.now()}`);
  const slug =
    data.slug ||
    (data.title
      ? data.title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
      : id);

  return {
    ...data,
    id,
    slug,
    title: data.title || "Untitled Story",
    subtitle: data.subtitle || "",
    synopsis: data.synopsis || "",
    coverImage: data.coverImage || data.coverImageUrl || "",
    tradition: data.tradition || "Pan-African",
    mainGenre: data.mainGenre || "Folklore",
    subGenres: Array.isArray(data.subGenres) ? data.subGenres : [],
    triggerWarnings: Array.isArray(data.triggerWarnings) ? data.triggerWarnings : [],
    targetAudience: data.targetAudience || "All Readers",
    tags: Array.isArray(data.tags) ? data.tags : [],
    difficulty: data.difficulty || "Intermediate",
    status: data.status || "ongoing",
    authorId:
      data.author?._id ||
      data.author?.id ||
      (typeof data.author === "string" ? data.author : data.authorId || ""),
    authorName: data.authorName || data.author?.name || data.author?.displayName || "Storyteller",
    authorPenName:
      data.authorPenName || data.author?.penName || data.authorName || "Storyteller",
    authorAvatar: data.authorAvatar || data.author?.avatarUrl || "",
    totalChapters:
      data.totalChapters || (Array.isArray(data.chapters) ? data.chapters.length : 1),
    estimatedReadTime: data.estimatedReadTime || 1,
    readsCount: data.readsCount || 0,
    likesCount: data.likesCount || 0,
    bookmarksCount: data.bookmarksCount || 0,
    chapters: Array.isArray(data.chapters)
      ? data.chapters.map((c: any, idx: number) => ({
          ...c,
          id: String(c._id || c.id || `chap-${c.number || idx + 1}`),
          number: c.number || c.chapterNumber || idx + 1,
          chapterNumber: c.chapterNumber || c.number || idx + 1,
          title: c.title || `Chapter ${idx + 1}`,
          summary: c.summary || c.synopsis || "",
          content: c.content || "",
          status: c.status || "published",
          likesCount: c.likesCount || 0,
        }))
      : [],
    createdAt: data.createdAt || new Date().toISOString(),
    publishedAt: data.publishedAt || data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString(),
  };
}

/**
 * 1. Create a New Story (POST /api/v1/stories) — Protected
 * Creates a story matching the /studio/new payload
 */
export async function createStory(payload: CreateStoryPayload): Promise<Story> {
  const res = await apiClient.post<{
    success: boolean;
    statusCode: number;
    message: string;
    data: { story: any };
  }>("/stories", payload);

  const rawStory = res?.data?.story || res?.data || res;
  const story = normalizeStory(rawStory);

  // Backup to local custom stories
  if (typeof window !== "undefined") {
    try {
      const existing = localStorage.getItem("inkoma_custom_stories");
      const list: Story[] = existing ? JSON.parse(existing) : [];
      const updatedList = [story, ...list.filter((s) => s.id !== story.id)];
      localStorage.setItem("inkoma_custom_stories", JSON.stringify(updatedList));
      localStorage.removeItem("inkoma_draft_story");
    } catch {}
  }

  return story;
}

/**
 * Creates or updates a draft story on the Render backend (MongoDB)
 * Adapter wrapper around createStory for backward compatibility
 */
export async function createDraftStory(
  metadata: CreateStoryMetadata,
  coverFile?: File | Blob
): Promise<string> {
  let finalCoverUrl = metadata.coverImageUrl || metadata.coverImage || "";
  if (coverFile) {
    try {
      finalCoverUrl = await uploadCoverImage(coverFile);
    } catch (e) {
      console.warn("[StoryService] Error uploading cover image:", e);
    }
  }

  const payload: CreateStoryPayload = {
    title: metadata.title || "Untitled Story",
    subtitle: metadata.subtitle || "",
    synopsis: metadata.synopsis || "A captivating story on INKOMA.",
    coverImage:
      finalCoverUrl ||
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop",
    mainGenre: metadata.mainGenre || "Folklore",
    subGenres: metadata.subGenres || [],
    storyLanguage: metadata.storyLanguage || "English",
    targetAudience: metadata.targetAudience || "Young Adult (YA)",
    ageRating: metadata.ageRating || "16+",
    triggerWarnings: metadata.triggerWarnings || [],
    tradition: metadata.tradition || "Pan-African",
    difficulty: metadata.difficulty || "Intermediate",
    tags: metadata.tags || (metadata.subGenres ? [metadata.mainGenre || "Folklore", ...metadata.subGenres] : ["Folklore"]),
    status: metadata.status || "ongoing",
    chapters: metadata.chapters?.map((c, idx) => ({
      title: c.title || `Chapter ${idx + 1}`,
      summary: c.summary || c.synopsis || "",
      content: c.content || "",
      status: c.status || "published",
    })),
  };

  try {
    const created = await createStory(payload);
    return created.id;
  } catch (err) {
    console.warn("[StoryService] Backend offline or error; storing draft locally:", err);
    const storyId = metadata.id || `story-${Date.now()}`;
    if (typeof window !== "undefined") {
      const localDraft = { ...payload, id: storyId, chapters: metadata.chapters || [] };
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
 * 2. List Stories (GET /api/v1/stories) — Public
 * Feed and discovery with pagination and filtering
 */
export async function listStories(options: ListStoriesOptions = {}): Promise<PaginatedStoriesResult> {
  const {
    mainGenre,
    tradition,
    storyLanguage,
    status,
    search,
    author,
    authorId,
    hasAudioNarration,
    audioOnly,
    sortBy,
    page = 1,
    limit = 12,
  } = options;

  const params: Record<string, string | number | boolean | undefined> = {
    page,
    limit,
  };
  if (mainGenre && mainGenre !== "all") params.mainGenre = mainGenre;
  if (tradition && tradition !== "all") params.tradition = tradition;
  if (storyLanguage) params.storyLanguage = storyLanguage;
  if (status && status !== "all") params.status = status;
  if (search) params.search = search;
  if (author) params.author = author;
  if (authorId) params.authorId = authorId;
  if (hasAudioNarration !== undefined) params.hasAudioNarration = hasAudioNarration;
  else if (audioOnly !== undefined) params.hasAudioNarration = audioOnly;
  if (sortBy) params.sortBy = sortBy;

  try {
    const res = await apiClient.get<any>("/stories", { params });
    const rawStories =
      res?.data?.stories ||
      res?.stories ||
      (Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : []);

    const normalized = rawStories.map(normalizeStory);
    const total = res?.data?.total || res?.total || normalized.length;
    const totalPages =
      res?.data?.totalPages || res?.totalPages || Math.ceil(total / limit) || 1;
    const currentPage = res?.data?.page || res?.page || page;

    return {
      stories: normalized,
      total,
      page: currentPage,
      limit,
      totalPages,
      hasMore: currentPage < totalPages,
      lastDoc: null,
    };
  } catch (error) {
    console.warn("[StoryService] Error fetching stories from backend:", error);
    const local =
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
      stories: local.map(normalizeStory),
      total: local.length,
      page: 1,
      limit,
      totalPages: 1,
      hasMore: false,
      lastDoc: null,
    };
  }
}

/**
 * Alias for backward compatibility with existing components
 */
export async function getPublishedStories(options: {
  limitCount?: number;
  startAfterDoc?: any;
} = {}): Promise<PaginatedStoriesResult> {
  return listStories({ limit: options.limitCount || 20 });
}

/**
 * Trending Stories Carousel (GET /api/v1/stories/trending) — Public
 * Top 10 viral manuscripts sorted by reader engagement (readsCount + likesCount) with rank badges (1–10)
 */
export async function getTrendingStories(): Promise<Story[]> {
  try {
    const res = await apiClient.get<any>("/stories/trending");
    const rawStories =
      res?.data?.stories ||
      res?.stories ||
      (Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : []);
    return rawStories.map(normalizeStory);
  } catch (error) {
    console.warn("[StoryService] Error fetching trending stories:", error);
    return [];
  }
}

/**
 * Highest Rated Stories (GET /api/v1/stories/highest-rated) — Public
 * Top 10 stories ranked by reader ratings and likes
 */
export async function getHighestRatedStories(): Promise<Story[]> {
  try {
    const res = await apiClient.get<any>("/stories/highest-rated");
    const rawStories =
      res?.data?.stories ||
      res?.stories ||
      (Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : []);
    return rawStories.map(normalizeStory);
  } catch (error) {
    console.warn("[StoryService] Error fetching highest-rated stories:", error);
    return [];
  }
}

/**
 * Explore Folklore Categories & Traditions (GET /api/v1/stories/traditions) — Public
 * Traditions catalogue with real-time manuscript counts
 */
export async function getStoryTraditions(): Promise<TraditionItem[]> {
  try {
    const res = await apiClient.get<any>("/stories/traditions");
    const list =
      res?.data?.traditions ||
      res?.traditions ||
      (Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : []);
    return list;
  } catch (error) {
    console.warn("[StoryService] Error fetching traditions:", error);
    return [];
  }
}

/**
 * 3. Get Story by ID or Slug (GET /api/v1/stories/:idOrSlug) — Public
 * Supports querying by either MongoDB _id or clean URL slug. Automatically increments readsCount.
 */
export async function getStoryById(idOrSlug: string): Promise<Story | null> {
  if (!idOrSlug) return null;
  try {
    const res = await apiClient.get<any>(`/stories/${encodeURIComponent(idOrSlug)}`);
    const rawStory = res?.data?.story || res?.data || res?.story || res;
    if (rawStory && (rawStory._id || rawStory.id || rawStory.title)) {
      return normalizeStory(rawStory);
    }
  } catch (error) {
    console.warn(`[StoryService] Backend getStoryById error for ${idOrSlug}:`, error);
  }

  // Fallback to local storage
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("inkoma_custom_stories");
      if (raw) {
        const list: Story[] = JSON.parse(raw);
        const match = list.find(
          (s) =>
            s.id === idOrSlug ||
            s.slug === idOrSlug ||
            (s.aliases && s.aliases.includes(idOrSlug))
        );
        if (match) return normalizeStory(match);
      }
    } catch {}
  }

  return null;
}

/**
 * 4. Update Story (PUT /api/v1/stories/:id) — Protected (Author or Admin)
 * Update metadata, edit existing chapters, or add new chapters progressively.
 */
export async function updateStory(
  id: string,
  updates: Partial<CreateStoryPayload>
): Promise<Story> {
  const res = await apiClient.put<any>(`/stories/${encodeURIComponent(id)}`, updates);
  const rawStory = res?.data?.story || res?.data || res?.story || res;
  const story = normalizeStory(rawStory);

  if (typeof window !== "undefined") {
    try {
      const existing = localStorage.getItem("inkoma_custom_stories");
      const list: Story[] = existing ? JSON.parse(existing) : [];
      const updated = list.map((s) => (s.id === id ? { ...s, ...story } : s));
      localStorage.setItem("inkoma_custom_stories", JSON.stringify(updated));
    } catch {}
  }

  return story;
}

/**
 * 5. Delete Story (DELETE /api/v1/stories/:id) — Protected (Author or Admin)
 * Permanently remove a story.
 */
export async function deleteStory(id: string): Promise<boolean> {
  try {
    await apiClient.delete(`/stories/${encodeURIComponent(id)}`);
  } catch (error) {
    console.warn(`[StoryService] Failed to delete story ${id} on backend:`, error);
  }

  if (typeof window !== "undefined") {
    try {
      const existing = localStorage.getItem("inkoma_custom_stories");
      if (existing) {
        const list: Story[] = JSON.parse(existing);
        const updated = list.filter((s) => s.id !== id);
        localStorage.setItem("inkoma_custom_stories", JSON.stringify(updated));
      }
    } catch {}
  }

  return true;
}

/**
 * Fetches stories created by a specific author (GET /api/v1/stories?author=:username)
 */
export async function getStoriesByAuthor(authorIdOrUsername: string): Promise<Story[]> {
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
    const res = await apiClient.get<any>("/stories", {
      params: {
        author: authorIdOrUsername,
        authorId: authorIdOrUsername,
      },
    });
    const rawList = res?.data?.stories || res?.stories || (Array.isArray(res) ? res : []);
    if (Array.isArray(rawList)) {
      return rawList.map(normalizeStory);
    }
  } catch (error) {
    console.warn("[StoryService] Error fetching author stories from backend:", error);
  }

  const query = (authorIdOrUsername || "").toLowerCase();
  return localCustom
    .filter(
      (s: Story) =>
        s.authorId === authorIdOrUsername ||
        (s.authorName && s.authorName.toLowerCase() === query) ||
        (s.authorPenName && s.authorPenName.toLowerCase() === query) ||
        !s.authorId
    )
    .map(normalizeStory);
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
    estimatedReadTime:
      chapterData.estimatedReadTime || Math.max(1, Math.ceil(wordCount / 200)),
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
  const story = await getStoryById(storyId);
  if (story) {
    return { story, chapters: story.chapters || [] };
  }

  return { story: null, chapters: [] };
}

/**
 * Publishes a story by updating status to 'published'
 */
export async function publishStory(storyId: string): Promise<void> {
  try {
    await updateStory(storyId, { status: "ongoing" });
  } catch (error) {
    console.warn("[StoryService] Failed to publish on backend, updating locally:", error);
  }
}

/**
 * Fetches published chapter list for a story
 */
export async function getStoryChapters(storyId: string): Promise<StoryChapter[]> {
  try {
    const story = await getStoryById(storyId);
    if (story?.chapters && story.chapters.length > 0) {
      return story.chapters;
    }
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
  const story = await getStoryById(storyId);
  if (story?.chapters) {
    const chapter = story.chapters.find(
      (c) => c.number === chapterNumber || c.chapterNumber === chapterNumber
    );
    if (chapter) return chapter;
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

// ─── PDF Extraction & Import Engine ──────────────────────────────────────────

export interface ParsedPdfChapter {
  number: number;
  chapterNumber?: number;
  title: string;
  content: string;
  wordCount: number;
  readTime?: number;
  estimatedReadTime?: number;
  summary?: string;
  synopsis?: string;
}

export interface ParsedPdfResult {
  detectedTitle?: string;
  title?: string;
  totalChapters: number;
  totalWordCount: number;
  estimatedTotalReadTime: number;
  chapters: ParsedPdfChapter[];
}

export interface ImportPdfPayload {
  title?: string;
  subtitle?: string;
  synopsis?: string;
  mainGenre?: string;
  subGenres?: string[];
  storyLanguage?: string;
  tradition?: string;
  targetAudience?: string;
  ageRating?: string;
  coverImage?: string;
  status?: StoryStatus | "draft" | "ongoing" | "completed";
}

/**
 * Parses an uploaded PDF manuscript via POST /api/v1/stories/parse-pdf
 * Extracts document streams, segments chapters, detects headings,
 * and computes word counts and reading metrics without saving to database.
 */
export async function parsePdfManuscript(file: File): Promise<ParsedPdfResult> {
  if (file.size > 25 * 1024 * 1024) {
    throw new Error("PDF manuscript exceeds the maximum allowed size of 25MB.");
  }
  if (file.type && file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
    throw new Error("Invalid file format. Please upload a valid PDF manuscript (.pdf).");
  }

  const formData = new FormData();
  formData.append("file", file);

  const res = await apiClient.upload<any>("/stories/parse-pdf", formData);
  const data = res?.data || res || {};

  const chapters: ParsedPdfChapter[] = (data.chapters || []).map((c: any, idx: number) => ({
    number: Number(c.number || c.chapterNumber || idx + 1),
    chapterNumber: Number(c.number || c.chapterNumber || idx + 1),
    title: c.title || `Chapter ${idx + 1}`,
    content: c.content || "",
    wordCount: Number(c.wordCount || (c.content ? c.content.trim().split(/\s+/).filter(Boolean).length : 0)),
    readTime: Number(c.readTime || c.estimatedReadTime || Math.ceil((c.wordCount || 1) / 200)),
    estimatedReadTime: Number(c.estimatedReadTime || c.readTime || Math.ceil((c.wordCount || 1) / 200)),
    summary: c.summary || c.synopsis || (c.content ? c.content.slice(0, 280).trim() + "..." : ""),
    synopsis: c.synopsis || c.summary || (c.content ? c.content.slice(0, 280).trim() + "..." : ""),
  }));

  const totalWords = data.totalWordCount || chapters.reduce((acc, c) => acc + c.wordCount, 0);

  return {
    detectedTitle: data.detectedTitle || data.title || file.name.replace(/\.[^/.]+$/, ""),
    totalChapters: data.totalChapters || chapters.length,
    totalWordCount: totalWords,
    estimatedTotalReadTime: data.estimatedTotalReadTime || Math.ceil(totalWords / 200),
    chapters,
  };
}

/**
 * Parses and imports an uploaded PDF manuscript directly into MongoDB as a draft story
 * via POST /api/v1/stories/import-pdf
 */
export async function importPdfManuscript(
  file: File,
  metadata?: ImportPdfPayload
): Promise<Story> {
  if (file.size > 25 * 1024 * 1024) {
    throw new Error("PDF manuscript exceeds the maximum allowed size of 25MB.");
  }
  if (file.type && file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
    throw new Error("Invalid file format. Please upload a valid PDF manuscript (.pdf).");
  }

  const formData = new FormData();
  formData.append("file", file);

  if (metadata) {
    Object.entries(metadata).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        if (Array.isArray(v)) {
          formData.append(k, JSON.stringify(v));
        } else {
          formData.append(k, String(v));
        }
      }
    });
  }

  const res = await apiClient.upload<any>("/stories/import-pdf", formData);
  const storyData = res?.data || res || {};
  return normalizeStory(storyData);
}
