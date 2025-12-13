"use client";

import React, { useState } from "react";
import { useCreateCollection } from "@/hook/save/useCollections";

const CreateCollectionForm = () => {
  const [name, setName] = useState("");

  const { mutate, isPending, isSuccess, isError, error } =
    useCreateCollection();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      { name },
      {
        onSuccess: () => {
          setName("");
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-background rounded-lg  space-y-3"
    >
      <h2 className="text-lg font-bold">Create New Collection</h2>

      <input
        type="text"
        placeholder="Folder name"
        className="w-full p-2 border border-border rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-accent text-white py-2 rounded-md  cursor-pointer"
      >
        {isPending ? "Creating..." : "Create"}
      </button>

      {isSuccess && <p className="text-green-600">Collection created!</p>}
      {isError && <p className="text-red-600">{error?.message}</p>}
    </form>
  );
};

export default CreateCollectionForm;
