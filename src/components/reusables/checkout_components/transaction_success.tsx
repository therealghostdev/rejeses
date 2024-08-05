"use client";
import { TransactionDataType } from "@/utils/types/types";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type TransactionSuccessProps = Partial<
  Omit<TransactionDataType, "accessCode" | "fee" | "createdAt">
>;

export default function Transaction_success({
  data,
}: {
  data: TransactionSuccessProps;
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

  console.log(data);

  const pathname = usePathname();
  const router = useRouter();

  const [path, setPath] = useState<string>("");

  const decodedPathname = useMemo(() => decodeURIComponent(pathname), []);

  const formattedUpdatedAt = data?.updatedAt
    ? formatDateWithOrdinal(data.updatedAt)
    : "N/A";

  const returnBtnClick = () => {
    if (decodedPathname.split("/")[1] === "training") {
      router.push("/training");
    } else {
      router.push("/mentorship");
    }
  };

  useEffect(() => {
    setPath(decodedPathname.split("/")[1]);
  }, []);

  return (
    <div className="lg:w-2/4 w-[95%] lg:h-auto md:h-3/4 md:w-3/4 h-full my-8 shadow-md shadow-[#0000000D] rounded-md px-4 py-6 flex flex-col justify-between">
      <h1 className="font-bold text-2xl text-[#89C13E] text-center my-4 lg:mb-12">
        Congratulations, your order was successful
      </h1>

      <div className="lg:my-4 font-bold">
        <li className="list-none flex justify-between items-center">
          TXID:
          <span className="mx-4 inline-flex w-2/4 justify-end">
            {data?.txid || "N/A"}
          </span>
        </li>
      </div>

      <div className="lg:my-4 font-bold">
        <li className="list-none flex justify-between items-center">
          REFERENCE:
          <span className="mx-4 inline-flex w-2/4 justify-end">
            {data?.reference || "N/A"}
          </span>
        </li>
      </div>

      <div className="lg:my-4 font-bold">
        <li className="list-none flex justify-between items-center">
          PAYMENT ID:
          <span className="mx-4 inline-flex w-2/4 justify-end">
            {data?.pid || "N/A"}
          </span>
        </li>
      </div>

      <div className="lg:my-4 font-bold">
        <li className="list-none flex justify-between items-center">
          CURRENCY:
          <span className="mx-4 inline-flex w-2/4 justify-end">
            {data?.currency === "NGN" ? "NAIRA" : "DOLLAR"}
          </span>
        </li>
      </div>

      <div className="lg:my-4 font-bold">
        <li className="list-none flex justify-between items-center">
          DATE:
          <span className="mx-4 inline-flex w-2/4 justify-end">
            {formattedUpdatedAt}
          </span>
        </li>
      </div>

      <div className="lg:my-4 font-bold">
        <li className="list-none flex justify-between items-center">
          TRANSACTION STATUS:
          <span className="mx-4 inline-flex w-2/4 justify-end">
            {data?.status?.toUpperCase() || "N/A"}
          </span>
        </li>
      </div>

      <button
        className="bg-[#89C13E] py-4 px-2 w-full my-4 text-white rounded-md font-bold"
        onClick={returnBtnClick}
      >
        Back to {path === "mentorship" ? "mentoring" : path}
      </button>
    </div>
  );
}
