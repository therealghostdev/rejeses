"use client";
import React, { useEffect } from "react";
import Table from "./table";
import BookSession from "./book_session";
import LastEl from "./last_el";
import tableData from "@/utils/data/table_data.json";
import { usePathname } from "next/navigation";
import { FooterProps } from "@/utils/types/types";

const Footer: React.FC<FooterProps> = () => {
  const pathname = usePathname();

  const filteredData =
    pathname === "/"
      ? tableData
      : tableData.filter((item) => item.tag === pathname);

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <footer>
      <Table data={filteredData} />
      <BookSession />
      <LastEl />
    </footer>
  );
};

export default Footer;
