import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  User as FirebaseUser,
  NextOrObserver,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "@/src/firebase/config";
import { UserProfile } from "@/types";
import { MOCK_CURRENT_USER } from "@/config/mock-data";

export interface FirestoreUserData {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  bio?: string;
  role: "author" | "reader" | "writer" | "storyteller";
  createdAt?: unknown;
  updatedAt?: unknown;
}

/**
 * Sign up a new user with Email and Password
 */
export async function signUpUser(
  email: string,
  password: string,
  displayName: string,
  role: "author" | "reader" = "author"
): Promise<{ user: FirebaseUser | null; profile: FirestoreUserData }> {
  if (!isFirebaseConfigured() || !auth || !db) {
    console.info("[AuthService] Firebase not configured; using offline fallback.");
    const fallbackProfile: FirestoreUserData = {
      uid: "mock-user-" + Date.now(),
      displayName: displayName || "Kwame Asante",
      email,
      photoURL: MOCK_CURRENT_USER.avatarUrl,
      bio: MOCK_CURRENT_USER.bio,
      role,
    };
    if (typeof window !== "undefined") {
      localStorage.setItem("inkoma_authenticated", "true");
      localStorage.setItem("inkoma_user_profile", JSON.stringify(fallbackProfile));
    }
    return { user: null, profile: fallbackProfile };
  }

  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const user = credential.user;

  if (displayName) {
    await updateProfile(user, { displayName });
  }

  const userDocRef = doc(db, "users", user.uid);
  const newProfile: FirestoreUserData = {
    uid: user.uid,
    displayName: displayName || user.displayName || "Storyteller",
    email: user.email || email,
    photoURL: user.photoURL || "",
    bio: "",
    role,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(userDocRef, newProfile);
  return { user, profile: newProfile };
}

/**
 * Log in an existing user with Email and Password
 */
export async function loginUser(
  email: string,
  password: string
): Promise<{ user: FirebaseUser | null; profile: FirestoreUserData | null }> {
  if (!isFirebaseConfigured() || !auth || !db) {
    console.info("[AuthService] Firebase not configured; logging in with local fallback.");
    const fallbackProfile: FirestoreUserData = {
      uid: MOCK_CURRENT_USER.id,
      displayName: MOCK_CURRENT_USER.displayName,
      email,
      photoURL: MOCK_CURRENT_USER.avatarUrl,
      bio: MOCK_CURRENT_USER.bio,
      role: "author",
    };
    if (typeof window !== "undefined") {
      localStorage.setItem("inkoma_authenticated", "true");
      localStorage.setItem("inkoma_user_profile", JSON.stringify(fallbackProfile));
    }
    return { user: null, profile: fallbackProfile };
  }

  const credential = await signInWithEmailAndPassword(auth, email, password);
  const user = credential.user;
  const profile = await getUserProfile(user.uid);
  return { user, profile };
}

/**
 * Log in or Sign up via Google OAuth
 */
export async function loginWithGoogle(): Promise<{
  user: FirebaseUser | null;
  profile: FirestoreUserData | null;
}> {
  if (!isFirebaseConfigured() || !auth || !db) {
    console.info("[AuthService] Firebase not configured; simulated Google login.");
    const fallbackProfile: FirestoreUserData = {
      uid: MOCK_CURRENT_USER.id,
      displayName: MOCK_CURRENT_USER.displayName,
      email: "kwame@inkoma.app",
      photoURL: MOCK_CURRENT_USER.avatarUrl,
      bio: MOCK_CURRENT_USER.bio,
      role: "author",
    };
    if (typeof window !== "undefined") {
      localStorage.setItem("inkoma_authenticated", "true");
      localStorage.setItem("inkoma_user_profile", JSON.stringify(fallbackProfile));
    }
    return { user: null, profile: fallbackProfile };
  }

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  const credential = await signInWithPopup(auth, provider);
  const user = credential.user;

  // Retrieve or create Firestore document for the Google user
  const userDocRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userDocRef);

  let profile: FirestoreUserData;
  if (!snapshot.exists()) {
    profile = {
      uid: user.uid,
      displayName: user.displayName || "Storyteller",
      email: user.email || "",
      photoURL: user.photoURL || "",
      bio: "",
      role: "author",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await setDoc(userDocRef, profile);
  } else {
    profile = snapshot.data() as FirestoreUserData;
  }

  return { user, profile };
}

/**
 * Log out current user
 */
export async function logoutUser(): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.setItem("inkoma_authenticated", "false");
    localStorage.removeItem("inkoma_user_profile");
  }

  if (isFirebaseConfigured() && auth) {
    await signOut(auth);
  }
}

/**
 * Get user profile document by UID
 */
export async function getUserProfile(uid: string): Promise<FirestoreUserData | null> {
  if (!isFirebaseConfigured() || !db) {
    return {
      uid,
      displayName: MOCK_CURRENT_USER.displayName,
      email: "kwame@inkoma.app",
      photoURL: MOCK_CURRENT_USER.avatarUrl,
      bio: MOCK_CURRENT_USER.bio,
      role: "author",
    };
  }

  try {
    const userDocRef = doc(db, "users", uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return snap.data() as FirestoreUserData;
    }
    return null;
  } catch (error) {
    console.error("[AuthService] Error fetching user profile:", error);
    return null;
  }
}

/**
 * Update user profile document in Firestore
 */
export async function updateUserProfileDoc(
  uid: string,
  data: Partial<FirestoreUserData>
): Promise<void> {
  if (!isFirebaseConfigured() || !db) {
    console.info("[AuthService] Firebase offline; local profile updated.");
    return;
  }

  const userDocRef = doc(db, "users", uid);
  await setDoc(
    userDocRef,
    {
      ...data,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/**
 * Subscribe to real-time auth changes
 */
export function onAuthChange(callback: NextOrObserver<FirebaseUser | null>) {
  if (!isFirebaseConfigured() || !auth) {
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}
