"use client";
import React, { useMemo, useEffect, useState } from "react";
import Table from "./table";
import BookSession from "./book_session";
import LastEl from "./last_el";
import tableData from "@/utils/data/table_data.json";
import { usePathname } from "next/navigation";
import Testimonial from "./testimonial";
import TestimonialData from "@/utils/data/testimonial_data.json";

const Footer: React.FC = () => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const decodedPathname = useMemo(
    () => decodeURIComponent(pathname),
    [pathname]
  );

  const filteredTableData = useMemo(() => {
    if (
      decodedPathname === "/" ||
      decodedPathname === "/book-session" ||
      decodedPathname === "/enroll"
    ) {
      return tableData;
    }

    const tag = decodedPathname.split("/")[1];
    return tableData.filter(
      (item) => item.tag.toLowerCase() === tag.toLowerCase()
    );
  }, [decodedPathname]);

  const filteredTestimonalData = useMemo(() => {
    if (
      decodedPathname === "/" ||
      decodedPathname === "/book-session" ||
      decodedPathname === "/enroll"
    ) {
      return TestimonialData;
    }

    const tag = decodedPathname.split("/")[1];
    return TestimonialData.filter(
      (item) => item.tag.toLowerCase() === tag.toLowerCase()
    );
  }, [decodedPathname]);

  useEffect(() => {
    const updateWidth = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
      setIsMobile(newWidth <= 767);
    };

    window.addEventListener("resize", updateWidth);

    // Initial check
    updateWidth();

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <footer className="md:mt-12 my-4">
      <Testimonial data={filteredTestimonalData} />
      <Table data={filteredTableData} />
      {pathname === "/" && !isMobile && <BookSession />}
      <LastEl />
    </footer>
  );
};

export default Footer;
