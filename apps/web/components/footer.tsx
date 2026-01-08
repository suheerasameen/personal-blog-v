import { baseOptions, linkItems } from "@/app/layout.config";
import { getBlogPosts } from "@/lib/source";
import { cn } from "@repo/shadverse/lib/utils";
import { getLinks } from "fumadocs-ui/layouts/shared";
import Link from "next/link";

export function Footer() {
  const links = getLinks(linkItems, baseOptions.githubUrl);
  const navItems = links.filter((item) =>
    ["nav", "all"].includes(item.on ?? "all")
  );

  const posts = getBlogPosts();

  return (
    <footer className={cn("flex flex-col gap-4")}>
      <div
        className={cn(
          "grid gap-8 text-muted-foreground text-sm grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
          "container mx-auto px-6 py-12 sm:gap-16 sm:px-8 sm:py-16",
          "border-border/70 border-t border-dashed dark:border-border"
        )}
      >
        <div className="flex flex-col gap-6 text-center md:text-left">
          <p className="font-medium text-foreground">Pages</p>

          <ul className="flex flex-col gap-3 items-center md:items-start">
            <li className="flex items-center gap-2">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            {navItems
              .filter(
                (item) =>
                  item.type !== "menu" &&
                  item.type !== "custom" &&
                  item.type !== "icon"
              )
              .map((item, i) => (
                <li key={item.url}>
                  <Link
                    key={i.toString()}
                    href={item.url}
                    className="hover:text-foreground transition-colors"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6 text-center md:text-left">
          <p className="font-medium text-foreground">Posts</p>

          <ul className="flex flex-col gap-3 items-center md:items-start">
            {posts.slice(0, 5).map((post, i) => (
              <li key={post.url}>
                <Link
                  key={i.toString()}
                  href={post.url}
                  className="hover:text-foreground transition-colors"
                >
                  {post.data.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6 text-center md:text-left">
          <p className="font-medium text-foreground">Socials</p>

          <ul className="flex flex-col gap-3 items-center md:items-start">
            {navItems
              .filter((item) => item.type === "icon")
              .map((item, i) => (
                <li key={item.url}>
                  <Link
                    key={i.toString()}
                    href={item.url}
                    className="inline-flex items-center gap-1.5 text-muted-foreground no-underline hover:text-foreground transition-colors [&_svg]:size-4"
                  >
                    {item.icon}
                    {item.text}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
