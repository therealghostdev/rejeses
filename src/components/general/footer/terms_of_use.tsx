import Link from "next/link";

export default function TermsOfUse() {
  return (
    <div className="flex items-center justify-center w-full py-6 px-4 md:bg-inherit max-md:bg-gray-100 sm:bg-gray-100 text-[#5B5B5B]">
      <div className="flex space-x-4 justify-center items-center w-full">
        <Link href="/termsandconditions" className="text-lg transition_border font-bricolage_grotesque">
          TERMS OF USE
        </Link>
        <span className="border-r-2 border-[#535353] h-6 mx-4"></span>
        <Link href="/privacy-policy" className="text-lg transition_border font-bricolage_grotesque">
          PRIVACY POLICY
        </Link>
      </div>
    </div>
  );
}
