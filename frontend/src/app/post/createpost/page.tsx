"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/hook/useAuth";
import { useRouter } from "next/navigation";
import { UserType } from "@/types/userType";
import { ProtectedRoute } from "@/components/Protected/ProtectedRoute";

interface PostData {
  content: {
    caption: string;
    media?: string[];
    type: "image" | "video" | "text";
    location?: string;
    tags?: string[];
    mentions?: string[];
  };
  privacy: "public" | "private" | "friends";
}

type CreatePostResponse = {
  message: string;
  post: any; // চাইলে PostTypes দিতে পারো
};

type CreatePostError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

// =============================
// 🟦 SANITIZE FUNCTION
// triple enter → only double allowed
// =============================
const sanitizeCaption = (text: string) => {
  if (typeof text !== "string") return text;

  return (
    text
      // replace 3+ newlines → 2 newlines
      .replace(/\n{3,}/g, "\n\n")

      // replace 4+ spaces → 4 spaces
      .replace(/ {6,}/g, "     ")
  );
};
// API
const createPostApi = async (data: PostData): Promise<any> => {
  const res = await axiosInstance.post("/posts", data, {
    withCredentials: true,
  });
  return res.data;
};

const CreatePostPage = () => {
  const { user, isLoading } = useAuth() as {
    user: UserType | null;
    isLoading: boolean;
  };

  const router = useRouter();
  const queryClient = useQueryClient();

  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [location, setLocation] = useState("");
  const [mediaList, setMediaList] = useState<string[]>([]);
  const [privacy, setPrivacy] = useState<"public" | "private" | "friends">(
    "public"
  );

  const mutation = useMutation<CreatePostResponse, CreatePostError, PostData>({
    mutationFn: createPostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setCaption("");
      setImageUrl("");
      setVideoUrl("");
      setMediaList([]);
      setLocation("");
      router.push("/");
    },
    onError: (err) => {
      alert(err?.response?.data?.message || "Failed to create post");
    },
  });

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

  // Helpers
  const handleAddImage = () => {
    if (!imageUrl.trim()) return;
    setMediaList((prev) => [...prev, imageUrl]);
    setImageUrl("");
    setVideoUrl("");
  };

  const handleAddVideo = () => {
    if (!videoUrl.trim()) return;
    setMediaList([videoUrl]); // only one video
    setVideoUrl("");
    setImageUrl("");
  };

  const detectPostType = (): "image" | "video" | "text" => {
    if (mediaList.length > 0) {
      const first = mediaList[0];
      return /\.(mp4|mov|mkv)$/i.test(first) ? "video" : "image";
    }
    return "text";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalCaption = sanitizeCaption(caption);
    if (!finalCaption.trim() && mediaList.length === 0) {
      alert("Post cannot be empty!");
      return;
    }

    const body: PostData = {
      content: {
        caption: finalCaption,
        media: mediaList,
        type: detectPostType(),
        location,
        tags: [],
        mentions: [],
      },
      privacy,
    };

    mutation.mutate(body);
  };

  return (
    <ProtectedRoute>
      <div className="max-w-xl mx-auto mt-12 p-6 bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30">
        <h2 className="text-3xl font-bold mb-5 text-center text-gray-900">
          Create a Post
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Caption */}
          <textarea
            rows={4}
            placeholder={`What's on your mind, ${user.name}?`}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="p-4 rounded-xl border border-gray-200 bg-white/70 text-gray-900 
            shadow-md focus:ring-2 focus:ring-blue-400 transition-all"
          />

          {/* Location */}
          <input
            type="text"
            placeholder="📍 Add location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-3 rounded-xl border border-gray-200 bg-white/70 text-gray-900 
            shadow-md focus:ring-2 focus:ring-purple-400 transition-all"
          />

          {/* Add Image */}
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Image URL"
              className="p-3 border border-gray-200 w-full rounded-xl bg-white/70 text-gray-900 shadow-md"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md active:scale-95"
            >
              Add
            </button>
          </div>

          {/* Add Video */}
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Video URL"
              className="p-3 border border-gray-200 w-full rounded-xl bg-white/70 text-gray-900 shadow-md"
            />
            <button
              type="button"
              onClick={handleAddVideo}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-md active:scale-95"
            >
              Add
            </button>
          </div>

          {/* Media Preview */}
          {mediaList.length > 0 && (
            <div className="p-4 bg-white/50 rounded-xl shadow-md border border-white/40">
              <h3 className="font-semibold mb-3 text-gray-900">
                Media Preview
              </h3>
              {detectPostType() === "image" ? (
                <div className="grid grid-cols-2 gap-3">
                  {mediaList.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      className="rounded-xl border shadow-md"
                    />
                  ))}
                </div>
              ) : (
                <video
                  src={mediaList[0]}
                  controls
                  className="w-full rounded-xl border shadow-md"
                />
              )}
            </div>
          )}

          {/* Bottom Controls */}
          <div className="flex items-center justify-between">
            <select
              value={privacy}
              onChange={(e) =>
                setPrivacy(e.target.value as "public" | "private" | "friends")
              }
              className="p-3 w-[45%] rounded-xl border bg-white/70 shadow-md text-gray-900"
            >
              <option value="public">🌍 Public</option>
              <option value="friends">👥 Friends</option>
              <option value="private">🔒 Private</option>
            </select>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-8 py-3 bg-linear-to-r from-blue-600 to-blue-700 
              text-white rounded-xl shadow-xl hover:scale-105 active:scale-95 
              transition-all"
            >
              {mutation.isPending ? "Posting..." : "Share"}
            </button>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default CreatePostPage;
