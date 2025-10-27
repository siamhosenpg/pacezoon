import React from "react";
import { FaBackspace } from "react-icons/fa";
import { VscScreenFull } from "react-icons/vsc";
const Foundpost = {
  postid: "post1",
  userid: "user1",
  media: "/images/profile.jpg",
  text: "This is a sample post description for post 1.",
};
const ImageSection = () => {
  const handelBack = () => {
    window.history.back();
  };

  const FullScreenImage = () => {
    const imgElement = document.querySelector(".leftArea img");
    if (imgElement) {
      if (!document.fullscreenElement) {
        imgElement.requestFullscreen().catch((err) => {
          console.error(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
          );
        });
      } else {
        document.exitFullscreen();
      }
    }
  };
  return (
    <div className="leftArea w-full md:w-8/12 h-[calc(100vh_-_110px)] relative flex items-center bg-background-secondary rounded-none sm:rounded-lg overflow-hidden justify-center">
      <div className=" absolute z-30 left-0 top-0 flex items-center justify-center  gap-3 p-3">
        <button
          onClick={handelBack}
          className="w-10 h-10 p-1 flex items-center justify-center bg-[#0000002d]  rounded-full shadow-md transition duration-300 ease-in-out"
        >
          <FaBackspace className="text-2xl text-white text-shadow-md" />
        </button>

        <button
          onClick={FullScreenImage}
          className="w-10 h-10 p-1 flex items-center justify-center bg-[#0000002d]  rounded-full shadow-md transition duration-300 ease-in-out"
        >
          <VscScreenFull className="text-2xl text-white text-shadow-md" />
        </button>
      </div>
      <img
        className=" max-w-full max-h-full relative z-20  object-contain "
        src={Foundpost.media}
        alt=""
        loading="lazy"
      />
      <img
        className=" absolute z[-10] max-w-full max-h-full  object-contain blur-xl scale-200 "
        src={Foundpost.media}
        loading="lazy"
      />
    </div>
  );
};

export default ImageSection;
