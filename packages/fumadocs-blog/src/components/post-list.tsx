import { Pagination } from "./pagination";
import { DocsTitle, DocsDescription } from "fumadocs-ui/page";
import { BlogConfiguration, type BlogPost } from "./types";
import { slot } from "./shared";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "fumadocs-ui/components/ui/button";

export type PostListProps = {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
  heading?: string;
  description?: string;
  basePath?: string;
  disablePagination?: boolean;
  configuration?: BlogConfiguration;
  showViewMore?: boolean;
  viewMoreHref?: string;
};

export function PostList({
  posts,
  currentPage,
  totalPages,
  heading = "Blog Posts",
  description = "Notes and ramblings, typically about LLMs.",
  basePath = "/blog",
  disablePagination = false,
  configuration,
  showViewMore = false,
  viewMoreHref = "/blog",
}: PostListProps) {
  // PostCard is now imported directly

  return (
    <>
      {(heading || description) && (
        <section className="relative container px-4 py-6 lg:px-6 text-left bg-zinc-50/50 dark:bg-zinc-900/50">
          {slot(configuration?.backgroundPattern, null)}

          <div className="text-center">
            <DocsTitle className="dark:text-white capitalize">
              {heading}
            </DocsTitle>
            <DocsDescription className="mt-3 dark:text-gray-300 mb-0">
              {description}
            </DocsDescription>
          </div>
        </section>
      )}

      <section className="relative container text-left">
        {slot(configuration?.backgroundPattern, null)}
        <div className="grid divide-y divide-dashed divide-border/70 border-x border-dashed border-border/70 dark:divide-border dark:border-border">
          {posts
            .filter(
              (post): post is NonNullable<typeof post> => post !== undefined
            )
            .map((post) => {
              if (configuration?.PostCard) {
                return (
                  <configuration.PostCard
                    key={post.url}
                    post={post}
                    configuration={configuration}
                  />
                );
              }
            })}
          {showViewMore && (
            <Link
              href={viewMoreHref}
              className="group flex items-center justify-center rounded-none py-5 sm:py-8 text-base sm:text-lg bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-colors"
            >
              View More
              <ArrowUpRight className="group-hover:-rotate-12 ml-2 size-5 transition-transform" />
            </Link>
          )}
        </div>

        {!disablePagination && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={basePath}
            configuration={configuration}
          />
        )}
      </section>
    </>
  );
}
