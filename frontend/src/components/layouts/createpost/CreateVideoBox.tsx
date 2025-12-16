"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ImCross } from "react-icons/im";
import { FaVideo } from "react-icons/fa";

import { useAuth } from "@/hook/useAuth";
import { usePost } from "@/hook/usePost";
import { UserType } from "@/types/userType";
import { ProtectedRoute } from "@/components/Protected/ProtectedRoute";
import ModalPortal from "../ModalPortal";

import { motion, AnimatePresence } from "framer-motion";

interface PostData {
  content: {
    caption: string;
    media?: string[];
    type: "video";
    location?: string;
    tags?: string[];
    mentions?: string[];
  };
  privacy: "public" | "private" | "friends";
}

/* 🧼 Sanitize */
const sanitizeCaption = (text: string) =>
  text.replace(/\n{3,}/g, "\n\n").replace(/ {6,}/g, "     ");

interface CreateVideoBoxProps {
  onClose: () => void;
}

const CreateVideoBox = ({ onClose }: CreateVideoBoxProps) => {
  const { user, isLoading } = useAuth() as {
    user: UserType | null;
    isLoading: boolean;
  };

  const router = useRouter();
  const { createPost, createPostLoading } = usePost();

  /* 🧠 States */
  const [caption, setCaption] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [location, setLocation] = useState("");
  const [privacy, setPrivacy] = useState<"public" | "private" | "friends">(
    "public"
  );

  /* 🎯 Submit */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalCaption = sanitizeCaption(caption);

    if (!videoUrl.trim()) {
      alert("Video link is required!");
      return;
    }

    const body: PostData = {
      content: {
        caption: finalCaption,
        media: [videoUrl], // ✅ only one video
        type: "video",
        location,
        tags: [],
        mentions: [],
      },
      privacy,
    };

    createPost(body, {
      onSuccess: () => {
        setCaption("");
        setVideoUrl("");
        setLocation("");
        onClose();
        router.push("/");
      },
      onError: (err: any) => {
        alert(err?.message || "Failed to create video post");
      },
    });
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="p-4 text-center text-red-500 font-semibold">
        Please login to upload a video.
      </div>
    );
  }

  /* 🎞️ Animations */
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
            className="fixed inset-0 z-60 flex items-end lg:items-center justify-center
            bg-background-tertiary/80 backdrop-blur-xs"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="-mt-12 w-full lg:w-2/6 rounded-2xl rounded-b-none
              lg:rounded-b-2xl border border-white/30 bg-background p-6 shadow-2xl"
            >
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-bold flex items-center gap-2">
                  <FaVideo />
                  Upload a Video
                </h2>
                <button
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center
                  rounded-full bg-background-secondary"
                >
                  <ImCross />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Caption */}
                <textarea
                  rows={4}
                  placeholder={`Say something about your video, ${user.name}`}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="rounded-lg border border-border bg-white/70
                  p-4 text-gray-900 focus:ring-2 focus:ring-blue-400"
                />

                {/* Video URL */}
                <input
                  type="text"
                  placeholder="🎬 Video URL (mp4, mov)"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="rounded-lg border border-border bg-white/70
                  p-3 text-gray-900"
                />

                {/* Video Preview */}
                {videoUrl && (
                  <video
                    src={videoUrl}
                    controls
                    className="w-full max-h-[300px] rounded-xl border border-border"
                  />
                )}

                {/* Location */}
                <input
                  type="text"
                  placeholder="📍 Add location (optional)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="rounded-lg border border-border bg-white/70
                  p-3 text-gray-900"
                />

                {/* Bottom */}
                <div className="flex items-center justify-between">
                  <select
                    value={privacy}
                    onChange={(e) =>
                      setPrivacy(
                        e.target.value as "public" | "private" | "friends"
                      )
                    }
                    className="w-[45%] rounded-lg border border-border
                    bg-white/70 p-3 text-gray-900"
                  >
                    <option value="public">🌍 Public</option>
                    <option value="friends">👥 Friends</option>
                    <option value="private">🔒 Private</option>
                  </select>

                  <button
                    type="submit"
                    disabled={createPostLoading}
                    className="rounded-lg bg-accent px-8 py-3 text-white
                    transition-all hover:scale-105 active:scale-95"
                  >
                    {createPostLoading ? "Posting..." : "Upload"}
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

export default CreateVideoBox;
