"use client";

import React from "react";

import { RiHeartAdd2Line } from "react-icons/ri";
import { TbHeartX } from "react-icons/tb";
import { RiUserFollowLine } from "react-icons/ri";
import { RiStopCircleLine } from "react-icons/ri";
import { LuCopyCheck } from "react-icons/lu";
import { ImEmbed2 } from "react-icons/im";
import { MdNotificationsNone } from "react-icons/md";
import { RiFlagLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import { TbPinned } from "react-icons/tb";

import { useAuth } from "@/hook/useAuth";
import { useFollowing } from "@/hook/useFollow";
import { PostTypes } from "@/types/postType";
import ActionDeletePost from "./actionactivity/ActionDeletePost";
import ActionUnfollow from "./actionactivity/ActionUnfollow";
import ActionFollow from "./actionactivity/ActionFollow";

interface PostActionListProps {
  post: PostTypes;
}

const PostActionList: React.FC<PostActionListProps> = ({ post }) => {
  const { user } = useAuth();

  const userId = user?.user?._id;
  const postUserId = post?.userid?._id;
  // Fetch following list
  const { data: followingList } = useFollowing(userId || "");
  // Check whether current user follows the post owner
  const isFollowing = followingList?.some(
    (item) => item?.followingId?._id === postUserId
  );

  let menuItems = [];

  // 1️⃣ If post belongs to the logged-in user
  if (userId === postUserId) {
    menuItems = [
      { title: "Pin Post", icon: TbPinned },
      { title: "Edit Post", icon: MdEditNote },
      { title: "Delete Post", icon: MdDeleteOutline },
      { title: "Copy Link to Post", icon: LuCopyCheck },
      { title: "Embed Post", icon: ImEmbed2 },
    ];
  }

  // 2️⃣ If viewing someone you follow
  else if (isFollowing) {
    menuItems = [
      { title: "Unfollow User", icon: RiUserFollowLine },
      { title: "Mute Post Author", icon: RiStopCircleLine },
      { title: "Not Interested", icon: TbHeartX },
      { title: "Copy Link to Post", icon: LuCopyCheck },
      { title: "Embed Post", icon: ImEmbed2 },
      { title: "Report Post", icon: RiFlagLine },
      { title: "Turn on Notifications", icon: MdNotificationsNone },
    ];
  }

  // 3️⃣ If not following user
  else {
    menuItems = [
      { title: "Follow User", icon: RiUserFollowLine },
      { title: "Interested", icon: RiHeartAdd2Line },
      { title: "Not Interested", icon: TbHeartX },
      { title: "Copy Link to Post", icon: LuCopyCheck },
      { title: "Embed Post", icon: ImEmbed2 },
      { title: "Report Post", icon: RiFlagLine },
      { title: "Turn on Notifications", icon: MdNotificationsNone },
    ];
  }

  return (
    <div className="absolute  text-left shadow-2xl z-40 right-3 border-border border bg-background rounded-lg  w-fit max-w-[400px] min-w-[300px] py-2">
      {/* Why am I seeing this post? */}
      <div className="px-2">
        <div className="px-4 py-2 border-b border-border text-secondary font-semibold">
          <strong className="block font-semibold">
            Why am I seeing this post?
          </strong>

          <span className="font-medium text-[13px] block mt-1">
            {userId === postUserId
              ? "This post is your own content."
              : isFollowing
              ? `Because you follow ${post?.userid?.name}.`
              : `Because this post is from ${post?.userid?.name}.`}
          </span>
        </div>
      </div>

      {/* Action List */}
      <ul className="p-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          // delete হলে custom component ব্যবহার করো
          if (item.title === "Delete Post") {
            return <ActionDeletePost key={index} post={post} />;
          }
          if (item.title === "Unfollow User") {
            return (
              <ActionUnfollow
                key={index}
                userId={post.userid._id}
                Name={post.userid.name}
              />
            );
          }
          if (item.title === "Follow User") {
            return (
              <ActionFollow
                key={index}
                userId={post.userid._id}
                Name={post.userid.name}
              />
            );
          }
          return (
            <div
              key={index}
              className="flex items-center gap-2 px-6 py-3 hover:bg-background-secondary cursor-pointer rounded-md"
            >
              <div className="text-xl text-secondary">
                <Icon />
              </div>
              <strong className="font-semibold">{item.title}</strong>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default PostActionList;
