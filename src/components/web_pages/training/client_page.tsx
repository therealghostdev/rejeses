"use client";
import { useEffect, useRef } from "react";
import data from "@/utils/data/training_data.json";
import Link from "next/link";
import { ArchiveIcon } from "@radix-ui/react-icons";
import Why_us from "@/components/general/why_us";
import whyUsData from "@/utils/data/why_us_data.json";
import ClientImage from "@/components/web_pages/training/client_image";
import Pricing from "@/components/reusables/pricing/pricing";
import UpcomingCohorts from "@/components/web_pages/training/upcoming_training";
import { usePayment } from "@/utils/context/payment";
import Button from "@/components/reusables/button";
import Certification from "@/components/reusables/certification";

export default function Training_page() {
  const trainingItem = data[0];
  const whyUsItems = whyUsData.filter((item) => item.tag === "training");
  const pricingRef = useRef<HTMLDivElement | null>(null);
  const { setPaymentInfo } = usePayment();

  // Get the price for the individuals' training option
  const individualPrice = trainingItem.pricing.individuals
    .map((item) => Number(item.training_only?.price))
    .filter((price) => !isNaN(price))[0];

  // Update payment information
  const getPaymentData = () => {
    setPaymentInfo((prev) => ({
      ...prev,
      price: individualPrice,
      training_id: trainingItem.id,
      training_option:
        "You are subscribing to rejeses consult 4-week training plan.",
      is_group: false,
    }));
  };

  useEffect(() => {
    if (window.location.hash === "#pricing" && pricingRef.current) {
      pricingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  if (!trainingItem) {
    return (
      <div className="flex flex-col gap-8 w-full min-h-screen justify-center items-center">
        <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold font-bricolage_grotesque">
          Training not found!
        </h2>
      </div>
    );
  }

  const formatTopic = (topic: string) => {
    return topic.split("&").map((part, index) => (
      <li key={index} className="ml-4 list-disc">
        {part.trim()}
      </li>
    ));
  };

  const formatDuration = (duration: string) => {
    const segments = duration.split("&").map((part) => part.trim());
    const weekdays = segments.filter((seg) => seg.startsWith("MON"));
    const weekends = segments.filter(
      (seg) => seg.startsWith("SAT") || seg.startsWith("SUN")
    );

    return (
      <>
        {weekdays.length > 0 && (
          <div>
            <h2 className="font-bold text-lg mt-2">Weekdays only</h2>
            <ul className="list-disc ml-4">
              {weekdays.map((day, index) => (
                <li key={index}>{day}</li>
              ))}
            </ul>
          </div>
        )}
        {weekends.length > 0 && (
          <div>
            <h2 className="font-bold text-lg mt-2">Weekends only</h2>
            <ul className="list-disc ml-4">
              {weekends.map((day, index) => (
                <li key={index}>{day}</li>
              ))}
            </ul>
          </div>
        )}
      </>
    );
  };

  return (
    <section className="w-full flex flex-col justify-center items-center">
      <section className="w-full px-8 flex flex-col gap-6 py-12  md:max-w-[98%] justify-center">
        <div className="flex flex-col w-full gap-4 lg:px-12 md:px-6 md:mt-10">
          <h1 className="md:text-5xl text-3xl font-bold font-bricolage_grotesque">
            {trainingItem.title}
          </h1>
          <p className="lg:max-w-[80%] lg:text-[24px] text-wrap text-[16px]">
            {trainingItem.expanded_description}
          </p>
        </div>
        <div className="w-full flex flex-col gap-2 lg:px-12 md:px-6">
          <h1 className="text-3xl text-[#89C13E] font-bricolage_grotesque">
            NOTE:
          </h1>
          <p className="text-wrap lg:max-w-[80%] lg:text-[24px] text-[16px]">
            For those who miss the live sessions due to conflicting schedules or
            other reasons, the recordings will be made available 3-5 hours after
            the class ends.
          </p>
        </div>

        <div className="flex md:gap-x-4 gap-x-2 lg:px-12 md:px-6 w-full sm_btn-container">
          <Button
            click={() => {
              getPaymentData();
            }}
            text="Enroll Now"
            url={`/training/${trainingItem.id}`}
            transition_class="transition_button4"
            bg="#89C13E"
          />

          <Link
            onClick={getPaymentData}
            href={`/training/${trainingItem.id}/class_schedule`}
            className="bg-[#FFFFFF] border border-[#DBE1E7] transition_button text-[#89C13E] font-bricolage_grotesque md:px-8 px-2 py-4 flex gap-x-4 btn text-nowrap text-ellipsis items-center justify-center rounded-md"
          >
            <span>
              <ArchiveIcon />
            </span>
            View Class Schedule
          </Link>
        </div>

        {trainingItem.image && trainingItem.image !== "" && (
          <div className="lg:px-12 md:px-3 lg:h-[700px] h-[50vw] lg:w-[100%] my-4">
            <ClientImage trainingItem={trainingItem} />
          </div>
        )}

        {trainingItem.benefits.map((item, index) => (
          <div
            key={index}
            className="w-full flex md:flex-row gap-4 flex-col lg:px-12 md:mb-8"
          >
            <div className="border border-[#DBE1E7] rounded-2xl md:w-2/4 w-full flex flex-col md:mx-2 mx-0 md:py-6 px-8 py-4 gap-3">
              <h1 className="font-bold text-2xl font-bricolage_grotesque">
                {item.why}
              </h1>
              {item.answer.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </div>

            <div className="border border-[#DBE1E7] rounded-2xl md:w-2/4 w-full flex flex-col md:mx-2 mx-0 md:py-6 px-8 py-4 gap-3">
              <h1 className="font-bold text-2xl font-bricolage_grotesque">
                {trainingItem.requirements.software}
              </h1>
              <p>{trainingItem.requirements.how}</p>
              <li>{trainingItem.requirements.tool}</li>
            </div>
          </div>
        ))}

        <Why_us data={whyUsItems} />

        <Certification />

        <UpcomingCohorts />

        <section className="w-full flex flex-col gap-4 lg:px-12 md:px-6 md:mt-8 md:mb-12">
          <h1 className="lg:text-4xl text-2xl font-bold font-bricolage_grotesque">
            Curriculum
          </h1>
          {trainingItem.payment.curriculum.map((item, index) => (
            <div
              key={index}
              className="w-full border border-[#DBE1E7] p-4 rounded-md font-bricolage_grotesque text-[#5B5B5B]"
            >
              <h1 className="lg:text3xl text-2xl font-bold text-[#090909]">
                {item.week}
              </h1>
              <ul className="list-disc text-lg">{formatTopic(item.topic)}</ul>
              {formatDuration(item.duration)}
            </div>
          ))}
          <div className="w-full flex flex-col gap-4">
            <p className="text-lg font-bold font-bricolage_grotesque">
              Start date: {trainingItem.start_date}
            </p>

            <div className="flex md:gap-x-4 gap-x-2 w-full sm_btn-container">
              <Button
                click={() => {
                  getPaymentData();
                  // window.location.href = `/training/${trainingItem.id}`;
                }}
                text="Enroll Now"
                url={`/training/${trainingItem.id}`}
                transition_class="transition_button4"
                bg="#89C13E"
              />

              <Link
                onClick={getPaymentData}
                href={`/training/${trainingItem.id}/class_schedule`}
                className="bg-[#FFFFFF] border border-[#DBE1E7] transition_button text-[#89C13E] font-bricolage_grotesque md:px-8 px-2 py-4 flex gap-x-4 btn text-nowrap text-ellipsis items-center justify-center rounded-md"
              >
                <span>
                  <ArchiveIcon />
                </span>
                View Class Schedule
              </Link>
            </div>
          </div>
        </section>
        <section className="my-12" ref={pricingRef} id="pricing">
          <Pricing item={trainingItem.pricing} id={trainingItem.id} />
        </section>
      </section>
    </section>
  );
}
