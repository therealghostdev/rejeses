"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MobileIndicatorProps } from "@/utils/types/types";

const MobileIndicator: React.FC<MobileIndicatorProps> = ({
  totalItems,
  currentIndex,
  onIndicatorClick,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const itemWidth = 16; // Width of each indicator dot
  const gap = 8; // Gap between indicators
  const visibleItems = 6;
  const containerWidth = (itemWidth + gap) * visibleItems - gap;

  useEffect(() => {
    const element = indicatorRef.current;
    if (!element) return;

    const currentItemPosition = (itemWidth + gap) * currentIndex;
    const viewportWidth = element.offsetWidth;

    if (currentItemPosition < scrollPosition) {
      element.scrollTo({
        left: currentItemPosition,
        behavior: "smooth",
      });
    } else if (
      currentItemPosition + itemWidth >
      scrollPosition + viewportWidth
    ) {
      element.scrollTo({
        left: currentItemPosition - viewportWidth + itemWidth + gap,
        behavior: "smooth",
      });
    }
  }, [currentIndex, scrollPosition, itemWidth, gap]);

  return (
    <div className="w-full flex justify-center mt-4 absolute -bottom-8 my-auto">
      <div
        ref={indicatorRef}
        className="overflow-x-scroll scrollbar-hide relative"
        style={{
          width: containerWidth,
          scrollbarWidth: "none",
        }}
        onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
      >
        <div
          className="flex gap-2"
          style={{
            width: `${(itemWidth + gap) * totalItems - gap}px`,
          }}
        >
          <AnimatePresence initial={false}>
            {Array.from({ length: totalItems }).map((_, index) => (
              <motion.div
                key={index}
                className={`cursor-pointer rounded-full transition-colors ${
                  currentIndex === index ? "bg-[#535353]" : "bg-[#DBE1E7]"
                }`}
                style={{
                  width: itemWidth,
                  height: itemWidth,
                  flexShrink: 0,
                }}
                onClick={() => onIndicatorClick(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MobileIndicator;
