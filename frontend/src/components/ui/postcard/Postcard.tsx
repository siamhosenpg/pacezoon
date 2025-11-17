import React from "react";
// Importing UserContext to access user data
import { BsThreeDotsVertical } from "react-icons/bs"; // Icon for menu options
import { AiOutlineLike } from "react-icons/ai"; // Icon for like button
import { AiFillLike } from "react-icons/ai"; // Icon for filled like
import { MdBookmarkBorder } from "react-icons/md"; // Icon for bookmark
import { LuSendHorizontal } from "react-icons/lu"; // Icon for send button
import { MdOutlinePublic } from "react-icons/md"; // Icon for public visibility
import { MdOutlineLocationOn } from "react-icons/md"; // Icon for location
import { FaRegComments } from "react-icons/fa"; // Icon for comments (not used here)
import { RiShareForwardLine } from "react-icons/ri"; // Icon for share (not used here)
import { FcLike } from "react-icons/fc"; // Icon for colored like (not used here)
import Link from "next/link";
import PostCardButtons from "./PostCardButtons";
import DialogueBox from "../dialogueBox/DialogueBox";
import ThreeDotIconbutton from "../buttons/ThreeDotIconbutton";
import { PostTypes } from "@/types/postType";
import PostcardMedia from "./PostcardMedia";
import PostcardVideo from "./PostcardVideo";

import PostCardstatus from "./PostCardstatus";

interface PostboxProps {
  post: PostTypes;
}

const Postbox: React.FC<PostboxProps> = async ({ post }) => {
  // Accessing post data from PostContext
  // Accessing user data from UserContext

  const renderPostMedia = () => {
    switch (post.content.type) {
      case "image":
        return <PostcardMedia imagedata={post.content.media} />;

      case "video":
        return <PostcardVideo videodata={post.content.media} />;

      case "audio":
        return null;

      case "text":
        return null;

      default:
        return null;
    }
  };

  return (
    <li className="bg-background rounded-none sm:rounded-lg list-none  py-2 sm:py-3 pt-4 sm:pt-5 mb-2 sm:mb-4">
      <div className="flex items-center px-4 sm:px-6 justify-between ">
        <div className="left   flex items-center justify-start gap-2 overflow-hidden">
          <Link
            href={`/profile/${post.userid.userid}`}
            className="w-10 h-10 bg-gray-300 sm:w-12 sm:h-12 border-border border shrink-0  rounded-full overflow-hidden "
          >
            <img
              loading="lazy"
              className=" block w-full  h-full object-cover   "
              src={post.userid.profileImage} // Placeholder profile image
              alt=""
            />
          </Link>
          <div className="text">
            <div className="flex gap-2  items-center">
              <div className="font-semibold block text-primary whitespace-nowrap overflow-hidden text-ellipsis">
                {post.userid.name}
              </div>{" "}
              {/* Hardcoded user name */}
              <span className="text-sm flex items-center w-fit text-gray-600">
                <MdOutlineLocationOn className="text-tertiary" />
                <span className="max-w-[130px] text-secondary text-[12px] sm:text-[13px] sm:max-w-fit text-ellipsis whitespace-nowrap overflow-hidden">
                  {post.content.location}
                </span>{" "}
                {/* Post location */}
              </span>
            </div>
            <span className="text-[12px] sm:text-[13px] text-tertiary flex gap-2 items-center">
              <span>{post.updatedAt}</span> <MdOutlinePublic />{" "}
              {/* Public visibility icon */}
            </span>
          </div>
        </div>
        <ThreeDotIconbutton />
      </div>

      {/* Post text content */}
      <p className="posttext text-sm font-medium text-secondary mt-4 px-4 sm:px-6">
        {post.content.caption}
      </p>

      {/* Media Section */}
      <div>{renderPostMedia()}</div>

      {/* Engagement section (likes, comments, shares) */}

      <div className="  ">
        <PostCardstatus postid={post._id} />
        <PostCardButtons />
      </div>

      <div className=" px-4 sm:px-6 hidden">
        {/* Input for adding a comment */}
        <div className="CommentsInput flex gap-3 mt-2 sm:mt-3 items-center  ">
          <img
            className="w-9 sm:w-10 h-9 sm:h-10 shrink-0 rounded-full"
            src="/profile/2.jpg" // Placeholder profile image
            alt=""
          />
          <input
            type="text"
            className=" bg-background-secondary text-loose rounded-full px-5 py-2 sm:py-2 text-sm w-full outline-none"
            placeholder="What's your mind?" // Placeholder text
          />
          <button className="bg-background-secondary shrink-0  rounded-full w-9 h-9  flex items-center justify-center">
            <LuSendHorizontal className="text-lg text-secondary" />{" "}
            {/* Send button */}
          </button>
        </div>

        {/* Comments section */}

        <div className=" mt-5">
          <b className="text-loose"> Comments</b>
          <div className=" Comments pb-3">
            {/* Looping through comments */}

            <div className=" commentsitems flex items-start gap-2 mt-2 ">
              {/* Commenter profile image */}
              <div className="image w-8 h-8 shink">
                <img
                  loading="lazy"
                  src="/images/profile.jpg" // Placeholder profile image
                  className=" bg-blue-50 w-full h-full rounded-full"
                  alt=""
                />
              </div>
              {/* Comment text */}
              <div className="texts max-w-[80%] bg-background-secondary px-4 py-2 rounded-xl rounded-tl-none">
                <b className="block font-semibold text-sm text-primary">
                  Siam Hossen
                </b>
                <div className="flex items-start gap-2">
                  <span className="block rounded-xl text-sm text-secondary mt-1">
                    This is a sample comment text.
                  </span>
                </div>
              </div>
              {/* Like and reply buttons for comments */}
              <div className="flex items-center mt-2 gap-3">
                <button className=" flex ">
                  <AiOutlineLike className="text-lg text-loose" />{" "}
                  {/* Like button */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Postbox;
