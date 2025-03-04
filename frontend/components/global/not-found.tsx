import React from "react";
import { BoxIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  title?: string;
  description?: string;
  linkText?: string;
  linkHref?: string;
  hasLink?: boolean;
}
export const NotFound: React.FC<Props> = ({
  title,
  description,
  linkText,
  linkHref,
  hasLink = true,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full gap-4">
      <BoxIcon className="size-20" />
      <h1 className="text-4xl font-semibold">
        {title || "Nothing to see here"}
      </h1>
      <p className="text-gray-500">
        {description || "The page you are looking for does not exist."}
      </p>
      {hasLink && (
        <Button asChild variant={"ghost"}>
          <Link href={linkHref || "/"}>{linkText || "Go home"}</Link>
        </Button>
      )}
    </div>
  );
};
