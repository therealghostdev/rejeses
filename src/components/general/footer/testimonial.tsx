import React from "react";
import GeneralCard from "@/components/reusables/card";
import data from "@/utils/data/testimonial_data.json";
import { UniqueComponentsProps } from "@/utils/types/types";

export default function Testimonial(props: UniqueComponentsProps) {
  return (
    <section className="w-full flex flex-col lg:px-12 px-6 py-4">
      <div className="my-8 flex flex-col gap-2">
        <h1 className="md:text-4xl text-2xl font-bold bricolage_text">
          Don&apos;t just take our word for it...
        </h1>
        <p className="text-lg">
          Some nice words from nice people that have tried us
        </p>
      </div>

      <div className="w-full flex flex-wrap py-2">
        {props.data.map((item, index) => (
          <div
            key={index}
            className="lg:w-[30%] md:w-[45%] w-full border border-[#DBE1E7] mx-1 my-2 rounded-2xl"
          >
            <GeneralCard
              person={item.person}
              id={item.id}
              comment={item.comment}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
