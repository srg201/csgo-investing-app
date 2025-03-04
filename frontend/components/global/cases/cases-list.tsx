"use client";
import React from "react";
import { ICase } from "@/types/cases.types";
import { CaseCard } from "./case-card";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { NotFound } from "../not-found";
import { ErrorBoundary } from "../error-boundary";

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
        <ErrorBoundary
          error={"Failed to fetch cases"}
          description="Please try again later or contact support"
        />
      ) : cases.length === 0 ? (
        <NotFound
          hasLink={false}
          description="Try adjusting your filters or search criteria to find more cases"
          title="There are no cases"
        />
      ) : null}
    </>
  );
};

export default CasesList;
