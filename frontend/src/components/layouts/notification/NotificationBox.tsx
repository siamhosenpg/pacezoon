"use client";

import DateTime from "@/components/ui/datetime/DateTime";
import { useNotifications } from "@/hook/notifications/useNotifications";
import Link from "next/link";
const NotificationBox = () => {
  const { data, isLoading, isError } = useNotifications();

  if (isLoading) return <p>Loading notifications...</p>;
  if (isError) return <p>Failed to load notifications</p>;
  return (
    <div className="fixed top-19  h-[calc(100vh-90px)]  w-full md:w-[400px] bg-background border-border border rounded-lg">
      <div className="max-w-xl mx-auto p-4 space-y-3">
        {data?.length === 0 && (
          <p className="text-center text-gray-500">No notifications yet</p>
        )}

        {data?.map((noti) => (
          <Link
            href={`/profile/${noti.actorId.userid}`}
            key={noti._id}
            className={`flex items-center gap-3 p-3 rounded-lg  ${
              noti.read ? "bg-white" : "bg-blue-50"
            }`}
          >
            <img
              src={noti.actorId.profileImage || "/avatar.png"}
              alt={noti.actorId.name}
              className="rounded-full w-10 h-10 object-cover "
            />

            {/* Text */}
            <div className="flex-1 text-sm">
              <p>
                <span className="font-semibold">{noti.actorId.name}</span>{" "}
                {getNotificationText(noti.type)}
              </p>

              <p className="text-xs text-gray-500">
                <DateTime date={noti.createdAt} />
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

/** Helper */
function getNotificationText(type: string) {
  switch (type) {
    case "follow":
      return "started following you";
    case "react":
      return "Reacted your post";
    case "comment":
      return "commented on your post";
    case "share":
      return "shared your post";
    default:
      return "sent you a notification";
  }
}

export default NotificationBox;
