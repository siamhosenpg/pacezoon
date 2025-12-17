"use client";
import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";

import { useGlobalSearch } from "@/hook/othershook/useSearch";

import { PostType, UserType } from "@/lib/otherapi/search";
import { useRouter } from "next/navigation";

const Searchboxnav: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce input 400ms
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(handler);
  }, [query]);

  const { data, isLoading, isError } = useGlobalSearch(debouncedQuery);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() !== "") {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative w-full">
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex items-center justify-between bg-background-secondary rounded-full"
      >
        <input
          type="text"
          className="px-3 py-2 font-semibold w-full rounded-full bg-background-secondary focus:outline-none"
          placeholder="Search your items here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="px-2 py-2 rounded-full flex items-center justify-center"
        >
          <IoSearch className="text-xl text-gray-500" />
        </button>
      </form>

      {/* Dropdown Results */}
      {debouncedQuery && (
        <div className="absolute top-full left-0 w-full bg-white  border border-border mt-1 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
          {isLoading && <p className="p-2 text-gray-500">Searching...</p>}
          {isError && (
            <p className="p-2 text-red-500">Error fetching results</p>
          )}
          {data && (
            <>
              {/* Users */}
              {data.users.length > 0 && (
                <div className="border-b border-border p-2">
                  <h3 className="font-semibold mb-1 text-sm">Users</h3>
                  {data.users.map((user: UserType) => (
                    <div
                      key={user._id}
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{user.name}</span>
                        <span className="text-xs text-gray-500">
                          @{user.username}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Posts */}
              {data.posts.length > 0 && (
                <div className="p-2">
                  <h3 className="font-semibold mb-1 text-sm">Posts</h3>
                  {data.posts.map((post: PostType) => (
                    <div
                      key={post._id}
                      className="p-2 border border-border rounded-md mb-2 hover:bg-gray-100  cursor-pointer"
                    >
                      <p className="text-sm mb-1">{post.content.caption}</p>
                      {post.content.media[0] && (
                        <img
                          src={post.content.media[0]}
                          alt="post media"
                          className="w-full max-h-32 object-cover rounded"
                        />
                      )}
                      <p className="text-xs mt-1 text-gray-500">
                        by {post.userid.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* No results */}
              {data.users.length === 0 && data.posts.length === 0 && (
                <p className="p-2 text-gray-500">No results found</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Searchboxnav;
