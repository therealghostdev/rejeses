"use client";
import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { motion, AnimatePresence } from "framer-motion";

export default function Scroll_to_top() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const showAt = document.documentElement.scrollHeight * 0.10;
    setIsVisible(scrollTop > showAt);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="w-16 h-16 z-30 cursor-pointer border border-[#89C13E] bg-white rounded-full flex justify-center items-center fixed bottom-10 right-10"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ animation: 'breathing 2s infinite' }}
        >
          <span className="w-full inline-flex h-full font-bold items-center justify-center">
            <ArrowUpIcon color="#89C13E" width="100%" height="50%" />
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
