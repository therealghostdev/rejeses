"use client";
import React, { useMemo, useState } from "react";
import GeneralCard from "@/components/reusables/card";
import { UniqueComponentsProps } from "@/utils/types/types";
import { usePathname } from "next/navigation";

export default function Why_us(props: UniqueComponentsProps) {
  const pathname = usePathname();

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
      return "Why you should join this training?";
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

  const [visibleItems, setVisibleItems] = useState(6);

  const handleSeeMore = () => {
    if (visibleItems < filteredData.length) {
      setVisibleItems(visibleItems + 3);
    } else {
      setVisibleItems(6);
    }
  };

  return (
    <section className="w-full flex flex-col lg:px-12 md:px-6 py-4 md:mt-16 my-8">
      <h1 className="md:text-4xl text-2xl my-8 font-bold font-bricolage_grotesque">
        {getHeadingText()}
      </h1>

      <div className="w-full flex flex-wrap py-2">
        {filteredData.slice(0, visibleItems).map((item, index) => (
          <div
            key={index}
            className="lg:w-[30%] md:w-[45%] w-full border border-[#DBE1E7] md:mx-4 md:my-4 mx-2 my-2 rounded-2xl"
          >
            <GeneralCard
              pin={item.pin}
              title={item.title}
              id={item.id}
              comment={item.comment}
            />
          </div>
        ))}
      </div>

      {filteredData.length > 6 && (
        <div className="flex justify-center w-full">
          <div className="bg-[#89C13E] inline-block rounded-full">
            <button
              onClick={handleSeeMore}
              className="px-4 py-2 bg-[#89C13E] text-white font-bold rounded-full transition_button4"
            >
              {visibleItems >= filteredData.length ? "See Less" : "See More"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
