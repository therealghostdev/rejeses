"use client";
import Image from "next/image";
import Dynamic_nav from "@/components/reusables/navigation/dynamic_nav";
import { usePayment, useNavigation } from "@/utils/context/payment";
import Button from "@/components/reusables/button";
import { useEffect, useState } from "react";
import { ClientPageProps } from "@/utils/types/types";
import { formatPrice } from "@/utils/reusables/functions";
import { useRouter } from "next/navigation";

export default function TrainingPayment({ pricingItem }: ClientPageProps) {
  const { paymentInfo } = usePayment();
  const [formattedSummary, setFormattedSummary] = useState<string>("");
  const { isNigeria } = useNavigation();

  const router = useRouter();

  const formatTrainingOption = (text: string) => {
    return text.replace(/rejeses consult/gi, "<b>rejeses consult</b>");
  };

  const formatPaymentSummary = () => {
    if (!pricingItem) return "";
    const { training_option } = paymentInfo;

    if (!training_option || training_option === "") {
      return `You are subscribing to <b>rejeses consult</b> 35 hour training plan. You will be charged ${
        isNigeria ? "NGN " : "$"
      }${
        isNigeria
          ? formatPrice(pricingItem?.payment.total2)
          : formatPrice(pricingItem?.payment.total)
      } for this.`;
    }

    return formatTrainingOption(training_option);
  };

  const renderPrice = () => {
    const { price, price2, is_group } = paymentInfo;

    const adjustedPrice = is_group ? price * 5 : price || 0;
    const adjustedPrice2 = is_group ? price2 * 5 : price2 || 0;

    return isNigeria ? formatPrice(adjustedPrice2) : formatPrice(adjustedPrice);
  };

  useEffect(() => {
    setFormattedSummary(formatPaymentSummary());
  }, [paymentInfo, pricingItem, isNigeria]);

  useEffect(() => {
    if (paymentInfo.price === 0 || paymentInfo.price2 === 0) {
      router.push("/training");
    }
  }, [paymentInfo.price, paymentInfo.price2]);

  return (
    <section className="w-full px-8 flex flex-col gap-12 py-12 justify-center items-center">
      <div className="md:max-w-[98%] w-full py-12 gap-6 md:px-8 flex flex-col gap-y-6 justify-center">
        <Dynamic_nav
          link1={`/training/${pricingItem?.id}`}
          link2="/training"
          link_text1="Upcoming Cohorts"
          link_text2="Project Management Training"
        />
        <section className="w-full border-2 border-[#DBE1E7] gap-4 py-8 md:px-6 px-2 rounded-lg flex flex-col m-auto">
          <div className="flex flex-col gap-4 border-b-2 border-b-[#DBE1E7] py-6">
            <h1 className="lg:text-3xl text-2xl font-bold font-bricolage_grotesque">
              Order Summary
            </h1>
            <p
              dangerouslySetInnerHTML={{
                __html: formattedSummary,
              }}
            ></p>
            <div className="w-full flex flex-col gap-4">
              <p className="text-[#89C13E]">Includes:</p>
              <p className="flex gap-x-3 items-center">
                <span>
                  <Image
                    src={pricingItem?.payment.includes[0] || ""}
                    alt="image"
                    width={20}
                    height={100}
                  />
                </span>
                {pricingItem?.payment.includes[1]}
              </p>
            </div>
            <div className="flex justify-between w-full font-bricolage_grotesque">
              <span className="text-2xl font-bold">Total:</span>
              <span className="text-2xl font-bold text-[#89C13E]">
                {isNigeria ? "NGN" : "$"}
                {renderPrice()}
              </span>
            </div>
          </div>
          <div className="flex md:gap-x-4 gap-x-2 md:px-6 justify-center items-center py-4 w-full sm_btn-container flex-wrap">
            <Button
              url={`${paymentInfo.training_id}/checkout`}
              text="Continue"
              bg="#89C13E"
              transition_class="transition_button4"
            />
          </div>
        </section>
      </div>
    </section>
  );
}
