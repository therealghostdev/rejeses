import Link from "next/link";

export default function TermsOfUse() {
  return (
    <div className="flex items-center justify-center w-full py-6 px-4 md:bg-inherit max-md:bg-gray-100 sm:bg-gray-100 text-[#5B5B5B]">
      <div className="flex space-x-4 justify-center items-center w-full">
        <Link href="/termsandconditions" className="text-lg transition_border">
          Terms of Use
        </Link>
        <Link href="/privacy-policy" className="text-lg transition_border">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}
