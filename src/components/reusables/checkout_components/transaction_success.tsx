"use client";
import { TransactionDataType } from "@/utils/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

type TransactionSuccessProps = Partial<
  Omit<TransactionDataType, "accessCode" | "fee" | "createdAt">
>;

export default function Transaction_success({
  data,
  close,
}: {
  data: TransactionSuccessProps;
  close: () => void;
}) {
  const formatDateWithOrdinal = (dateString: string | undefined): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    let ordinalSuffix;
    if (day > 3 && day < 21) {
      ordinalSuffix = "th";
    } else {
      switch (day % 10) {
        case 1:
          ordinalSuffix = "st";
          break;
        case 2:
          ordinalSuffix = "nd";
          break;
        case 3:
          ordinalSuffix = "rd";
          break;
        default:
          ordinalSuffix = "th";
          break;
      }
    }

    return `${day}${ordinalSuffix} ${month}, ${year}`;
  };

  const router = useRouter();

  const [path, setPath] = useState<string>("");

  const formattedUpdatedAt = data?.updatedAt
    ? formatDateWithOrdinal(data.updatedAt)
    : "N/A";

  const returnBtnClick = () => {
    router.push("/");
  };

  return (
    <div className="lg:w-[45%] w-[95%] bg-white md:w-3/4 h-screen fixed gap-y-10 right-0 top-0 z-20 shadow-md shadow-[#0000000D] px-4 py-12 flex flex-col overflow-auto">
      <button
        onClick={close}
        aria-label="close"
        className="w-8 h-8 rounded-full border border-[#DBE1E7] absolute right-10 top-8 text-[#090909] flex justify-center items-center"
      >
        X
      </button>

      <div className="w-full flex flex-col justify-between">
        <div className="w-full flex flex-col py-16">
          <div className="w-full flex flex-col justify-center items-center">
            <Image src="/success.svg" width={80} height={80} alt="Success" />
            <h1 className="font-bold lg:text-4xl text-2xl text-center my-4 lg:mb-12">
              Transaction Successful
            </h1>
          </div>

          <div className="w-full border border-[#DBE1E7] px-4 py-2 rounded-md">
            <div className="lg:my-4 font-bold border-b border-[#DBE1E7] py-2">
              <li className="list-none flex justify-between items-center">
                TXID:
                <span className="mx-4 inline-flex w-2/4 justify-end">
                  {data?.txid || "N/A"}
                </span>
              </li>
            </div>

            <div className="lg:my-4 font-bold border-b border-[#DBE1E7] py-2">
              <li className="list-none flex justify-between items-center">
                REFERENCE:
                <span className="mx-4 inline-flex w-2/4 justify-end">
                  {data?.reference || "N/A"}
                </span>
              </li>
            </div>

            <div className="lg:my-4 font-bold border-b border-[#DBE1E7] py-2">
              <li className="list-none flex justify-between items-center">
                PAYMENT ID:
                <span className="mx-4 inline-flex w-2/4 justify-end">
                  {data?.pid || "N/A"}
                </span>
              </li>
            </div>

            <div className="lg:my-4 font-bold border-b border-[#DBE1E7] py-2">
              <li className="list-none flex justify-between items-center">
                CURRENCY:
                <span className="mx-4 inline-flex w-2/4 justify-end">
                  {data.currency && data?.currency === "naira"
                    ? "NAIRA"
                    : "DOLLAR"}
                </span>
              </li>
            </div>

            <div className="lg:my-4 font-bold border-b border-[#DBE1E7] py-2">
              <li className="list-none flex justify-between items-center">
                DATE:
                <span className="mx-4 inline-flex w-2/4 justify-end">
                  {formattedUpdatedAt}
                </span>
              </li>
            </div>

            <div className="lg:my-4 font-bold py-2">
              <li className="list-none flex justify-between items-center">
                TRANSACTION STATUS:
                <span
                  className={`mx-4 inline-flex w-2/4 justify-end ${
                    data.status && data.status === "completed"
                      ? "text-[#1D994A]"
                      : ""
                  }`}
                >
                  {data.status && data.status === "completed"
                    ? "Successful"
                    : "N/A"}
                </span>
              </li>
            </div>
          </div>
        </div>

        <button
          className="bg-[#89C13E] py-4 px-2 w-full my-4 text-white rounded-md font-bold"
          onClick={returnBtnClick}
        >
          Back Back Home
        </button>
      </div>
    </div>
  );
}
