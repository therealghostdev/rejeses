import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import data from "@/utils/data/slider_data.json";
import Image from "next/image";
import "./slider-style.css";

export default function Image_slider() {
  const [currentIndex, setCurrentIndex] = useState(0);;
  const [startPosition, setStartPosition] = useState(0);
  const [endPosition, setEndPosition] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to start the auto-slide
  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSwipeDirection("left");
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 5000);
  };

  // Initial auto-slide setup
  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Handle animation end
  const handleAnimationEnd = () => {
    setSwipeDirection(null);
  };

  // Handle touch start event
  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    setStartPosition(e.touches[0].clientX);
    if (intervalRef.current) clearInterval(intervalRef.current); // Stop auto-slide while dragging
  };

  // Handle touch move event
  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    setEndPosition(e.touches[0].clientX);
  };

  // Handle touch end event
  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    const delta = startPosition - endPosition;
    if (delta > 50) {
      setSwipeDirection("left");
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    } else if (delta < -50) {
      setSwipeDirection("right");
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + data.length) % data.length
      );
    }
    setStartPosition(0);
    setEndPosition(0);
    startAutoSlide(); // Restart auto-slide after swipe
  };

  return (
    <div
      className="w-full flex justify-center items-center slide-container my-8"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence initial={false} onExitComplete={handleAnimationEnd}>
        <motion.div
          key={currentIndex}
          initial={{ x: swipeDirection === "left" ? "100vw" : "0vw" }}
          animate={{ x: 0 }}
          exit={{ x: swipeDirection === "left" ? "-100vw" : "0vw" }}
          transition={{ duration: 0.8, type: "tween" }}
          className={`container1 w-1/4 mr-1 ${
            swipeDirection === "left" ? "animating-left" : ""
          }`}
        >
          <Image
            src={data[currentIndex].image}
            alt={`slider-${currentIndex + 1}`}
            width={100}
            height={100}
            placeholder="blur"
            blurDataURL={data[currentIndex].image}
            className="w-full"
            priority
          />
        </motion.div>
        <motion.div
          key={(currentIndex + 1) % data.length}
          initial={{ x: swipeDirection === "left" ? "100vw" : "0vw" }}
          animate={{ x: 0 }}
          exit={{ x: swipeDirection === "left" ? "100vw" : "0vw" }}
          transition={{ duration: 0.8, type: "tween" }}
          className={`container2 w-1/4 ${
            swipeDirection === "right" ? "animating-right" : ""
          }`}
        >
          <Image
            src={data[(currentIndex + 1) % data.length].image}
            alt={`slider-${(currentIndex + 2) % data.length}`}
            width={100}
            height={50}
            placeholder="blur"
            blurDataURL={data[(currentIndex + 1) % data.length].image}
            className="w-full lg:h-[280px] h-[220px]"
            id="img2"
            priority
          />
        </motion.div>
        <motion.div
          key={(currentIndex + 2) % data.length}
          initial={{ x: swipeDirection === "left" ? "100vw" : "0vw" }}
          animate={{ x: 0 }}
          exit={{ x: swipeDirection === "left" ? "100vw" : "0vw" }}
          transition={{ duration: 0.8, type: "tween" }}
          className="container3 w-1/4"
        >
          <Image
            src={data[(currentIndex + 2) % data.length].image}
            alt={`slider-${(currentIndex + 3) % data.length}`}
            width={100}
            height={50}
            className="w-full lg:h-[280px] h-[220px]"
            placeholder="blur"
            blurDataURL={data[(currentIndex + 2) % data.length].image}
            id="img3"
            priority
          />
        </motion.div>
        <motion.div
          key={(currentIndex + 3) % data.length}
          initial={{ x: swipeDirection === "left" ? "100vw" : "0vw" }}
          animate={{ x: 0 }}
          exit={{ x: swipeDirection === "left" ? "100vw" : "0vw" }}
          transition={{ duration: 0.8, type: "tween" }}
          className="container4 w-1/4"
        >
          <Image
            src={data[(currentIndex + 3) % data.length].image}
            alt={`slider-${(currentIndex + 4) % data.length}`}
            width={100}
            height={100}
            placeholder="blur"
            blurDataURL={data[(currentIndex + 3) % data.length].image}
            className="w-full"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
