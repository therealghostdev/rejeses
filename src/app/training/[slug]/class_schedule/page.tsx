import React from "react";
import data from "@/utils/data/training_data.json";
import ClassSchedule from "@/components/web_pages/training/class_schedule";

export async function generateStaticParams() {
  return data.map((item) => ({
    slug: item.id.toString(),
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const scheduleItem = data.find(
    (item) => item.id.toString() === params.slug.toString()
  );

  if (!scheduleItem) {
    return (
      <div className="flex flex-col gap-8 w-full min-h-screen justify-center items-center">
        <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold font-bricolage_grotesque">
          Training not found!
        </h2>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-4 px-2">
      <ClassSchedule data={scheduleItem.class_schedule} all={scheduleItem} />
    </div>
  );
}
