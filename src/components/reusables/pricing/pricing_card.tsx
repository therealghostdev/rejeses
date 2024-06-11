import { CheckIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { PriceCardProps } from "@/utils/types/types";

export default function PriceCard({ data }: PriceCardProps) {
  const { training_only, training_with_mentorship } = data;

  return (
    <>
      {training_only && (
        <div className="flex flex-col md:w-2/4 w-full md:h-[800px] h-auto md:mx-4 mx-0 my-2 gap-4 p-4 border border-[#DBE1E7] rounded-2xl relative">
          <h2 className="text-2xl font-bold">{training_only.name}</h2>
          <p className="text-2xl font-bold">${training_only.price}</p>
          <p>{training_only.payment_description}</p>
          {training_only.amount_saved && (
            <div className="absolute right-2 lg:top-6 top-16 bg-[#EFFBF2] text-[#2EAE4E] rounded-3xl w-24 text-center p-2">
              <p>Save {training_only?.amount_saved}</p>
            </div>
          )}

          {training_only.extra_details.map((detail, index) => (
            <p key={index} className="flex gap-x-4">
              <span className="rounded-full border border-[#89C13E] w-4 h-4 flex justify-center items-center">
                <CheckIcon className="text-[#89C13E]" />
              </span>
              {detail}
            </p>
          ))}

          <div className="bottom-6 md:absolute left-0 w-full px-4">
            <Link
              href={training_only.register_link}
              className="bg-[#89C13E] text-white w-full inline-block p-4 text-center rounded-md"
            >
              Register
            </Link>
          </div>
        </div>
      )}

      {training_with_mentorship && (
        <div className="flex flex-col md:w-2/4 w-full md:h-[800px] h-auto gap-4 p-4 border my-2 border-[#DBE1E7] rounded-2xl relative md:mx-4 mx-0">
          <h2 className="text-2xl font-bold">
            {training_with_mentorship.name}
          </h2>
          <p className="text-2xl font-bold">
            ${training_with_mentorship.price}
          </p>
          <p>{training_with_mentorship.payment_description}</p>

          {training_with_mentorship.amount_saved && (
            <div className="absolute right-2 lg:top-6 top-16 bg-[#EFFBF2] text-[#2EAE4E] rounded-3xl w-24 text-center p-2">
              <p>Save {training_with_mentorship?.amount_saved}</p>
            </div>
          )}

          {training_with_mentorship.extra_details.map((detail, index) => (
            <p key={index} className="flex gap-x-4">
              <span className="rounded-full border border-[#89C13E] w-4 h-4 flex justify-center items-center">
                <CheckIcon className="text-[#89C13E]" />
              </span>
              {detail}
            </p>
          ))}

          <div className="bottom-6 md:absolute left-0 w-full px-4">
            <Link
              href={training_with_mentorship.register_link}
              className="bg-[#89C13E] text-white w-full inline-block p-4 text-center rounded-md"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
