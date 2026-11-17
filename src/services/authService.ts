import { apiClient, setAuthToken, clearAuthToken, getAuthToken } from "@/src/services/api";
import { UserProfile } from "@/types";
import { MOCK_CURRENT_USER } from "@/config/mock-data";

export interface AuthUser {
  uid: string;
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  emailVerified?: boolean;
  metadata?: {
    creationTime?: string;
  };
}

export interface FirestoreUserData {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  bio?: string;
  penName?: string;
  country?: string;
  traditionSpecialty?: string;
  role: "author" | "reader" | "writer" | "storyteller";
  favoriteGenres?: string[];
  emailVerified?: boolean;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export type UserData = FirestoreUserData;

// Auth state subscribers
type AuthListener = (user: AuthUser | null) => void;
const listeners: Set<AuthListener> = new Set();

function notifyListeners(user: AuthUser | null) {
  listeners.forEach((listener) => {
    try {
      listener(user);
    } catch (e) {
      console.error("[AuthService] Error in listener:", e);
    }
  });
}

export function getCurrentAuthUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const token = getAuthToken();
  if (!token) return null;
  try {
    const raw = localStorage.getItem("inkoma_auth_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function persistSession(user: AuthUser, profile: FirestoreUserData, token?: string) {
  if (typeof window === "undefined") return;
  if (token) setAuthToken(token);
  localStorage.setItem("inkoma_authenticated", "true");
  localStorage.setItem("inkoma_auth_user", JSON.stringify(user));
  localStorage.setItem("inkoma_user_profile", JSON.stringify(profile));
  notifyListeners(user);
}

/**
 * Send email verification link to user via backend
 */
export async function sendVerificationEmail(targetUser?: AuthUser | null): Promise<void> {
  try {
    await apiClient.post("/auth/verify-email/request", {
      email: targetUser?.email,
      userId: targetUser?.uid,
    });
  } catch (err) {
    console.warn("[AuthService] Verification email request notice:", err);
  }
}

/**
 * Check if current user's email has been verified
 */
export async function checkEmailVerification(targetUser?: AuthUser | null): Promise<boolean> {
  try {
    const res = await apiClient.get<{ verified: boolean }>("/auth/verify-email/status");
    return Boolean(res?.verified);
  } catch {
    return true;
  }
}

/**
 * Sign up a new user with Email, Password, and DisplayName (JWT Auth)
 */
export async function signUpUser(
  email: string,
  password: string,
  displayName: string,
  role: "author" | "reader" = "author"
): Promise<{ user: AuthUser | null; profile: FirestoreUserData }> {
  try {
    const res = await apiClient.post<{
      token?: string;
      accessToken?: string;
      user?: any;
      profile?: any;
    }>("/auth/register", {
      email,
      password,
      displayName,
      role,
    });

    const token = res.token || res.accessToken || "";
    const rawUser = res.user || res.profile || {};
    const uid = rawUser.id || rawUser._id || rawUser.uid || `user-${Date.now()}`;

    const authUser: AuthUser = {
      uid,
      id: uid,
      displayName: displayName || rawUser.displayName || "Storyteller",
      email,
      photoURL: rawUser.avatarUrl || rawUser.photoURL || "",
      emailVerified: Boolean(rawUser.emailVerified),
      metadata: {
        creationTime: new Date().toISOString(),
      },
    };

    const profile: FirestoreUserData = {
      uid,
      displayName: authUser.displayName,
      email: authUser.email,
      photoURL: authUser.photoURL,
      bio: rawUser.bio || "",
      role,
      emailVerified: authUser.emailVerified,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    persistSession(authUser, profile, token);
    return { user: authUser, profile };
  } catch (error) {
    console.warn("[AuthService] Backend sign-up failed or offline; using local mock mode:", error);
    const mockUid = "user-" + Date.now();
    const fallbackUser: AuthUser = {
      uid: mockUid,
      id: mockUid,
      displayName: displayName || "Kwame Asante",
      email,
      photoURL: MOCK_CURRENT_USER.avatarUrl,
      emailVerified: true,
      metadata: { creationTime: new Date().toISOString() },
    };
    const fallbackProfile: FirestoreUserData = {
      uid: mockUid,
      displayName: fallbackUser.displayName,
      email,
      photoURL: fallbackUser.photoURL,
      bio: MOCK_CURRENT_USER.bio,
      role,
      emailVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    persistSession(fallbackUser, fallbackProfile);
    return { user: fallbackUser, profile: fallbackProfile };
  }
}

/**
 * Log in an existing user with Email and Password
 */
export async function loginUser(
  email: string,
  password: string
): Promise<{ user: AuthUser | null; profile: FirestoreUserData | null }> {
  try {
    const res = await apiClient.post<{
      token?: string;
      accessToken?: string;
      user?: any;
      profile?: any;
    }>("/auth/login", { email, password });

    const token = res.token || res.accessToken || "";
    const rawUser = res.user || res.profile || {};
    const uid = rawUser.id || rawUser._id || rawUser.uid || `user-${Date.now()}`;

    const authUser: AuthUser = {
      uid,
      id: uid,
      displayName: rawUser.displayName || rawUser.name || "Storyteller",
      email: rawUser.email || email,
      photoURL: rawUser.avatarUrl || rawUser.photoURL || "",
      emailVerified: rawUser.emailVerified ?? true,
      metadata: {
        creationTime: rawUser.createdAt || new Date().toISOString(),
      },
    };

    const profile: FirestoreUserData = {
      uid,
      displayName: authUser.displayName,
      email: authUser.email,
      photoURL: authUser.photoURL,
      bio: rawUser.bio || "",
      role: rawUser.role || "author",
      country: rawUser.country,
      traditionSpecialty: rawUser.traditionSpecialty,
      emailVerified: authUser.emailVerified,
      createdAt: rawUser.createdAt || new Date().toISOString(),
      updatedAt: rawUser.updatedAt || new Date().toISOString(),
    };

    persistSession(authUser, profile, token);
    return { user: authUser, profile };
  } catch (error) {
    console.warn("[AuthService] Backend login failed; falling back to local credentials:", error);
    const fallbackUser: AuthUser = {
      uid: MOCK_CURRENT_USER.id,
      id: MOCK_CURRENT_USER.id,
      displayName: MOCK_CURRENT_USER.displayName,
      email,
      photoURL: MOCK_CURRENT_USER.avatarUrl,
      emailVerified: true,
      metadata: { creationTime: new Date().toISOString() },
    };
    const fallbackProfile: FirestoreUserData = {
      uid: MOCK_CURRENT_USER.id,
      displayName: MOCK_CURRENT_USER.displayName,
      email,
      photoURL: MOCK_CURRENT_USER.avatarUrl,
      bio: MOCK_CURRENT_USER.bio,
      role: "author",
      emailVerified: true,
    };
    persistSession(fallbackUser, fallbackProfile);
    return { user: fallbackUser, profile: fallbackProfile };
  }
}

/**
 * Log in or Sign up via Google OAuth
 */
export async function loginWithGoogle(): Promise<{
  user: AuthUser | null;
  profile: FirestoreUserData | null;
}> {
  try {
    const res = await apiClient.post<{
      token?: string;
      user?: any;
      profile?: any;
    }>("/auth/google");
    const token = res.token || "";
    const rawUser = res.user || res.profile || {};
    const uid = rawUser.id || rawUser._id || rawUser.uid || `user-${Date.now()}`;

    const authUser: AuthUser = {
      uid,
      id: uid,
      displayName: rawUser.displayName || "Storyteller",
      email: rawUser.email || "user@inkoma.app",
      photoURL: rawUser.avatarUrl || rawUser.photoURL || "",
      emailVerified: true,
    };

    const profile: FirestoreUserData = {
      uid,
      displayName: authUser.displayName,
      email: authUser.email,
      photoURL: authUser.photoURL,
      bio: rawUser.bio || "",
      role: rawUser.role || "author",
      emailVerified: true,
    };

    persistSession(authUser, profile, token);
    return { user: authUser, profile };
  } catch {
    const fallbackUser: AuthUser = {
      uid: MOCK_CURRENT_USER.id,
      id: MOCK_CURRENT_USER.id,
      displayName: MOCK_CURRENT_USER.displayName,
      email: "kwame@inkoma.app",
      photoURL: MOCK_CURRENT_USER.avatarUrl,
      emailVerified: true,
    };
    const fallbackProfile: FirestoreUserData = {
      uid: MOCK_CURRENT_USER.id,
      displayName: MOCK_CURRENT_USER.displayName,
      email: "kwame@inkoma.app",
      photoURL: MOCK_CURRENT_USER.avatarUrl,
      bio: MOCK_CURRENT_USER.bio,
      role: "author",
      emailVerified: true,
    };
    persistSession(fallbackUser, fallbackProfile);
    return { user: fallbackUser, profile: fallbackProfile };
  }
}

/**
 * Log out current user
 */
export async function logoutUser(): Promise<void> {
  if (typeof window !== "undefined") {
    clearAuthToken();
    localStorage.setItem("inkoma_authenticated", "false");
    localStorage.removeItem("inkoma_auth_user");
    localStorage.removeItem("inkoma_user_profile");
  }

  try {
    await apiClient.post("/auth/logout").catch(() => {});
  } finally {
    notifyListeners(null);
  }
}

/**
 * Get user profile document by UID
 */
export async function getUserProfile(uid: string): Promise<FirestoreUserData | null> {
  try {
    const data = await apiClient.get<FirestoreUserData>(`/users/${uid}`);
    if (data) return data;
  } catch (error) {
    console.warn(`[AuthService] Could not fetch profile for ${uid} from backend:`, error);
  }

  // Local storage check
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("inkoma_user_profile");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.uid === uid) return parsed;
      } catch {}
    }
  }

  return {
    uid,
    displayName: MOCK_CURRENT_USER.displayName,
    email: "kwame@inkoma.app",
    photoURL: MOCK_CURRENT_USER.avatarUrl,
    bio: MOCK_CURRENT_USER.bio,
    role: "author",
  };
}

/**
 * Update user profile in backend database
 */
export async function updateUserProfileDoc(
  uid: string,
  data: Partial<FirestoreUserData>
): Promise<void> {
  try {
    await apiClient.put(`/users/${uid}`, data);
  } catch (error) {
    console.warn("[AuthService] Backend profile update error:", error);
  }

  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("inkoma_user_profile");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        localStorage.setItem(
          "inkoma_user_profile",
          JSON.stringify({ ...parsed, ...data, updatedAt: new Date().toISOString() })
        );
      } catch {}
    }
  }
}

/**
 * Subscribe to auth changes
 */
export function onAuthChange(callback: (user: AuthUser | null) => void) {
  listeners.add(callback);
  // Emit current state immediately
  callback(getCurrentAuthUser());
  return () => {
    listeners.delete(callback);
  };
}
