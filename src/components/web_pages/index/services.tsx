import Button from "@/components/reusables/button";
import Image from "next/image";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export default function Services() {
  return (
    <section className="w-full px-8 py-4 flex flex-col gap-12 bg-[#FEF9F6]">
      <h1 className="lg:text-[48px] md:text-3xl text-2xl font-bold text-center my-8 bricolage_text">
        Our Services
      </h1>

      <div className="flex md:flex-row flex-col w-full gap-8">
        <div className="md:w-2/4 w-full">
          <Image
            src="/man-board.svg"
            alt="man"
            width={100}
            height={100}
            className="w-full h-full"
          />
        </div>

        <div className="md:w-2/4 w-full py-8 flex flex-col justify-center gap-4">
          <h1 className="lg:text-[36px] md:text-3xl text-2xl font-bold bricolage_text">Trainings</h1>
          <p>
            Our consultation services offer guidance to overcome project
            challenges, optimize processes, and achieve your specific goals.
            Schedule a consultation to discuss your project&apos;s unique needs.
          </p>

          <span className="text-white">
            <Button
              text="Learn More"
              icon={<ArrowRightIcon />}
              bg="#89C13E"
              url="/training"
            />
          </span>
        </div>
      </div>

      <div className="flex md:flex-row flex-col w-full gap-8">
        <div className="md:w-2/4 w-full py-8 flex flex-col justify-center gap-4">
          <h1 className="lg:text-[36px] md:text-3xl text-2xl font-bold bricolage_text">Personalized Mentorship</h1>
          <p>
            Our mentoring programs foster one-on-one relationships to guide and
            support your professional development. Experience personalized
            mentorship that aligns with your career aspirations.
          </p>

          <span className="text-white">
            <Button
              text="Learn More"
              icon={<ArrowRightIcon />}
              bg="#89C13E"
              url="/mentorship"
            />
          </span>
        </div>

        <div className="md:w-2/4 w-full">
          <Image
            src="/discussion.svg"
            alt="man"
            width={100}
            height={100}
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="flex md:flex-row flex-col w-full gap-8">
        <div className="md:w-2/4 w-full">
          <Image
            src="/meeting.svg"
            alt="man"
            width={100}
            height={100}
            className="w-full h-full"
          />
        </div>

        <div className="md:w-2/4 w-full py-8 flex flex-col justify-center gap-4">
          <h1 className="lg:text-[36px] md:text-3xl text-2xl font-bold bricolage_text">Consultation</h1>
          <p>
            Our consultation services offer guidance to overcome project
            challenges, optimize processes, and achieve your specific goals.
            Schedule a consultation to discuss your project&apos;s unique needs.
          </p>

          <span className="text-white">
            <Button
              text="Learn More"
              icon={<ArrowRightIcon />}
              bg="#89C13E"
              url="/consultation"
            />
          </span>
        </div>
      </div>
    </section>
  );
}
