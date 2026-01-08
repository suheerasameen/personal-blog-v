import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost, BlogConfiguration } from "./types";
import { cn } from "./utils";

interface PostCardProps {
  post: NonNullable<BlogPost>;
  configuration?: BlogConfiguration;
}

export function PostCard({ post, configuration = {} }: PostCardProps) {
  const CardComponent = configuration.Card || null;
  const cardClassName =
    "order-last border-0 bg-transparent shadow-none sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2";

  const cardContent = (
    <Link
      href={post.url}
      className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 bg-card/50 px-6 py-8 md:py-10 transition-colors hover:bg-card/80"
    >
      <div className="order-2 md:order-1 md:col-span-2 xl:col-span-3 flex h-full flex-col justify-between gap-4">
        <div className="flex-1 gap-4">
          <h2 className="font-medium text-lg md:text-xl lg:text-2xl">
            {post.data.title}
          </h2>
          <p className="line-clamp-3 overflow-hidden text-ellipsis text-medium text-muted-foreground">
            {post.data.description}
          </p>
        </div>
        <div className="flex flex-col justify-center gap-4">
          <div className="group inline-flex items-center gap-2 text-muted-foreground text-sm">
            <span className="inline-flex items-center gap-1 capitalize">
              <svg className="size-4 transition-transform hover:scale-125" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              {post.data.author || "Anonymous"}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <svg className="size-4 transition-transform hover:scale-125" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {new Date(post.data.date).toDateString()}
            </span>
          </div>
        </div>
      </div>

      {(post.data.image || post.url) && (
        <div className="group relative order-1 md:order-2 col-span-1 inline-flex items-center justify-center transition-transform hover:scale-105">
          <img
            width={853}
            height={554}
            src={post.data.image || post.url.replace('/blog/', '/blog-og/') + '/image.png'}
            alt={post.data.title}
            className="relative rounded-lg object-cover w-full h-auto"
          />
        </div>
      )}
    </Link>
  );

  return CardComponent ? (
    <CardComponent key={post.url} className={cardClassName}>
      {cardContent}
    </CardComponent>
  ) : (
    <div key={post.url} className={cardClassName}>
      {cardContent}
    </div>
  );
}
