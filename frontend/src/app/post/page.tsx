"use client";
import ImageSection from "@/components/layouts/postprevew/ImageSection";
import CommentsInput from "@/components/ui/comments/CommentsInput";
import React, { useContext, useState } from "react";

import { HiDotsVertical } from "react-icons/hi";

import { HiDotsHorizontal } from "react-icons/hi";
import { BsReply } from "react-icons/bs";
import { AiOutlineFire } from "react-icons/ai"; // Icon for likes
import CommentsCard from "@/components/ui/comments/CommentsCard";
import CommentsLoading from "@/components/ui/comments/CommentsLoading";
const userData = [
  {
    userid: "user1",
    name: "John Doe",
    profileimage: "/images/profile1.jpg",
    bio: "Photographer & Traveler",
  },
  {
    userid: "user2",
    name: "Jane Smith",
    profileimage: "/images/profile2.jpg",
    bio: "Food Lover & Blogger",
  },
  {
    userid: "user3",
    name: "Mike Johnson",
    profileimage: "/images/profile3.jpg",
    bio: "Tech Enthusiast & Developer",
  },
];

const Foundpost = {
  postid: "post1",
  userid: "user1",
  media: "/images/profile.jpg",
  text: "This is a sample post description for post 1.",
  comments: [
    {
      commentid: "comm1",
      userid: "user2",
      text: "Great post!",
    },
    {
      commentid: "comm2",
      userid: "user3",
      text: "Thanks for sharing.",
    },
  ],
};
const Post = () => {
  const [StatusActionBox, setStatusActionBox] = useState(false);
  const handleActionBox = () => {
    StatusActionBox == false
      ? setStatusActionBox(true)
      : setStatusActionBox(false);
  };

  return (
    <div className="Pagearea">
      <div className=" mt-0  sm:mt-4  flex flex-col md:flex-row items-start justify-between   gap-6">
        <ImageSection />
        {/* Right side area */}
        <div className=" w-full md:w-4/12 hidden lg:block ">
          <div className=" p-4 h-[calc(100vh_-_110px)] bg-background rounded-lg flex flex-col justify-between">
            {/* Post user profile and description */}
            <div className=" shrink-0">
              <div className="Profile flex items-center justify-between bg-background-secondary gap-2 px-3 py-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className=" w-12 h-12 rounded-full border-border border flex items-center justify-center overflow-hidden">
                    {" "}
                    <img
                      src="/images/profile.jpg"
                      loading="lazy"
                      alt=""
                      className="w-full h-full object-cover rounded-full overflow-hidden"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-primary">Siam Hosen</div>
                    <span className="block text-sm text-secondary">
                      Website Developer & Designer
                    </span>
                  </div>
                </div>
                <div className="">
                  <button className="text-secondary">
                    <HiDotsVertical
                      onClick={handleActionBox}
                      className="text-xl text-secondary"
                    />
                  </button>
                </div>
              </div>

              <p className="text-sm font-medium mt-4 px-2 text-secondary ">
                {Foundpost.text}
              </p>
            </div>
            {/* Comments Section */}
            {/* Comments section */}
            <div className=" mt-4 h-full flex flex-col  overflow-hidden">
              <b className="block shrink-0 py-2 border-b border-border  text-loose">
                {" "}
                Comments
              </b>
              <div className=" Comments  h-full overflow-y-auto ScrollSystem  ">
                {/* Looping through comments */}
                <CommentsCard />
                <CommentsCard />
                <CommentsCard />
                <CommentsCard />
                <CommentsCard />
                <CommentsCard />
                <CommentsCard />
                <CommentsCard />
                <CommentsLoading />
                <CommentsLoading />
                <CommentsLoading />
              </div>
            </div>
            {/* Comments section */}

            <CommentsInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
