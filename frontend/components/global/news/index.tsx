"use client";
import { INews } from "@/types/news.types";
import React, { useState, useTransition } from "react";
import { NewsCard } from "./news-card";
import InfiniteLoader from "../infinite-loader";
import { getNews } from "@/lib/actions/news.actions";
import { DEFAULT_LIMIT } from "@/constants";

interface Props {
  news: INews[];
}

export const NewsSection: React.FC<Props> = ({ news: newsList }) => {
  const [isPending, startTransition] = useTransition();
  const [offset, setOffset] = useState(DEFAULT_LIMIT);
  const [news, setNews] = useState<INews[]>(newsList);
  const [hasMore, setHasMore] = useState(true);
  const fetchNextPage = () => {
    startTransition(async () => {
      console.log(
        "fetching next page LIMIT: ",
        DEFAULT_LIMIT,
        "OFFSET: ",
        offset
      );

      const { status, data } = await getNews({
        limit: DEFAULT_LIMIT + 1,
        offset: offset,
      });

      if (status !== 200 || !data) {
        setHasMore(false);
        return;
      }

      console.log(`data ${data.length}`, data);

      if (data.length > DEFAULT_LIMIT) {
        const newsToAdd = data.slice(0, -1);
        setNews([...news, ...newsToAdd]);
        setHasMore(true);
      } else {
        setNews([...news, ...data]);
        setHasMore(false);
      }

      setOffset(offset + DEFAULT_LIMIT);
    });
  };
  return (
    <div className="p-4 flex flex-col gap-7">
      <h1 className="heading-2">Investor News</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(19rem,1fr))] gap-4">
        {news.map((item: INews) => (
          <NewsCard key={item.id} {...item} />
        ))}
      </div>
      <InfiniteLoader
        isManual
        isFetchingNextPage={isPending}
        hasNextpage={hasMore}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
};
