import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import "./mobile-slider.css";
import data from "@/utils/data/slider_data.json";
import Image from "next/image";

export default function Mobile_Image_slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const totalSlides = data.length;
  const slidesToShow = 1; // Number of slides to show at once

  // Auto-slide function
  const autoSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [totalSlides]);

  // Set up interval for auto-slide
  useEffect(() => {
    const interval = setInterval(autoSlide, 3000);
    return () => clearInterval(interval);
  }, [autoSlide]);

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    },
    onSwipedRight: () => {
      setDirection(-1);
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides
      );
    },
  });

  // Get slider items
  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < slidesToShow + 1; i++) {
      const index = (currentIndex + i) % totalSlides;
      items.push({ ...data[index], key: `${index}-${i}` });
    }
    return items;
  };

  const [loadingStates, setLoadingStates] = useState<boolean[]>(() =>
    Array(slidesToShow + 1).fill(true)
  );

  const handleImageLoad = (index: number) => {
    setLoadingStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = false;
      return newStates;
    });
  };

  return (
    <section className="container-item" {...handlers}>
      <motion.div
        className="wrapper"
        initial={false}
        animate={{
          x: `-${(100 / slidesToShow) * (currentIndex % slidesToShow)}%`,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        key={currentIndex}
      >
        {getVisibleItems().map((item, index) => (
          <motion.div
            key={item.key}
            className="item relative w-full h-full"
            initial={{
              x: direction === 1 ? "100%" : "-100%",
            }}
            animate={{ x: 0 }}
            exit={{ x: direction === 1 ? "-100%" : "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className={`w-full h-full relative`}>
              <Image
                src={item.image}
                alt={`slider-image-${index}`}
                width={100}
                height={100}
                className={`w-full h-full ${
                  loadingStates[index] ? "blur-2xl" : "blur-none"
                } transition duration-1000 ease-in-out`}
                onLoad={() => handleImageLoad(index)}
                priority
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
