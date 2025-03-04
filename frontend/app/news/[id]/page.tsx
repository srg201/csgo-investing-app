import NotFound from "@/app/not-found";
import { GoBackButton } from "@/components/global/news/go-back-button";
import { NewsCard } from "@/components/global/news/news-card";
import { Separator } from "@/components/ui/separator";
import { getNews, getOneNews } from "@/lib/actions/news.actions";
import { INews } from "@/types/news.types";
import { formatDistanceToNow } from "date-fns";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

export const revalidate = 3600;
export const dynamicParams = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { status, data } = await getOneNews(id);
  const { data: newsData } = await getNews({
    limit: 4,
    offset: 0,
    exclude: [id],
  });

  if (status !== 200 || !data) {
    return <NotFound />;
  }

  return (
    <div className="p-4">
      <GoBackButton className="mb-4" />
      <div className="flex flex-col gap-4 items-start lg:flex-row-reverse">
        {data?.imageUrl?.length > 0 && (
          <Image
            src={data?.imageUrl ?? ""}
            alt={data?.title ?? ""}
            width={1000}
            height={1000}
            className="w-full lg:w-1/2 float-right aspect-video object-cover rounded-lg lg:ml-6"
          />
        )}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold">{data?.title}</h1>
          <div className="flex items-center gap-2">
            <p className="text-muted-foreground text-sm flex gap-2 items-center">
              <ClockIcon className="size-4" />
              {formatDistanceToNow(new Date(data?.createdAt ?? new Date()), {
                addSuffix: true,
              })}
            </p>
            <Separator orientation="vertical" className="h-4" />
            {data?.timeToRead && (
              <p className="text-muted-foreground text-sm flex gap-2 items-center">
                {Math.round(data?.timeToRead / 60)} min read
              </p>
            )}
          </div>
          <p className="text-base text-muted-foreground">{data?.content}</p>
        </div>
      </div>
      {newsData?.length > 0 && (
        <div className="mt-20 flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Featured News</h2>
          <p className="text-muted-foreground text-sm">
            Here are some of the latest news and updates from the community.
          </p>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(17.5rem,1fr))] gap-4">
            {newsData &&
              newsData.map((item: INews) => (
                <NewsCard key={item.id} {...item} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
