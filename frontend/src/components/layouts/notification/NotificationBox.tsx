"use client";

import DateTime from "@/components/ui/datetime/DateTime";
import {
  useNotifications,
  useMarkNotificationRead,
} from "@/hook/notifications/useNotifications";
import Image from "next/image";
import Link from "next/link";

type NotificationBoxProps = {
  onClose: () => void;
};

const NotificationBox = ({ onClose }: NotificationBoxProps) => {
  const { data, isLoading, isError } = useNotifications();
  const { mutate: markAsRead } = useMarkNotificationRead();

  if (isLoading) return <p>Loading notifications...</p>;
  if (isError) return <p>Failed to load notifications</p>;

  return (
    <div className="fixed top-19 right-5 h-[calc(100vh-90px)] p-4  w-full md:w-100 bg-background border-border border rounded-lg">
      <div className="max-w-xl h-full mx-auto  space-y-3 overflow-y-auto ScrollSystem ">
        {data?.length === 0 && (
          <p className="text-center text-gray-500">No notifications yet</p>
        )}

        {data &&
          data?.map((noti) => (
            <Link
              href={`/profile/${noti.actorId?.username}`}
              key={noti._id}
              onClick={() => {
                if (!noti.read) {
                  markAsRead(noti._id);
                }
                onClose(); // 🔥 close box immediately
              }}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                noti.read ? "bg-background" : "bg-accent/6"
              }`}
            >
              <Image
                width={50}
                height={50}
                loading="lazy"
                src={
                  noti.actorId?.profileImage
                    ? noti.actorId?.profileImage
                    : noti.actorId?.gender === "female"
                      ? "/images/femaleprofile.jpg"
                      : "/images/profile.jpg"
                }
                alt={noti.actorId?.name + " profile image"}
                className="rounded-full w-10 h-10 object-cover"
              />

              <div className="flex-1 text-sm">
                <p>
                  <span className="font-semibold">
                    {noti.actorId?.name || "Prosongo User"}{" "}
                  </span>{" "}
                  {getNotificationText(noti?.type)}
                </p>

                <p className="text-xs text-gray-500">
                  <DateTime date={noti?.createdAt} />
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
