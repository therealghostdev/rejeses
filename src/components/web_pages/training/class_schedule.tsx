"use client";
import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import data from "@/utils/data/schedule.json";
import Image from "next/image";
import Link from "next/link";
import { DownloadIcon } from "@radix-ui/react-icons";
import { Class, ScheduleData, TrainingOption1 } from "@/utils/types/types";

const { days, times } = data as ScheduleData;

interface SchedulePropsData {
  data: Class[];
  all: TrainingOption1;
}

export default function ClassSchedule(props: SchedulePropsData) {
  const scheduleRef = useRef<HTMLDivElement>(null);

  const downloadPdf = async () => {
    if (scheduleRef.current) {
      const canvas = await html2canvas(scheduleRef.current);
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

  return (
    <div className="flex flex-col items-center p-6 w-full">
      <div ref={scheduleRef} className="w-full overflow-x-auto">
        <table className="min-w-full border-collapse font-[BricolageGrotesque]">
          <thead className="bg-[#c2f581] text-[#89C13E]">
            <tr>
              <th className="border border-black md:p-6 p-2 text-xs sm:text-sm">
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
                <td className="border border-black md:p-6 p-2 text-xs sm:text-sm bg-[#c2f581] text-[#89C13E]">
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

      <div className="flex flex-col sm:flex-row justify-center items-center py-6 gap-4 w-full font-[BricolageGrotesque]">
        <Link
          href={``}
          className="bg-[#89C13E] text-white px-3 py-3 flex justify-center items-center rounded-md w-full sm:w-auto text-xs sm:text-sm"
        >
          Pay now
        </Link>
        <button
          onClick={downloadPdf}
          className="text-[#89C13E] bg-white px-3 py-3 flex justify-center items-center rounded-md border border-[#DBE1E7] w-full sm:w-auto text-xs sm:text-sm"
        >
          <DownloadIcon color="#89C13E" className="mr-2" />
          Download Schedule
        </button>
      </div>
    </div>
  );
}
