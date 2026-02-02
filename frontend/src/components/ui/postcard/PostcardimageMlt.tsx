"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

type ImageType = string;

type Props = {
  imagedata: ImageType[];
  postid?: string;
};

const PostcardimageMlt: React.FC<Props> = ({ imagedata, postid }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
    align: "start",
  });

  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);

  useEffect(() => {
    if (!emblaApi) return;

    // Drag শুরু
    const onPointerDown = (e: any) => {
      setIsDragging(false);
      startX.current = e.clientX;
    };

    // Move detect
    const onPointerMove = (e: any) => {
      const diff = Math.abs(e.clientX - startX.current);
      if (diff > 5) setIsDragging(true);
    };

    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("scroll", onPointerMove);

    return () => {
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("scroll", onPointerMove);
    };
  }, [emblaApi]);

  const handleImageClick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => {
    if (isDragging) {
      e.preventDefault();
      return;
    }

    const img = e.currentTarget;
    img.style.transform = "scale(0.95)";
    img.style.transition = "transform 200ms ease";

    setTimeout(() => {
      img.style.transform = "scale(1)";
    }, 200);
  };

  return (
    <div>
      {/* If only 2 images */}
      {imagedata.length === 2 && (
        <div className="flex px-2 lg:px-6 gap-2 sm:gap-4">
          {imagedata.map((image, i) => (
            <Link
              href={`/post/${postid}?index=${i}`}
              key={i}
              className="w-3/6 border border-border aspect-12/18 bg-background-secondary rounded-lg overflow-hidden flex items-center justify-center active:scale-95 transition-transform"
            >
              <Image
                width={600} // ratio only
                height={1000} // ratio only
                loading="lazy"
                className="object-cover w-full h-full"
                src={image}
                alt="Post Image"
                draggable={false}
              />
            </Link>
          ))}
        </div>
      )}
      {/* If more than 2 images */}
      {imagedata.length > 2 && (
        <div className="overflow-hidden  px-2 lg:px-6" ref={emblaRef}>
          <div className="flex gap-2 sm:gap-4">
            {imagedata.map((image, i) => (
              <Link
                href={`/post/${postid}?index=${i}`}
                key={i}
                className="flex-[0_0_45%]  aspect-13/18 bg-background-secondary rounded-lg overflow-hidden"
              >
                <div
                  className="border border-border w-full h-full rounded-lg overflow-hidden"
                  onClick={handleImageClick}
                >
                  <Image
                    width={600} // ratio only
                    height={1000} // ratio only
                    loading="lazy"
                    src={image}
                    alt="Post Image"
                    draggable={false}
                    className="object-cover w-full h-full"
                    style={{ transition: "transform 200ms ease" }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostcardimageMlt;
