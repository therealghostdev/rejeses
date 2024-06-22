"use client";
import Link from "next/link";
import Image from "next/image";
import Why_us from "@/components/general/why_us";
import Benefits from "@/components/reusables/dynamic_pages/benefits";
import Pricing from "@/components/reusables/pricing/pricing";
import { usePathname } from "next/navigation";

import whyUsData from "@/utils/data/why_us_data.json";
import benefit_data from "@/utils/data/benefits_data.json";
import priceData from "@/utils/data/price_data.json";
import { useState } from "react";
import SkeletalLoader from "@/components/reusables/animation/skeletol_loader";

export default function Page() {
  const pathname = usePathname();
  const currentTag = pathname.slice(1);

  const filteredWhyData = whyUsData.filter((item) => item.tag === currentTag);
  const filteredBenefits = benefit_data.filter(
    (item) => item.tag === currentTag
  );

  const filteredPricing = priceData.find((item) => item.tag === currentTag);

  const [imageLoading, setImageLoading] = useState<boolean>(true);

  return (
    <section className="w-full px-8 flex flex-col gap-6 py-12">
      <div className="flex flex-col md:max-w-[90%] w-full gap-4 lg:px-12 md:px-6">
        <h1 className="md:text-4xl text-2xl font-bold bricolage_text">
          Personalised Mentorship
        </h1>
        <p className="text-lg text-wrap">
          Our personalised mentorship program is thoughtfully designed to
          accelerate growth, overcome challenges, and achieve goals for
          individuals at any stage or in any field. It offers rich and
          substantial support.
        </p>
      </div>

      <div className="flex gap-x-4 lg:px-12 md:px-6">
        <Link
          href={`/mentorship/pricing`}
          className="bg-[#89C13E] text-white px-6 py-4 rounded-md bricolage_text"
        >
          View Pricing
        </Link>
      </div>

      <div className="lg:px-12 md:px-3 lg:h-[800px] h-[50vw] lg:w-[90vw] my-4">
        <div
          className={`filter w-full h-full ${
            imageLoading ? "blur-2xl" : "blur-none"
          } transition duration-1000 ease-in-out`}
        >
           {imageLoading && (
            <SkeletalLoader
              blockWidth="w-[80%]"
              cardColor="bg-[#FEF9F6]"
              cardContentColor="bg-[#FEF9F6]"
              cardImageColor="bg-[#F5F0FA]"
            />
          )}
          <Image
            src={`/mentorship_hero.svg`}
            alt="image"
            layout="fill"
            objectFit="cover"
            className={`w-full h-full ${
              imageLoading ? "blur-2xl" : "blur-none"
            }`}
            placeholder="blur"
            blurDataURL="/mentorship_hero.svg"
            onLoad={() => setImageLoading(false)}
            priority
          />
        </div>
      </div>

      <Benefits data={filteredBenefits} />
      <Why_us data={filteredWhyData} />
      {filteredPricing && <Pricing item={filteredPricing.pricing} />}
    </section>
  );
}
