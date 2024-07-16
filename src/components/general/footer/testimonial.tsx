import React from "react";
import GeneralCard from "@/components/reusables/card";
import { UniqueComponentsProps } from "@/utils/types/types";

export default function Testimonial(props: UniqueComponentsProps) {
  return (
    <section className="w-full flex flex-col lg:px-12 px-6 py-4">
      <div className="my-8 flex flex-col gap-2 lg:px-6 md:px-6">
        <h1 className="md:text-4xl text-2xl font-bold font-bricolage_grotesque">
          Don&apos;t just take our word for it . . .
        </h1>
        <p className="text-lg">
          Some nice words from people who have been trained by us
        </p>
      </div>

      <div className="w-full flex flex-wrap py-2">
        {props.data.map((item, index) => (
          <div
            key={index}
            className="lg:w-[30%] md:w-[45%] w-full border border-[#DBE1E7] md:mx-4 md:my-4 mx-2 my-2 rounded-2xl"
          >
            <GeneralCard
              person={item.person}
              id={item.id}
              comment={item.comment}
              pin={item.pin}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
