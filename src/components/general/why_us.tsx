"use client";
import React, { useMemo } from "react";
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
      : decodedPathname.startsWith("/mentorship");

    return dynamicTag
      ? props.data.filter((item) => item.tag === dynamicTag)
      : [];
  }, [decodedPathname, props.data]);

  const getHeadingText = () => {
    if (
      decodedPathname === "/" ||
      decodedPathname === "/training" ||
      decodedPathname === "/consulting"
    ) {
      return "Why us";
    } else if (decodedPathname.startsWith("/training/")) {
      return "Why you should join this training?";
    } else if (
      decodedPathname.startsWith("/mentorship/") ||
      decodedPathname === "/mentorship"
    ) {
      return "Who is this for?";
    } else if (decodedPathname.startsWith("/consulting")) {
      return "Who is this for?";
    }
    return "Why us";
  };

  return (
    <section className="w-full flex flex-col px-12 py-4">
      <h1 className="md:text-4xl text-2xl my-8 font-bold">
        {getHeadingText()}
      </h1>

      <div className="w-full flex flex-wrap py-2">
        {filteredData.map((item, index) => (
          <div
            key={index}
            className="lg:w-[30%] md:w-[45%] w-full border border-[#DBE1E7] mx-1 my-2 rounded-2xl shadow-sm shadow-[#0000001A]"
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
    </section>
  );
}
