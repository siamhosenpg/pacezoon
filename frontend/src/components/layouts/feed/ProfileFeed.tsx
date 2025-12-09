"use client";
import React from "react";
import { PostTypes } from "@/types/postType";
import { usePost } from "@/hook/usePost";
import Postcard from "../../ui/postcard/Postcard";
import PostcardLoading from "@/components/ui/postcard/PostcardLoading";

type ProfileFeedProps = {
  userid: string;
};

// Backend response may return array OR object
type PostsResponse = PostTypes[] | { posts: PostTypes[] };

const ProfileFeed = ({ userid }: ProfileFeedProps) => {
  const { profilePost } = usePost();
  const { data, isLoading, error } = profilePost(userid);

  if (isLoading) {
    return <PostcardLoading />;
  }

  if (error) return <p className="text-red-500">Failed to load posts</p>;

  if (!data) return <p className="text-red-500">No posts found.</p>;

  // Normalize data
  const posts: PostTypes[] = Array.isArray(data) ? data : data.posts;

  if (posts.length === 0)
    return <p className="w-full text-center mt-5">No posts found.</p>;

  return (
    <div>
      {posts.map((post) => (
        <Postcard post={post} key={post._id} />
      ))}
    </div>
  );
};

export default ProfileFeed;
