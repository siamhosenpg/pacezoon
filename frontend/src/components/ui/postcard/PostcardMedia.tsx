import React from "react";
import Link from "next/link";
import PostcardimageMlt from "./PostcardimageMlt";
import Image from "next/image";

// 👉 Type for image data
type ImageType = string;

type Props = {
  imagedata: ImageType[];
  postid: string;
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
                className="media flex items-center justify-center  w-full px-0 sm:px-6 h-auto overflow-hidden active:scale-95 transition-transform"
              >
                <Image
                  width={1000} // ratio only
                  height={600} // ratio only
                  loading="lazy"
                  className="rounded-none sm:rounded-lg object-cover border-border border  w-full h-auto min-h-50 min-w-full bg-gray-100 max-h-125 lg:max-h-175"
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
