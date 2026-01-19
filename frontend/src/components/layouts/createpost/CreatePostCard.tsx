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
  const { user, isLoading } = useAuth();

  const router = useRouter();
  const { createPost, createPostLoading } = usePost();

  // ----------------------------
  // 🧠 Local States
  // ----------------------------
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [privacy, setPrivacy] = useState<"public" | "private" | "friends">(
    "public",
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
              className="-mt-12 w-full lg:w-2/6 rounded-2xl rounded-b-none lg:rounded-b-2xl border border-white/30 bg-background pt-3 pb-6 shadow-2xl"
            >
              {/* Header */}
              <div className="mb-4 flex items-center justify-between border-b border-border px-6 py-2">
                <h2 className="text-base font-bold gap-2 flex items-center">
                  Create a Post
                </h2>
                <button
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background-secondary cursor-pointer"
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
                  <div className=" w-11 sm:w-12 h-11 sm:h-12 rounded-full shrink-0 overflow-hidden ">
                    <img
                      className="w-full h-full object-cover bg-background-secondary "
                      src={
                        user?.user.profileImage
                          ? user.user.profileImage
                          : user?.user.gender === "female"
                            ? "/images/femaleprofile.jpg"
                            : "/images/profile.jpg" // male or default
                      }
                      alt=""
                    />
                  </div>
                  <div className="w-full">
                    <div className=" flex items-center justify-center gap-3 ">
                      <h3 className="font-bold w-fit shrink-0 text-ellipsis whitespace-nowrap overflow-hidden ">
                        {user.user.name}
                      </h3>
                      {/* Location */}
                      <div className="flex items-center  gap-2 w-full ">
                        <MdOutlineEditLocation className="text-xl" />
                        <input
                          type="text"
                          placeholder="Add location "
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className=" w-full bg-background text-text-secondary"
                        />
                      </div>
                    </div>
                    <select
                      value={privacy}
                      onChange={(e) =>
                        setPrivacy(
                          e.target.value as "public" | "private" | "friends",
                        )
                      }
                      className="w-fit rounded-lg border border-border  py-1 px-1.5 smalltext mt-1  cursor-pointer"
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
                  rows={5}
                  placeholder={`What's on your mind, ${user.user.name}?`}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className=" resize-none "
                />

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
                  <div className="flex gap-3 overflow-x-auto ScrollSystem rounded-xl border border-border bg-background-secondary p-2">
                    {images.map((img, i) => (
                      <div key={i} className="relative w-3/12 shrink-0">
                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(i)}
                          className="absolute right-1 top-1 z-10
                          flex h-6 w-6 items-center justify-center
                          rounded-full bg-black/40 text-white
                          hover:bg-red-600"
                        >
                          <ImCross size={10} />
                        </button>

                        <img
                          src={URL.createObjectURL(img)}
                          className="w-full rounded-lg border border-border object-cover aspect-square"
                          alt="preview"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Bottom Controls */}
                <div className="flex items-center justify-between">
                  {/* Modern Image Upload */}
                  <label
                    htmlFor="image-upload"
                    className="flex cursor-pointer  items-center 
                  gap-2 
                  "
                  >
                    <img
                      className="w-12 sm:w-14 "
                      src="/images/icon/image.png"
                      alt=""
                    />
                    <div>
                      {" "}
                      <p className="text-sm font-medium text-text-secondary">
                        Click to upload images
                      </p>
                      <p className="text-xs mt-0.5 text-text-tertiary">
                        PNG, JPG, JPEG (multiple allowed)
                      </p>
                    </div>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  <button
                    type="submit"
                    disabled={createPostLoading}
                    className="rounded-lg bg-accent px-6 py-2 text-white transition-all  cursor-pointer active:scale-95"
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
