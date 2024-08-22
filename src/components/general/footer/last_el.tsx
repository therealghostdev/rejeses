import Image from "next/image";
import Link from "next/link";

export default function Last_el() {
  return (
    <div className="flex justify-between items-center py-8 md:px-12 px-6 w-full text-[#5B5B5B] md:flex-nowrap flex-wrap-reverse">
      <div className="lg:w-[30%] md:w-[50%] w-full flex lg:justify-between md:justify-around justify-between items-center text-nowrap text-ellipsis">
        <p className="text-2xl lg:mx-2">&copy;</p>

        <p className="text-lg lg:mx-2">
          2024 <span className="font-bold italic">rejeses</span>.
        </p>

        <p className="text-lg lg:mx-2">All rights reserved</p>
      </div>

      <div className="lg:w-1/4 md:w-[40%] w-full flex md:justify-end justify-between items-center md:mb-0 mb-8">
        <Link
          href="https://www.instagram.com/rejeses_pmc/"
          target="_blank"
          className="md:mx-4"
        >
          <Image src="/instagram.png" alt="linkedIn" width={30} height={50} />
        </Link>

        <Link
          href="https://www.facebook.com/rejeses_pmc/"
          target="_blank"
          className="md:mx-4"
        >
          <Image src="/facebook.png" alt="linkedIn" width={30} height={50} />
        </Link>

        <Link
          href="https://www.linkedin.com/company/rejeses"
          target="_blank"
          className="md:mx-4"
        >
          <Image src="/linkedIn.svg" alt="linkedIn" width={30} height={50} />
        </Link>

        <Link
          href="https://twitter.com/rejeses_pmc"
          target="_blank"
          className="md:mx-4"
        >
          <Image
            src="/twitter.svg"
            alt="X(Formerly-twitter)"
            width={30}
            height={50}
          />
        </Link>

        <Link href="mailto:rejesesconsult@gmail.com" className="md:mx-4">
          <Image src="/mail.svg" alt="E-mail" width={30} height={50} />
        </Link>
      </div>
    </div>
  );
}
