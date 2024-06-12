"use client";
import React, { useState, useEffect } from "react";
import data from "@/utils/data/schedule/schedule.json";
import data2 from "@/utils/data/schedule/pm_classSchedule.json";
import Image from "next/image";
import { Class, ScheduleData } from "@/utils/types/types";

const { days, times } = data as ScheduleData;

interface schedulePropsData {
  data: Class[];
}

export default function ClassSchedule(props: schedulePropsData) {

  const isClassScheduled = (day: string, time: string): boolean => {
    return props.data.some((s) => s.day === day && s.time === time);
  };

  return (
    <div className="flex justify-center items-center">
      <table className="p-6">
        <thead className="text-[#89C13E] bg-[#c3ff74]">
          <tr>
            <th className="border border-black">Time</th>
            {times.map((time) => (
              <th key={time} className="border border-black p-6">
                {time}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr className="border border-black" key={day}>
              <td className="p-6 bg-[#c3ff74] text-[#89C13E]">{day}</td>
              {times.map((time) => (
                <td key={time} className="border border-black p-6">
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
  );
}
