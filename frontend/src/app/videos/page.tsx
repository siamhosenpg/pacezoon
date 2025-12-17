"use client";

import React, { useEffect, useState } from "react";
import ClipsBox from "@/components/ui/clipscard/ClipsBox";
import { useVideoPosts } from "@/hook/post/useVideoPosts";
import { PostTypes } from "@/types/postType";
import ClipsBoxSkeleton from "@/components/ui/clipscard/ClipsBoxSkeleton";

type PostWithRatio = {
  post: PostTypes;
  isPortrait: boolean;
};

export default function ReelsPage() {
  const { data, isLoading, error } = useVideoPosts();
  const [posts, setPosts] = useState<PostWithRatio[]>([]);

  useEffect(() => {
    if (!data?.posts?.length) return;

    const loadRatios = async () => {
      const results: PostWithRatio[] = [];

      for (const post of data.posts) {
        // 🔥 assuming single video per post (reels)
        const videoUrl = post.content.media;

        const isPortrait = await checkVideoRatio(videoUrl);

        results.push({
          post,
          isPortrait,
        });
      }

      setPosts(results);
    };

    loadRatios();
  }, [data]);
  if (isLoading) return <ClipsBoxSkeleton />;
  if (error) return <p>Something went wrong</p>;

  return (
    <div>
      <main className="h-[calc(100vh-120px)]  lg:h-[calc(100vh-72px)] overflow-y-scroll ScrollbarHide snap-y snap-mandatory scroll-smooth">
        {posts.map(({ post, isPortrait }) => (
          <ClipsBox
            key={post._id}
            post={post}
            isLoading={isLoading}
            isPortrait={isPortrait}
          />
        ))}
      </main>
    </div>
  );
}

function checkVideoRatio(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.src = src;
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      const ratio = video.videoWidth / video.videoHeight;

      // ✅ 9/16 বা তার বেশি portrait
      resolve(ratio <= 9 / 16);
    };

    video.onerror = () => resolve(false);
  });
}
