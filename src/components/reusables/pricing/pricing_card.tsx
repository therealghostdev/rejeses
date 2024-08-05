"use client";
import { CheckIcon } from "@radix-ui/react-icons";
import button from "next/link";
import { PriceCardProps } from "@/utils/types/types";
import { usePayment, useNavigation } from "@/utils/context/payment";
import { usePathname, useRouter, redirect } from "next/navigation";
import { useEffect } from "react";

export default function PriceCard({ data, id }: PriceCardProps) {
  const { training_only, training_with_mentorship } = data;

  const directTo = useRouter();

  const { isNigeria } = useNavigation();

  const pathname = usePathname();
  const { setPaymentInfo } = usePayment();

  const registerBtnClick = (item: number, option: string) => {
    const currentPath = decodeURIComponent(pathname).split("/")[1];
    if (currentPath === "training") {
      const routePath = decodeURIComponent(pathname).split("/")[2];

      setPaymentInfo((prev) => ({
        ...prev,
        price: item,
        training_id: Number(id),
        training_option: option,
        training_type: "Project Management Training",
      }));
      const goTo = `/training/${id}`;
      directTo.push(goTo);
    } else if (currentPath === "mentorship") {
      setPaymentInfo((prev) => ({
        ...prev,
        price: item,
        training_option: option,
        training_type: "Project Management Mentoring",
      }));
      const goTo = `/${currentPath}/pricing`;
      directTo.push(goTo);
    } else if (currentPath === "consultation") {
      // const goTo = `${currentPath}/`
    } else {
    }
  };

  const resetPriceInfo = () => {
    setPaymentInfo((prev) => ({ ...prev, price: 0, training_id: null }));
  };

  function formatPrice(price: number): string {
    if (price >= 1000) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return price.toString();
    }
  }

  useEffect(() => {
    const val = ["Project", "pricing", "training"];
    const includesAny = val.some((substring) => pathname.includes(substring));
    if (!includesAny) resetPriceInfo();
  }, []);

  return (
    <>
      {training_only && (
        <div className="flex flex-col md:w-2/4 w-full md:h-[800px] h-auto md:mx-4 mx-0 my-2 gap-4 border border-[#DBE1E7] rounded-2xl px-8 py-6 relative shadow shadow-[#DBE1E7]">
          <div className="w-full h-[90%] overflow-y-auto flex flex-col gap-4 custom-scrollbar">
            <h2 className="text-2xl font-bold font-bricolage_grotesque text-[#090909]">
              {training_only.name}
            </h2>
            <p className="text-2xl font-bold font-bricolage_grotesque text-[#000000]">
              {isNigeria ? (
                <span className="mr-2">NGN</span>
              ) : (
                <span className="mr-2">$</span>
              )}
              {isNigeria
                ? formatPrice(training_only.price2)
                : formatPrice(training_only.price)}
            </p>
            <div className="w-full mt-5 flex flex-col gap-2 my-2">
              <h1 className="text-lg font-bold text-[#090909]">
                {training_only.payment_type}
              </h1>
              <p>{training_only.payment_description}</p>
            </div>

            <div className="w-full border border-[#DBE1E7] my-6"></div>

            {training_only.amount_saved && (
              <div className="absolute right-2 lg:top-6 top-16 bg-[#EFFBF2] text-[#2EAE4E] rounded-3xl w-24 text-center p-2">
                <p>Save &#36;{training_only?.amount_saved}</p>
              </div>
            )}

            {training_only.extra_details.map((detail, index) => (
              <p key={index} className="flex gap-x-4 items-center">
                <span className="rounded-full border border-[#89C13E] w-4 h-4 flex justify-center items-center">
                  <CheckIcon className="text-[#89C13E]" />
                </span>
                {detail}
              </p>
            ))}
          </div>

          <div className="bottom-6 md:absolute left-0 w-full px-4">
            <button
              onClick={() =>
                registerBtnClick(
                  isNigeria ? training_only.price2 : training_only.price,
                  decodeURIComponent(pathname).split("/")[1] === "training"
                    ? `You are subscribing to rejeses consult 4-week training plan. You will be charged  ${
                        isNigeria ? "NGN " : "$"
                      }${
                        isNigeria ? formatPrice(training_only.price2) : formatPrice(training_only.price)
                      } for this.`
                    : `You are subscribing to rejeses consult 6-month mentoring plan. You will be charged ${
                        isNigeria ? "NGN " : "$"
                      }${
                        isNigeria
                          ? formatPrice(training_only.price2)
                          : formatPrice(training_only.price)
                      } for this.`
                )
              }
              // href={training_only.register_link}
              className="bg-[#89C13E] text-white w-full inline-block p-4 text-center rounded-md font-bricolage_grotesque"
            >
              Register
            </button>
          </div>
        </div>
      )}

      {training_with_mentorship && (
        <div className="flex flex-col md:w-2/4 w-full md:h-[800px] h-auto gap-4 px-8 py-6 border my-2 border-[#DBE1E7] rounded-2xl relative md:mx-4 mx-0 shadow-sm shadow-[#DBE1E7]">
          <div className="h-[90%] w-full overflow-y-auto flex flex-col gap-4 custom-scrollbar">
            <h2 className="text-2xl font-bold font-bricolage_grotesque text-[#090909]">
              {training_with_mentorship.name}
            </h2>
            <p className="text-2xl font-bold font-bricolage_grotesque text-[#000000]">
              {isNigeria ? (
                <span className="mr-2">NGN</span>
              ) : (
                <span className="mr-2">$</span>
              )}
              {isNigeria
                ? formatPrice(training_with_mentorship.price2)
                : formatPrice(training_with_mentorship.price)}
            </p>
            <div className="w-full mt-5 flex flex-col gap-2 my-2">
              <h1 className="text-lg font-bold">
                {training_with_mentorship.payment_type}
              </h1>
              <p>{training_with_mentorship.payment_description}</p>
            </div>

            <div className="w-full border border-[#DBE1E7] my-6"></div>

            {training_with_mentorship.amount_saved && (
              <div className="absolute right-2 lg:top-6 top-16 bg-[#EFFBF2] text-[#2EAE4E] rounded-3xl w-24 text-center p-2">
                <p>Save &#36;{training_with_mentorship?.amount_saved}</p>
              </div>
            )}

            {training_with_mentorship.extra_details.map((detail, index) => (
              <p key={index} className="flex gap-x-4 items-center">
                <span className="rounded-full border border-[#89C13E] w-4 h-4 flex justify-center items-center">
                  <CheckIcon className="text-[#89C13E]" />
                </span>
                {detail}
              </p>
            ))}
          </div>

          <div className="bottom-6 md:absolute left-0 w-full px-4">
            <button
              onClick={() =>
                registerBtnClick(
                  isNigeria
                    ? training_with_mentorship.price2
                    : training_with_mentorship.price,
                  `You are subscribing to rejeses consult 4-week training plus 6-month mentoring plan. You will be charged ${
                    isNigeria ? "NGN " : "$"
                  }${
                    isNigeria
                      ? formatPrice(training_with_mentorship.price2)
                      : formatPrice(training_with_mentorship.price)
                  } for this.`
                )
              }
              // href={training_with_mentorship.register_link}
              className="bg-[#89C13E] text-white w-full font-bricolage_grotesque inline-block p-4 text-center rounded-md"
            >
              Register
            </button>
          </div>
        </div>
      )}
    </>
  );
}
