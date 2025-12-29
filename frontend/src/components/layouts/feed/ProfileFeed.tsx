"use client";
import React, { useEffect, useRef } from "react";
import { PostTypes } from "@/types/postType";
import { usePost } from "@/hook/usePost";
import Postcard from "../../ui/postcard/Postcard";
import PostcardLoading from "@/components/ui/postcard/PostcardLoading";

type ProfileFeedProps = {
  userid: string;
};

const ProfileFeed = ({ userid }: ProfileFeedProps) => {
  const { profilePost } = usePost();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = profilePost(userid);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // ----------------------------
  // Intersection Observer
  // ----------------------------
  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "200px", // 🔥 mobile fix
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  // ----------------------------
  // States
  // ----------------------------
  if (isLoading) {
    return <PostcardLoading />;
  }

  if (isError) {
    return <p className="text-red-500">Failed to load posts</p>;
  }

  // Flatten pages
  const posts: PostTypes[] = data?.pages.flatMap((page) => page.posts) || [];

  if (posts.length === 0) {
    return <p className="w-full text-center mt-5">No posts found.</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <Postcard post={post} key={post._id} />
      ))}

      {/* Sentinel */}
      <div ref={loadMoreRef} className="h-10" />

      {isFetchingNextPage && <PostcardLoading />}

      {!hasNextPage && posts.length > 0 && (
        <p className="w-full text-center mt-5 text-gray-500">No more posts</p>
      )}
    </div>
  );
};

export default ProfileFeed;
