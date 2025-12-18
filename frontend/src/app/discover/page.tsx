"use client";
import React from "react";
import { useDiscoversPosts } from "@/hook/post/useDiscoversPosts";
import { on } from "events";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";

const Discover = () => {
  const { data, isLoading, isError } = useDiscoversPosts();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading posts</p>;

  return (
    <div className="Pagearea pt-2 lg:pt-4">
      <div className=" px-2 lg:px-0 columns-2 md:columns-3 xl:columns-4 2xl:columns-4 gap-2 lg:gap-4">
        {data?.posts?.map((post) => {
          return (
            <div
              key={post._id}
              className=" break-inside-avoid mb-2 lg:mb-4 rounded-lg overflow-hidden border border-border"
            >
              {post.content.type === "image" && (
                <Link
                  href={`/post/${post.postid}`}
                  className=" relative flex items-center justify-center w-full h-auto"
                >
                  <img
                    src={post.content.media[0]}
                    alt=""
                    className=" max-h-[670px] w-full object-cover "
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
                <Link href={`/post/${post.postid}`}>
                  <video autoPlay muted loop src={post.content.media[0]} />
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Discover;
