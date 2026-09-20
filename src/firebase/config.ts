import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

// Production Firebase Configuration
// Supports NEXT_PUBLIC_ (Next.js), REACT_APP_ (CRA), and VITE_ (Vite) prefixes
export const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    process.env.REACT_APP_FIREBASE_API_KEY ||
    process.env.VITE_FIREBASE_API_KEY ||
    "",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ||
    process.env.VITE_FIREBASE_AUTH_DOMAIN ||
    "",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    process.env.REACT_APP_FIREBASE_PROJECT_ID ||
    process.env.VITE_FIREBASE_PROJECT_ID ||
    "",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ||
    process.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ||
    process.env.VITE_FIREBASE_MESSAGING_SENDER_ID ||
    "",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    process.env.REACT_APP_FIREBASE_APP_ID ||
    process.env.VITE_FIREBASE_APP_ID ||
    "",
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ||
    process.env.REACT_APP_FIREBASE_MEASUREMENT_ID ||
    process.env.VITE_FIREBASE_MEASUREMENT_ID ||
    "",
};

export const isFirebaseConfigured = (): boolean => {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.apiKey !== "your-api-key"
  );
};

// Safe singleton initialization
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

if (typeof window !== "undefined" || isFirebaseConfigured()) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(
      isFirebaseConfigured()
        ? firebaseConfig
        : {
            apiKey: "dummy-key-for-initialization",
            authDomain: "inkoma-backend.firebaseapp.com",
            projectId: "inkoma-backend",
            storageBucket: "inkoma-backend.appspot.com",
            messagingSenderId: "123456789",
            appId: "1:123456789:web:abcdef",
          }
    );
    const firestoreDatabaseId =
      process.env.NEXT_PUBLIC_FIREBASE_DATABASE_ID ||
      process.env.REACT_APP_FIREBASE_DATABASE_ID ||
      process.env.VITE_FIREBASE_DATABASE_ID ||
      "default";

    auth = getAuth(app);
    db = getFirestore(app, firestoreDatabaseId);
    storage = getStorage(app);
  } catch (err) {
    console.warn("[Firebase] Initialization warning:", err);
    // @ts-expect-error fallback initialization
    app = null;
    // @ts-expect-error fallback initialization
    auth = null;
    // @ts-expect-error fallback initialization
    db = null;
    // @ts-expect-error fallback initialization
    storage = null;
  }
} else {
  // @ts-expect-error fallback initialization
  app = null;
  // @ts-expect-error fallback initialization
  auth = null;
  // @ts-expect-error fallback initialization
  db = null;
  // @ts-expect-error fallback initialization
  storage = null;
}

export { app, auth, db, storage };
