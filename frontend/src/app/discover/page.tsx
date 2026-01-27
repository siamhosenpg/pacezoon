"use client";
import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import Masonry from "react-masonry-css";
import { ProtectedRoute } from "@/components/Protected/ProtectedRoute";
import DiscoverSkeleton from "@/components/layouts/discover/DiscoverSkeleton";
import { useDiscoversPosts } from "@/hook/post/useDiscoversPosts";

const Discover = () => {
  const limit = 8;
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useDiscoversPosts(limit);

  const loaderRef = useRef<HTMLDivElement>(null);

  // Flatten all pages
  const allPosts = data?.pages.flatMap((page) => page.posts) || [];

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const breakpointColumnsObj = {
    default: 4, // desktop
    1024: 3, // tablet
    640: 2, // mobile
  };

  if (isError) return <p className="text-center mt-10">Error loading posts</p>;

  return (
    <ProtectedRoute>
      <div className="Pagearea pt-2 lg:pt-4 pb-18">
        {/* Show skeleton if loading first page */}
        {allPosts.length === 0 && isLoading && <DiscoverSkeleton />}

        <Masonry
          breakpointCols={breakpointColumnsObj}
          columnClassName="flex flex-col gap-4"
          className="flex gap-4"
        >
          {allPosts.map((post) => (
            <div
              key={post._id}
              className="rounded-lg overflow-hidden border border-border"
            >
              {post.content.type === "image" && (
                <Link
                  href={`/post/${post._id}`}
                  className="relative flex items-center justify-center w-full h-auto"
                >
                  <img
                    src={post.content.media[0]}
                    alt=""
                    className="max-h-167.5 w-full object-cover"
                  />
                  {post.content.media.length >= 2 && (
                    <div className="absolute bottom-3 text-[10px] xl:text-[13px] text-shadow-2xs text-white flex items-center gap-0.5">
                      <GoDotFill />
                      <GoDotFill />
                      <GoDotFill />
                    </div>
                  )}
                </Link>
              )}

              {post.content.type === "video" && (
                <Link href={`/post/${post._id}`}>
                  <video autoPlay muted loop src={post.content.media[0]} />
                </Link>
              )}
            </div>
          ))}
        </Masonry>

        {/* Loader for infinite scroll */}
        {hasNextPage && (
          <div ref={loaderRef} className="text-center py-6">
            <DiscoverSkeleton />
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Discover;
