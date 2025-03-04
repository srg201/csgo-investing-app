import { ErrorBoundary } from "@/components/global/error-boundary";
import { NewsSection } from "@/components/global/news";
import { DEFAULT_LIMIT } from "@/constants";
import { getNews } from "@/lib/actions/news.actions";
import React from "react";

export const revalidate = 3600; // invalidate every hour

const Page = async () => {
  const { status, data } = await getNews({
    limit: DEFAULT_LIMIT,
    offset: 0,
    exclude: [],
  });

  if (status !== 200) {
    return (
      <ErrorBoundary
        error={"Failed to fetch news"}
        description="Please try again later or contact support"
      />
    );
  }

  return <NewsSection news={data} />;
};

export default Page;
