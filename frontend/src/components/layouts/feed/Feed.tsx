import Postbox from "@/components/ui/postcard/Postcard";
import PostcardLoading from "@/components/ui/postcard/PostcardLoading";
import React from "react";

import { getFeedPosts } from "@/lib/post/feedPosts";
import { PostTypes } from "@/types/postType";
const Feed = async () => {
  const posts = await getFeedPosts();
  return (
    <div>
      <div>
        {posts.map((post: PostTypes) => {
          return <Postbox post={post} key={post._id} />;
        })}
      </div>

      <PostcardLoading />
    </div>
  );
};

export default Feed;
