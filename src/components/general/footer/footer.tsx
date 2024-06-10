"use client";
import React, { useMemo } from "react";
import Table from "./table";
import BookSession from "./book_session";
import LastEl from "./last_el";
import tableData from "@/utils/data/table_data.json";
import { usePathname } from "next/navigation";
import Testimonial from "./testimonial";
import TestimonialData from "@/utils/data/testimonial_data.json";

const Footer: React.FC = () => {
  const pathname = usePathname();

  const decodedPathname = useMemo(
    () => decodeURIComponent(pathname),
    [pathname]
  );

  const filteredTableData = useMemo(() => {
    if (decodedPathname === "/") {
      return tableData;
    }

    const tag = decodedPathname.split("/")[1];
    return tableData.filter(
      (item) => item.tag.toLowerCase() === tag.toLowerCase()
    );
  }, [decodedPathname]);

  const filteredTestimonalData = useMemo(() => {
    if (decodedPathname === "/") {
      return TestimonialData;
    }

    const tag = decodedPathname.split("/")[1];
    return TestimonialData.filter(
      (item) => item.tag.toLowerCase() === tag.toLowerCase()
    );
  }, [decodedPathname]);

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
