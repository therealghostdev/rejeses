"use client"

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import GeneralCard from "@/components/reusables/card"
import MobileIndicator from "@/components/general/footer/indicator"
import { useNavigation } from "@/utils/context/payment"
import type { UniqueComponentsProps } from "@/utils/types/types"
import { usePathname } from "next/navigation"
import { useSwipeable } from "react-swipeable"

const TRANSITION_DURATION = 0.3

const Mobile_benefits = (props: UniqueComponentsProps) => {
  const pathname = usePathname()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [direction, setDirection] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const { isMobile, updateWidth } = useNavigation()

  const decodedPathname = useMemo(() => decodeURIComponent(pathname), [pathname])

  const filteredData = useMemo(() => {
    if (decodedPathname === "/" || decodedPathname === "/training" || decodedPathname === "/mentorship") {
      return props.data
    }

    const dynamicTag = decodedPathname.startsWith("/training/")
      ? "training"
      : decodedPathname.startsWith("/mentorship/")
        ? "mentorship"
        : decodedPathname.startsWith("/consultation") || decodedPathname === "/consultation"
          ? "consultation"
          : ""

    return dynamicTag ? props.data.filter((item) => item.tag === dynamicTag) : []
  }, [decodedPathname, props.data])

  const handleNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex === filteredData.length - 1 ? 0 : prevIndex + 1))
  }, [filteredData.length])

  const handlePrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? filteredData.length - 1 : prevIndex - 1))
  }, [filteredData.length])

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (!isPaused) handleNext()
    }, 5000)
  }, [isPaused, handleNext])

  useEffect(() => {
    startInterval()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [currentIndex, isPaused, startInterval])

  const getCardIndex = (shift: number) => {
    return (currentIndex + shift + filteredData.length) % filteredData.length
  }

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  })

  const handleIndicatorClick = useCallback(
    (index: number) => {
      const newDirection = index > currentIndex ? 1 : -1
      setDirection(newDirection)
      setCurrentIndex(index)
    },
    [currentIndex],
  )

  useEffect(() => {
    updateWidth()
    window.addEventListener("resize", updateWidth)

    return () => window.removeEventListener("resize", updateWidth)
  }, [updateWidth])

  return (
    <section className="w-full flex flex-col py-8 md:py-12">
      <h1 className="text-2xl md:text-4xl font-bold bricolage_text lg:px-0 md:px-6 mb-12 md:mb-8">
        Benefits
      </h1>

      <div className="w-full flex justify-center items-center px-4 md:px-0" {...handlers}>
        <div className="relative w-full max-w-sm md:max-w-md h-[350px]">
          <AnimatePresence initial={false} custom={direction}>
            {[-1, 0, 1].map((offset) => {
              const cardIndex = getCardIndex(offset)
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
                  className="absolute w-full"
                >
                  <div
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={`w-full border border-[#DBE1E7] rounded-2xl ${offset !== 0 ? "opacity-50" : ""}`}
                  >
                    <GeneralCard {...filteredData[cardIndex]} />
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      {isMobile && (
        <div className="mt-4 relative">
          <MobileIndicator
            totalItems={filteredData.length}
            currentIndex={currentIndex}
            onIndicatorClick={handleIndicatorClick}
          />
        </div>
      )}
    </section>
  )
}

export default Mobile_benefits

