import SaveContent from "@/components/layouts/save/SaveContent";
import CreateCollectionForm from "@/components/layouts/save/SaveCreate";
import SaveLeft from "@/components/layouts/save/SaveLeft";
import { ProtectedRoute } from "@/components/Protected/ProtectedRoute";
import React from "react";

const page = () => {
  return (
    <ProtectedRoute>
      <div className="pt-4">
        <div className="w-full Pagearea flex   gap-16">
          <div className="left h-[calc(100vh-106px)] w-[370px] shrink-0  max-h-full flex flex-col gap-4  sticky top-[90px]">
            <CreateCollectionForm />
            <SaveLeft />
          </div>
          <div className="right w-5/12  ">
            <SaveContent />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default page;
