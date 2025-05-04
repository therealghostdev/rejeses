// app/[slug]/page.tsx
import data from "@/utils/data/training_data.json";
import ClassScheduleWrapper from "@/components/web_pages/training/classScheduleWrapper";
import type { TrainingOption1 } from "@/utils/types/types";

export default function Page({ params }: { params: { slug: string } }) {
  const scheduleItem = data.find(
    (item) => item.id.toString() === params.slug.toString()
  ) as TrainingOption1 | undefined;

  console.log(scheduleItem);
  
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
      <ClassScheduleWrapper params={{ slug: params.slug }} />
    </div>
  );
}
