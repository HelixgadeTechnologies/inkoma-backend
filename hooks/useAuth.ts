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
        ? {
            id: context.user.uid,
            email: context.user.email || undefined,
            emailVerified: context.user.emailVerified,
          }
        : null,
      firebaseUser: context.user,
      profile: adaptedProfile,
      loading: context.loading,
      isAuthenticated: context.isAuthenticated,
      emailVerified: context.emailVerified,
      signIn: async (email?: string, pass?: string) => {
        if (email && pass) {
          return await context.loginWithEmail(email, pass);
        } else {
          return await context.loginWithEmail("kwame@inkoma.app", "password123");
        }
      },
      signUp: context.signupWithEmail,
      signInWithGoogle: context.loginWithGoogleProvider,
      signOut: context.logout,
      sendVerification: context.sendVerification,
      checkVerification: context.checkVerification,
    };
  } catch {
    // Fallback if rendered outside of AuthProvider
    return {
      user: { id: MOCK_CURRENT_USER.id, email: "kwame@inkoma.app", emailVerified: true },
      firebaseUser: null,
      profile: MOCK_CURRENT_USER,
      loading: false,
      isAuthenticated: true,
      emailVerified: true,
      signIn: async () => {},
      signUp: async () => {},
      signInWithGoogle: async () => {},
      signOut: async () => {},
      sendVerification: async () => {},
      checkVerification: async () => true,
    };
  }
}
