"use client";
import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { PlusIcon } from "@radix-ui/react-icons";
import { TableProps } from "@/utils/types/types";

const Table: React.FC<TableProps> = ({ data }) => (
  <div className="bg-[#452569] text-white lg:px-6 md:px-3 px-2 py-12 flex flex-col gap-y-4">
    <div className="w-full px-4 flex flex-col gap-2">
      <h1 className="text-3xl font-bold">Your questions, answered</h1>
      <small>Have another question? Email us at info@rejeses.com.</small>
    </div>
    <Accordion.Root
      className="w-full rounded-md"
      type="single"
      defaultValue="item-1"
      collapsible
    >
      {data.map((item) => (
        <AccordionItem key={item.id} value={item.id} className="bg-[#452569] text-white text-lg">
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion.Root>
  </div>
);

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
      className={`hover:bg-[#3c205c] cursor-pointer group flex h-[45px] flex-1 my-2 items-center justify-between py-8 bg-[#452569] text-white px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none ${
        className ?? ""
      }`}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <PlusIcon
        width="25px"
        height="25px"
        className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </Accordion.Trigger>
  </Accordion.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Content>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={`data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px] ${
      className ?? ""
    }`}
    {...props}
    ref={forwardedRef}
  >
    <div className="py-[15px] px-5">{children}</div>
  </Accordion.Content>
));
AccordionContent.displayName = "AccordionContent";

export default Table;
