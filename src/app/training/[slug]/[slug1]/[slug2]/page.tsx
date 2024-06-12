import React from "react";
import data from "@/utils/data/training_data.json";
import ClassSchedule from "@/components/web_pages/training/class_schedule";

export async function generateStaticParams() {
  return data.map((item) => ({
    slug1: "class_schedule"
  }));
}

export default function Page({ params }: { params: { slug1: string } }) {
  const scheduleItem = data.find(
    (item) => item.id.toString() === params.slug1.toString()
  );

  if (!scheduleItem) {
    return <div>Training not found</div>;
  }

  return (
    <div className="flex justify-center items-center py-4 px-2">
      <ClassSchedule data={scheduleItem.class_schedule} />
    </div>
  );
}
