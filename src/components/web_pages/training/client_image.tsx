"use client";
import Image from "next/image";
import { useState } from "react";
import { ClientImageProps } from "@/utils/types/types";

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
      <Image
        src={trainingItem.image}
        alt="image"
        layout="fill"
        objectFit="cover"
        placeholder="blur"
        blurDataURL={trainingItem.image}
        priority
        onLoad={handleImageLoad}
      />
    </div>
  );
}
