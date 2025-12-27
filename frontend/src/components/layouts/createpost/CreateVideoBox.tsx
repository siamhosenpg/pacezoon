"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ImCross } from "react-icons/im";
import { MdOutlineEditLocation } from "react-icons/md";

import { useAuth } from "@/hook/useAuth";
import { usePost } from "@/hook/usePost";
import { ProtectedRoute } from "@/components/Protected/ProtectedRoute";
import ModalPortal from "../ModalPortal";

import { motion, AnimatePresence } from "framer-motion";

/* 🧼 Sanitize */
const sanitizeCaption = (text: string) =>
  text.replace(/\n{3,}/g, "\n\n").replace(/ {6,}/g, "     ");

interface CreateVideoBoxProps {
  onClose: () => void;
}

const CreateVideoBox = ({ onClose }: CreateVideoBoxProps) => {
  const { user, isLoading } = useAuth();

  const router = useRouter();
  const { createPost, createPostLoading } = usePost();

  /* 🧠 States */
  const [caption, setCaption] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [location, setLocation] = useState("");
  const [privacy, setPrivacy] = useState<"public" | "private" | "friends">(
    "public"
  );

  // ----------------------------
  // 🎥 Handle Video Select
  // ----------------------------
  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    if (!file.type.startsWith("video")) {
      alert("Only video files are allowed");
      return;
    }

    setVideoFile(file); // ✅ single video
  };

  // ----------------------------
  // ❌ Remove Video
  // ----------------------------
  const handleRemoveVideo = () => {
    setVideoFile(null);
  };

  // ----------------------------
  // 🚀 Submit
  // ----------------------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!videoFile) {
      alert("Video file is required!");
      return;
    }

    const finalCaption = sanitizeCaption(caption);

    const formData = new FormData();
    formData.append("caption", finalCaption);
    formData.append("privacy", privacy);
    formData.append("location", location);
    formData.append("media", videoFile); // 👈 single video

    createPost(formData, {
      onSuccess: () => {
        setCaption("");
        setVideoFile(null);
        setLocation("");
        onClose();
        router.push("/");
      },
      onError: (err: any) => {
        alert(err?.message || "Failed to upload video");
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
            className="fixed inset-0 z-60 flex items-end lg:items-center justify-center bg-background-tertiary/80 backdrop-blur-xs"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="-mt-12 w-full lg:w-2/6 rounded-2xl rounded-b-none lg:rounded-b-2xl border border-white/30 bg-background pt-3 pb-6 shadow-2xl"
            >
              {/* Header */}
              <div className="mb-4 flex items-center justify-between border-b border-border px-6 py-2">
                <h2 className="text-base font-bold flex items-center gap-2">
                  Upload a Video
                </h2>
                <button
                  onClick={onClose}
                  className="flex cursor-pointer h-10 w-10 items-center justify-center rounded-full bg-background-secondary"
                >
                  <ImCross />
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 sm:gap-6 px-4 sm:px-6"
              >
                <div className="flex items-center gap-2">
                  <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-full shrink-0 overflow-hidden ">
                    <img
                      className="w-full h-full object-cover bg-background-secondary "
                      src={user.user.profileImage}
                      alt=""
                    />
                  </div>
                  <div className="w-full">
                    <div className=" flex items-center justify-center gap-3">
                      <h3 className="font-bold w-fit shrink-0 text-ellipsis whitespace-nowrap overflow-hidden ">
                        {user.user.name}
                      </h3>
                      {/* Location */}
                      <div className="flex items-center   gap-2 w-full ">
                        <MdOutlineEditLocation className="text-xl" />
                        <input
                          type="text"
                          placeholder="Add location (optional)"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full bg-background text-text-secondary"
                        />
                      </div>
                    </div>
                    <select
                      value={privacy}
                      onChange={(e) =>
                        setPrivacy(
                          e.target.value as "public" | "private" | "friends"
                        )
                      }
                      className="w-fit rounded-lg border  border-border  py-1 px-1.5 smalltext mt-1  cursor-pointer"
                    >
                      <option className="bg-background" value="public">
                        🌍 Public
                      </option>
                      <option className="bg-background" value="friends">
                        👥 Friends
                      </option>
                      <option className="bg-background" value="private">
                        🔒 Private
                      </option>
                    </select>
                  </div>
                </div>
                {/* Caption */}
                <textarea
                  rows={4}
                  placeholder={`Say something about your video, ${user.user.name}?`}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className=" resize-none "
                />
                {/* Video Preview */}
                {videoFile && (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={handleRemoveVideo}
                      className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full border-border bg-background-secondary text-white hover:bg-red-600"
                    >
                      <ImCross size={12} />
                    </button>
                    <video
                      autoPlay
                      muted
                      loop
                      src={URL.createObjectURL(videoFile)}
                      className="w-full max-h-[300px] bg-background-secondary rounded-xl border border-border"
                    />
                  </div>
                )}

                {/* Bottom */}
                <div className="flex items-center justify-between">
                  {/* Modern Video Upload */}
                  <label
                    htmlFor="video-upload"
                    className="flex cursor-pointer  items-center 
                  gap-2 
                  "
                  >
                    <img
                      className="w-12 sm:w-14  "
                      src="/images/icon/videography.png"
                      alt=""
                    />
                    <div>
                      {" "}
                      <p className="text-sm font-medium text-text-secondary">
                        Click to upload video
                      </p>
                      <p className="text-xs mt-0.5 text-text-tertiary">
                        MP4, MOV, MKV
                      </p>
                    </div>
                  </label>

                  <input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    onChange={handleVideoSelect}
                    className="hidden"
                  />
                  <button
                    type="submit"
                    disabled={createPostLoading}
                    className="rounded-lg bg-accent px-6 py-2 text-white transition-all  cursor-pointer active:scale-95"
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
