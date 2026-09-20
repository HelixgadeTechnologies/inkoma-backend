"use client";

import { useAuthContext } from "@/src/context/AuthContext";
import { UserProfile } from "@/types";
import { MOCK_CURRENT_USER } from "@/config/mock-data";

export function useAuth() {
  try {
    const context = useAuthContext();
    const adaptedProfile: UserProfile | null = context.profile
      ? {
          id: context.profile.uid,
          username: context.profile.displayName?.toLowerCase().replace(/\s+/g, "_") || "storyteller",
          displayName: context.profile.displayName || "Storyteller",
          email: context.profile.email,
          avatarUrl: context.profile.photoURL || MOCK_CURRENT_USER.avatarUrl,
          bio: context.profile.bio || MOCK_CURRENT_USER.bio,
          role: (context.profile.role as "reader" | "writer" | "storyteller" | "elder_admin") || "storyteller",
          followersCount: 0,
          followingCount: 0,
          badges: [],
          createdAt: new Date().toISOString(),
        }
      : null;

    return {
      user: context.user
        ? { id: context.user.uid, email: context.user.email || undefined }
        : null,
      firebaseUser: context.user,
      profile: adaptedProfile,
      loading: context.loading,
      isAuthenticated: context.isAuthenticated,
      signIn: async (email?: string, pass?: string) => {
        if (email && pass) {
          await context.loginWithEmail(email, pass);
        } else {
          context.loginWithEmail("kwame@inkoma.app", "password123").catch(() => {});
        }
      },
      signUp: context.signupWithEmail,
      signInWithGoogle: context.loginWithGoogleProvider,
      signOut: context.logout,
    };
  } catch {
    // Fallback if rendered outside of AuthProvider
    return {
      user: { id: MOCK_CURRENT_USER.id, email: "kwame@inkoma.app" },
      firebaseUser: null,
      profile: MOCK_CURRENT_USER,
      loading: false,
      isAuthenticated: true,
      signIn: async () => {},
      signUp: async () => {},
      signInWithGoogle: async () => {},
      signOut: async () => {},
    };
  }
}
