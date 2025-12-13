"use client";

import React from "react";
import { useSavedItems } from "@/hook/save/useSavedItems";
import { useDefaultCollection } from "@/hook/save/useCollections";
import Postbox from "@/components/ui/postcard/Postcard";

const SaveContent = () => {
  const {
    data: defaultCol,
    isLoading: colLoading,
    isError: colError,
  } = useDefaultCollection();

  const collectionId = defaultCol?.collectionId;

  const {
    data: savedItems,
    isLoading: savedLoading,
    isError: savedError,
  } = useSavedItems(collectionId); // enabled auto handled

  if (colLoading) return <div>Loading collection...</div>;
  if (colError) return <div>Error loading collection</div>;

  if (savedLoading) return <div>Loading saved posts...</div>;
  if (savedError) return <div>Error loading saved posts</div>;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1">
        {savedItems?.map((item) => (
          <div key={item._id}>
            <Postbox post={item.postId} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SaveContent;
