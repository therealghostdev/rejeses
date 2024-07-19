"use client";
import Link from "next/link";
import { DynamicNavProps } from "@/utils/types/types";
// import { useRouter } from "next/navigation";

export default function Dynamic_nav(props: DynamicNavProps) {
  // const router = useRouter();

  return (
    <nav className="flex font-bricolage_grotesque">
      <Link href={props.link1} className="md:mx-0 mx-2 text-[#005A5A]">
        {props.link_text1}
      </Link>
      <span className="md:mx-0 mx-2">/</span>
      <Link href={props.link2} className="md:mx-0 mx-2">
        {props.link_text2}
      </Link>
    </nav>
  );
}
