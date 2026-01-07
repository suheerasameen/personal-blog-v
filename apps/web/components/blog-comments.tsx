"use client";

import { Comments } from "@fuma-comment/react";
import { useRouter } from "next/navigation";
import { cn } from "@repo/shadverse/lib/utils";

export function BlogComments({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const router = useRouter();
  
  // Use the full slug including /blog prefix
  // or use a simple identifier without slashes
  const pageId = slug.replace(/\//g, '-').replace(/^-/, '');

  return (
    <Comments
      page={pageId}
      apiUrl="/api/comments"
      className={cn("w-full", className)}
      auth={{
        type: "api",
        signIn: () => {
          router.push("/login");
        },
      }}
    />
  );
}
