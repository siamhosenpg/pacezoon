"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import ClipsBox from "@/components/ui/clipscard/ClipsBox";
import { useVideoPosts } from "@/hook/post/useVideoPosts";
import ClipsBoxSkeleton from "@/components/ui/clipscard/ClipsBoxSkeleton";
import { PostTypes } from "@/types/postType";

type PostWithRatio = {
  post: PostTypes;
  isPortrait: boolean;
};

export default function ReelsPage() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useVideoPosts();

  const [posts, setPosts] = useState<PostWithRatio[]>([]);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  /* Merge new pages + check ratio */
  useEffect(() => {
    if (!data?.pages?.length) return;

    const newPosts = data.pages
      .flatMap((page) => page.posts)
      .filter((p) => !posts.find((old) => old.post._id === p._id));

    if (!newPosts.length) return;

    const loadRatios = async () => {
      const results: PostWithRatio[] = [];

      for (const post of newPosts) {
        const isPortrait = await checkVideoRatio(post.content.media);
        results.push({ post, isPortrait });
      }

      setPosts((prev) => [...prev, ...results]);
    };

    loadRatios();
  }, [data]);

  /* Infinite Scroll Observer */
  useEffect(() => {
    if (!observerRef.current || !scrollRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: scrollRef.current, // ✅ FIX
        threshold: 0.6,
      },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <ClipsBoxSkeleton />;
  if (error) return <p>Something went wrong</p>;

  return (
    <div>
      {posts.length === 0 && "No Video Available"}

      <main
        ref={scrollRef}
        className="h-[calc(100vh-104px)] lg:h-[calc(100vh-72px)]
        overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      >
        {posts.map(({ post, isPortrait }, index) => {
          const triggerIndex = posts.length - 2; // 👈 ৫ নম্বর ভিডিও

          return (
            <ClipsBox
              key={post._id}
              ref={index === triggerIndex ? observerRef : null} // ✅ FIX
              post={post}
              isLoading={isLoading}
              isPortrait={isPortrait}
            />
          );
        })}

        {isFetchingNextPage && <ClipsBoxSkeleton />}
      </main>
    </div>
  );
}

/* Video Ratio Checker */
function checkVideoRatio(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.src = src;
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      const ratio = video.videoWidth / video.videoHeight;
      resolve(ratio <= 9 / 16);
    };

    video.onerror = () => resolve(false);
  });
}
