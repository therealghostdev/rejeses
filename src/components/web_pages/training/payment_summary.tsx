// src/app/training/[slug]/[slug1]/ClientPage.tsx
"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { ArchiveIcon } from "@radix-ui/react-icons";
import Pricing from "@/components/reusables/pricing/pricing";
import Dynamic_nav from "@/components/reusables/navigation/dynamic_nav";
import { usePayment } from "@/utils/context/payment";
import { TrainingOption1 } from "@/utils/types/types";

interface ClientPageProps {
  pricingItem: TrainingOption1;
}

export default function TrainingPayment({ pricingItem }: ClientPageProps) {
  const { paymentInfo, setPaymentInfo } = usePayment();

  const enrollBtnClick = () => {
    if (paymentInfo.price && paymentInfo.price === 0) {
      setPaymentInfo((prev) => ({ ...prev, price: pricingItem.payment.total }));
    }
  };

  return (
    <section className="w-full px-8 flex flex-col gap-12 py-12 justify-center items-center">
      <div className="md:max-w-[98%] w-full py-12 gap-6 md:px-8 flex flex-col gap-y-6 justify-center">
        <Dynamic_nav
          link1={`/training/${pricingItem.id}`}
          link2="/training"
          link_text1="Upcoming Cohorts"
          link_text2="Project Management for Beginners"
        />
        <section className="w-full border-2 border-[#DBE1E7] gap-4 py-8 px-6 rounded-lg flex flex-col m-auto">
          <div className="flex flex-col gap-4 border-b-2 border-b-[#DBE1E7] py-6">
            <h1 className="lg:text-3xl text-2xl font-bold font-bricolage_grotesque">
              Order Summary
            </h1>
            <p>{pricingItem.payment.order_summary}</p>
            <div className="w-full flex flex-col gap-4">
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

            <div className="flex justify-between w-full font-bricolage_grotesque">
              <span className="text-2xl font-bold">Total:</span>
              <span className="text-2xl font-bold text-[#89C13E]">
                &#x24;{paymentInfo.price || pricingItem.payment.total}
              </span>
            </div>
          </div>

          <div className="flex md:gap-x-4 gap-x-2 md:px-6 justify-center items-center py-4 w-full sm_btn-container">
            <Link
              onClick={enrollBtnClick}
              href={``}
              className="bg-[#89C13E] text-white font-bricolage_grotesque md:px-6 px-2 py-4 rounded-md text-nowrap text-ellipsis btn"
            >
              Enroll Now
            </Link>

            <Link
              href={`/training/${pricingItem.id}/class_schedule`}
              className="bg-[#FFFFFF] border border-[#DBE1E7] text-[#89C13E] font-bricolage_grotesque md:px-8 px-2 py-4 flex gap-x-4 btn text-nowrap text-ellipsis items-center justify-center rounded-md"
            >
              <span>
                <ArchiveIcon />
              </span>
              View Class Schedule
            </Link>
          </div>
        </section>

        <section className="w-full flex flex-col gap-4 lg:mt-24 mt-12">
          <h1 className="lg:text-3xl text-2xl font-bold font-bricolage_grotesque">
            Curriculum
          </h1>
          {pricingItem.payment.curriculum.map((item, index) => (
            <div
              key={index}
              className="w-full border border-[#DBE1E7] p-4 rounded-md font-bricolage_grotesque text-[#5B5B5B]"
            >
              <h1 className="lg:text3xl text-2xl font-bold text-[#090909]">
                {item.week}
              </h1>
              <p className="text-lg">{item.topic}</p>
              <small>{item.duration}</small>
            </div>
          ))}

          <div className="flex md:gap-x-4 gap-x-2 w-full sm_btn-container">
            <Link
            onClick={enrollBtnClick}
              href={``}
              className="bg-[#89C13E] text-white font-bricolage_grotesque md:px-6 px-2 py-4 rounded-md text-nowrap text-ellipsis btn"
            >
              Enroll Now
            </Link>

            <Link
              href={`/training/${pricingItem.id}/class_schedule`}
              className="bg-[#FFFFFF] border border-[#89C13E] text-[#89C13E] font-bricolage_grotesque md:px-8 px-2 py-4 flex gap-x-4 btn text-nowrap text-ellipsis items-center justify-center rounded-md"
            >
              <span>
                <ArchiveIcon />
              </span>
              View Class Schedule
            </Link>
          </div>
        </section>

        <div className="mt-20">
          <Pricing item={pricingItem.pricing} id={pricingItem.id} />
        </div>
      </div>
    </section>
  );
}
