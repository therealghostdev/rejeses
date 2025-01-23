"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import GeneralCard from "@/components/reusables/card";
import { UniqueComponentsProps } from "@/utils/types/types";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigation } from "@/utils/context/payment";
import { useSwipeable } from "react-swipeable";
import MobileIndicator from "./indicator";

const TRANSITION_DURATION = 0.5;

const TestimonialCarousel: React.FC<UniqueComponentsProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { isMobile } = useNavigation();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  }, [data.length]);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isPaused) handleNext();
    }, 5000);
  }, [isPaused, handleNext]);

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentIndex, isPaused, startInterval]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  }, [data.length]);

  const getCardIndex = (shift: number) => {
    return (currentIndex + shift + data.length) % data.length;
  };

  // swipe feature
  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const handleIndicatorClick = useCallback(
    (index: number) => {
      const newDirection = index > currentIndex ? 1 : -1;
      setDirection(newDirection);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  return (
    <section className="w-full flex flex-col lg:px-12 px-6 py-4">
      <header className="my-8 flex flex-col gap-2 lg:px-6 md:px-6">
        <h1 className="md:text-4xl text-2xl font-bold font-bricolage_grotesque">
          Don&apos;t just take our word for it . . .
        </h1>
        <p className="lg:text-[24px] text-[16px]">
          Listen to some who have tried us out . . .
        </p>
      </header>

      <div
        className="w-full flex md:flex-row flex-col justify-center items-center relative overflow-hidden py-8"
        {...handlers}
      >
        {/* Previous Button */}
        {!isMobile && (
          <motion.button
            whileHover={{
              scale: 1.08,
              transition: { duration: 0.3, type: "tween" },
            }}
            whileTap={{
              scale: 1.12,
              transition: { duration: 0.1, type: "tween" },
            }}
            onClick={handlePrev}
            aria-label="Previous"
            className="absolute left-[10%] z-10 h-[200px] w-[100px] flex items-center justify-center bg-transparent"
          >
            <div className="w-0 h-0 border-t-[100px] border-t-transparent border-r-[100px] border-r-[#535353] border-b-[100px] border-b-transparent transform -scale-x-100 rotate-180" />
          </motion.button>
        )}

        <div className="relative w-full max-w-md md:h-[410px] h-[440px]">
          {/* animation container */}
          <AnimatePresence initial={false} custom={direction}>
            {[-1, 0, 1].map((offset) => {
              const cardIndex = getCardIndex(offset);
              return (
                <motion.div
                  key={data[cardIndex].id}
                  custom={offset}
                  variants={{
                    enter: (direction: number) => ({
                      x: direction > 0 ? "100%" : "-100%",
                      opacity: 0,
                      scale: 0.8,
                    }),
                    center: { x: 0, opacity: 1, scale: 1, zIndex: 1 },
                    exit: (direction: number) => ({
                      x: direction < 0 ? "100%" : "-100%",
                      opacity: 0,
                      scale: 0.8,
                      zIndex: 0,
                    }),
                  }}
                  initial="enter"
                  animate={offset === 0 ? "center" : "enter"}
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: TRANSITION_DURATION },
                    scale: { duration: TRANSITION_DURATION },
                  }}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <div
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={`w-full h-full border border-[#DBE1E7] rounded-2xl ${
                      offset !== 0 ? "opacity-50" : ""
                    }`}
                  >
                    <GeneralCard {...data[cardIndex]} />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {isMobile && (
            <MobileIndicator
              totalItems={data.length}
              currentIndex={currentIndex}
              onIndicatorClick={handleIndicatorClick}
            />
          )}
        </div>

        {/* Next Button */}
        {!isMobile && (
          <motion.button
            whileHover={{
              scale: 1.08,
              transition: { duration: 0.3, type: "tween" },
            }}
            whileTap={{
              scale: 1.12,
              transition: { duration: 0.1, type: "tween" },
            }}
            onClick={handleNext}
            aria-label="Next"
            className="absolute right-[10%] z-10 h-[200px] w-[100px] flex items-center justify-center bg-transparent"
          >
            <div className="w-0 h-0 border-t-[100px] border-t-transparent border-r-[100px] border-r-[#535353] border-b-[100px] border-b-transparent rotate-180" />
          </motion.button>
        )}
      </div>
    </section>
  );
};

export default TestimonialCarousel;
