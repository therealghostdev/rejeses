"use client";
import React from "react";
import Dynamic_nav from "@/components/reusables/navigation/dynamic_nav";
import { usePayment } from "@/utils/context/payment";
import Button from "@/components/reusables/button";

export default function MentorshipPaymentSummary() {
  const { paymentInfo } = usePayment();

  const pay = () => {
    // console.log(paymentInfo);
  };

  return (
    <section className="w-full px-8 flex flex-col gap-12 py-12 justify-center items-center">
      <div className="md:max-w-[98%] w-full py-12 gap-6 md:px-8 flex flex-col gap-y-6 justify-center">
        <Dynamic_nav
          link1={`/mentorship/pricing`}
          link2="/mentorship"
          link_text1="Personalised Mentoring"
          link_text2="One-on-One Mentoring"
        />
        <section className="w-full border-2 border-[#DBE1E7] gap-4 lg:px-12 py-8 px-6 rounded-lg flex flex-col m-auto">
          <div className="flex flex-col gap-4 border-b-2 border-b-[#DBE1E7] py-6">
            <h1 className="lg:text-3xl text-2xl font-bold font-bricolage_grotesque">
              Order Summary
            </h1>
            <p
              className="text-wrap lg:max-w-[80%]"
              dangerouslySetInnerHTML={{
                __html:
                  paymentInfo.training_option ||
                  `You are subscribing to rejeses Consulting 6-months mentoring plan. You will be charged &#x24;300 for this.`,
              }}
            />

            <div className="flex justify-between w-full font-bricolage_grotesque">
              <span className="text-2xl font-bold">Total:</span>
              <span className="text-2xl font-bold text-[#89C13E]">
                &#x24;{paymentInfo.price || 300}
              </span>
            </div>
          </div>

          <div className="w-full flex flex-col gap-8 justify-center items-center py-4">
            <div className="md:max-w-[60%] w-full flex flex-col gap-8 justify-center items-center py-4">
              <Button
                click={pay}
                text="Continue"
                transition_class="transition_button4"
                url=""
                bg="#89C13E"
              />
              <p className="text-center">
                Kindly note that by paying for this plan, you agree that you
                will show up for your mentorship sessions on set dates, and days
                that you don&apos;t show up would not be revisited.
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
