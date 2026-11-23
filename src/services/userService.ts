import { apiClient } from "@/src/services/api";
import {
  Story,
  UserProfile,
  CreatorSupportDetails,
  LoreBadge,
  NetworkUser,
  GetNetworkUsersResult,
  GetNetworkUsersOptions,
  NetworkPagination,
} from "@/types";
import { normalizeStory } from "@/src/services/storyService";

export type { NetworkUser, GetNetworkUsersResult, GetNetworkUsersOptions, NetworkPagination };

/**
 * Normalizes a raw network user object from followers/following responses
 */
export function normalizeNetworkUser(rawUser: any): NetworkUser {
  if (!rawUser) {
    return {
      id: "",
      username: "",
      displayName: "Storyteller",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
      bio: "",
      followersCount: 0,
      isFollowing: false,
    };
  }

  const id = String(rawUser._id || rawUser.id || "");
  const username =
    rawUser.username || (rawUser.email ? rawUser.email.split("@")[0].toLowerCase() : "");
  const displayName =
    rawUser.displayName || rawUser.name || rawUser.penName || username || "Storyteller";
  const penName = rawUser.penName || displayName;
  const avatarUrl =
    rawUser.avatarUrl ||
    rawUser.avatar ||
    rawUser.photoURL ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200";
  const bio = rawUser.bio || "Preserving ancestral lore through interactive storytelling.";
  const specialty = rawUser.traditionSpecialty || rawUser.specialty || undefined;
  const followersCount = Number(
    rawUser.followersCount ??
      (Array.isArray(rawUser.followers) ? rawUser.followers.length : 0)
  );
  const followingCount = Number(
    rawUser.followingCount ??
      (Array.isArray(rawUser.following) ? rawUser.following.length : 0)
  );
  const isVerified = Boolean(
    rawUser.isVerified || (rawUser.role && (rawUser.role === "elder" || rawUser.role === "elder_admin"))
  );
  const isFollowing = Boolean(rawUser.isFollowing);

  return {
    id,
    username,
    displayName,
    penName,
    avatarUrl,
    bio,
    specialty,
    followersCount,
    followingCount,
    isVerified,
    isFollowing,
  };
}

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

/**
 * Normalizes raw storyteller user object into complete UserProfile interface
 */
export function normalizeUserProfile(rawUser: any): UserProfile {
  if (!rawUser) return {} as UserProfile;
  const id = String(rawUser._id || rawUser.id || "");
  const username = rawUser.username || (rawUser.email ? rawUser.email.split("@")[0].toLowerCase() : "");
  const displayName = rawUser.name || rawUser.displayName || rawUser.penName || username || "Storyteller";
  const penName = rawUser.penName || rawUser.displayName || rawUser.name || displayName;
  const avatarUrl =
    rawUser.avatarUrl ||
    rawUser.avatar ||
    rawUser.photoURL ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop";

  const followersCount = Number(rawUser.followersCount ?? (Array.isArray(rawUser.followers) ? rawUser.followers.length : 0));
  const followingCount = Number(rawUser.followingCount ?? (Array.isArray(rawUser.following) ? rawUser.following.length : 0));

  // writingStats
  const ws = rawUser.writingStats || {};
  const writingStats = {
    storiesPublished: Number(ws.storiesPublished ?? rawUser.storiesPublished ?? rawUser.storiesCount ?? 0),
    draftStories: Number(ws.draftStories ?? 0),
    totalChaptersPublished: Number(ws.totalChaptersPublished ?? 0),
    totalReads: Number(ws.totalReads ?? rawUser.totalReads ?? rawUser.readsCount ?? 0),
    totalLikes: Number(ws.totalLikes ?? rawUser.totalLikes ?? rawUser.likesCount ?? 0),
    totalComments: Number(ws.totalComments ?? 0),
  };

  // readingStats
  const rs = rawUser.readingStats || {};
  const readingStats = {
    booksRead: Number(rs.booksRead ?? 0),
    chaptersRead: Number(rs.chaptersRead ?? 0),
    readingStreakDays: Number(rs.readingStreakDays ?? 0),
    favoriteGenres: Array.isArray(rs.favoriteGenres) ? rs.favoriteGenres : ["Folklore", "Mythology"],
    interests: Array.isArray(rs.interests) ? rs.interests : ["African Oral Traditions"],
  };

  // supportDetails
  const sd = rawUser.supportDetails || rawUser.banking || {};
  const supportDetails: CreatorSupportDetails = {
    bankName: sd.bankName || "",
    accountName: sd.accountHolderName || sd.accountName || displayName,
    accountNumber: sd.accountNumber || "",
    paystackLink: sd.paystackLink || "",
    isAcceptingSupport: sd.isAcceptingSupport ?? Boolean(sd.bankName || sd.paystackLink),
    totalTipsReceived: Number(sd.totalTipsReceived || 0),
  };

  // badges
  const badges: LoreBadge[] = Array.isArray(rawUser.badges) && rawUser.badges.length > 0
    ? rawUser.badges
    : [
        {
          id: "badge-initiate",
          name: "Storyteller Initiate",
          description: "Entered the sacred Inkoma oral archive",
          iconName: "Crown",
          tier: "bronze",
          unlockedAt: "Recently",
        },
      ];

  return {
    id,
    username,
    displayName,
    penName,
    bio: rawUser.bio || "Preserving ancestral lore through interactive storytelling.",
    phone: rawUser.phone || "",
    avatarUrl,
    country: rawUser.country || "Pan-African",
    role: rawUser.role || "storyteller",
    traditionSpecialty: rawUser.traditionSpecialty || "Pan-African Folklore",
    createdAt: rawUser.createdAt || new Date().toISOString(),
    followersCount,
    followingCount,
    isFollowing: Boolean(rawUser.isFollowing),
    badges,
    writingStats,
    readingStats,
    supportDetails,
  };
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
 * 9. Get Public Storyteller Profile (GET /api/v1/users/profile/:username) — Public
 * Returns full storyteller public profile with writingStats, readingStats, badges, followers, and follow status
 */
export async function getUserPublicProfile(
  username: string
): Promise<{ profile: UserProfile; isFollowing: boolean } | null> {
  if (!username) return null;
  try {
    const res = await apiClient.get<any>(`/users/profile/${encodeURIComponent(username.toLowerCase())}`);
    const rawUser = res?.data?.profile || res?.data?.user || res?.data || res?.profile || res?.user;
    if (rawUser && (rawUser._id || rawUser.id || rawUser.username || rawUser.displayName || rawUser.name)) {
      const isFollowing = Boolean(res?.data?.isFollowing ?? rawUser.isFollowing);
      return {
        profile: normalizeUserProfile(rawUser),
        isFollowing,
      };
    }
    return null;
  } catch (error: any) {
    if (error?.response?.status === 404 || error?.statusCode === 404) {
      return null;
    }
    console.warn(`[UserService] Error fetching public profile for ${username}:`, error);
    return null;
  }
}

/**
 * 10. Follow a Storyteller (POST /api/v1/users/follow/:userId) — Protected
 * Follows a storyteller and increments their followersCount
 */
export async function followStoryteller(
  userId: string
): Promise<{ isFollowing: boolean; followersCount?: number }> {
  const res = await apiClient.post<any>(`/users/follow/${encodeURIComponent(userId)}`, {});
  const data = res?.data || res || {};
  return {
    isFollowing: true,
    followersCount: data.followersCount,
  };
}

/**
 * 11. Unfollow a Storyteller (DELETE /api/v1/users/follow/:userId) — Protected
 * Unfollows a storyteller and decrements their followersCount
 */
export async function unfollowStoryteller(
  userId: string
): Promise<{ isFollowing: boolean; followersCount?: number }> {
  const res = await apiClient.delete<any>(`/users/follow/${encodeURIComponent(userId)}`);
  const data = res?.data || res || {};
  return {
    isFollowing: false,
    followersCount: data.followersCount,
  };
}

/**
 * 12. Check Follow Status (GET /api/v1/users/follow/status/:userId) — Protected
 * Checks whether the authenticated user follows the target storyteller
 */
export async function getFollowStatus(userId: string): Promise<boolean> {
  if (!userId) return false;
  try {
    const res = await apiClient.get<any>(`/users/follow/status/${encodeURIComponent(userId)}`);
    return Boolean(res?.data?.isFollowing ?? res?.isFollowing ?? false);
  } catch {
    return false;
  }
}

/**
 * 13. Get Author Support Details (GET /api/v1/users/support/:userIdOrUsername) — Public
 * Returns author verified payout details or tipping links
 */
export async function getAuthorSupportDetails(
  userIdOrUsername: string
): Promise<CreatorSupportDetails | null> {
  if (!userIdOrUsername) return null;
  try {
    const res = await apiClient.get<any>(`/users/support/${encodeURIComponent(userIdOrUsername)}`);
    const data = res?.data?.supportDetails || res?.data?.support || res?.data || res;
    if (data) {
      return {
        bankName: data.bankName || "",
        accountName: data.accountHolderName || data.accountName || "",
        accountNumber: data.accountNumber || "",
        paystackLink: data.paystackLink || "",
        isAcceptingSupport: data.isAcceptingSupport ?? Boolean(data.bankName || data.paystackLink),
        totalTipsReceived: Number(data.totalTipsReceived || 0),
      };
    }
    return null;
  } catch (error) {
    console.warn(`[UserService] Error fetching support details for ${userIdOrUsername}:`, error);
    return null;
  }
}

/**
 * 14. Get Storyteller Followers (GET /api/v1/users/profile/:username/followers) — Public
 * Also accessible via GET /api/v1/users/:username/followers
 * Returns paginated list of users following :username.
 * Query parameters: page (default: 1), limit (default: 20), search (filters by name/penName/specialty)
 * If viewer is authenticated, isFollowing indicates whether viewer follows each returned user.
 */
export async function getUserFollowers(
  username: string,
  options: GetNetworkUsersOptions = {}
): Promise<GetNetworkUsersResult> {
  if (!username) {
    return {
      users: [],
      pagination: { total: 0, page: 1, limit: options.limit || 20, totalPages: 1 },
    };
  }

  const cleanUsername = username.toLowerCase().trim();
  const params: Record<string, string | number> = {
    page: options.page || 1,
    limit: options.limit || 20,
  };
  if (options.search && options.search.trim()) {
    params.search = options.search.trim();
  }

  try {
    let res: any;
    try {
      res = await apiClient.get<any>(
        `/users/profile/${encodeURIComponent(cleanUsername)}/followers`,
        { params }
      );
    } catch (primaryErr: any) {
      if (primaryErr?.status === 404 || primaryErr?.statusCode === 404) {
        // Fallback to alternate route /users/:username/followers
        res = await apiClient.get<any>(
          `/users/${encodeURIComponent(cleanUsername)}/followers`,
          { params }
        );
      } else {
        throw primaryErr;
      }
    }

    const data = res?.data || res || {};
    const rawList: any[] =
      data.followers || data.users || data.items || (Array.isArray(data) ? data : []);

    const users = rawList.map(normalizeNetworkUser);

    const pagination: NetworkPagination = {
      total: Number(data.pagination?.total ?? data.total ?? users.length),
      page: Number(data.pagination?.page ?? data.page ?? (options.page || 1)),
      limit: Number(data.pagination?.limit ?? data.limit ?? (options.limit || 20)),
      totalPages: Number(
        data.pagination?.totalPages ??
          data.totalPages ??
          Math.max(1, Math.ceil((data.total || users.length) / (options.limit || 20)))
      ),
    };

    return { users, pagination };
  } catch (error: any) {
    console.warn(`[UserService] Error fetching followers for ${username}:`, error);
    return {
      users: [],
      pagination: {
        total: 0,
        page: options.page || 1,
        limit: options.limit || 20,
        totalPages: 1,
      },
    };
  }
}

/**
 * 15. Get Users Followed by Storyteller (GET /api/v1/users/profile/:username/following) — Public
 * Also accessible via GET /api/v1/users/:username/following
 * Returns paginated list of users that :username follows.
 * Query parameters: page (default: 1), limit (default: 20), search (filters by name/penName/specialty)
 * If viewer is authenticated, isFollowing indicates whether viewer follows each returned user.
 */
export async function getUserFollowing(
  username: string,
  options: GetNetworkUsersOptions = {}
): Promise<GetNetworkUsersResult> {
  if (!username) {
    return {
      users: [],
      pagination: { total: 0, page: 1, limit: options.limit || 20, totalPages: 1 },
    };
  }

  const cleanUsername = username.toLowerCase().trim();
  const params: Record<string, string | number> = {
    page: options.page || 1,
    limit: options.limit || 20,
  };
  if (options.search && options.search.trim()) {
    params.search = options.search.trim();
  }

  try {
    let res: any;
    try {
      res = await apiClient.get<any>(
        `/users/profile/${encodeURIComponent(cleanUsername)}/following`,
        { params }
      );
    } catch (primaryErr: any) {
      if (primaryErr?.status === 404 || primaryErr?.statusCode === 404) {
        // Fallback to alternate route /users/:username/following
        res = await apiClient.get<any>(
          `/users/${encodeURIComponent(cleanUsername)}/following`,
          { params }
        );
      } else {
        throw primaryErr;
      }
    }

    const data = res?.data || res || {};
    const rawList: any[] =
      data.following || data.users || data.items || (Array.isArray(data) ? data : []);

    const users = rawList.map(normalizeNetworkUser);

    const pagination: NetworkPagination = {
      total: Number(data.pagination?.total ?? data.total ?? users.length),
      page: Number(data.pagination?.page ?? data.page ?? (options.page || 1)),
      limit: Number(data.pagination?.limit ?? data.limit ?? (options.limit || 20)),
      totalPages: Number(
        data.pagination?.totalPages ??
          data.totalPages ??
          Math.max(1, Math.ceil((data.total || users.length) / (options.limit || 20)))
      ),
    };

    return { users, pagination };
  } catch (error: any) {
    console.warn(`[UserService] Error fetching following for ${username}:`, error);
    return {
      users: [],
      pagination: {
        total: 0,
        page: options.page || 1,
        limit: options.limit || 20,
        totalPages: 1,
      },
    };
  }
}

/**
 * 16. Library, Bookmarks, Favorites & Quotes Endpoints
 */
export * from "./libraryService";
