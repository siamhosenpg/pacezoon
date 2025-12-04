import StoryPageContent from "@/components/layouts/storypage/StoryPageContent";
import StoryPageLeft from "@/components/layouts/storypage/StoryPageLeft";
import { ProtectedRoute } from "@/components/Protected/ProtectedRoute";

import { getStoryById } from "@/lib/storys/storyData";

import React from "react";

interface StoryProps {
  params: {
    storiesid: string;
  };
}

const StoryPage = async ({ params }: StoryProps) => {
  const story = await getStoryById(params.storiesid);
  // Fetch the story data

  return (
    <ProtectedRoute>
      <div className="pt-4">
        <div className="w-full Pagearea flex items-center h-[calc(100vh-106px)] gap-22">
          <div className="left w-[400px] shrink-0 h-auto max-h-full">
            <StoryPageLeft />
          </div>
          <div className="right w-full h-full">
            <StoryPageContent story={story} />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default StoryPage;
