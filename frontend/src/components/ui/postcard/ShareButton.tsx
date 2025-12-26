"use client";

import { useState } from "react";

import { RiShareForwardLine } from "react-icons/ri";
import CreateSharePost from "@/components/layouts/createpost/CreateSharePost";

interface Props {
  postId: string;
}

const ShareButton = ({ postId }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 cursor-pointer  "
      >
        <RiShareForwardLine className="text-xl" />
        <span className=" font-semibold">Share</span>
      </button>

      {open && (
        <CreateSharePost postId={postId} onClose={() => setOpen(false)} />
      )}
    </>
  );
};

export default ShareButton;
