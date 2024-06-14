import Button from "@/components/reusables/button";

export default function Book_session() {
  return (
    <div className="bg-img mx-4 flex flex-col justify-center items-center h-80 my-8 text-white text-center gap-2">
      <h1 className="text-3xl font-bold font-[BricolageGrotesque]">
        Get a consultation or a personal mentoring
      </h1>
      <p className="text-lg">
        Still have questions? Schedule a free 30-minute consultation with one of
        our experts to discuss your specifics and clear whatever questions you
        have
      </p>

      <Button text="Book Session" bg="#89C13E" />
    </div>
  );
}
