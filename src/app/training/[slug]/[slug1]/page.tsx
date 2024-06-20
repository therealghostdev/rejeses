import data from "@/utils/data/training_data.json";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { ArchiveIcon } from "@radix-ui/react-icons";
import Pricing from "@/components/reusables/pricing/pricing";
import Dynamic_nav from "@/components/reusables/navigation/dynamic_nav";

export async function generateStaticParams() {
  return data.map((item) => ({
    slug1: item.id.toString(),
  }));
}

export default function Page({ params }: { params: { slug1: string } }) {
  const pricingItem = data.find(
    (item) => item.id.toString() === params.slug1.toString()
  );

  if (!pricingItem) {
    return <div>Training not found</div>;
  }

  console.log(pricingItem.pricing);

  return (
    <section className="w-full px-6 flex flex-col gap-12 py-12">
      <Dynamic_nav
        link1={`/training/Project Management for Beginners/${pricingItem.id}`}
        link2=""
        link_text1="Upcoming Cohorts"
        link_text2="Project Management for Beginners"
      />
      <section className="w-full border-2 border-[#DBE1E7] p-8 rounded-lg flex flex-col gap-4">
        <div className="flex flex-col gap-4 border-b-2 border-b-[#DBE1E7] py-6">
          <h1 className="lg:text-3xl text-2xl font-bold bricolage_text">Order Summary</h1>
          <p>{pricingItem.payment.order_summary}</p>
          <div className="w-full">
            <p className="text-[#89C13E]">Includes</p>
            <p className="flex gap-x-3 items-center">
              <span>
                <Image
                  src={pricingItem.payment.includes[0]}
                  alt="image"
                  width={20}
                  height={100}
                />
              </span>
              {pricingItem.payment.includes[1]}
            </p>
          </div>

          <div className="flex justify-between w-full bricolage_text">
            <span className="text-2xl font-bold">Total:</span>
            <span className="text-2xl font-bold text-[#89C13E]">
              &#x24;{pricingItem.payment.total}
            </span>
          </div>
        </div>

        <div className="flex md:gap-x-4 gap-x-2 md:px-6 justify-center w-full sm_btn-container">
          <Link
            href={``}
            className="bg-[#89C13E] text-white bricolage_text md:px-6 px-2 py-4 rounded-md text-nowrap text-ellipsis btn"
          >
            Enroll Now
          </Link>

          <Link
            href={`/training/Project Management for Beginners/${pricingItem.id}/class_schedule`}
            className="bg-[#DBE1E7] text-[#89C13E] bricolage_text md:px-8 px-2 py-4 flex gap-x-4 btn text-nowrap text-ellipsis items-center justify-center rounded-md"
          >
            <span>
              <ArchiveIcon />
            </span>
            View Class Schedule
          </Link>
        </div>
      </section>

      <section className="w-full flex flex-col gap-4">
        <h1 className="lg:text-3xl text-2xl font-bold bricolage_text">Curriculum</h1>
        {pricingItem.payment.curriculum.map((item, index) => (
          <div
            key={index}
            className="w-full border border-[#DBE1E7] p-4 rounded-md bricolage_text"
          >
            <h1 className="lg:text3xl text-2xl font-bold">{item.week}</h1>
            <p className="text-lg">{item.topic}</p>
            <small>{item.duration}</small>
          </div>
        ))}

        <div className="flex md:gap-x-4 gap-x-2 md:px-6 w-full sm_btn-container">
          <Link
            href={``}
            className="bg-[#89C13E] text-white bricolage_text md:px-6 px-2 py-4 rounded-md text-nowrap text-ellipsis btn"
          >
            Enroll Now
          </Link>

          <Link
            href={`/training/Project Management for Beginners/${pricingItem.id}/class_schedule`}
            className="bg-[#DBE1E7] text-[#89C13E] bricolage_text md:px-8 px-2 py-4 flex gap-x-4 btn text-nowrap text-ellipsis items-center justify-center rounded-md"
          >
            <span>
              <ArchiveIcon />
            </span>
            View Class Schedule
          </Link>
        </div>
      </section>

      <Pricing item={pricingItem.pricing} />
    </section>
  );
}
