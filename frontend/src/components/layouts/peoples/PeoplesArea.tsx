"use client";
import React from "react";
import { usePeopleSuggestions } from "@/hook/user/usePeopleSuggestions";
import PeoplesCard from "@/components/ui/peoples/PeoplesCard";
import PeoplesCardSkeleton from "@/components/ui/peoples/PeoplesCardSkeleton";

const PeoplesArea = () => {
  const { data, isLoading, isError } = usePeopleSuggestions();

  if (isLoading)
    return (
      <div className="w-full lg:w-4/6 m-auto">
        {Array.from({ length: 4 }).map((_, i) => (
          <PeoplesCardSkeleton key={i} />
        ))}
      </div>
    );
  if (isError) return <p>Failed to load people</p>;
  return (
    <div>
      <div className=" w-full lg:w-4/6 m-auto flex flex-col gap-3 pt-4 pb-18">
        {data?.users.map((user) => {
          return <PeoplesCard key={user._id} user={user} />;
        })}
      </div>
    </div>
  );
};

export default PeoplesArea;
