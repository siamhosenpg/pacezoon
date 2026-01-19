"use client";
import DateTime from "@/components/ui/datetime/DateTime";
import { useLastActivities } from "@/hook/activitys/useActivities";
import Link from "next/link";
import { GiSoundWaves } from "react-icons/gi";
import { FaPlay } from "react-icons/fa6";
const ShortcutActivity = () => {
  const { data, isLoading, isError } = useLastActivities();

  if (isLoading) return <p>Loading activities...</p>;
  if (isError) return <p>Failed to load activities</p>;

  return (
    <div className="p-4 bg-background rounded-lg mt-3">
      <div className="flex justify-between items-center pb-2 ">
        <div className="font-semibold text-primary">Last Activity</div>
        <span className="text-sm text-secondary cursor-pointer">Show more</span>
      </div>

      <div className="grid grid-cols-1  py-2">
        {data?.data.map((activity) => {
          if (activity.type === "react" && activity.target.postId) {
            return (
              <Link
                href={`/post/${activity.target.postId._id}?index=0`}
                key={activity._id}
                className="flex items-center  items-top gap-3 rounded-md hover:bg-background-secondary p-2 "
              >
                {activity.target.postId.content?.type === "image" && (
                  <img
                    className="h-12 w-12 rounded-md object-cover shrink-0"
                    src={
                      activity.target.postId.content.media[0] ||
                      "/images/profile.jpg"
                    }
                    alt="image"
                  />
                )}

                {activity.target.postId.content?.type === "video" && (
                  <div className="h-12 w-12 flex items-center justify-center shrink-0 relative">
                    <video
                      className=" w-full h-full rounded-md object-cover "
                      src={activity.target.postId.content.media[0]}
                    />
                    <FaPlay className="text-lg absolute z-20  text-white shadow-2xl" />
                  </div>
                )}

                {activity.target.postId.content?.type === "audio" && (
                  <GiSoundWaves className="w-12 h-12 bg-background-secondary rounded-lg" />
                )}

                <div className="flex flex-col gap-0.5">
                  {activity.target.postId.content?.caption ? (
                    <p className=" line-clamp-1 font-semibold">
                      {activity.target.postId.content?.caption}
                    </p>
                  ) : (
                    <p className="line-clamp-1 font-semibold">
                      You react this post
                    </p>
                  )}

                  <span className="smalltext text-text-tertiary">
                    <DateTime date={activity.createdAt} />
                  </span>
                </div>
              </Link>
            );
          }

          if (activity.type === "comment" && activity.target.commentId) {
            ("commented on your post");
          }

          if (activity.type === "follow" && activity.target.followId) {
            ("started following you");
          }

          if (activity.type === "post") {
            ("created a new post");
          }
        })}
      </div>
    </div>
  );
};

export default ShortcutActivity;
