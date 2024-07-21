"use client";
import { CardProps } from "@/utils/types/types";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePayment } from "@/utils/context/payment";

export default function Card(props: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const goTo = useRouter();
  const { setPaymentInfo } = usePayment();

  useEffect(() => {
    const priceArray = props.price?.individuals.map(
      (item) => item.training_only?.price
    );
    const price = priceArray ? priceArray[0] : 0;

    setPaymentInfo((prev) => ({
      ...prev,
      price: Number(price),
      training_id: props.id2,
      training_option: `You are subscribing to rejeses consult 4-weeks training plan. You will be charged &#x24;${price} for this.`,
      is_group: false,
    }));
  }, [props.price?.individuals]);

  return (
    <div
      onClick={() => goTo.push(`/training/${props.id2}`)}
      className="rounded-md px-6 py-4 w-full flex flex-col gap-6"
      key={props.id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full flex flex-col gap-4 border-b border-b-[#DBE1E7] py-4">
        <h1 className="text-lg font-bold font-bricolage_grotesque">
          {props.title}
        </h1>
        <p className="text-[#5B5B5B]">{props.description}</p>
        <p className="font-bold font-bricolage_grotesque">
          <span>Start date:</span> {props.date}
        </p>
      </div>

      <div className="w-full flex items-center justify-between">
        <Link
          className="bg-transparent flex items-center py-2 px-2 text-[#89C13E] font-semibold font-bricolage_grotesque transition-all duration-300"
          href={`/training/${props.id2}`}
        >
          REGISTER
          <span
            className="mx-2 flex items-center transition-all duration-700"
            style={{
              transform: isHovered ? "translateX(4px)" : "translateX(0)",
            }}
          >
            <ArrowRightIcon />
          </span>
        </Link>
      </div>
    </div>
  );
}
