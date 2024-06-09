import React from "react";
import "./mobile-slider.css";
import data from "@/utils/data/slider_data.json";
import Image from "next/image";

export default function Mobile_Image_slider() {
  return (
    <div className="w-full flex justify-center items-center slide-container my-8">
      <div className="container-1 w-2/4 mr-1">
        <Image src="/meeting1.svg" alt="slider-1" width={100} height={100} className="w-full" />
      </div>
      
      <div className="container-2 w-2/4 ml-1">
        <Image src="/meeting2.svg" alt="slider-1" width={100} height={100} className="w-full" />
      </div>
    </div>
  );
}
