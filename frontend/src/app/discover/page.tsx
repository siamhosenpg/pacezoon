"use client";
import React from "react";
import { useDiscoversPosts } from "@/hook/post/useDiscoversPosts";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import DiscoverSkeleton from "@/components/layouts/discover/DiscoverSkeleton";
import { ProtectedRoute } from "@/components/Protected/ProtectedRoute";
import Masonry from "react-masonry-css";

const Discover = () => {
  const { data, isLoading, isError } = useDiscoversPosts();
  const breakpointColumnsObj = {
    default: 4, // desktop
    1024: 3, // tablet
    640: 2, // mobile
  };
  if (isError) return <p>Error loading posts</p>;

  return (
    <ProtectedRoute>
      <div className="Pagearea pt-2 lg:pt-4 pb-18">
        {isLoading && <DiscoverSkeleton />}

        <Masonry
          breakpointCols={breakpointColumnsObj}
          columnClassName="flex flex-col gap-4"
          className="flex  gap-4"
        >
          {data?.posts?.map((post) => {
            return (
              <div
                key={post._id}
                className="   rounded-lg overflow-hidden border border-border"
              >
                {post.content.type === "image" && (
                  <Link
                    href={`/post/${post._id}`}
                    className=" relative flex items-center justify-center w-full h-auto"
                  >
                    <img
                      src={post.content.media[0]}
                      alt=""
                      className=" max-h-167.5 w-full object-cover "
                    />
                    {post.content.media.length >= 2 && (
                      <div className=" absolute bottom-3 text-[10px] xl:text-[13px] text-shadow-2xs text-white  flex items-center gap-0.5">
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
            );
          })}
        </Masonry>
      </div>
    </ProtectedRoute>
  );
};

export default Discover;
