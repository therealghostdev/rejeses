"use client";
import Image from "next/image";
import { useState } from "react";
import { ClientImageProps } from "@/utils/types/types";
import SkeletalLoader from "@/components/reusables/animation/skeletol_loader";

export default function ClientImage({ trainingItem }: ClientImageProps) {
  const [loadingState, setLoadingState] = useState(true);

  const handleImageLoad = () => {
    setLoadingState(false);
  };

  return (
    <div
      className={`filter w-full h-full ${
        loadingState ? "blur-2xl" : "blur-none"
      } transition duration-1000 ease-in-out`}
    >
      {loadingState && (
        <SkeletalLoader
          blockWidth="w-[80%]"
          cardColor="bg-[#FEF9F6]"
          cardContentColor="bg-[#FEF9F6]"
          cardImageColor="bg-[#F5F0FA]"
        />
      )}
      <Image
        src={trainingItem?.image || "/meeting.svg"}
        alt="image"
        layout="fill"
        objectFit="cover"
        placeholder="blur"
        className={`w-full h-full object-contain object-top`}
        blurDataURL={trainingItem?.image || "/meeting.svg"}
        priority
        onLoad={handleImageLoad}
      />
    </div>
  );
}
