"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ImCross } from "react-icons/im";
import { FaPlus } from "react-icons/fa";

import { useAuth } from "@/hook/useAuth";
import { usePost } from "@/hook/usePost";
import { UserType } from "@/types/userType";
import { ProtectedRoute } from "@/components/Protected/ProtectedRoute";
import ModalPortal from "../ModalPortal";

import { motion, AnimatePresence } from "framer-motion";

// =============================
// 🟦 SANITIZE FUNCTION
// =============================
const sanitizeCaption = (text: string) => {
  if (typeof text !== "string") return text;
  return text.replace(/\n{3,}/g, "\n\n").replace(/ {6,}/g, "     ");
};

interface CreatePostCardProps {
  onClose: () => void;
}

const CreatePostCard = ({ onClose }: CreatePostCardProps) => {
  const { user, isLoading } = useAuth() as {
    user: UserType | null;
    isLoading: boolean;
  };

  const router = useRouter();
  const { createPost, createPostLoading } = usePost();

  // ----------------------------
  // 🧠 Local States
  // ----------------------------
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [privacy, setPrivacy] = useState<"public" | "private" | "friends">(
    "public"
  );

  // ----------------------------
  // 🖼 Handle Image Select
  // ----------------------------
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages((prev) => [...prev, ...Array.from(e.target.files!)]);
  };

  // ----------------------------
  // ❌ Remove Image
  // ----------------------------
  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ----------------------------
  // 🚀 Submit
  // ----------------------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalCaption = sanitizeCaption(caption);

    if (!finalCaption.trim() && images.length === 0) {
      alert("Post cannot be empty!");
      return;
    }

    const formData = new FormData();
    formData.append("caption", finalCaption);
    formData.append("privacy", privacy);
    formData.append("location", location);

    images.forEach((img) => {
      formData.append("media", img); // backend expects "media"
    });

    createPost(formData, {
      onSuccess: () => {
        setCaption("");
        setImages([]);
        setLocation("");
        onClose();
        router.push("/");
      },
      onError: (err: any) => {
        alert(err?.message || "Failed to create post");
      },
    });
  };

  // ----------------------------
  // Auth Handling
  // ----------------------------
  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="p-4 text-center text-red-500 font-semibold">
        Please login to create a post.
      </div>
    );
  }

  // ----------------------------
  // Animations
  // ----------------------------
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: "easeOut" as any },
    },
    exit: {
      y: 80,
      opacity: 0,
      transition: { duration: 0.25, ease: "easeIn" as any },
    },
  };

  return (
    <ProtectedRoute>
      <ModalPortal>
        <AnimatePresence>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-60 flex items-end lg:items-center justify-center bg-background-tertiary/80 backdrop-blur-xs"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="-mt-12 w-full lg:w-2/6 rounded-2xl rounded-b-none lg:rounded-b-2xl border border-white/30 bg-background p-6 shadow-2xl"
            >
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-bold gap-2 flex items-center">
                  <FaPlus />
                  Create a Post
                </h2>
                <button
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background-secondary"
                >
                  <ImCross />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Caption */}
                <textarea
                  rows={5}
                  placeholder={`What's on your mind, ${user.name}?`}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="rounded-lg border border-border bg-white/70 p-4 text-gray-900 focus:ring-2 focus:ring-blue-400"
                />

                {/* Location */}
                <input
                  type="text"
                  placeholder="📍 Add location (optional)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="rounded-lg border border-border bg-white/70 p-3 text-gray-900"
                />

                {/* Modern Image Upload */}
                <label
                  htmlFor="image-upload"
                  className="flex cursor-pointer flex-col items-center justify-center
                  gap-2 rounded-xl border-2 border-dashed border-border
                  bg-white/60 p-6 text-center transition-all
                  hover:bg-white/80 hover:border-accent"
                >
                  <FaPlus className="text-xl text-accent" />
                  <p className="text-sm font-medium text-gray-700">
                    Click to upload images
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, JPEG (multiple allowed)
                  </p>
                </label>

                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  className="hidden"
                />

                {/* Image Preview */}
                {images.length > 0 && (
                  <div className="flex gap-3 overflow-x-auto rounded-xl border border-white/40 bg-white/50 p-2">
                    {images.map((img, i) => (
                      <div key={i} className="relative w-2/6 shrink-0">
                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(i)}
                          className="absolute right-1 top-1 z-10
                          flex h-6 w-6 items-center justify-center
                          rounded-full bg-black/70 text-white
                          hover:bg-red-600"
                        >
                          <ImCross size={10} />
                        </button>

                        <img
                          src={URL.createObjectURL(img)}
                          className="w-full rounded-xl border object-cover"
                          alt="preview"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Bottom Controls */}
                <div className="flex items-center justify-between">
                  <select
                    value={privacy}
                    onChange={(e) =>
                      setPrivacy(
                        e.target.value as "public" | "private" | "friends"
                      )
                    }
                    className="w-[45%] rounded-lg border border-border bg-white/70 p-3 text-gray-900"
                  >
                    <option value="public">🌍 Public</option>
                    <option value="friends">👥 Friends</option>
                    <option value="private">🔒 Private</option>
                  </select>

                  <button
                    type="submit"
                    disabled={createPostLoading}
                    className="rounded-lg bg-accent px-8 py-3 text-white hover:scale-105 active:scale-95"
                  >
                    {createPostLoading ? "Posting..." : "Share"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </ModalPortal>
    </ProtectedRoute>
  );
};

export default CreatePostCard;
