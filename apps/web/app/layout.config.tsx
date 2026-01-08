import { Icons } from "@/components/icons";
import type { BaseLayoutProps, LinkItemType } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

export const title = "Waqas Ishaque — Full Stack Developer & Security Enthusiast";
export const description =
  "Full stack software developer passionate about web development, software engineering, and the latest technologies. I create projects and tutorials to help developers learn and grow.";
export const owner = "Waqas Ishaque";
/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <img
          src="/logo.png"
          width={28}
          height={28}
          alt="waqasishaque logo"
          className="rounded-full"
        />{" "}
        Waqas Ishaque      </>
    ),
  },
  links: [
    {
      text: "Docs",
      url: "/docs",
    },
  ],
};

export const linkItems: LinkItemType[] = [
  {
    icon: <Icons.info />,
    text: "Blog",
    url: "/blog",
    active: "url",
  },
  {
    icon: <Icons.info />,
    text: "Tools",
    url: "/tools",
    active: "nested-url",
  },
  {
    icon: <Icons.info />,
    text: "Tags",
    url: "/tags",
    active: "url",
  },
  {
    icon: <Icons.info />,
    text: "About",
    url: "/about",
    active: "url",
  },
  {
    icon: <Icons.gitHub />,
    text: "GitHub",
    url: "https://github.com/WaqasIshaque1",
    external: true,
    type: "icon",
  },
  {
    icon: <Icons.linkedin />,
    text: "LinkedIn",
    url: "https://pk.linkedin.com/in/waqas-ishaque",
    external: true,
    type: "icon",
  },
];

export const postsPerPage = 5;
