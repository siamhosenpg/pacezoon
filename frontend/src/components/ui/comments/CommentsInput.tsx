import React from "react";
import { AiOutlineFire } from "react-icons/ai";

const CommentsInput = () => {
  return (
    <div className="  shrink-0 bg-background pt-2  ">
      {/* Comment input section */}

      <div className=" flex items-center gap-2  py-2 px-3 rounded-lg bg-background-secondary">
        <div className=" w-10 h-10 rounded-full shrink-0 border-border border flex items-center justify-center">
          {" "}
          <img
            src="/images/profile.jpg"
            loading="lazy"
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <input
          type="text"
          placeholder="Write a comment..."
          className="w-full px-4 py-2  rounded-full bg-background-secondary focus:outline-none "
        />
        <button>
          <AiOutlineFire className="text-lg text-secondary" />{" "}
          {/* Send button */}
        </button>
      </div>
    </div>
  );
};

export default CommentsInput;
