import { Section } from "@/components/section";
import { createMetadata } from "@/lib/metadata";
import { getPostsByTag, getTags } from "@/lib/source";
import { Tag } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cn } from "@repo/shadverse/lib/utils";

export const dynamic = "force-static";
export const dynamicParams = false;

const postsPerPage = 10;

const totalPosts = (title: string) => getPostsByTag(title).length;
const pageCount = (title: string) =>
  Math.ceil(totalPosts(title) / postsPerPage);

const CurrentPostsCount = ({
  startIndex,
  endIndex,
  tag,
}: {
  startIndex: number;
  endIndex: number;
  tag: string;
}) => {
  const total = totalPosts(tag);
  const start = startIndex + 1;
  const end = endIndex < total ? endIndex : total;
  if (start === end) return <span>({start})</span>;
  return (
    <span>
      ({start}-{end})
    </span>
  );
};

const Header = ({
  tag,
  startIndex,
  endIndex,
}: {
  tag: string;
  startIndex: number;
  endIndex: number;
}) => (
  <Section className="p-4 lg:p-6">
    <div className="flex items-center gap-2">
      <Tag
        size={20}
        className="text-muted-foreground transition-transform hover:rotate-12 hover:scale-125"
      />
      <h1 className="font-bold text-3xl leading-tight tracking-tighter md:text-4xl">
        {tag} <span className="text-muted-foreground">Posts</span>{" "}
        <CurrentPostsCount
          startIndex={startIndex}
          endIndex={endIndex}
          tag={tag}
        />
      </h1>
    </div>
  </Section>
);

const PostCard = ({
  title,
  description,
  url,
  date,
  tags,
}: {
  title: string;
  description: string;
  url: string;
  date: string;
  tags?: string[];
}) => (
  <Link
    href={url}
    className="group flex flex-col gap-4 p-4 transition-colors hover:bg-fd-accent/10 sm:p-6"
  >
    <div className="flex flex-col gap-2">
      <h2 className="font-semibold text-xl group-hover:text-fd-primary transition-colors">
        {title}
      </h2>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
    <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-sm">
      <time dateTime={date}>{date}</time>
      {tags && tags.length > 0 && (
        <>
          <span>•</span>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-fd-muted px-2 py-0.5 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  </Link>
);

const Pagination = ({
  pageIndex,
  tag,
  totalPages,
}: {
  pageIndex: number;
  tag: string;
  totalPages: number;
}) => {
  const currentPage = pageIndex + 1;
  
  return (
    <Section className="bg-dashed p-4">
      <div className="flex items-center justify-center gap-2">
        {currentPage > 1 && (
          <Link
            href={`/tags/${tag}${currentPage === 2 ? "" : `?page=${currentPage - 1}`}`}
            className={cn(
              "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
              "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
              "h-9 px-4"
            )}
          >
            Previous
          </Link>
        )}
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        {currentPage < totalPages && (
          <Link
            href={`/tags/${tag}?page=${currentPage + 1}`}
            className={cn(
              "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
              "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
              "h-9 px-4"
            )}
          >
            Next
          </Link>
        )}
      </div>
    </Section>
  );
};

export default async function Page(props: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const tag = params.slug[0];
  if (!tag) return notFound();

  const pageParam = searchParams.page;
  const pageIndex = pageParam
    ? Number.parseInt(Array.isArray(pageParam) ? pageParam[0] : pageParam, 10) - 1
    : 0;

  if (pageIndex < 0 || pageIndex >= pageCount(tag)) notFound();

  const startIndex = pageIndex * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const posts = getPostsByTag(tag).slice(startIndex, endIndex);

  return (
    <>
      <Header tag={tag} startIndex={startIndex} endIndex={endIndex} />
      <Section className="h-full" sectionClassName="flex flex-1">
        <div className="grid divide-y divide-dashed divide-border/70 text-left dark:divide-border">
          {posts.map((post) => {
            const date = new Date(post.data.date).toDateString();
            return (
              <PostCard
                title={post.data.title}
                description={post.data.description ?? ""}
                url={post.url}
                date={date}
                key={post.url}
                tags={post.data.tags}
              />
            );
          })}
        </div>
      </Section>
      {pageCount(tag) > 1 && (
        <Pagination pageIndex={pageIndex} tag={tag} totalPages={pageCount(tag)} />
      )}
    </>
  );
}

export const generateStaticParams = () => {
  const tags = getTags();
  return [
    ...tags.map((tag) => ({ slug: [tag] })),
    ...tags.flatMap((tag) =>
      Array.from({ length: pageCount(tag) }, (_, index) => ({
        slug: [tag, (index + 1).toString()],
      }))
    ),
  ];
};

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const tag = params.slug[0];
  const pageParam = searchParams.page;
  const pageIndex = pageParam
    ? Number.parseInt(Array.isArray(pageParam) ? pageParam[0] : pageParam, 10)
    : 1;

  const isFirstPage = pageIndex === 1 || !searchParams.page;
  const pageTitle = isFirstPage
    ? `${tag} Posts`
    : `${tag} Posts - Page ${pageIndex}`;
  const canonicalUrl = isFirstPage
    ? `/tags/${tag}`
    : `/tags/${tag}?page=${pageIndex}`;

  return createMetadata({
    title: pageTitle,
    description: `Posts tagged with ${tag}${
      !isFirstPage ? ` - Page ${pageIndex}` : ""
    }`,
    openGraph: {
      url: canonicalUrl,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  });
}
