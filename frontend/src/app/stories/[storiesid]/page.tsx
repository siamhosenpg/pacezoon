import StoryPageContent from "@/components/layouts/storypage/StoryPageContent";
import StoryPageCreateBox from "@/components/layouts/storypage/StoryPageCreateBox";
import StoryPageLeft from "@/components/layouts/storypage/StoryPageLeft";
import { ProtectedRoute } from "@/components/Protected/ProtectedRoute";

import { getStoryById } from "@/lib/storys/storyData";

import React from "react";

interface StoryProps {
  params: Promise<{
    storiesid: string;
  }>;
}

const StoryPage = async ({ params }: StoryProps) => {
  const { storiesid } = await params;
  const story = await getStoryById(storiesid);
  // Fetch the story data

  return (
    <ProtectedRoute>
      <div className="pt-4">
        <div className="w-full Pagearea flex items-center h-[calc(100vh-106px)] gap-22">
          <div className="left w-[400px] hidden lg:block shrink-0 h-auto max-h-full flex flex-col gap-4">
            <StoryPageCreateBox />
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
