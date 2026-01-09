import Hero from "@/components/hero";
import { getBlogPosts } from "@/lib/source";
import { RecentPosts } from "@repo/fumadocs-blog/blog";
import { getBlogConfiguration } from "@/blog-configuration";
import { Section } from "@/components/section";
import Separator from "@/components/separator";
import { Code2 } from "lucide-react";
import { NewsletterCTA } from "@/components/newsletter-cta";

export default function HomePage() {
  const posts = getBlogPosts().slice(0, 3);

  return (
    <>
      <Hero />
      <Section className="py-8 sm:py-16">
        <h2 className="text-center font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-['Poppins']">
          <span className="inline-flex items-center gap-3">
            Posts{" "}
            <Code2 className="size-10 text-foreground grayscale transition-transform hover:rotate-12 hover:scale-125" />
          </span>
        </h2>
      </Section>
      <Separator />
      <RecentPosts
        configuration={getBlogConfiguration()}
        posts={posts}
        heading=""
        description=""
        showViewMore={true}
        viewMoreHref="/blog"
      />
      <Separator />
      <NewsletterCTA />
    </>
  );
}
