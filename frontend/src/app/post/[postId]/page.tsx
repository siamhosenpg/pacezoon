import React from "react";
import ImageSection from "@/components/layouts/postprevew/ImageSection";
import CommentsInput from "@/components/ui/comments/CommentsInput";
import { getSinglePost } from "@/lib/post/feedPosts";
import Link from "next/link";
import CommentsSection from "@/components/layouts/postprevew/CommentsSection";
import PostCardStatus from "@/components/ui/postcard/PostCardstatus";
import PostCardButtons from "@/components/ui/postcard/PostCardButtons";
import DateTime from "@/components/ui/datetime/DateTime";
import ThreeDotIconButton from "@/components/ui/buttons/ThreeDotIconbutton";
import PrevewVideoSection from "@/components/layouts/postprevew/PostPrevewVideo";
import UserBadge from "@/components/ui/text/UserBadge";
import PostPrevewRight from "@/components/layouts/postprevew/PostPrevewRight";
interface PageProps {
  params: Promise<{ postId: string }>; // Promise না দেওয়া
  searchParams: { [key: string]: string | undefined };
}

const Post = async ({ params, searchParams }: PageProps) => {
  // Convert ID safely
  const { postId } = await params;

  // Convert index safely (fallback = 0)
  const index = Number(searchParams.index) ? Number(searchParams.index) : 0;

  // API Call
  const post = await getSinglePost(postId);

  if (!post) {
    return <div className="text-center mt-10">Post not found</div>;
  }

  return (
    <div className="Pagearea">
      <div className="mt-0 sm:mt-4 flex flex-col md:flex-row items-start justify-between gap-6">
        {/* Left: Image Section */}
        {post.content.type === "image" ? (
          <ImageSection media={post.content.media} index={index} />
        ) : post.content.type === "video" ? (
          <PrevewVideoSection media={post.content.media} />
        ) : (
          ""
        )}

        {/* Right: Details */}
        <PostPrevewRight post={post} />
      </div>
    </div>
  );
};

export default Post;
