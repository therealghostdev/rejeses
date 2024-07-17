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
import Button from "@/components/reusables/button";

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
        <div className="flex flex-col md:max-w-[90%] w-full gap-4 lg:px-12 md:px-6 md:mt-10">
          <h1 className="md:text-4xl text-2xl font-bold font-bricolage_grotesque">
            Consultation
          </h1>
          <p className="text-lg lg:max-w-[80%]">
            Our customized consultation services are thoughtfully designed to
            propel growth, address challenges, and achieve goals for companies
            of any size or industry.
          </p>
        </div>

        <div className="lg:px-12 md:px-3 lg:h-[620px] h-[50vw] lg:w-[100%] my-4 md:mb-12 mb-6">
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
              src={`/consultation_hero.svg`}
              alt="image"
              layout="fill"
              objectFit="cover"
              className={`w-full h-full object-contain object-top rounded-2xl ${
                imageLoading ? "blur-2xl" : "blur-none"
              }`}
              placeholder="blur"
              blurDataURL="/consultation_hero.svg"
              onLoad={() => setImageLoading(false)}
              priority
            />
          </div>
        </div>

        <Benefits data={filteredBenefits} />
        <Why_us data={filteredWhyData} />
        <div className="my-12">
          <div className="flex flex-col gap-6">
            <h1 className="lg:text-4xl text-2xl font-bold text-center font-bricolage_grotesque">
              Pricing
            </h1>
            <p className="text-lg text-center">
              Due to the uniqueness and complexity of each project we suggest
              you book a session with us to discuss more of your needs.
            </p>

            <div className="flex justify-center items-center w-full">
              <Button url="" text="Book session" bg="#89C13E" transition_class="transition_button4" />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
