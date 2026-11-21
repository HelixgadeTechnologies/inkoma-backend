import { apiClient, setAuthToken, clearAuthToken, getAuthToken } from "@/src/services/api";
import { UserProfile } from "@/types";

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
 * Verify user email address with 6-digit confirmation OTP
 */
export async function verifyEmailWithOtp(
  email: string,
  otp: string
): Promise<{ user: AuthUser | null; profile: FirestoreUserData }> {
  const cleanEmail = email.trim().toLowerCase();
  const cleanOtp = otp.trim();

  const res = await apiClient.post<any>("/auth/verify-email", {
    email: cleanEmail,
    otp: cleanOtp,
  });

  const dataObj = res.data || res;
  const token = dataObj.token || res.token || res.accessToken || "";
  const rawUser = dataObj.user || res.user || res.profile || {};
  const uid = rawUser.id || rawUser._id || rawUser.uid || `user-${Date.now()}`;

  const authUser: AuthUser = {
    uid,
    id: uid,
    displayName: rawUser.name || rawUser.displayName || "Storyteller",
    email: rawUser.email || cleanEmail,
    photoURL: rawUser.avatarUrl || rawUser.photoURL || "",
    emailVerified: true,
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
    emailVerified: true,
    createdAt: rawUser.createdAt || new Date().toISOString(),
    updatedAt: rawUser.updatedAt || new Date().toISOString(),
  };

  persistSession(authUser, profile, token);
  return { user: authUser, profile };
}

/**
 * Resend email confirmation OTP via backend
 */
export async function resendVerificationOtp(email: string): Promise<{ success: boolean; message: string }> {
  const cleanEmail = email.trim().toLowerCase();
  const res = await apiClient.post<any>("/auth/resend-verification-otp", {
    email: cleanEmail,
  });
  return {
    success: true,
    message: res.message || "A new verification code was dispatched to your email.",
  };
}

/**
 * Send email verification OTP to user via backend
 */
export async function sendVerificationEmail(targetUser?: AuthUser | null): Promise<void> {
  const targetEmail = targetUser?.email;
  if (!targetEmail) return;
  try {
    await apiClient.post("/auth/resend-verification-otp", {
      email: targetEmail.trim().toLowerCase(),
    });
  } catch (err) {
    console.warn("[AuthService] Verification email request notice:", err);
  }
}

/**
 * Check if current user's email has been verified
 */
export async function checkEmailVerification(targetUser?: AuthUser | null): Promise<boolean> {
  if (!targetUser?.uid && !targetUser?.email) return false;
  try {
    const profile = await getUserProfile(targetUser.uid);
    return Boolean(profile?.emailVerified);
  } catch {
    return false;
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
  const cleanName = (displayName || "").trim() || "Storyteller";
  const cleanEmail = (email || "").trim().toLowerCase();

  if (cleanName.length < 2) {
    throw new Error("Name must be at least 2 characters long.");
  }

  if (!cleanEmail || !cleanEmail.includes("@")) {
    throw new Error("Please provide a valid email address.");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long.");
  }

  if (
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password)
  ) {
    throw new Error(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number."
    );
  }

  try {
    const res = await apiClient.post<any>("/auth/register", {
      name: cleanName,
      email: cleanEmail,
      password,
    });

    const dataObj = res.data || res;
    const token = dataObj.token || res.token || res.accessToken || "";
    const rawUser = dataObj.user || res.user || res.profile || {};
    const uid = rawUser.id || rawUser._id || rawUser.uid || `user-${Date.now()}`;

    const authUser: AuthUser = {
      uid,
      id: uid,
      displayName: rawUser.name || displayName || rawUser.displayName || "Storyteller",
      email,
      photoURL: rawUser.avatarUrl || rawUser.photoURL || "",
      emailVerified: Boolean(rawUser.emailVerified),
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
      role: rawUser.role || role,
      emailVerified: authUser.emailVerified,
      createdAt: rawUser.createdAt || new Date().toISOString(),
      updatedAt: rawUser.updatedAt || new Date().toISOString(),
    };

    persistSession(authUser, profile, token);
    return { user: authUser, profile };
  } catch (error) {
    console.error("[AuthService] Sign-up failed:", error);
    throw error;
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
    const res = await apiClient.post<any>("/auth/login", { email, password });

    const dataObj = res.data || res;
    const token = dataObj.token || res.token || res.accessToken || "";
    const rawUser = dataObj.user || res.user || res.profile || {};
    const uid = rawUser.id || rawUser._id || rawUser.uid || `user-${Date.now()}`;

    const authUser: AuthUser = {
      uid,
      id: uid,
      displayName: rawUser.name || rawUser.displayName || "Storyteller",
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
    console.error("[AuthService] Login failed:", error);
    throw error;
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
  } catch (error) {
    console.error("[AuthService] Google login failed:", error);
    throw error;
  }
}

/**
 * Request a 6-digit OTP for password recovery
 */
export async function sendPasswordResetOtp(email: string): Promise<{ success: boolean; message: string }> {
  const normalizedEmail = email.trim().toLowerCase();
  const res = await fetch("/api/auth/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: normalizedEmail }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to dispatch password recovery OTP.");
  }
  return { success: true, message: data.message };
}

/**
 * Verify a 6-digit OTP for password recovery
 */
export async function verifyPasswordResetOtp(email: string, otp: string): Promise<{ success: boolean; valid: boolean; message: string }> {
  const res = await fetch("/api/auth/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.trim().toLowerCase(), otp: otp.trim() }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Invalid or expired verification code.");
  }
  return { success: true, valid: Boolean(data.valid), message: data.message };
}

/**
 * Reset password using verified OTP and new password
 */
export async function resetPasswordWithOtp(
  email: string,
  otp: string,
  newPassword: string
): Promise<{ success: boolean; message: string }> {
  const res = await fetch("/api/auth/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      otp: otp.trim(),
      newPassword,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to reset password.");
  }
  return { success: true, message: data.message };
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

  return null;
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
