"use client";
import React, { useRef, useEffect } from "react";
import Postbox from "@/components/ui/postcard/Postcard";
import SharePostCard from "@/components/ui/postcard/SharePostCard/SharePostCard";
import PostcardLoading from "@/components/ui/postcard/PostcardLoading";
import { usePost } from "@/hook/usePost";
import { PostTypes } from "@/types/postType";
interface FeedPostsResponse {
  posts: PostTypes[];
  nextCursor: string | null;
}

const Feed = () => {
  const { feedPost } = usePost();
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = feedPost();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // ----------------------------
  // Intersection Observer for Infinite Scroll
  // ----------------------------
  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { root: null, rootMargin: "200px", threshold: 1 }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  // ----------------------------
  // Loading / Error States
  // ----------------------------
  if (isLoading)
    return (
      <div className="flex flex-col gap-4">
        <PostcardLoading />
        <PostcardLoading />
      </div>
    );

  if (isError) return <p className="text-red-500">Failed to load feed posts</p>;

  // Flatten all pages into a single array
  const allPosts: PostTypes[] = data?.pages.flatMap((page) => page.posts) || [];

  if (allPosts.length === 0) return <p>No posts found</p>;

  return (
    <div className="flex flex-col">
      {allPosts.map((post: PostTypes) =>
        post.content?.parentPost ? (
          <SharePostCard key={post._id} post={post} />
        ) : (
          <Postbox key={post._id} post={post} />
        )
      )}

      {/* Sentinel div for Intersection Observer */}
      <div ref={loadMoreRef} className="h-10" />

      {isFetchingNextPage && (
        <div className="text-center py-2">
          <PostcardLoading />
        </div>
      )}

      {!hasNextPage && allPosts.length > 0 && (
        <p className="text-center text-gray-500 py-22">No more posts</p>
      )}
    </div>
  );
};

export default Feed;
