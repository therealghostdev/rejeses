import React from "react";
import data from "@/utils/data/why_us_data.json";
import GeneralCard from "@/components/reusables/card";

export default function Why_us() {
  return (
    <section className="w-full flex flex-col px-12 py-4">
      <h1 className="md:text-4xl text-2xl my-8 font-bold">Why us?</h1>

      <div className="w-full flex flex-wrap py-2">
        {data.map((item, index) => (
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
