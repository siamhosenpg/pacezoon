"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { useGlobalSearch } from "@/hook/othershook/useSearch";
import { UserType, PostType } from "@/lib/otherapi/search";

const SearchResultPage: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const { data, isLoading, isError } = useGlobalSearch(query);

  return (
    <div className="Pagearea">
      {/* Loading/Error */}
      {isLoading && <p className="text-gray-500">Searching...</p>}
      {isError && <p className="text-red-500">Error fetching results</p>}

      {/* Result Grid */}
      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left side: Users */}
          <div className="lg:col-span-4 space-y-2">
            <h2 className="font-bold text-lg mb-2">Users</h2>
            {data.users.length > 0 ? (
              data.users.map((user: UserType) => (
                <div
                  key={user._id}
                  className="flex items-center gap-3 p-2 border rounded-md hover:bg-gray-100 cursor-pointer"
                >
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-sm text-gray-500">
                      @{user.username}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No users found</p>
            )}
          </div>

          {/* Right side: Posts */}
          <div className="lg:col-span-8 space-y-4">
            <h2 className="font-bold text-lg mb-2">Posts</h2>
            {data.posts.length > 0 ? (
              data.posts.map((post: PostType) => (
                <div
                  key={post._id}
                  className="p-3 border rounded-md hover:bg-gray-100 cursor-pointer"
                >
                  <p className="text-sm mb-2">{post.content.caption}</p>
                  {post.content.media[0] && (
                    <img
                      src={post.content.media[0]}
                      alt="post media"
                      className="w-full max-h-48 object-cover rounded"
                    />
                  )}
                  <p className="text-xs mt-1 text-gray-500">
                    by {post.userid.name}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No posts found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultPage;
