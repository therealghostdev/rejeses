import Button from "@/components/reusables/button";

export default function Book_session() {
  return (
    <section className="w-full flex justify-center items-center lg:px-8 md:px-4 my-6 mt-4 mb-8">
      <div className="bg-img relative flex flex-col justify-center items-center rounded-2xl lg:w-[1280px] md:w-[95%] px-12 h-[394px] my-8 text-white text-center gap-2">
        <div className="absolute top-0 left-0 bg-[#45256950] rounded-2xl w-full h-full"></div>

        <h1 className="text-3xl font-bold bricolage_text text-center">
          Get a consultation or a personal mentoring
        </h1>
        <div className="w-[661px] flex justify-center items-center px-12">
          <p className="text-lg text-center break-words text-wrap">
            Still have questions? Schedule a free 30-minute consultation with
            one of our experts to discuss your specifics and clear whatever
            questions you have
          </p>
        </div>

        <div className="z-10 bg-[#45256950]">
          <Button text="Book Session" bg="#89C13E" url="/enroll" />
        </div>
      </div>
    </section>
  );
}
