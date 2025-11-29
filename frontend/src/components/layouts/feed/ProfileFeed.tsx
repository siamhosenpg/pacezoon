import React from "react";
import { PostTypes } from "@/types/postType";
import { getPostsByUserId } from "@/lib/post/feedPosts";
import Postcard from "../../ui/postcard/Postcard";

type ProfileFeedProps = {
  useridcall: string;
};

const ProfileFeed = async ({ useridcall }: ProfileFeedProps) => {
  const userposts: PostTypes[] = await getPostsByUserId(useridcall);

  if (!userposts || userposts.length === 0) {
    return (
      <div className="text-center text-primary mt-10">No posts to display.</div>
    );
  }

  return (
    <div>
      {userposts.map((post) => (
        <Postcard post={post} key={post.postid} />
      ))}
    </div>
  );
};

export default ProfileFeed;
