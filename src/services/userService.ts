import { apiClient } from "@/src/services/api";
import { Story } from "@/types";
import { normalizeStory } from "@/src/services/storyService";

export interface TopAuthor {
  id: string;
  rank?: number;
  name: string;
  username?: string;
  penName?: string;
  avatarUrl?: string;
  avatar?: string;
  followersCount?: number;
  readsCount?: number;
  totalReads?: number;
  reads?: string;
  storiesCount?: number;
  bio?: string;
}

export interface BankingDetails {
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
}

export interface PrivacySettings {
  publicProfile: boolean;
  publicReadingHistory: boolean;
  allowFollowers: boolean;
  showReadingActivity: boolean;
}

export interface NotificationSettings {
  emailNewChapters?: boolean;
  emailComments?: boolean;
  emailPatronSupport?: boolean;
  weeklyFolkloreDigest?: boolean;
  newChapterAlerts?: boolean;
  commentReplies?: boolean;
  patronTips?: boolean;
  communityAnnouncements?: boolean;
}

export interface FullUserProfile {
  _id?: string;
  id: string;
  name: string;
  displayName?: string;
  username: string;
  email: string;
  penName?: string;
  bio?: string;
  phone?: string;
  avatarUrl?: string;
  role?: string;
  banking?: BankingDetails;
  privacy?: PrivacySettings;
  notifications?: NotificationSettings;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateProfilePayload {
  name?: string;
  username?: string;
  penName?: string;
  bio?: string;
  phone?: string;
  avatarUrl?: string;
}

export interface UpdateBankingPayload {
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

/**
 * 1. Fetch full user profile, banking, privacy, & notification preferences
 * GET /api/v1/users/me — Protected
 */
export async function getCurrentUserProfile(): Promise<FullUserProfile | null> {
  try {
    const res = await apiClient.get<{
      success: boolean;
      statusCode?: number;
      message?: string;
      data: { user: FullUserProfile };
    }>("/users/me");

    const rawUser = res?.data?.user || (res as any)?.data || (res as any)?.user || res;
    if (rawUser && (rawUser._id || rawUser.id || rawUser.email)) {
      return {
        ...rawUser,
        id: String(rawUser._id || rawUser.id),
        name: rawUser.name || rawUser.displayName || "",
        displayName: rawUser.displayName || rawUser.name || "",
        username: rawUser.username || "",
        email: rawUser.email || "",
        penName: rawUser.penName || "",
        bio: rawUser.bio || "",
        phone: rawUser.phone || "",
        avatarUrl: rawUser.avatarUrl || "",
        banking: rawUser.banking || {
          bankName: "",
          accountNumber: "",
          accountHolderName: "",
        },
        privacy: {
          publicProfile: rawUser.privacy?.publicProfile ?? true,
          publicReadingHistory: rawUser.privacy?.publicReadingHistory ?? false,
          allowFollowers: rawUser.privacy?.allowFollowers ?? true,
          showReadingActivity: rawUser.privacy?.showReadingActivity ?? true,
        },
        notifications: {
          emailNewChapters: rawUser.notifications?.emailNewChapters ?? true,
          emailComments: rawUser.notifications?.emailComments ?? true,
          emailPatronSupport: rawUser.notifications?.emailPatronSupport ?? true,
          weeklyFolkloreDigest: rawUser.notifications?.weeklyFolkloreDigest ?? false,
          newChapterAlerts: rawUser.notifications?.newChapterAlerts ?? true,
          commentReplies: rawUser.notifications?.commentReplies ?? true,
          patronTips: rawUser.notifications?.patronTips ?? true,
          communityAnnouncements: rawUser.notifications?.communityAnnouncements ?? true,
        },
      };
    }
    return null;
  } catch (error) {
    console.warn("[UserService] Failed to fetch profile from /users/me:", error);
    return null;
  }
}

/**
 * 2. Update profile fields (name, username, penName, bio, phone, avatarUrl)
 * PUT /api/v1/users/me/profile — Protected
 */
export async function updateUserProfile(
  payload: UpdateProfilePayload
): Promise<FullUserProfile> {
  const res = await apiClient.put<{
    success: boolean;
    statusCode?: number;
    message?: string;
    data: { user: FullUserProfile };
  }>("/users/me/profile", payload);

  const rawUser = res?.data?.user || (res as any)?.data || (res as any)?.user || res;
  return {
    ...rawUser,
    id: String(rawUser._id || rawUser.id),
    name: rawUser.name || payload.name || "",
    displayName: rawUser.name || payload.name || "",
    username: rawUser.username || payload.username || "",
    penName: rawUser.penName || payload.penName || "",
    bio: rawUser.bio ?? payload.bio ?? "",
    phone: rawUser.phone ?? payload.phone ?? "",
    avatarUrl: rawUser.avatarUrl || payload.avatarUrl || "",
  };
}

/**
 * 3. Upload profile avatar directly to Cloudinary (inkoma_avatars)
 * POST /api/v1/users/me/avatar — Protected
 */
export async function uploadUserAvatar(file: File | Blob): Promise<string> {
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await apiClient.upload<{
    success?: boolean;
    statusCode?: number;
    message?: string;
    data?: { avatarUrl?: string; url?: string; secure_url?: string };
    avatarUrl?: string;
    url?: string;
  }>("/users/me/avatar", formData);

  const uploadedUrl =
    res?.data?.avatarUrl ||
    res?.data?.secure_url ||
    res?.data?.url ||
    res?.avatarUrl ||
    res?.url;

  if (uploadedUrl) return uploadedUrl;
  throw new Error("Avatar upload did not return a valid URL");
}

/**
 * 4. Update payout banking details (bankName, 10-digit accountNumber, accountHolderName)
 * PUT /api/v1/users/me/banking — Protected
 */
export async function updateUserBanking(
  payload: UpdateBankingPayload
): Promise<BankingDetails> {
  const res = await apiClient.put<{
    success: boolean;
    statusCode?: number;
    message?: string;
    data: { banking: BankingDetails };
  }>("/users/me/banking", payload);

  return res?.data?.banking || (res as any)?.banking || payload;
}

/**
 * 5. Change account password
 * PUT /api/v1/users/me/password — Protected
 */
export async function changeUserPassword(
  payload: ChangePasswordPayload
): Promise<void> {
  await apiClient.put<{
    success: boolean;
    statusCode?: number;
    message?: string;
  }>("/users/me/password", payload);
}

/**
 * 6. Update community privacy settings
 * PUT /api/v1/users/me/privacy — Protected
 */
export async function updateUserPrivacy(
  payload: Partial<PrivacySettings>
): Promise<PrivacySettings> {
  const res = await apiClient.put<{
    success: boolean;
    statusCode?: number;
    message?: string;
    data: { privacy: PrivacySettings };
  }>("/users/me/privacy", payload);

  return (
    res?.data?.privacy ||
    (res as any)?.privacy || {
      publicProfile: payload.publicProfile ?? true,
      publicReadingHistory: payload.publicReadingHistory ?? false,
      allowFollowers: payload.allowFollowers ?? true,
      showReadingActivity: payload.showReadingActivity ?? true,
    }
  );
}

/**
 * 7. Update notification preferences
 * PUT /api/v1/users/me/notifications — Protected
 */
export async function updateUserNotificationSettings(
  payload: Partial<NotificationSettings>
): Promise<NotificationSettings> {
  const res = await apiClient.put<{
    success: boolean;
    statusCode?: number;
    message?: string;
    data: { notifications: NotificationSettings };
  }>("/users/me/notifications", payload);

  return res?.data?.notifications || (res as any)?.notifications || payload;
}

/**
 * 8. Top Authors This Week (GET /api/v1/users/top-authors) — Public
 * Aggregated author leaderboard ranked by cumulative story reads and followers
 */
export async function getTopAuthors(): Promise<TopAuthor[]> {
  try {
    const res = await apiClient.get<any>("/users/top-authors");
    const rawAuthors =
      res?.data?.authors ||
      res?.authors ||
      (Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : []);

    return rawAuthors.map((author: any, idx: number) => {
      const id = String(author._id || author.id || `author-${idx + 1}`);
      const name = author.name || author.penName || author.displayName || author.username || "Storyteller";
      const totalReads = Number(author.totalReads || author.readsCount || author.reads || 0);
      return {
        id,
        rank: author.rank || idx + 1,
        name,
        username: author.username || "",
        penName: author.penName || name,
        avatarUrl: author.avatarUrl || author.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
        avatar: author.avatarUrl || author.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
        followersCount: Number(author.followersCount || 0),
        readsCount: totalReads,
        totalReads,
        reads: `${totalReads} Reads`,
        storiesCount: Number(author.storiesCount || 0),
        bio: author.bio || "",
      };
    });
  } catch (error) {
    console.warn("[UserService] Failed to fetch top authors:", error);
    return [];
  }
}

/**
 * 9. Get User Bookmarks (GET /api/v1/users/bookmarks) — Protected
 * Returns all bookmarked stories for the logged-in reader
 */
export async function getUserBookmarks(): Promise<Story[]> {
  try {
    const res = await apiClient.get<any>("/users/bookmarks");
    const rawStories =
      res?.data?.bookmarks ||
      res?.data?.stories ||
      res?.bookmarks ||
      res?.stories ||
      (Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : []);

    return rawStories.map(normalizeStory);
  } catch (error) {
    console.warn("[UserService] Failed to fetch user bookmarks:", error);
    return [];
  }
}

/**
 * 10. Add Story Bookmark (POST /api/v1/users/bookmarks/:storyId) — Protected
 * Adds story to reader bookmarks & increments bookmarksCount
 */
export async function addStoryBookmark(storyId: string): Promise<void> {
  await apiClient.post<any>(`/users/bookmarks/${encodeURIComponent(storyId)}`, {});
}

/**
 * 11. Remove Story Bookmark (DELETE /api/v1/users/bookmarks/:storyId) — Protected
 * Removes story from reader bookmarks & decrements bookmarksCount
 */
export async function removeStoryBookmark(storyId: string): Promise<void> {
  await apiClient.delete<any>(`/users/bookmarks/${encodeURIComponent(storyId)}`);
}
