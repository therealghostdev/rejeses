import React from "react";
import "./slider-style.css";
import data from "@/utils/data/slider_data.json";
import Image from "next/image";

export default function Image_slider() {
  return (
    <div className="w-full flex justify-center items-center slide-container my-8">
      <div className="container1 w-1/4">
        <Image src="/meeting1.svg" alt="slider-1" width={100} height={100} className="w-full" />
      </div>
      <div className="container2 w-1/4">
        <Image src="/meeting2.svg" id="img2" alt="slider-1" width={100} height={50} className="w-full lg:h-[280px] h-[220px]" />
      </div>
      <div className="container3 w-1/4">
        <Image src="/meeting3.svg" id="img3" alt="slider-1" width={100} height={50} className="w-full lg:h-[280px] h-[220px]" />
      </div>
      <div className="container4 w-1/4">
        <Image src="/meeting4.svg" alt="slider-1" width={100} height={100} className="w-full" />
      </div>
    </div>
  );
}
