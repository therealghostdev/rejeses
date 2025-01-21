"use client";
import React, { useEffect, useState } from "react";
import data from "@/utils/data/training_data.json";
import Card from "./card";
import { getNextMondayDates } from "@/utils/reusables/functions";

export default function UpcomingCohorts() {
  const mondayDates = getNextMondayDates(15);
  const itemsReplica = data[0];

  const displayItems = new Array(15).fill(itemsReplica);

  const [visibleItems, setVisibleItems] = useState(6);

  const handleSeeMore = () => {
    if (visibleItems < displayItems.length) {
      setVisibleItems(visibleItems + 3);
    } else {
      setVisibleItems(6);
    }
  };

  useEffect(() => {
    console.log(displayItems);
  }, []);

  return (
    <section
      className="w-full flex flex-col lg:px-12 px-6 py-4 md:mt-16 my-8"
      id="upcoming-training"
    >
      <h1 className="md:text-4xl text-2xl my-8 font-bold font-bricolage_grotesque lg:px-6 md:px-6">
        Upcoming Trainings
      </h1>

      <div className="w-full flex flex-wrap py-2">
        {displayItems.slice(0, visibleItems).map((item, index) => (
          <div
            className="lg:w-[30%] md:w-[45%] w-full border border-[#DBE1E7] md:mx-4 md:my-4 mx-2 my-2 rounded-2xl shadow-sm shadow-[#0000001A] cursor-pointer hover:border-[#89C13E] transition-all duration-300"
            style={{ transform: "translateZ(0)" }}
            key={index}
          >
            <Card
              id={index}
              description={""}
              date={mondayDates[index].toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              title={item.title}
              id2={item.id}
              price={item.pricing}
            />
          </div>
        ))}
      </div>

      {data.length > 3 && (
        <button
          onClick={handleSeeMore}
          className="mx-auto mt-6 px-6 py-2 bg-[#89C13E] text-white rounded-lg hover:bg-[#7BAF37] transition-colors duration-300"
        >
          {visibleItems >= displayItems.length ? "See Less" : "See More"}
        </button>
      )}
    </section>
  );
}
