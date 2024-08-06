"use client";
import Image from "next/image";

export default function Transaction_error({
  close,
  error,
}: {
  close: () => void;
  error: string;
}) {
  return (
    <div className="lg:w-[45%] w-[95%] bg-white md:w-3/4 h-screen fixed gap-y-10 right-0 top-0 z-20 shadow-md shadow-[#0000000D] px-4 py-12 flex flex-col overflow-auto">
      <button
        onClick={close}
        aria-label="close"
        className="w-8 h-8 rounded-full border border-[#DBE1E7] absolute right-10 top-8 text-[#090909] flex justify-center items-center"
      >
        X
      </button>

      <div className="w-2/4 flex flex-col gap-6 justify-center items-center m-auto">
        <div className="w-full flex justify-center items-center">
          <Image src="/failed.svg" width={80} height={80} alt="failed" />
        </div>

        <div className="w-full flex flex-col gap-3 justify-center items-center">
          <p className="font-bold md:text-3xl text-2xl text-center">
            Error Processing Transaction
          </p>

          <small className="text-[#666666] text-center">{error}</small>
        </div>
      </div>
    </div>
  );
}
