"use client";
import Services from "@/components/web_pages/index/services";
import Certification from "@/components/reusables/certification";
import Why_us from "@/components/reusables/why_us/why_us";
import { usePathname } from "next/navigation";
import whyUsData from "@/utils/data/why_us_data.json";
import Header from "@/components/web_pages/index/header/header";

export default function Home() {
  const pathname = usePathname();
  const filteredWhyData =
    pathname === "/"
      ? whyUsData.filter((item) => item)
      : whyUsData.filter((item) => item.tag === pathname.slice(1));

  return (
    <main className="flex min-h-screen flex-col text-[#090909]">
      <Header />
      <Services />
      <section className="lg:px-6 px-6">
        <Why_us data={filteredWhyData} />
      </section>
      <Certification />
    </main>
  );
}
