"use client";

import { useState } from "react";
import { usePost } from "@/hook/usePost";
import { ImCross } from "react-icons/im";
import { ProtectedRoute } from "@/components/Protected/ProtectedRoute";
import ModalPortal from "../ModalPortal";
import { useAuth } from "@/hook/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import PostcardMedia from "@/components/ui/postcard/PostcardMedia";
import PostcardVideo from "@/components/ui/postcard/PostcardVideo";
import UserBadge from "@/components/ui/text/UserBadge";

interface Props {
  postId: string;
  onClose: () => void;
}

const CreateSharePost = ({ postId, onClose }: Props) => {
  const { user, isLoading } = useAuth();
  const { sharePost, singlePost, sharePostLoading } = usePost();

  const {
    data: post,
    isLoading: PostLoading,
    isError,
  } = singlePost(postId as string);

  const [caption, setCaption] = useState("");
  const [privacy, setPrivacy] = useState<"public" | "friends" | "private">(
    "public",
  );

  const handleShare = () => {
    sharePost(
      {
        parentPost: postId,
        caption,
        privacy,
      },
      {
        onSuccess: () => {
          onClose();
          setCaption("");
        },
      },
    );
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="p-4 text-center text-red-500 font-semibold">
        Please login to create a post.
      </div>
    );
  }

  if (isError || !post) return <p>Post not found</p>;
  // ----------------------------
  // Animations
  // ----------------------------
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: "easeOut" as any },
    },
    exit: {
      y: 80,
      opacity: 0,
      transition: { duration: 0.25, ease: "easeIn" as any },
    },
  };
  const renderPostMedia = () => {
    switch (post.content.type) {
      case "image":
        return (
          <PostcardMedia imagedata={post.content.media} postid={post._id} />
        );

      case "video":
        return (
          <PostcardVideo videodata={post.content.media} postid={post._id} />
        );

      case "audio":
        return null;

      case "text":
        return null;

      default:
        return null;
    }
  };
  return (
    <ProtectedRoute>
      <ModalPortal>
        <AnimatePresence>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-60 flex items-end lg:items-center justify-center bg-background-tertiary/80 backdrop-blur-xs "
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="-mt-12 w-full lg:w-2/6 rounded-2xl rounded-b-none lg:rounded-b-2xl border border-white/30 bg-background pt-3 pb-6 shadow-2xl"
            >
              {/* Header */}
              <div className="mb-4 flex items-center justify-between border-b border-border px-6 py-2">
                <h2 className="text-base font-bold gap-2 flex items-center">
                  Share Post
                </h2>
                <button
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background-secondary cursor-pointer"
                >
                  <ImCross />
                </button>
              </div>

              <div className="px-4 sm:px-6">
                <div className="flex items-center gap-2">
                  <div className=" w-11 sm:w-12 h-11 sm:h-12 rounded-full shrink-0 overflow-hidden ">
                    <img
                      className="w-full h-full object-cover bg-background-secondary "
                      src={
                        user?.user.profileImage
                          ? user.user.profileImage
                          : user?.user.gender === "female"
                            ? "/images/femaleprofile.jpg"
                            : "/images/profile.jpg" // male or default
                      }
                      alt=""
                    />
                  </div>
                  <div className="w-full">
                    <div className=" flex items-center gap-3 ">
                      <h3 className="font-bold flex items-center gap-1 w-fit shrink-0 text-ellipsis whitespace-nowrap overflow-hidden ">
                        {user.user.name}
                        <UserBadge badges={user.user.badges} />
                      </h3>
                    </div>
                    <select
                      value={privacy}
                      onChange={(e) =>
                        setPrivacy(
                          e.target.value as "public" | "private" | "friends",
                        )
                      }
                      className="w-fit rounded-lg border border-border  py-1 px-1.5 smalltext mt-1  cursor-pointer"
                    >
                      <option className="bg-background" value="public">
                        🌍 Public
                      </option>
                      <option className="bg-background" value="friends">
                        👥 Friends
                      </option>
                      <option className="bg-background" value="private">
                        🔒 Private
                      </option>
                    </select>
                  </div>
                </div>

                {/* Caption */}
                <textarea
                  rows={3}
                  placeholder={`Write something about this post, ${user.user.name}?`}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className=" resize-none w-full mt-3 "
                />
                <div className="border-border border rounded-lg w-4/6 py-4">
                  <div className="flex items-center gap-2 px-6">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover "
                        src={
                          post.userid.profileImage
                            ? post.userid.profileImage
                            : post.userid.gender === "female"
                              ? "/images/femaleprofile.jpg"
                              : "/images/profile.jpg" // male or default
                        }
                        alt=""
                      />
                    </div>
                    <h3 className="flex items-center gap-1 font-semibold">
                      {post.userid.name}{" "}
                      <UserBadge badges={post.userid?.badges} />
                    </h3>
                  </div>
                  {post.content.caption && (
                    <div className="px-6 mt-2 text-text-secondary">
                      {post.content.caption}
                    </div>
                  )}
                  <div className="mt-0 lg:mt-3">{renderPostMedia()}</div>
                </div>
                {/* Actions */}
                <div className="flex justify-end gap-2 mt-4 ">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm rounded-lg bg-background-secondary hover:bg-background-tertiary"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleShare}
                    disabled={sharePostLoading}
                    className="px-4 py-2 text-sm rounded-lg bg-accent text-white disabled:opacity-50"
                  >
                    {sharePostLoading ? "Sharing..." : "Share"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </ModalPortal>
    </ProtectedRoute>
  );
};

export default CreateSharePost;
