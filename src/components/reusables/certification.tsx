import Image from "next/image";

export default function Certification() {
  return (
    <section className="w-full bg-[#FEF9F6] lg:px-3 px-8 py-12 flex flex-col justify-center items-center gap-12">
      <div className="lg:max-w-[90%] max-w-[98%] flex flex-col">
        <h1 className="lg:text-[48px] md:text-3xl text-2xl font-bold my-8 font-bricolage_grotesque">
          Get prepped for your professional exams
        </h1>
        <p className="lg:max-w-[80%] lg:text-[24px] text-wrap text-[16px]">
          Our training course equips you to take and pass the following
          professional exams, and be certified by the Project Management
          Institute (PMI)
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
              Agile Certified Practitioner (ACP)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
