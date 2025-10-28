import VideoCard from "@/components/ui/videocard/VideoCard";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="Pagearea">
        <div className="pt-2 md:pt-6">
          <h1 className="text-2xl font-bold">Videos</h1>
          <p>
            Welcome to the Videos page. Here you can find a collection of our
            latest videos.
          </p>
          <div className="grid grid-cols-3 gap-6 mb-6">
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
