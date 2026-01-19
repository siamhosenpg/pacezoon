"use client";
import React from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { useUserMediaPosts } from "@/hook/post/useDiscoversPosts";

import Masonry from "react-masonry-css";
import MasonrySkeleton from "./MasonrySkeleton";
import Link from "next/link";
interface useridporps {
  userId: string;
}

const ProfilePhotoslist: React.FC<useridporps> = ({ userId }) => {
  const { data, isLoading } = useUserMediaPosts(userId);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const breakpointColumnsObj = {
    default: 4, // desktop
    1024: 3, // tablet
    640: 2, // mobile
  };
  return (
    <div>
      <div className=" px-6 lg:px-12 py-4 bg-background rounded-lg w-full mb-4 gap-8">
        <h2 className="text-lg font-bold text-loose">Photos</h2>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-4"
          columnClassName="flex flex-col gap-4"
        >
          {!data || (data.posts.length === 0 && <div>No media Post</div>)}
          {isLoading && <MasonrySkeleton />}
          {isLoading && <MasonrySkeleton />}
          {isLoading && <MasonrySkeleton />}
          {isLoading && <MasonrySkeleton />}

          {data?.posts.map((post) => {
            // 🖼️ Image post
            if (post.content.type === "image") {
              return (
                <Link
                  href={`/post/${post._id}`}
                  key={post._id}
                  className="w-full h-auto rounded-md overflow-hidden border-border border"
                >
                  <img
                    src={post.content.media[0]}
                    className="w-full h-auto rounded-md object-cover"
                    alt=""
                  />
                </Link>
              );
            }

            // 🎥 Video post
            if (post.content.type === "video") {
              return (
                <Link
                  href={`/post/${post._id}`}
                  key={post._id}
                  className="w-full h-auto rounded-md overflow-hidden border-border border relative flex items-center justify-center"
                >
                  <video
                    src={post.content.media[0]}
                    muted
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute flex items-center justify-center shadow-2xl z-10  text-white text-3xl rounded-full">
                    <FaCirclePlay />
                  </div>
                  <span className="absolute bottom-1 right-1 text-xs bg-black/60 text-white px-1 rounded">
                    Video
                  </span>
                </Link>
              );
            }

            return null;
          })}
          <MasonrySkeleton />
          <MasonrySkeleton />
          <MasonrySkeleton />
          <MasonrySkeleton />
        </Masonry>
      </div>
    </div>
  );
};

export default ProfilePhotoslist;
