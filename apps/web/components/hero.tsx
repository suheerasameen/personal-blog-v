import Link from "next/link";
import { Button } from "@repo/shadverse/components/button";
import { SocialIcons } from "@repo/ui/components/social-icons";
import { MoveRight, Code2 } from "lucide-react";
import { Section } from "./section";
import { cn } from "@repo/shadverse/lib/utils";
import * as motion from "motion/react-client";
import Balancer from "react-wrap-balancer";
import Image from "next/image";
import heroImage from "../public/images/gradient-noise-purple-azure-light.png";

export default function Hero() {
  return (
    <Section className="relative flex flex-col items-center justify-center gap-6 overflow-hidden bg-dashed px-4 py-24 sm:px-16 sm:py-32 md:py-40 lg:py-48">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.4,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="-z-10 absolute inset-0 h-full w-full"
      >
        <Image
          src={heroImage}
          alt="Hero Background"
          height={600}
          width={704}
          className="pointer-events-none absolute right-0 bottom-0 h-[900px] w-[1004px] max-w-[1004px] translate-x-1/2 translate-y-1/2 select-none opacity-80 grayscale dark:opacity-100"
          priority
        />
      </motion.div>
      <div className="flex items-center justify-center space-x-2">
        <Code2 className="h-6 w-6 text-primary transition-transform hover:scale-125" />
        <span className="font-medium text-muted-foreground text-sm">
          Full Stack Developer & Security Enthusiast
        </span>
      </div>
      <h1 className="max-w-3xl text-center font-bold text-4xl leading-tight tracking-tighter sm:text-5xl md:max-w-4xl md:text-6xl lg:leading-[1.1]">
        <Balancer>Hi, I'm Waqas Ishaque</Balancer>
      </h1>
      <p className="max-w-xl text-center text-muted-foreground md:max-w-2xl md:text-lg">
        <Balancer>
          A full stack software developer passionate about web development, software engineering, and the latest technologies. 
          I create projects and tutorials to help developers learn and grow, while exploring cybersecurity on the side.
        </Balancer>
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          className={cn(
            "group rounded-full bg-primary hover:bg-primary/90",
            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
            "bg-primary text-primary-foreground hover:bg-primary/90",
            "h-11 rounded-md px-8"
          )}
          href="/blog"
        >
          Browse Posts
          <MoveRight className="group-hover:-rotate-12 ml-2 size-5 transition-transform" />
        </Link>

        <div className="flex items-center space-x-4">
          <Link
            href="https://github.com/WaqasIshaque1"
            target="_blank"
            className={cn(
              "rounded-full",
              "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
              "hover:bg-accent hover:text-accent-foreground",
              "h-10 w-10"
            )}
          >
            <SocialIcons.github className="size-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://pk.linkedin.com/in/waqas-ishaque"
            target="_blank"
            className={cn(
              "rounded-full",
              "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
              "hover:bg-accent hover:text-accent-foreground",
              "h-10 w-10"
            )}
          >
            <SocialIcons.linkedin className="size-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
      </div>
    </Section>
  );
}
