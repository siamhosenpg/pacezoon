import ImageSection from "@/components/layouts/postprevew/ImageSection";
import { getSinglePost } from "@/lib/post/feedPosts";
import PrevewVideoSection from "@/components/layouts/postprevew/PostPrevewVideo";
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
