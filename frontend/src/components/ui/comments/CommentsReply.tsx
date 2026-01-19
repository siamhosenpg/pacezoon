import React, { useState } from "react";
import { useCommentsReplies } from "@/hook/useComments";

const CommentsReply = ({ commentId }: { commentId: string }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useCommentsReplies({ commentId, page });

  if (isLoading) return <p>Loading replies...</p>;
  if (isError) return <p>Error loading replies!</p>;
  if (data?.totalReplies === 0) return null;

  return (
    <div>
      <div className="border-border border-l-2 ">
        <h5 className="smalltext text-text-tertiary pb-1 pl-3">
          Replies ({data?.totalReplies})
        </h5>
        {data?.data.map((reply) => (
          <div
            key={reply._id}
            className="flex flex-row items-center gap-2   w-fit rounded-xl"
          >
            <div className="w-6 h-0.5 bg-background-tertiary"></div>
            <div className="w-6 h-6 flex items-center justify-center rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover "
                src={
                  reply.commentUserId.profileImage
                    ? reply.commentUserId.profileImage
                    : reply.commentUserId.gender === "female"
                      ? "/images/femaleprofile.jpg"
                      : "/images/profile.jpg" // male or default
                }
                alt=""
              />
            </div>
            <p className="font-medium text-text-secondary">{reply.text}</p>
          </div>
        ))}

        {page > 1 && (
          <button onClick={() => setPage((p) => p - 1)}>Previous</button>
        )}
        {data && data.count === 20 && (
          <button onClick={() => setPage((p) => p + 1)}>Next</button>
        )}
      </div>
    </div>
  );
};

export default CommentsReply;
