import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Tagline() {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0); // Keep track of current index
  const text = "Your Partner in Project Excellence";
  const typeSpeed = 100;
  const deleteSpeed = 50;
  const delayAfterComplete = 1000;

  useEffect(() => {
    const type = () => {
      if (!isDeleting) {
        if (typingIndex < text.length) {
          setDisplayText((prev) => prev + text[typingIndex]);
          setTypingIndex((prev) => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), delayAfterComplete);
        }
      } else {
        if (typingIndex > 0) {
          setDisplayText((prev) => prev.slice(0, -1));
          setTypingIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
        }
      }
    };

    const timeout = setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [typingIndex, isDeleting]);

  return (
    <div className="text-[#DF8244] bg-[#FEF9F6] border border-[#F8E2D3] mt-8 -mb-6 font-semibold rounded-lg flex items-center text-ellipsis text-nowrap px-4 py-2">
      <div className="w-full h-10 flex justify-between items-center gap-x-4">
        <div className="flex justify-center items-center">
          <Image
            src={"/thumbs_up.svg"}
            width={50}
            height={50}
            alt="thumbs-up"
            className="h-9"
          />
        </div>

        <div className="flex-1 overflow-hidden min-w-64">
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              fontSize: "16px",
              whiteSpace: "nowrap",
            }}
          >
            {displayText}
            <span className="animate-pulse text-[#DF8244]">|</span>
          </div>
        </div>
      </div>
    </div>
  );
}
