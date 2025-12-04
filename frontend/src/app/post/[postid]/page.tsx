import ImageSection from "@/components/layouts/postprevew/ImageSection";
import CommentsInput from "@/components/ui/comments/CommentsInput";
import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { getSinglePost } from "@/lib/post/feedPosts";
import Link from "next/link";
import CommentsSection from "@/components/layouts/postprevew/CommentsSection";
import PostCardStatus from "@/components/ui/postcard/PostCardstatus";

interface PageProps {
  params: {
    postid: string; // dynamic route always string
  };
  searchParams: {
    index?: string; // optional query param
    [key: string]: string | undefined;
  };
}

const Post = async ({ params, searchParams }: PageProps) => {
  // Convert ID safely
  const postid = Number(params.postid);

  // Convert index safely (fallback = 0)
  const index = Number(searchParams.index ?? 0);

  // API Call
  const post = await getSinglePost(postid);

  if (!post) {
    return <div className="text-center mt-10">Post not found</div>;
  }

  return (
    <div className="Pagearea">
      <div className="mt-0 sm:mt-4 flex flex-col md:flex-row items-start justify-between gap-6">
        {/* Left: Image Section */}
        <ImageSection media={post.content.media} index={index} />

        {/* Right: Details */}
        <div className="w-full md:w-4/12 hidden lg:block">
          <div className="p-4 h-[calc(100vh_-_110px)] bg-background rounded-lg flex flex-col justify-between">
            {/* User Info */}
            <div className="shrink-0 ">
              <div className="Profile flex items-center justify-between bg-background-secondary gap-2 px-3 py-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/profile/${post.userid.userid}`}
                    className="shrink-0 w-12 h-12 rounded-full border-border border flex items-center justify-center overflow-hidden"
                  >
                    <img
                      src={post.userid.profileImage}
                      loading="lazy"
                      alt=""
                      className="w-full h-full object-cover rounded-full overflow-hidden"
                    />
                  </Link>

                  <div>
                    <div className="font-semibold text-primary">
                      {post.userid.name}
                    </div>
                    <p className="text-sm text-secondary line-clamp-1 w-full">
                      {post.userid.bio}
                    </p>
                  </div>
                </div>

                <button className="text-secondary">
                  <HiDotsVertical className="text-xl text-secondary" />
                </button>
              </div>

              {/* Caption */}
              <p className="text-sm font-medium mt-4 px-2 text-secondary">
                {post.content.caption}
              </p>

              <PostCardStatus Commentsposition={true} postId={post._id} />
            </div>

            {/* Comments Section */}
            <div className="h-full flex flex-col overflow-hidden">
              <b className="block shrink-0 py-2 border-b border-border text-loose">
                Comments
              </b>

              <CommentsSection postId={post._id} />
            </div>

            {/* Input Box */}
            <CommentsInput postId={post._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
