import React from "react";
import Dynamic_nav from "@/components/reusables/navigation/dynamic_nav";
import Link from "next/link";

export async function generateStaticParams() {
  return [{ params: { slug1: "pricing" } }];
}

export default function Page({ params }: { params: { slug1: string } }) {
  return (
    <section className="w-full px-8 flex flex-col gap-12 py-12 justify-center items-center">
      <div className="md:max-w-[98%] w-full py-12 gap-6 md:px-8 flex flex-col gap-y-6 justify-center">
        <Dynamic_nav
          link1={`/mentorship/pricing`}
          link2=""
          link_text1="Personalised Mentorship"
          link_text2="One-on-One Mentorship"
        />
        <section className="w-full border-2 border-[#DBE1E7] gap-4 lg:px-12 py-8 px-6 rounded-lg flex flex-col m-auto">
          <div className="flex flex-col gap-4 border-b-2 border-b-[#DBE1E7] py-6">
            <h1 className="lg:text-3xl text-2xl font-bold bricolage_text">
              Order Summary
            </h1>
            <p className="text-wrap lg:max-w-[80%]">
              You are subscribing to rejeses Consult one year personalised
              mentorship plan. You will be charged $400.00 for the first year
              and subsequently $200.00 per month or $2,200.00 per year.
            </p>

            <div className="flex justify-between w-full bricolage_text">
              <span className="text-2xl font-bold">Total:</span>
              <span className="text-2xl font-bold text-[#89C13E]">
                &#x24;400
              </span>
            </div>
          </div>

          <div className="w-full flex flex-col gap-8 justify-center items-center py-4">
            <div className="md:max-w-[60%] w-full flex flex-col gap-8 justify-center items-center py-4">
              <Link
                href={``}
                className="bg-[#89C13E] text-white px-8 py-4 rounded-md bricolage_text"
              >
                View Pricing
              </Link>
              <p className="text-center">
                By paying for this plan, you agree that you will show up for
                your mentorship session on set date and on days when you
                don&apos;t show up, would not be revisited.
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
