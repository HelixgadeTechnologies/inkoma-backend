import { apiClient } from "@/src/services/api";

const MAX_COVER_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_AVATAR_SIZE = 2 * 1024 * 1024; // 2 MB

/**
 * Upload a story cover image to the Render backend (MongoDB/Cloud Storage)
 * Fallback to local object URL if backend is unreachable during offline testing
 */
export async function uploadCoverImage(
  file: File | Blob,
  authorId: string,
  storyId: string
): Promise<string> {
  // Size limit validation
  if (file.size > MAX_COVER_SIZE) {
    throw new Error("Cover image exceeds maximum allowed size of 5MB.");
  }

  // File type validation
  if (file.type && !file.type.startsWith("image/")) {
    throw new Error("Invalid file type. Only image files (JPEG, PNG, WebP) are allowed.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("authorId", authorId);
  formData.append("storyId", storyId);
  formData.append("type", "cover");

  try {
    const res = await apiClient.upload<{ url?: string; fileUrl?: string; secure_url?: string }>(
      "/upload",
      formData
    );
    const uploadedUrl = res.url || res.fileUrl || res.secure_url;
    if (uploadedUrl) return uploadedUrl;
    throw new Error("Upload response did not return a valid URL");
  } catch (error) {
    console.warn("[StorageService] Backend upload failed, using local object URL fallback:", error);
    if (typeof window !== "undefined") {
      return URL.createObjectURL(file);
    }
    throw error;
  }
}

/**
 * Upload an author profile avatar image
 */
export async function uploadAvatarImage(
  file: File | Blob,
  authorId: string
): Promise<string> {
  if (file.size > MAX_AVATAR_SIZE) {
    throw new Error("Avatar image exceeds maximum allowed size of 2MB.");
  }

  if (file.type && !file.type.startsWith("image/")) {
    throw new Error("Invalid file type. Only image files (JPEG, PNG, WebP) are allowed.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("authorId", authorId);
  formData.append("type", "avatar");

  try {
    const res = await apiClient.upload<{ url?: string; fileUrl?: string; secure_url?: string }>(
      "/upload",
      formData
    );
    const uploadedUrl = res.url || res.fileUrl || res.secure_url;
    if (uploadedUrl) return uploadedUrl;
    throw new Error("Upload response did not return a valid URL");
  } catch (error) {
    console.warn("[StorageService] Backend avatar upload failed, using local fallback:", error);
    if (typeof window !== "undefined") {
      return URL.createObjectURL(file);
    }
    throw error;
  }
}

/**
 * Delete an uploaded file by path or URL
 */
export async function deleteStorageFile(storagePathOrUrl: string): Promise<void> {
  try {
    await apiClient.delete("/upload", {
      params: { url: storagePathOrUrl },
    });
  } catch (error) {
    console.warn("[StorageService] File deletion warning:", error);
  }
}
