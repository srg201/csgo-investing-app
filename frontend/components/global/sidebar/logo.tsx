import Link from "next/link";
import React from "react";

export const Logo: React.FC = () => {
  return (
    <Link href={"/?sortBy=investingRoi&sortType=asc&investType=1year"}>
      <div className="py-4">
        <h1 className="uppercase text-xl font-black leading-none text-primary text-center tracking-widest">
          <span className="tracking-tighter text-2xl">CSGO CASE</span>
          <br />
          INVESTOR
        </h1>
      </div>
    </Link>
  );
};
