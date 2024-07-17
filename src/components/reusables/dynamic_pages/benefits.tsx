"use client";
import React, { useMemo, useState } from "react";
import GeneralCard from "@/components/reusables/card";
import { UniqueComponentsProps } from "@/utils/types/types";
import { usePathname } from "next/navigation";

export default function Benefits(props: UniqueComponentsProps) {
  const pathname = usePathname();

  const decodedPathname = useMemo(
    () => decodeURIComponent(pathname),
    [pathname]
  );

  const filteredData = useMemo(() => {
    if (
      decodedPathname === "/" ||
      decodedPathname === "/training" ||
      decodedPathname === "/mentorship"
    ) {
      return props.data;
    }

    const dynamicTag = decodedPathname.startsWith("/training/")
      ? "training"
      : decodedPathname.startsWith("/mentorship/")
      ? "mentorship"
      : decodedPathname.startsWith("/consultation") ||
        decodedPathname === "/consultation"
      ? "consultation"
      : "";

    return dynamicTag
      ? props.data.filter((item) => item.tag === dynamicTag)
      : [];
  }, [decodedPathname, props.data]);

  const [visibleItems, setVisibleItems] = useState(3);

  const handleSeeMore = () => {
    if (visibleItems < filteredData.length) {
      setVisibleItems(visibleItems + 3);
    } else {
      setVisibleItems(3);
    }
  };

  return (
    <section className="w-full flex flex-col lg:px-12 py-4">
      <h1 className="md:text-4xl text-2xl my-8 font-bold bricolage_text lg:px-0 md:px-6">
        Benefits
      </h1>

      <div className="w-full flex flex-wrap py-2">
        {filteredData.slice(0, visibleItems).map((item, index) => (
          <div
            key={index}
            className="lg:w-[30%] md:w-[45%] w-full border border-[#DBE1E7] md:mx-4 md:my-2 mx-2 my-2 rounded-2xl shadow-sm shadow-[#0000001A]"
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

      {filteredData.length > 4 && (
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
