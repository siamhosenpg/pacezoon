import React from "react";
import Link from "next/link";
import PostcardimageMlt from "./PostcardimageMlt";

// 👉 Type for image data
type ImageType = string;

type Props = {
  imagedata: ImageType[];
  postid: Number;
};

const PostcardMedia: React.FC<Props> = ({ imagedata, postid }) => {
  return (
    <div>
      {imagedata.length > 1 ? (
        <PostcardimageMlt imagedata={imagedata} postid={postid} />
      ) : (
        <div>
          {imagedata &&
            imagedata.map((image: string, i: number) => (
              <Link
                key={i}
                href={`/post/${postid}?index=${i}`}
                className="media flex items-center justify-center w-full px-4 sm:px-6 h-auto overflow-hidden"
              >
                <img
                  loading="lazy"
                  className="rounded-lg object-cover sm:rounded-lg  w-full h-auto min-h-[200px] min-w-[100px] bg-gray-100 max-h-[700px]"
                  src={image} // 👉 TypeScript safe
                  alt="Post Image"
                />
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default PostcardMedia;
