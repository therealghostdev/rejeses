"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import GeneralCard from "@/components/reusables/card";
import { UniqueComponentsProps } from "@/utils/types/types";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigation } from "@/utils/context/payment";
import { useSwipeable } from "react-swipeable";
import MobileIndicator from "@/components/general/footer/indicator";

const TRANSITION_DURATION = 0.5;

export default function Mobile_why_us(props: UniqueComponentsProps) {
  const pathname = usePathname();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { isMobile, updateWidth, width } = useNavigation();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === filteredData.length - 1 ? 0 : prevIndex + 1
    );
  }, [filteredData.length]);

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
      prevIndex === 0 ? filteredData.length - 1 : prevIndex - 1
    );
  }, [filteredData.length]);

  const getCardIndex = (shift: number) => {
    return (currentIndex + shift + filteredData.length) % filteredData.length;
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

  // Check if viewport is mobile
  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, [updateWidth]);

  return (
    <section className="w-full flex flex-col lg:px-12 md:px-6 py-4 md:mt-16 my-8">
      <h1 className="md:text-4xl text-2xl my-8 font-bold font-bricolage_grotesque">
        {getHeadingText()}
      </h1>

      <div
        className="w-full flex md:flex-row flex-col justify-center items-center relative overflow-hidden py-8"
        {...handlers}
      >
        <div className="relative w-full max-w-md h-[350px]">
          {/* animation container */}
          <AnimatePresence initial={false} custom={direction}>
            {[-1, 0, 1].map((offset) => {
              const cardIndex = getCardIndex(offset);
              return (
                <motion.div
                  key={filteredData[cardIndex].id}
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
                  }}
                >
                  <div
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={`w-full border border-[#DBE1E7] rounded-2xl ${
                      offset !== 0 ? "opacity-50" : ""
                    }`}
                  >
                    <GeneralCard {...filteredData[cardIndex]} />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {isMobile && (
            <MobileIndicator
              totalItems={filteredData.length}
              currentIndex={currentIndex}
              onIndicatorClick={handleIndicatorClick}
            />
          )}
        </div>
      </div>
    </section>
  );
}
