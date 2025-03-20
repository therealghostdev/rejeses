"use client";
import { useState, useEffect } from "react";
import PriceCard from "./pricing_card";
import { PricingProps, PricingData } from "@/utils/types/types";
import { usePayment } from "@/utils/context/payment";

export default function Pricing({ item, id }: PricingProps) {
  const [individuals, setIndividuals] = useState<boolean>(true); // Default to "individuals"
  const [pricingData, setPricingData] = useState<
    PricingData["individuals"] | PricingData["group"] | undefined
  >([]);

  const { setPaymentInfo } = usePayment();

  const filterCardData_byState = () => {
    if (individuals) {
      setPricingData(item.individuals);
      setPaymentInfo((prev) => ({ ...prev, is_group: false }));
    } else {
      item.group ? setPricingData(item.group) : "";
      setPaymentInfo((prev) => ({ ...prev, is_group: true }));
    }
  };

  useEffect(() => {
    filterCardData_byState();
  }, [individuals]);

  return (
    <section className="w-full flex flex-col gap-4 lg:px-6">
      <div className="flex flex-col gap-4">
        <h1 className="lg:text-5xl text-3xl font-bold text-center font-bricolage_grotesque">
          Pricing
        </h1>
        <p className="text-center lg:text-[24px] text-wrap text-[16px]">
          We believe in keeping a simple and transparent pricing model.
        </p>
      </div>

      {/* {item.group && (
        <div className="flex justify-center items-center gap-2 my-4">
          <button
            className={`py-3 px-6 rounded-md -mx-2 text-nowrap text-ellipsis btn font-bricolage_grotesque ${
              individuals
                ? "bg-[#FFFFFF] text-[#89C13E] border border-[#DBE1E7] shadow-md shadow-[#0000000D] z-10"
                : "bg-[#DBE1E7] text-[#848484]"
            }`}
            onClick={() => setIndividuals(true)}
          >
            Individuals
          </button>
          <button
            className={`py-3 px-6 rounded-md -mx-2 text-nowrap text-ellipsis btn font-bricolage_grotesque ${
              !individuals
                ? "bg-[#FFFFFF] text-[#89C13E] border border-[#DBE1E7] shadow-md shadow-[#0000000D] z-10"
                : "bg-[#DBE1E7] text-[#848484]"
            }`}
            onClick={() => setIndividuals(false)}
          >
            Groups of 5
          </button>
        </div>
      )} */}

      <div className="w-full flex flex-col md:flex-row justify-center items-center md:px-8 md:py-6 px-4 py-2 text-[#5B5B5B]">
        {pricingData?.map((data, index) => (
          <PriceCard key={index} data={data} id={id} />
        ))}
      </div>
    </section>
  );
}
