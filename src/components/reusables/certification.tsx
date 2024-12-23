import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function Certification() {
  const pathname = usePathname();

  const decodedPathname = useMemo(
    () => decodeURIComponent(pathname),
    [pathname]
  );

  return (
    <section className="w-full bg-[#FEF9F6] lg:px-3 px-8 py-12 flex flex-col justify-center items-center gap-12">
      <div className="lg:max-w-[90%] max-w-[98%] flex flex-col">
        <h1 className="lg:text-[48px] md:text-3xl text-2xl font-bold my-8 font-bricolage_grotesque">
          Get prepped for your professional exams
        </h1>
        <p className="lg:max-w-[80%] lg:text-[24px] text-wrap text-[16px]">
          Our training course equips you to take and pass the following
          professional exams, and be certified by the Project Management
          Institute (PMI):
        </p>

        <div className="w-full flex md:flex-row flex-col my-8">
          <div className="md:w-1/3 w-full border border-[#DBE1E7] rounded-md px-2 py-2 bg-white my-4">
            <Image
              src="/camp.svg"
              width={100}
              height={100}
              alt="capm certification"
              className="w-full"
            />
            <p className="font-bold font-bricolage_grotesque my-1">
              Certified Associate in Project Management (CAPM)
            </p>
          </div>

          <div className="md:w-1/3 w-full border border-[#DBE1E7] rounded-md px-2 py-2 bg-white my-4 md:ml-6">
            <Image
              src="/pmp.svg"
              width={100}
              height={100}
              alt="capm certification"
              className="w-full"
            />
            <p className="font-bold font-bricolage_grotesque my-1">
              Project Management Professional (PMP)
            </p>
          </div>

          <div className="md:w-1/3 w-full border border-[#DBE1E7] rounded-md px-2 py-2 bg-white my-4 md:ml-6">
            <Image
              src="/pmi.svg"
              width={100}
              height={100}
              alt="capm certification"
              className="w-full"
            />
            <p className="font-bold font-bricolage_grotesque my-1">
              PMI - Agile Certified Practitioner (PMI-ACP)
            </p>
          </div>
        </div>
      </div>

      {decodedPathname === "/" && (
        <div className="w-full flex justify-center items-center">
          <span className="mx-2 inline-flex lg:w-[12%] md:w-[25%] justify-center items-center bg-[#89C13E] py-0 rounded-[.3rem]">
            <Link
              href="/training#upcoming-training"
              className="bg-[#89C13E] text-white px-6 inline-flex w-full h-full justify-center items-center py-4 rounded-[.3rem] font-bricolage_grotesque transition_button4"
            >
              Enroll Now
            </Link>
          </span>
        </div>
      )}
    </section>
  );
}
