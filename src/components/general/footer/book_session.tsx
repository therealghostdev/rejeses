import Button from "@/components/reusables/button";

export default function Book_session() {
  return (
    <section className="w-full flex justify-center items-center lg:px-8 md:px-4 my-6 mt-4 mb-8">
      <div className="bg-img relative flex flex-col justify-center items-center rounded-2xl lg:w-[1280px] md:w-[95%] w-[98%] px-12 h-[394px] my-8 text-white text-center gap-2">
        <div className="absolute top-0 left-0 bg-[#45256940] rounded-2xl w-full h-full"></div>

        <h1 className="text-3xl font-bold font-bricolage_grotesque text-center z-10">
          Still have questions?
        </h1>
        <div className="md:w-[661px] flex justify-center items-center px-12 z-10">
          <p className="text-lg text-center break-words text-wrap">
            Schedule a 15-minute consultation with
            one of our experts to discuss your specifics
          </p>
        </div>

        <div className="z-10 bg-[#45256940]">
          <Button text="Book a Session" bg="#89C13E" url="/book-session" transition_class="transition_button4" />
        </div>
      </div>
    </section>
  );
}
