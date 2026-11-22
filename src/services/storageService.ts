import { apiClient } from "@/src/services/api";

import { uploadUserAvatar } from "@/src/services/userService";

const MAX_COVER_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_AVATAR_SIZE = 2 * 1024 * 1024; // 2 MB

/**
 * Upload a custom story cover image directly to Cloudinary via the Render backend
 * Endpoint: POST /api/v1/stories/cover (multipart/form-data, field: coverImage)
 */
export async function uploadCoverImage(
  file: File | Blob,
  _authorId?: string,
  _storyId?: string
): Promise<string> {
  // Size limit validation (5MB)
  if (file.size > MAX_COVER_SIZE) {
    throw new Error("Cover image exceeds maximum allowed size of 5MB.");
  }

  // File type validation
  if (file.type && !file.type.startsWith("image/")) {
    throw new Error("Invalid file type. Only image files (JPEG, PNG, WebP) are allowed.");
  }

  const formData = new FormData();
  formData.append("coverImage", file);

  try {
    const res = await apiClient.upload<{
      success?: boolean;
      statusCode?: number;
      message?: string;
      data?: { url?: string; secure_url?: string; coverImage?: string; coverUrl?: string };
      url?: string;
      secure_url?: string;
      coverUrl?: string;
    }>("/stories/cover", formData);

    const uploadedUrl =
      res?.data?.url ||
      res?.data?.secure_url ||
      res?.data?.coverImage ||
      res?.data?.coverUrl ||
      res?.url ||
      res?.secure_url ||
      res?.coverUrl;

    if (uploadedUrl) return uploadedUrl;
    throw new Error("Upload response did not return a valid CDN URL");
  } catch (error) {
    console.warn("[StorageService] Backend cover upload failed, using local object URL fallback:", error);
    if (typeof window !== "undefined") {
      return URL.createObjectURL(file);
    }
    throw error;
  }
}

/**
 * Upload an author profile avatar image
 * Endpoint: POST /api/v1/users/me/avatar (multipart/form-data, field: avatar)
 */
export async function uploadAvatarImage(
  file: File | Blob,
  _authorId?: string
): Promise<string> {
  if (file.size > MAX_AVATAR_SIZE) {
    throw new Error("Avatar image exceeds maximum allowed size of 2MB.");
  }

  if (file.type && !file.type.startsWith("image/")) {
    throw new Error("Invalid file type. Only image files (JPEG, PNG, WebP) are allowed.");
  }

  try {
    return await uploadUserAvatar(file);
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
