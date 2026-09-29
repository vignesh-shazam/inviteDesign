"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/db/supabase";
import SparkleButton from "@/components/ui/SparkleButton";

const MAX_PROFILE_IMAGE_SIZE = 20 * 1024 * 1024;

export default function ProfilePage() {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [editName, setEditName] = useState("");

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const supabase = getSupabaseClient();

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/login");
          return;
        }

        const userName = user.user_metadata?.full_name ?? "";
        const userImage = user.user_metadata?.avatar_url ?? "";

        setUserId(user.id);
        setName(userName);
        setEditName(userName);
        setEmail(user.email ?? "");
        setProfileImage(userImage);
      } catch (err) {
        console.error("Failed to load profile:", err);
        setError("Unable to load profile.");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [router]);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setMessage("");

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_PROFILE_IMAGE_SIZE) {
      setError("Profile image must be smaller than 20 MB.");
      event.target.value = "";
      return;
    }

    setSelectedImage(file);

    const objectUrl = URL.createObjectURL(file);

    setPreviewImage(objectUrl);
  }

  async function uploadProfileImage() {
    if (!selectedImage || !userId) {
      return profileImage;
    }

    try {
      setUploadingImage(true);

      const supabase = getSupabaseClient();

      const fileExtension =
        selectedImage.name.split(".").pop()?.toLowerCase() || "jpg";

      const filePath = `${userId}/profile.${fileExtension}`;

      /*
       * Remove existing profile image files first.
       * This prevents old profile images from remaining in Storage.
       */
      const { data: existingFiles, error: listError } =
        await supabase.storage
          .from("profile-images")
          .list(userId);

      if (listError) {
        throw listError;
      }

      if (existingFiles && existingFiles.length > 0) {
        const filesToRemove = existingFiles.map(
          (file) => `${userId}/${file.name}`,
        );

        const { error: removeError } = await supabase.storage
          .from("profile-images")
          .remove(filesToRemove);

        if (removeError) {
          throw removeError;
        }
      }

      /*
       * Upload new profile image.
       */
      const { error: uploadError } = await supabase.storage
        .from("profile-images")
        .upload(filePath, selectedImage, {
          cacheControl: "3600",
          upsert: true,
          contentType: selectedImage.type,
        });

      if (uploadError) {
        throw uploadError;
      }

      /*
       * Get public URL.
       */
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("profile-images")
        .getPublicUrl(filePath);

      /*
       * Save URL in Supabase Auth metadata.
       */
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          avatar_url: publicUrl,
        },
      });

      if (updateError) {
        throw updateError;
      }

      setProfileImage(publicUrl);
      setSelectedImage(null);

      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }

      setPreviewImage("");

      return publicUrl;
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleSaveProfile() {
    if (!editName.trim()) {
      setError("Full name is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const supabase = getSupabaseClient();

      /*
       * Update name.
       */
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          full_name: editName.trim(),
        },
      });

      if (updateError) {
        throw updateError;
      }

      /*
       * Upload profile image if a new image was selected.
       */
      if (selectedImage) {
        await uploadProfileImage();
      }

      setName(editName.trim());
      setIsEditing(false);

      setMessage("Profile updated successfully.");
    } catch (err) {
      console.error("Profile update failed:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to update profile.",
      );
    } finally {
      setSaving(false);
    }
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setEditName(name);
    setSelectedImage(null);

    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }

    setPreviewImage("");
    setError("");
    setMessage("");
  }

  async function handleDeleteAccount() {
    if (deleteConfirmText !== "DELETE") {
      setError('Please type "DELETE" to confirm account deletion.');
      return;
    }

    try {
      setDeleting(true);
      setError("");

      const response = await fetch("/api/account/delete", {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to delete account.",
        );
      }

      const supabase = getSupabaseClient();

      await supabase.auth.signOut();

      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Account deletion failed:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to delete account.",
      );
    } finally {
      setDeleting(false);
    }
  }

  const displayedImage = previewImage || profileImage;

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950">
        <p className="text-sm text-slate-400">
          Loading profile...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Page Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
            Account
          </p>

          <h1 className="mt-3 text-3xl font-bold text-white">
            Profile Details
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your MyInviteVerse account.
          </p>
        </div>

        {/* Success Message */}
        {message && (
          <div className="mb-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
            {message}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Profile Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          {/* Profile Image */}
          <div className="mb-8 flex flex-col items-center">
            <div className="relative">
              {displayedImage ? (
                <img
                  src={displayedImage}
                  alt="Profile"
                  className="h-28 w-28 rounded-full border-4 border-slate-800 object-cover"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-slate-800 bg-violet-500 text-4xl font-bold text-white">
                  {name
                    ? name.charAt(0).toUpperCase()
                    : email
                      ? email.charAt(0).toUpperCase()
                      : "U"}
                </div>
              )}

              {/* Edit Image */}
              {isEditing && (
                <label
                  htmlFor="profile-image"
                  className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-slate-950 bg-violet-500 text-white shadow-lg transition hover:bg-violet-400"
                  title="Edit profile image"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>

                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {isEditing && (
              <p className="mt-3 text-center text-xs text-slate-500">
                JPG, PNG or WEBP.
                <br />
                Maximum file size: 20 MB.
              </p>
            )}
          </div>

          {/* Full Name */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Full Name
            </label>

            {isEditing ? (
              <input
                type="text"
                value={editName}
                onChange={(event) =>
                  setEditName(event.target.value)
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500"
                placeholder="Enter your full name"
              />
            ) : (
              <div className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-200">
                {name || "Not provided"}
              </div>
            )}
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email Address
            </label>

            <div className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-200">
              {email || "Not available"}
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Email address is managed by your authentication
              account.
            </p>
          </div>

          {/* Account Status */}
          <div className="mb-8">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Account Status
            </label>

            <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

              <span className="text-sm text-emerald-400">
                Active
              </span>
            </div>
          </div>

          {/* Edit Mode */}
          {isEditing ? (
            <div className="flex flex-col gap-3 sm:flex-row">
              <SparkleButton
                type="button"
                onClick={handleSaveProfile}
                disabled={saving || uploadingImage}
                className="flex-1 rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {uploadingImage
                  ? "Uploading Image..."
                  : saving
                    ? "Saving..."
                    : "Save Changes"}
              </SparkleButton>

              <button
                type="button"
                onClick={handleCancelEdit}
                disabled={saving || uploadingImage}
                className="flex-1 rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          ) : (
            <SparkleButton
              type="button"
              onClick={() => {
                setIsEditing(true);
                setError("");
                setMessage("");
              }}
              className="w-full rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
            >
              Edit Profile
            </SparkleButton>
          )}
        </div>

        {/* Delete Account */}
        <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
          <h2 className="text-lg font-semibold text-white">
            Delete Account
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Permanently delete your MyInviteVerse account and
            associated account data. This action cannot be undone.
          </p>

          {!showDeleteConfirm ? (
            <button
              type="button"
              onClick={() => {
                setShowDeleteConfirm(true);
                setError("");
              }}
              className="mt-5 rounded-xl border border-red-500/40 px-5 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
            >
              Delete Account
            </button>
          ) : (
            <div className="mt-5">
              <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
                This action is permanent. Type{" "}
                <strong>DELETE</strong> to confirm.
              </div>

              <input
                type="text"
                value={deleteConfirmText}
                onChange={(event) =>
                  setDeleteConfirmText(event.target.value)
                }
                placeholder="Type DELETE"
                className="w-full rounded-xl border border-red-500/30 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-red-500"
              />

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  disabled={
                    deleting || deleteConfirmText !== "DELETE"
                  }
                  className="flex-1 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {deleting
                    ? "Deleting Account..."
                    : "Permanently Delete"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteConfirmText("");
                    setError("");
                  }}
                  disabled={deleting}
                  className="flex-1 rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Back Button */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="mt-6 rounded-full border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:text-white"
        >
          Back to Home
        </button>
      </div>
    </main>
  );
}