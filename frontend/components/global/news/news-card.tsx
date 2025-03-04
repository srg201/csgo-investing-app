"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { ClockIcon, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { INews } from "@/types/news.types";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

interface Props extends INews {
  className?: string;
}

export const NewsCard: React.FC<Props> = ({ ...item }) => {
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const renderThumbnail = () => {
    if (!item?.imageUrl || imageError) {
      return (
        <div className="aspect-video size-full object-cover bg-muted rounded-lg opacity-100 absolute top-0 left-0 flex items-center justify-center">
          <div className="flex items-center justify-center gap-2">
            <ImageIcon className="size-4 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">No thumbnail</p>
          </div>
        </div>
      );
    }

    return (
      <Image
        src={item.imageUrl}
        alt={item.title}
        width={600}
        height={300}
        className="aspect-video size-full object-cover rounded-lg absolute top-0 left-0"
        onError={handleImageError}
      />
    );
  };

  return (
    <Card className="border-dashed border-border h-full flex-1" key={item.id}>
      <CardHeader className="m-2 relative group aspect-video">
        {renderThumbnail()}
      </CardHeader>
      <CardTitle className="pl-2 text-lg font-semibold truncate">
        {item.title}
      </CardTitle>
      <CardContent className="text-muted-foreground p-2 pb-0">
        <div className="flex items-center gap-2 flex-grow mb-2 mt-2 text-sm">
          <ClockIcon className="size-4" />{" "}
          {formatDistanceToNow(new Date(item.createdAt), {
            addSuffix: true,
          })}
          <Separator orientation="vertical" className="h-4" />
          {item.timeToRead && (
            <span className="text-muted-foreground">
              {Math.round(item.timeToRead / 60)} min read
            </span>
          )}
        </div>
        <p className="line-clamp-2">{item.content}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-2 text-muted-foreground text-sm p-2 flex-grow mt-4">
        <Button className="w-full" asChild>
          <Link href={`/news/${item.id}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
