"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User as FirebaseUser } from "firebase/auth";
import {
  signUpUser,
  loginUser,
  loginWithGoogle,
  logoutUser,
  getUserProfile,
  updateUserProfileDoc,
  onAuthChange,
  sendVerificationEmail,
  checkEmailVerification,
  FirestoreUserData,
} from "@/src/services/authService";
import { isFirebaseConfigured } from "@/src/firebase/config";
import { MOCK_CURRENT_USER } from "@/config/mock-data";

export interface AuthContextType {
  user: FirebaseUser | null;
  profile: FirestoreUserData | null;
  loading: boolean;
  isAuthenticated: boolean;
  emailVerified: boolean;
  loginWithEmail: (
    email: string,
    pass: string
  ) => Promise<{ user: FirebaseUser | null; profile: FirestoreUserData | null }>;
  signupWithEmail: (
    email: string,
    pass: string,
    displayName: string,
    role?: "author" | "reader"
  ) => Promise<void>;
  loginWithGoogleProvider: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<FirestoreUserData>) => Promise<void>;
  sendVerification: () => Promise<void>;
  checkVerification: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<FirestoreUserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth listener
  useEffect(() => {
    let unsubscribe = () => {};

    if (isFirebaseConfigured()) {
      unsubscribe = onAuthChange(async (firebaseUser) => {
        if (firebaseUser) {
          setUser(firebaseUser);
          const userDoc = await getUserProfile(firebaseUser.uid);
          setProfile(userDoc);
          if (typeof window !== "undefined") {
            localStorage.setItem("inkoma_authenticated", "true");
          }
        } else {
          setUser(null);
          setProfile(null);
          if (typeof window !== "undefined") {
            localStorage.setItem("inkoma_authenticated", "false");
          }
        }
        setLoading(false);
      });
    } else {
      // Offline / Local Development Fallback
      try {
        if (typeof window !== "undefined") {
          const storedAuth = localStorage.getItem("inkoma_authenticated");
          if (storedAuth === "true") {
            const storedProfile = localStorage.getItem("inkoma_user_profile");
            if (storedProfile) {
              setProfile(JSON.parse(storedProfile));
            } else {
              setProfile({
                uid: MOCK_CURRENT_USER.id,
                displayName: MOCK_CURRENT_USER.displayName,
                email: "kwame@inkoma.app",
                photoURL: MOCK_CURRENT_USER.avatarUrl,
                bio: MOCK_CURRENT_USER.bio,
                role: "author",
              });
            }
          }
        }
      } catch (err) {
        console.warn("[AuthContext] Local fallback load error:", err);
      } finally {
        setLoading(false);
      }
    }

    return () => unsubscribe();
  }, []);

  const loginWithEmail = useCallback(async (email: string, pass: string) => {
    setLoading(true);
    try {
      const result = await loginUser(email, pass);
      if (result.user) setUser(result.user);
      if (result.profile) setProfile(result.profile);
      return result;
    } finally {
      setLoading(false);
    }
  }, []);

  const signupWithEmail = useCallback(
    async (
      email: string,
      pass: string,
      displayName: string,
      role: "author" | "reader" = "author"
    ) => {
      setLoading(true);
      try {
        const result = await signUpUser(email, pass, displayName, role);
        if (result.user) setUser(result.user);
        if (result.profile) setProfile(result.profile);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const loginWithGoogleProvider = useCallback(async () => {
    setLoading(true);
    try {
      const result = await loginWithGoogle();
      if (result.user) setUser(result.user);
      if (result.profile) setProfile(result.profile);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await logoutUser();
      setUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(
    async (data: Partial<FirestoreUserData>) => {
      if (profile?.uid) {
        await updateUserProfileDoc(profile.uid, data);
        setProfile((prev) => (prev ? { ...prev, ...data } : null));
      }
    },
    [profile]
  );

  const sendVerification = useCallback(async () => {
    if (user) {
      await sendVerificationEmail(user);
    }
  }, [user]);

  const checkVerification = useCallback(async () => {
    if (!user) return false;
    const isVerified = await checkEmailVerification(user);
    if (isVerified) {
      // Force update user state
      setUser((prev) => (prev ? ({ ...prev, emailVerified: true } as FirebaseUser) : null));
      setProfile((prev) => (prev ? { ...prev, emailVerified: true } : null));
    }
    return isVerified;
  }, [user]);

  const isVerified = !isFirebaseConfigured() || !!user?.emailVerified || !!profile?.emailVerified;

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isAuthenticated: !!user || !!profile,
        emailVerified: isVerified,
        loginWithEmail,
        signupWithEmail,
        loginWithGoogleProvider,
        logout,
        updateProfile,
        sendVerification,
        checkVerification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
