import React from "react";
import Image from "next/image";
import { GeneralCardProps } from "@/utils/types/types";

export default function GeneralCard(props: GeneralCardProps) {
  return (
    <div className="rounded-md px-6 py-4 w-full" key={props.id}>
      {props.pin && (
        <div className="w-[40px]">
          <Image src={props.pin} alt="pin" width={100} height={100} />
        </div>
      )}

      <div className="w-full flex flex-col gap-4 py-4">
        {props.title && <h1 className="text-lg font-bold bricolage_text">{props.title}</h1>}
        <p>{props.comment}</p>
      </div>

      {props.person && (
        <div className="w-full">
          <p className="text-[#89C13E]">{props.person.name}</p>
          <p>{props.person.job_title}</p>
        </div>
      )}
    </div>
  );
}
