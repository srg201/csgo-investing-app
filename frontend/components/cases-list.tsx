"use client";
import React from "react";
import { ICase } from "@/types/cases.types";
import { CaseCard } from "./case-card";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface CasesListProps {
  cases: ICase[];
  error: boolean;
}

const CasesList = ({ cases, error }: CasesListProps) => {
  const [listRef] = useAutoAnimate({ duration: 500 });

  return (
    <>
      <ul
        key={cases.length}
        ref={listRef}
        className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-7 mt-4"
      >
        {cases.length > 0 &&
          cases.map((item: ICase) => (
            <li key={item.id}>
              <CaseCard {...item} />
            </li>
          ))}
      </ul>
      {error ? (
        <li className="col-span-full text-2xl text-red-500 h-full w-full flex items-center justify-center">
          There was an error fetching cases. Please try again later.
        </li>
      ) : cases.length === 0 ? (
        <li className="col-span-full text-2xl text-primary h-full w-full flex items-center justify-center">
          No cases found
        </li>
      ) : null}
    </>
  );
};

export default CasesList;
