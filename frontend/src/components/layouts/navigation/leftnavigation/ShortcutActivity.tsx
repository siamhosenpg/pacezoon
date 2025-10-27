import React from "react";

const ShortcutActivity = () => {
  return (
    <div className="p-4 bg-background rounded-lg mt-3">
      <div className="flex justify-between items-center pb-3 border-b border-border">
        <div className="font-semibold text-primary">Shortcut Acticity</div>
        <span className="text-sm text-secondary">Show more</span>
      </div>
      {/* Activity  */}
      <div className="flex items-top gap-2 hover:bg-background px-2 rounded-md py-2 mt-2">
        <img
          className="w-[40px] h-[40px] rounded-full"
          src="/images/profile.jpg"
          alt=""
        />
        <div className="text-sm font-semibold w-[calc(100%_-_50px)] text-primary">
          Nazirana Nahar{" "}
          <span className="text-sm  text-secondary font-medium ml-1">
            Start flowing you
            <span className="block text-[12px] text-tertiary">10:01PM</span>
          </span>
        </div>
      </div>
      {/* Activity  */}
      <div className="flex items-top gap-2 hover:bg-background px-2 rounded-md py-2 mt-1">
        <img
          className="w-[40px] h-[40px] rounded-full"
          src="/images/profile.jpg"
          alt=""
        />
        <div className="text-sm font-semibold w-[calc(100%_-_50px)] text-primary">
          Masud Sowadogor{" "}
          <span className="text-sm  text-secondary font-medium ml-1">
            Comments on your photo "Beautiful this moments!"
            <span className="block text-[12px] text-tertiary">10:34PM</span>
          </span>
        </div>
      </div>
      {/* Activity  */}
      <div className="flex items-top gap-2 hover:bg-background px-2 rounded-md py-2 mt-1">
        <img
          className="w-[40px] h-[40px] rounded-full"
          src="/images/profile.jpg"
          alt=""
        />
        <div className="text-sm font-semibold w-[calc(100%_-_50px)] text-primary">
          Nazirana Nahar{" "}
          <span className="text-sm   font-medium ml-1 text-secondary">
            Post a photo "Amaging wather"
            <span className="block text-[12px] text-tertiary">11:34PM</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShortcutActivity;
