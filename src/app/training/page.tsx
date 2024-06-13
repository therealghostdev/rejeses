"use client";
import data from "@/utils/data/training_data.json";
import Card from "@/components/web_pages/training/card";
import UpcomingCohorts from "@/components/web_pages/training/upcoming_training";
import { usePathname } from "next/navigation";
import whyUsData from "@/utils/data/why_us_data.json";
import Why_us from "@/components/general/why_us";

export default function Page() {
  const pathname = usePathname();
  const filteredWhyData = whyUsData.filter(
    (item) => item.tag === pathname.slice(1)
  );
  return (
    <div>
      <UpcomingCohorts />
      <div className="px-6">
        <Why_us data={filteredWhyData} />
      </div>
    </div>
  );
}
