import Postbox from "@/components/ui/postcard/Postcard";
import PostcardLoading from "@/components/ui/postcard/PostcardLoading";
import React from "react";

const Feed = () => {
  return (
    <div>
      <Postbox />
      <Postbox />
      <Postbox />
      <PostcardLoading />
    </div>
  );
};

export default Feed;
