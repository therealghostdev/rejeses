import { CardProps } from "@/utils/types/types";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export default function Card(props: CardProps) {
  return (
    <div className="rounded-md px-6 py-4 w-full" key={props.id}>
      <div className="w-full flex flex-col gap-4 border-b border-b-[#DBE1E7] py-4">
        <h1 className="text-lg font-bold font-[BricolageGrotesque]">{props.title}</h1>
        <p>{props.description}</p>
        <p className="font-bold font-[BricolageGrotesque]">
          <span>Start date:</span> {props.date}
        </p>
      </div>

      <div className="w-full">
        <Link
          className="bg-transparent flex items-center py-2 px-2 text-[#89C13E]"
          href={`/training/${props.title}`}
        >
          Register
          <span className="mx-2 flex items-center">
            <ArrowRightIcon />
          </span>
        </Link>
      </div>
    </div>
  );
}
