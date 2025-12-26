"use client";
import Postbox from "@/components/ui/postcard/Postcard";
import PostcardLoading from "@/components/ui/postcard/PostcardLoading";
import React from "react";

import { PostTypes } from "@/types/postType";
import { usePost } from "@/hook/usePost";
import SharePostCard from "@/components/ui/postcard/SharePostCard/SharePostCard";
const Feed = () => {
  const { feedPost } = usePost(); // hook থেকে feedPost নিলাম
  const { data, isLoading, error } = feedPost();

  if (isLoading)
    return (
      <div>
        <PostcardLoading /> <PostcardLoading />
      </div>
    );

  if (error) return <p className="text-red-500">Failed to load feed posts</p>;

  if (!data || data.length === 0) return <p>No posts found</p>;
  return (
    <div>
      <div>
        {data &&
          data?.map((post: PostTypes) => {
            // 🟢 If share post
            if (post.content?.parentPost) {
              return <SharePostCard key={post._id} post={post} />;
            }

            // 🔵 Normal post
            return <Postbox key={post._id} post={post} />;
          })}
      </div>

      <PostcardLoading />
    </div>
  );
};

export default Feed;
