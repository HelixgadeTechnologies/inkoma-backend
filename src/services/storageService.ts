import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage, isFirebaseConfigured } from "@/src/firebase/config";

const MAX_COVER_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_AVATAR_SIZE = 2 * 1024 * 1024; // 2 MB

/**
 * Upload a story cover image to Firebase Cloud Storage
 * Target path: /covers/{authorId}/{storyId}/{fileName}
 */
export async function uploadCoverImage(
  file: File | Blob,
  authorId: string,
  storyId: string
): Promise<string> {
  if (!isFirebaseConfigured() || !storage) {
    console.info("[StorageService] Firebase Storage offline; generating local preview URL.");
    return URL.createObjectURL(file);
  }

  // Size limit validation
  if (file.size > MAX_COVER_SIZE) {
    throw new Error("Cover image exceeds maximum allowed size of 5MB.");
  }

  // File type validation
  if (file.type && !file.type.startsWith("image/")) {
    throw new Error("Invalid file type. Only image files (JPEG, PNG, WebP) are allowed.");
  }

  const cleanFileName = "name" in file ? file.name.replace(/[^a-zA-Z0-9.-]/g, "_") : `cover-${Date.now()}.jpg`;
  const storagePath = `covers/${authorId}/${storyId}/${cleanFileName}`;
  const storageRef = ref(storage, storagePath);

  const snapshot = await uploadBytes(storageRef, file, {
    contentType: file.type || "image/jpeg",
    customMetadata: {
      authorId,
      storyId,
      uploadedAt: new Date().toISOString(),
    },
  });

  const downloadUrl = await getDownloadURL(snapshot.ref);
  return downloadUrl;
}

/**
 * Upload an author profile avatar image
 * Target path: /avatars/{authorId}/{fileName}
 */
export async function uploadAvatarImage(
  file: File | Blob,
  authorId: string
): Promise<string> {
  if (!isFirebaseConfigured() || !storage) {
    console.info("[StorageService] Firebase Storage offline; generating local preview URL.");
    return URL.createObjectURL(file);
  }

  if (file.size > MAX_AVATAR_SIZE) {
    throw new Error("Avatar image exceeds maximum allowed size of 2MB.");
  }

  if (file.type && !file.type.startsWith("image/")) {
    throw new Error("Invalid file type. Only image files (JPEG, PNG, WebP) are allowed.");
  }

  const cleanFileName = "name" in file ? file.name.replace(/[^a-zA-Z0-9.-]/g, "_") : `avatar-${Date.now()}.jpg`;
  const storagePath = `avatars/${authorId}/${cleanFileName}`;
  const storageRef = ref(storage, storagePath);

  const snapshot = await uploadBytes(storageRef, file, {
    contentType: file.type || "image/jpeg",
    customMetadata: {
      authorId,
      uploadedAt: new Date().toISOString(),
    },
  });

  const downloadUrl = await getDownloadURL(snapshot.ref);
  return downloadUrl;
}

/**
 * Delete a file from Firebase Cloud Storage by full URL or path
 */
export async function deleteStorageFile(storagePathOrUrl: string): Promise<void> {
  if (!isFirebaseConfigured() || !storage) {
    return;
  }

  try {
    const fileRef = ref(storage, storagePathOrUrl);
    await deleteObject(fileRef);
  } catch (error) {
    console.warn("[StorageService] File deletion warning:", error);
  }
}
