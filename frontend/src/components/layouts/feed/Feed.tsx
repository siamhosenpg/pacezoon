"use client";
import Postbox from "@/components/ui/postcard/Postcard";
import PostcardLoading from "@/components/ui/postcard/PostcardLoading";
import React from "react";

import { PostTypes } from "@/types/postType";
import { usePost } from "@/hook/usePost";
const Feed = () => {
  const { feedPost } = usePost(); // hook থেকে feedPost নিলাম
  const { data, isLoading, error } = feedPost();

  if (isLoading) return <PostcardLoading />;

  if (error) return <p className="text-red-500">Failed to load feed posts</p>;

  if (!data || data.length === 0) return <p>No posts found</p>;
  return (
    <div>
      <div>
        {data &&
          data.map((post: PostTypes) => {
            return <Postbox post={post} key={post?._id} />;
          })}
      </div>

      <PostcardLoading />
    </div>
  );
};

export default Feed;
