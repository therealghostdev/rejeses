"use client";
import React, { useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import data from "@/utils/data/schedule.json";
import Image from "next/image";
import Link from "next/link";
import { DownloadIcon } from "@radix-ui/react-icons";
import { Class, ScheduleData, TrainingOption1 } from "@/utils/types/types";
import { usePayment } from "@/utils/context/payment";
import { useNavigation } from "@/utils/context/payment";

const { days, times } = data as ScheduleData;

interface SchedulePropsData {
  data: Class[];
  all: TrainingOption1;
}

export default function ClassSchedule(props: SchedulePropsData) {
  const scheduleRef = useRef<HTMLDivElement>(null);
  const { paymentInfo, setPaymentInfo } = usePayment();
  const { isNigeria } = useNavigation();

  const downloadPdf = async () => {
    if (scheduleRef.current) {
      // Store the original overflow style
      const originalOverflow = scheduleRef.current.style.overflow;
      const originalWidth = scheduleRef.current.style.width;

      // Set overflow to visible to capture the entire content
      scheduleRef.current.style.overflow = "visible";
      scheduleRef.current.style.width = "fit-content";

      const canvas = await html2canvas(scheduleRef.current, {
        scale: window.devicePixelRatio || 1,
        useCORS: true,
        logging: true,
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.scrollWidth, // Set to full content width
        windowHeight: document.documentElement.scrollHeight, // Set to full content height
      });

      // Restore the original overflow style
      scheduleRef.current.style.overflow = originalOverflow;
      scheduleRef.current.style.width = originalWidth;

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("landscape", "pt", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Rejeses (${props.all.title}) training schedule`);
    }
  };

  const isClassScheduled = (day: string, time: string): boolean => {
    return props.data.some((s) => s.day === day && s.time === time);
  };

  function formatPrice(price: number | undefined): string | undefined {
    if (price && price >= 1000) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      if (price) {
        return price.toString();
      }
    }
  }

  const individualPrice = props.all.pricing.individuals
    .map((item) =>
      isNigeria
        ? Number(item.training_only?.price)
        : Number(item.training_only?.price2)
    )
    .filter((price) => !isNaN(price))[0];

  const individualPrice2 = props.all.pricing.individuals
    .map((item) =>
      isNigeria
        ? Number(item.training_only?.price2)
        : Number(item.training_only?.price)
    )
    .filter((price) => !isNaN(price))[0];

  // Update payment information
  const BacktoSummary = () => {
    setPaymentInfo((prev) => ({
      ...prev,
      price: individualPrice,
      price2: individualPrice2,
      training_id: props.all.id,
      training_type: "Project Management Training",
      start_date: props.all.start_date,
      training_option: `You are subscribing to rejeses consult 4-week training plan. You will be charged ${
        isNigeria ? "NGN " : "$"
      }${formatPrice(individualPrice2)} for this.`,
      is_group: false,
    }));
  };

  useEffect(() => {
    BacktoSummary();
  }, [isNigeria]);

  return (
    <div className="flex flex-col items-center px-6 md:max-w-[90%] gap-6 w-full my-4 mt-12">
      <div className="flex flex-col w-full gap-4">
        <h1 className="lg:text-5xl text-3xl font-bold font-bricolage_grotesque">
          Class Schedule
        </h1>
        <p className="lg:text-[24px] text-wrap text-[16px]">
          For those who miss the live sessions due to conflicing schedules or
          other reasons, class recordings will be made available 30 minutes after
          the class ends.
        </p>
      </div>
      <div ref={scheduleRef} className="w-full overflow-x-auto">
        <table className="min-w-full border-collapse font-bricolage_grotesque">
          <thead className="bg-[#ECF5E0] text-[#89C13E] font-bold">
            <tr>
              <th className="border border-black md:p-6 p-2 md:w-[100px] md:h-[100px] text-xs sm:text-sm">
                Day
              </th>
              {times.map((time) => (
                <th
                  key={time}
                  className="border border-black md:p-6 p-2 text-xs sm:text-sm"
                >
                  {time}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day}>
                <td className="border border-black md:p-6 md:w-[100px] md:h-[100px] p-2 text-xs sm:text-sm bg-[#ECF5E0] text-[#89C13E] font-bold">
                  {day}
                </td>
                {times.map((time) => (
                  <td
                    key={time}
                    className="border border-black md:p-6 p-2 text-center"
                  >
                    {isClassScheduled(day, time) ? (
                      <Image
                        src="/check.svg"
                        alt="check-mark"
                        width={20}
                        height={20}
                        className="mx-auto"
                      />
                    ) : (
                      ""
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center py-6 gap-4 w-full font-medium font-bricolage_grotesque">
        <Link
          href={`/training/${paymentInfo.training_id}`}
          className="bg-[#89C13E] text-white px-12 py-4 flex justify-center items-center rounded-md w-full sm:w-auto text-xs sm:text-sm"
        >
          Pay now {isNigeria ? "NGN " : "$"}
          {formatPrice(individualPrice2) || 0}
        </Link>
        <button
          onClick={downloadPdf}
          className="text-[#89C13E] bg-white px-12 py-4 flex justify-center items-center rounded-md border border-[#DBE1E7] w-full sm:w-auto text-xs sm:text-sm"
        >
          <DownloadIcon color="#89C13E" className="mr-2" />
          Download Schedule
        </button>
      </div>
    </div>
  );
}
