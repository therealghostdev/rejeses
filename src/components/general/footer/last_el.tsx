import Image from "next/image";
import Link from "next/link";

export default function Last_el() {
  return (
    <div className="flex justify-between items-center py-8 px-6 w-full text-[#5B5B5B] md:flex-nowrap flex-wrap-reverse">
      <div className="lg:w-1/4 md:w-[50%] w-full flex justify-between items-center">
        <p className="text-2xl">&copy;</p>

        <p className="text-lg">2023 rejeses.</p>

        <p className="text-lg">All rights reserved</p>
      </div>

      <div className="lg:w-1/4 md:w-[40%] w-full flex justify-between items-center md:mb-0 mb-4">
        <Link href="">
          <Image src="/linkedIn.svg" alt="linkedIn" width={30} height={50} />
        </Link>

        <Link href="">
          <Image src="/twitter.svg" alt="X(Formerly-twitter)" width={30} height={50} />
        </Link>

        <Link href="">
          <Image src="/mail.svg" alt="E-mail" width={30} height={50} />
        </Link>
      </div>
    </div>
  );
}