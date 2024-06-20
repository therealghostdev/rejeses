import React from "react";
import data from "@/utils/data/training_data.json";
import Card from "./card";

export default function UpcomingCohorts() {
  return (
    <section className="w-full flex flex-col lg:px-12 px-6 py-4">
      <h1 className="md:text-4xl text-2xl my-8 font-bold bricolage_text">
        Upcoming Trainings
      </h1>

      <div className="w-full flex flex-wrap py-2">
        {data.map((item, index) => (
          <div
            className="lg:w-[30%] md:w-[45%] w-full border border-[#DBE1E7] mx-1 my-2 rounded-2xl shadow-sm shadow-[#0000001A]"
            key={index}
          >
            <Card
              id={index}
              description={item.description}
              date={item.start_date}
              title={item.title}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
