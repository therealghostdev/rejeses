"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import GeneralCard from "@/components/reusables/card";
import { UniqueComponentsProps } from "@/utils/types/types";
import { usePathname } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
import { useNavigation } from "@/utils/context/payment";
import Mobile_why_us from "./mobile_whyUs";

export default function Why_us(props: UniqueComponentsProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const { isMobile, updateWidth, width } = useNavigation();
  const controls = useAnimation();

  const decodedPathname = useMemo(
    () => decodeURIComponent(pathname),
    [pathname]
  );

  const filteredData = useMemo(() => {
    const data = props.data.filter(
      (item) => !(decodedPathname === "/" && item.id >= 7 && item.id <= 18)
    );

    if (
      decodedPathname === "/" ||
      decodedPathname === "/training" ||
      decodedPathname === "/mentorship" ||
      decodedPathname === "/consultation"
    ) {
      return data;
    }

    const dynamicTag = decodedPathname.startsWith("/training/")
      ? "training"
      : decodedPathname.startsWith("/mentorship/")
      ? "mentorship"
      : decodedPathname.startsWith("/consultation")
      ? "consultation"
      : "";

    return dynamicTag ? data.filter((item) => item.tag === dynamicTag) : [];
  }, [decodedPathname, props.data]);

  const getHeadingText = () => {
    if (decodedPathname === "/") {
      return "Why Us?";
    } else if (
      decodedPathname.startsWith("/training/") ||
      decodedPathname === "/training"
    ) {
      return "Why you should join this training";
    } else if (
      decodedPathname.startsWith("/mentorship/") ||
      decodedPathname === "/mentorship"
    ) {
      return "Who is this for?";
    } else if (
      decodedPathname.startsWith("/consultation") ||
      decodedPathname === "/consultation"
    ) {
      return "Who is this for?";
    }
    return "Why Us?";
  };

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, [updateWidth]);

  const startAnimation = () => {
    controls.start({
      x: [0, "-100%"],
      transition: {
        duration: 50,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  const handleNext = () => {
    if (containerRef.current) {
      const scrollAmount = Math.min(
        300,
        containerRef.current.offsetWidth * 0.8
      );
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (containerRef.current) {
      const scrollAmount = Math.min(
        300,
        containerRef.current.offsetWidth * 0.8
      );
      containerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    startAnimation();
  }, []);

  // Conditionally render Mobile_why_us if isMobile and width <= 767
  if (isMobile && width <= 767) {
    return <Mobile_why_us data={filteredData} />;
  }

  return (
    <section className="w-full flex flex-col lg:px-12 md:px-6 py-4 md:mt-16 my-8">
      <h1 className="md:text-4xl text-2xl my-8 font-bold font-bricolage_grotesque">
        {getHeadingText()}
      </h1>

      <div className="w-full overflow-hidden relative" ref={containerRef}>
        <motion.div className="flex gap-4" animate={controls}>
          {filteredData.concat(filteredData).map((item, index) => (
            <div
              key={index}
              className="lg:w-[30%] md:w-[45%] w-full border border-[#DBE1E7] rounded-2xl flex-shrink-0"
            >
              <GeneralCard
                pin={item.pin}
                title={item.title}
                id={item.id}
                comment={item.comment}
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="hidden md:flex justify-center mt-8 gap-6">
        <button
          onClick={handlePrev}
          className="fancy-button fancy-button-prev"
          aria-label="Previous"
        >
          <span className="button-content">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                clipRule="evenodd"
              />
            </svg>
            Prev
          </span>
        </button>
        <button
          onClick={handleNext}
          className="fancy-button fancy-button-next"
          aria-label="Next"
        >
          <span className="button-content">
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
}
