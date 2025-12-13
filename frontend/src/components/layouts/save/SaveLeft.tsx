"use client";
import React from "react";
import { useCollections } from "@/hook/save/useCollections";

import { BsImages } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const SaveLeft = () => {
  const { data, isLoading, isError } = useCollections();

  if (isLoading) return <div>Loading collections...</div>;
  if (isError) return <div>Failed to load collections</div>;

  return (
    <div className=" w-full h-full">
      <ul className="flex flex-col gap-2 p-3 bg-background rounded-lg ">
        {data?.map((collection) => (
          <li
            key={collection._id}
            className="p-3 px-4 rounded-md flex items-center justify-between gap-1 hover:bg-background-secondary cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <BsImages className="text-lg" />
              <div>
                <div className="font-semibold">{collection.name}</div>
              </div>
            </div>
            <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-background cursor-pointer shrink-0">
              <MdOutlineDelete className="text-lg" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SaveLeft;
