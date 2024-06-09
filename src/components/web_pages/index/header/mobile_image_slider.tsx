import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import data from "@/utils/data/slider_data.json";
import Image from "next/image";
import "./mobile-slider.css";

const Mobile_Image_slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
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
    // setIsDragging(true);
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
          initial={{ x: swipeDirection === "left" ? "100vw" : "-100vw" }}
          animate={{ x: 0 }}
          exit={{ x: swipeDirection === "left" ? "-100vw" : "100vw" }}
          transition={{ duration: 0.8, type: "tween" }}
          className={`container-1 w-2/4 mr-1 ${
            swipeDirection === "left" ? "animating-left" : ""
          }`}
        >
          <Image
            src={data[currentIndex].image}
            alt={`slider-${currentIndex + 1}`}
            width={100}
            height={100}
            className="w-full"
          />
        </motion.div>
        <motion.div
          key={(currentIndex + 1) % data.length}
          initial={{ x: swipeDirection === "left" ? "100vw" : "-100vw" }}
          animate={{ x: 0 }}
          exit={{ x: swipeDirection === "left" ? "100vw" : "-100vw" }}
          transition={{ duration: 0.8, type: "tween" }}
          className={`container-2 w-2/4 ml-1 ${
            swipeDirection === "right" ? "animating-right" : ""
          }`}
        >
          <Image
            src={data[(currentIndex + 1) % data.length].image}
            alt={`slider-${(currentIndex + 2) % data.length}`}
            width={100}
            height={100}
            className="w-full"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Mobile_Image_slider;
