"use client";
import UpcomingCohorts from "@/components/web_pages/training/upcoming_training";
import { usePathname } from "next/navigation";
import whyUsData from "@/utils/data/why_us_data.json";
import Why_us from "@/components/general/why_us";
import ClientImage from "@/components/web_pages/training/client_image";

export default function Page() {
  const pathname = usePathname();
  const filteredWhyData = whyUsData.filter(
    (item) => item.tag === pathname.slice(1)
  );
  return (
    <div className="py-8">
      <div className="lg:px-12 md:px-3 lg:h-[680px] h-[50vw] lg:max-w-[95%] max-w-[90%] my-4 object-cover object-center m-auto">
        <ClientImage />
      </div>
      <UpcomingCohorts />
      {/* <div className="px-6">
        <Why_us data={filteredWhyData} />
      </div> */}
    </div>
  );
}
