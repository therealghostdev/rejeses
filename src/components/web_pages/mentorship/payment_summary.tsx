"use client";
import React from "react";
import Dynamic_nav from "@/components/reusables/navigation/dynamic_nav";
import { usePayment, useNavigation } from "@/utils/context/payment";
import Button from "@/components/reusables/button";
import { useRouter } from "next/navigation";

export default function MentorshipPaymentSummary() {
  const { paymentInfo, setPaymentInfo } = usePayment();
  const { isNigeria } = useNavigation();

  const formatTrainingOption = (text: string) => {
    return text.replace(/rejeses consult/gi, "<b><i>rejeses consult</i></b>");
  };

  function formatPrice(price: number): string {
    if (price >= 1000) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return price.toString();
    }
  }

  const trainingOption = paymentInfo.training_option
    ? formatTrainingOption(paymentInfo.training_option)
    : `You are subscribing to <b><i>rejeses consult</i></b> 6-month mentoring plan. You will be charged ${
        isNigeria ? "NGN 50,000" : "$300"
      } for this.`;

  const router = useRouter();
  

  const pay = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7); // in a week
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    // Get the appropriate ordinal suffix for the day
    let ordinalSuffix;
    if (day > 3 && day < 21) {
      ordinalSuffix = "th";
    } else {
      const lastDigit = day % 10;
      if (lastDigit === 1) {
        ordinalSuffix = "st";
      } else if (lastDigit === 2) {
        ordinalSuffix = "nd";
      } else if (lastDigit === 3) {
        ordinalSuffix = "rd";
      } else {
        ordinalSuffix = "th";
      }
    }

    const formattedDate = `${day}${ordinalSuffix} ${month}, ${year}`;
    setPaymentInfo((prev) => ({ ...prev, start_date: formattedDate }));
    router.push("pricing/checkout");
  };

  const renderPrice = () => {
    if (paymentInfo.price === 0) {
      return isNigeria
        ? formatPrice(50000)
        : formatPrice(300);
    } else {
      return formatPrice(paymentInfo.price2);
    }
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
              dangerouslySetInnerHTML={{ __html: trainingOption }}
            />

            <div className="flex justify-between w-full font-bricolage_grotesque">
              <span className="text-2xl font-bold">Total:</span>
              <span className="text-2xl font-bold text-[#89C13E]">
                {isNigeria ? <span className="mr-2">NGN</span> : "$"}
                {renderPrice()}
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
