import React from "react";
import { PostTypes } from "@/types/postType";
import { getPostsByUserId } from "@/lib/post/feedPosts";
import Postcard from "../../ui/postcard/Postcard";

type ProfileFeedProps = {
  useridcall: string;
};

// Backend return type
interface PostsObjectResponse {
  posts: PostTypes[];
}

// Union type for backend response
type PostsResponse = PostTypes[] | PostsObjectResponse;

const ProfileFeed = async ({ useridcall }: ProfileFeedProps) => {
  // API Call with proper typing
  const response = (await getPostsByUserId(useridcall)) as PostsResponse;

  // Normalize data safely
  const userposts: PostTypes[] = Array.isArray(response)
    ? response
    : response?.posts ?? [];

  // Safety check (TS guarantee)
  if (!Array.isArray(userposts)) {
    console.error("❌ userposts is not an array:", userposts);
    return (
      <div className="text-center text-red-500 mt-10">
        Invalid response format.
      </div>
    );
  }

  if (userposts.length === 0) {
    return (
      <div className="text-center text-primary mt-10">No posts to display.</div>
    );
  }

  return (
    <div>
      {userposts.map((post: PostTypes) => (
        <Postcard post={post} key={post.postid} />
      ))}
    </div>
  );
};

export default ProfileFeed;
