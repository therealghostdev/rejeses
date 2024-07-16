"use client";
import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import { TableProps } from "@/utils/types/types";
import Link from "next/link";

const Table: React.FC<TableProps> = ({ data }) => {
  const replaceBookingLink = (content: string) => {
    const bookingPhrase = "booking a session";
    const parts = content.split(new RegExp(`(${bookingPhrase})`, "i"));

    return parts.map((part, index) => {
      if (part.toLowerCase() === bookingPhrase.toLowerCase()) {
        return (
          <Link key={index} href="/book-session" className="transition_border italic py-1 font-bold font-bricolage_grotesque">
            {bookingPhrase}
          </Link>
        );
      }
      return part;
    });
  };

  return (
    <div className="bg-[#452569] text-white lg:px-12 md:px-6 px-4 py-12 flex flex-col gap-y-4">
      <div className="w-full px-4 flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-bricolage_grotesque">
          Your questions, answered
        </h1>
        <small>
          Have another question?{" "}
          <Link
            href={`/contact-us`}
            className="font-bold transition_border py-1 italic font-bricolage_grotesque"
          >
            Contact us{" "}
          </Link>
        </small>
      </div>
      <Accordion.Root
        className="w-full rounded-md"
        type="single"
        defaultValue="item-1"
        collapsible
      >
        {data.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="bg-[#452569] text-white text-lg"
          >
            <AccordionTrigger className="font-bricolage_grotesque text-left">
              <div className="max-w-[80%] leading-relaxed">{item.title}</div>
            </AccordionTrigger>
            <AccordionContent className="md:text-[20px] text-[15px]">
              <div className="max-w-[80%] leading-relaxed">
                {replaceBookingLink(item.content)}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion.Root>
    </div>
  );
};

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Item>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Item
    className={`mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 ${
      className ?? ""
    }`}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </Accordion.Item>
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Trigger>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      className={`hover:bg-[#3c205c] cursor-pointer group pb-12 flex h-[45px] flex-1 my-2 items-center justify-between lg:py-12 py-8 bg-[#452569] text-white px-5 md:text-[25px] font-bold text-[15px] leading-none shadow-[0_1px_0] outline-none ${
        className ?? ""
      }`}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <span className="relative">
        <PlusIcon
          width="25px"
          height="25px"
          className="transition-transform duration-1000 group-data-[state=open]:rotate-180 group-data-[state=open]:opacity-0"
          aria-hidden
        />
        <MinusIcon
          width="25px"
          height="25px"
          className="absolute top-0 left-0 transition-opacity duration-1000 opacity-0 group-data-[state=open]:opacity-100 group-data-[state=closed]:opacity-0"
          aria-hidden
        />
      </span>
    </Accordion.Trigger>
  </Accordion.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Content>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={`overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp text-[15px] ${
      className ?? ""
    }`}
    {...props}
    ref={forwardedRef}
  >
    <div className="py-[25px] px-5">{children}</div>
  </Accordion.Content>
));
AccordionContent.displayName = "AccordionContent";

export default Table;
