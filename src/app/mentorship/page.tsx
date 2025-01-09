"use client";
import Link from "next/link";
import Image from "next/image";
import Why_us from "@/components/reusables/why_us/why_us";
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
    <section className="w-full flex flex-col justify-center items-center">
      <section className="w-full px-8 flex flex-col gap-6 py-12 md:max-w-[98%]">
        <div className="flex flex-col w-full gap-4 lg:px-12 md:px-6 md:mt-10">
          <h1 className="md:text-5xl text-3xl font-bold font-bricolage_grotesque">
            Personalized Mentoring
          </h1>
          <p className="text-wrap lg:max-w-[80%] lg:text-[24px] text-[16px]">
            Our personalized mentoring program is thoughtfully designed to
            accelerate growth, overcome challenges, and achieve goals for
            individuals at any stage or in any field. It offers rich and
            substantial support.
          </p>
        </div>

        <div className="lg:px-12 md:px-3 lg:max-h-[900px] h-[50vw] lg:w-[100%] my-4 md:mb-12 mb-6 object-cover">
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
              className={`w-full h-full object-contain rounded-2xl ${
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
        <div className="my-12">
          {filteredPricing && <Pricing item={filteredPricing.pricing} />}
        </div>
      </section>
    </section>
  );
}
