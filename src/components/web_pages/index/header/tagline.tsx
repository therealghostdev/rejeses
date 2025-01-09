import React from "react";
import Image from "next/image";

export default function Tagline() {
  return (
    <div className="text-[#DF8244] bg-[#FEF9F6] border border-[#F8E2D3] mt-8 -mb-6 font-semibold rounded-lg flex items-center text-ellipsis text-nowrap px-4 py-2">
      <div className="w-full h-10 flex justify-between items-center gap-x-4">
        <div className="flex justify-center items-center">
          <Image
            src={"/thumbs_up.svg"}
            width={50}
            height={50}
            alt="thumbs-up"
            className="h-9"
          />
        </div>

        <p>Your Partner in Project Excellence</p>
      </div>
    </div>
  );
}
