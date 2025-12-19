import Storyitems from "./Storyitems";
import { getAllStories } from "@/lib/storys/storyData";
import { StoryType } from "@/types/storyType";

const Storys = async () => {
  // getAllStories() যদি শুধুমাত্র array return করে
  const { stories }: { stories: StoryType[] } = await getAllStories();

  if (!stories || stories.length === 0) return <div></div>;

  return (
    <div>
      <Storyitems stories={stories} />
    </div>
  );
};

export default Storys;
