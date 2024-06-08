"use client";
import React, { useEffect } from "react";
import Table from "./table";
import BookSession from "./book_session";
import LastEl from "./last_el";
import tableData from "@/utils/data/table_data.json";
import { usePathname } from "next/navigation";
import Testimonial from "./testimonial";
import TestimonialData from "@/utils/data/testimonial_data.json";

const Footer: React.FC = () => {
  const pathname = usePathname();

  const filteredTableData =
    pathname === "/"
      ? tableData
      : tableData.filter((item) => item.tag === pathname.slice(1));

  const filteredTestimonalData =
    pathname === "/"
      ? TestimonialData
      : TestimonialData.filter((item) => item.tag === pathname.slice(1));

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <footer>
      <Testimonial data={filteredTestimonalData} />
      <Table data={filteredTableData} />
      <BookSession />
      <LastEl />
    </footer>
  );
};

export default Footer;
