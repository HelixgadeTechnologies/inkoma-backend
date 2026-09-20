import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  increment,
  QueryDocumentSnapshot,
  DocumentData,
  Timestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/src/firebase/config";
import { uploadCoverImage } from "@/src/services/storageService";
import { Story, StoryChapter, StoryStatus } from "@/types";
import { MOCK_STORIES } from "@/config/mock-data";

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
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
}

/**
 * Creates or updates a draft story with optional cover image upload
 */
export async function createDraftStory(
  metadata: CreateStoryMetadata,
  coverFile?: File | Blob
): Promise<string> {
  const storyId = metadata.id || `story-${Date.now()}`;

  if (!isFirebaseConfigured() || !db) {
    console.info("[StoryService] Firebase offline; saved to local draft storage.");
    if (typeof window !== "undefined") {
      const localDraft = { ...metadata, id: storyId, updatedAt: new Date().toISOString() };
      localStorage.setItem("inkoma_draft_story", JSON.stringify(localDraft));
    }
    return storyId;
  }

  let finalCoverUrl = metadata.coverImageUrl || "";
  if (coverFile) {
    finalCoverUrl = await uploadCoverImage(coverFile, metadata.authorId, storyId);
  }

  const storyDocRef = doc(db, "stories", storyId);
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
    readsCount: 0,
    likesCount: 0,
    bookmarksCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(storyDocRef, storyPayload, { merge: true });

  // Save initial chapters if present
  if (metadata.chapters && metadata.chapters.length > 0) {
    for (const chap of metadata.chapters) {
      await saveChapterDraft(storyId, chap);
    }
  }

  return storyId;
}

/**
 * Saves a chapter draft into sub-collection stories/{storyId}/chapters/{chapterId}
 */
export async function saveChapterDraft(
  storyId: string,
  chapterData: Partial<StoryChapter>
): Promise<string> {
  const chapterId = chapterData.id || `chapter-${chapterData.number || Date.now()}`;

  if (!isFirebaseConfigured() || !db) {
    console.info(`[StoryService] Firebase offline; saved chapter ${chapterId} locally.`);
    return chapterId;
  }

  const chapterDocRef = doc(db, "stories", storyId, "chapters", chapterId);
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
    updatedAt: serverTimestamp(),
  };

  await setDoc(chapterDocRef, payload, { merge: true });

  // Update parent story updatedAt
  const parentStoryRef = doc(db, "stories", storyId);
  await updateDoc(parentStoryRef, {
    updatedAt: serverTimestamp(),
  }).catch(() => {});

  return chapterId;
}

/**
 * Fetches complete story metadata and all associated chapters for preview
 */
export async function getStoryPreview(storyId: string): Promise<{
  story: Story | null;
  chapters: StoryChapter[];
}> {
  if (!isFirebaseConfigured() || !db) {
    const mock = MOCK_STORIES.find((s) => s.id === storyId) || MOCK_STORIES[0];
    return {
      story: mock,
      chapters: mock.chapters || [],
    };
  }

  const storyDoc = await getDoc(doc(db, "stories", storyId));
  if (!storyDoc.exists()) {
    return { story: null, chapters: [] };
  }

  const storyData = storyDoc.data() as Story;
  const chapters = await getStoryChapters(storyId);

  return {
    story: {
      ...storyData,
      totalChapters: chapters.length,
      chapters,
    },
    chapters,
  };
}

/**
 * Publishes a story by updating status to 'published'
 */
export async function publishStory(storyId: string): Promise<void> {
  if (!isFirebaseConfigured() || !db) {
    console.info(`[StoryService] Firebase offline; marked story ${storyId} published locally.`);
    return;
  }

  const storyRef = doc(db, "stories", storyId);
  await updateDoc(storyRef, {
    status: "published",
    publishedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

/**
 * Fetches published stories for the Home / "For You" page (FYP) with pagination
 */
export async function getPublishedStories(options: {
  limitCount?: number;
  startAfterDoc?: QueryDocumentSnapshot<DocumentData> | null;
} = {}): Promise<PaginatedStoriesResult> {
  const { limitCount = 10, startAfterDoc = null } = options;

  if (!isFirebaseConfigured() || !db) {
    return {
      stories: MOCK_STORIES,
      lastDoc: null,
      hasMore: false,
    };
  }

  try {
    const storiesRef = collection(db, "stories");
    let q = query(
      storiesRef,
      where("status", "==", "published"),
      orderBy("publishedAt", "desc"),
      limit(limitCount)
    );

    if (startAfterDoc) {
      q = query(
        storiesRef,
        where("status", "==", "published"),
        orderBy("publishedAt", "desc"),
        startAfter(startAfterDoc),
        limit(limitCount)
      );
    }

    const snapshot = await getDocs(q);
    const stories: Story[] = [];

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      stories.push({
        id: docSnap.id,
        ...data,
        coverImage: data.coverImageUrl || data.coverImage,
        publishedAt: data.publishedAt instanceof Timestamp ? data.publishedAt.toDate().toISOString() : data.publishedAt || new Date().toISOString(),
        updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate().toISOString() : data.updatedAt || new Date().toISOString(),
      } as Story);
    });

    const last = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;
    return {
      stories: stories.length > 0 ? stories : MOCK_STORIES,
      lastDoc: last,
      hasMore: snapshot.docs.length === limitCount,
    };
  } catch (error) {
    console.warn("[StoryService] Falling back to mock stories due to query error:", error);
    return {
      stories: MOCK_STORIES,
      lastDoc: null,
      hasMore: false,
    };
  }
}

/**
 * Fetches public story details by ID
 */
export async function getStoryById(storyId: string): Promise<Story | null> {
  if (!isFirebaseConfigured() || !db) {
    return MOCK_STORIES.find((s) => s.id === storyId) || null;
  }

  try {
    const storyDoc = await getDoc(doc(db, "stories", storyId));
    if (!storyDoc.exists()) {
      return MOCK_STORIES.find((s) => s.id === storyId) || null;
    }

    const data = storyDoc.data();
    return {
      id: storyDoc.id,
      ...data,
      coverImage: data.coverImageUrl || data.coverImage,
    } as Story;
  } catch (error) {
    console.error("[StoryService] Error fetching story by ID:", error);
    return MOCK_STORIES.find((s) => s.id === storyId) || null;
  }
}

/**
 * Fetches published chapter list for a story
 */
export async function getStoryChapters(storyId: string): Promise<StoryChapter[]> {
  if (!isFirebaseConfigured() || !db) {
    const story = MOCK_STORIES.find((s) => s.id === storyId);
    return story?.chapters || [];
  }

  try {
    const chaptersRef = collection(db, "stories", storyId, "chapters");
    const q = query(chaptersRef, orderBy("number", "asc"));
    const snapshot = await getDocs(q);

    const chapters: StoryChapter[] = [];
    snapshot.forEach((snap) => {
      chapters.push(snap.data() as StoryChapter);
    });

    return chapters;
  } catch (error) {
    console.error("[StoryService] Error fetching chapters:", error);
    const story = MOCK_STORIES.find((s) => s.id === storyId);
    return story?.chapters || [];
  }
}

/**
 * Fetches a single chapter's content
 */
export async function getChapterContent(
  storyId: string,
  chapterNumber: number
): Promise<StoryChapter | null> {
  if (!isFirebaseConfigured() || !db) {
    const story = MOCK_STORIES.find((s) => s.id === storyId);
    return (
      story?.chapters?.find(
        (c) => (c.chapterNumber || c.number) === chapterNumber
      ) || null
    );
  }

  try {
    const chaptersRef = collection(db, "stories", storyId, "chapters");
    const q = query(chaptersRef, where("number", "==", chapterNumber), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }
    return snapshot.docs[0].data() as StoryChapter;
  } catch (error) {
    console.error("[StoryService] Error fetching chapter content:", error);
    return null;
  }
}

/**
 * Toggle bookmark for a user on a story
 */
export async function toggleBookmark(
  userId: string,
  storyId: string
): Promise<{ isBookmarked: boolean }> {
  if (!isFirebaseConfigured() || !db) {
    return { isBookmarked: true };
  }

  const bookmarkRef = doc(db, "users", userId, "bookmarks", storyId);
  const snap = await getDoc(bookmarkRef);
  const storyRef = doc(db, "stories", storyId);

  if (snap.exists()) {
    await deleteDoc(bookmarkRef);
    await updateDoc(storyRef, { bookmarksCount: increment(-1) }).catch(() => {});
    return { isBookmarked: false };
  } else {
    await setDoc(bookmarkRef, {
      storyId,
      createdAt: serverTimestamp(),
    });
    await updateDoc(storyRef, { bookmarksCount: increment(1) }).catch(() => {});
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
  if (!isFirebaseConfigured() || !db) {
    return { isLiked: true };
  }

  const likeRef = doc(db, "users", userId, "likes", storyId);
  const snap = await getDoc(likeRef);
  const storyRef = doc(db, "stories", storyId);

  if (snap.exists()) {
    await deleteDoc(likeRef);
    await updateDoc(storyRef, { likesCount: increment(-1) }).catch(() => {});
    return { isLiked: false };
  } else {
    await setDoc(likeRef, {
      storyId,
      createdAt: serverTimestamp(),
    });
    await updateDoc(storyRef, { likesCount: increment(1) }).catch(() => {});
    return { isLiked: true };
  }
}
