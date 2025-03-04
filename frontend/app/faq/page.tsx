import React from "react";
import { FAQ_ITEMS } from "@/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const Page = () => {
  return (
    <div className="w-full p-4">
      <div className="flex flex-col gap-4">
        <h1 className="heading-2">Frequently Asked Questions</h1>
        <p className="text-muted-foreground text-lg mb-4">
          These are some of the most common questions we get asked. If you have
          any other questions, please don&apos;t hesitate to contact us.
        </p>
      </div>
      <Accordion type="single" collapsible>
        {FAQ_ITEMS.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger className="">{item.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="flex flex-col gap-4 mt-7">
        <h2 className="heading-2">Contact Us</h2>
        <p className="text-muted-foreground text-lg mb-4">
          Our Email:{" "}
          <Link
            className="text-primary underline"
            href="mailto:caseinvestor@gmail.com"
          >
            caseinvestor@gmail.com
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
