import type { Icon as LucideIcon, LucideProps } from "lucide-react";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Code,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image,
  Info,
  Laptop,
  Loader2,
  LogIn,
  LogOut,
  Mail,
  Menu,
  Moon,
  MoreVertical,
  Newspaper,
  Pizza,
  Plus,
  Rss,
  SendHorizonal,
  Settings,
  ShareIcon,
  SunMedium,
  Tag,
  Tags,
  Trash,
  User,
  X,
  Computer,
} from "lucide-react";
type IconProps = React.HTMLAttributes<SVGElement>;

export type Icon = typeof LucideIcon;

export const Icons = {
  computer: Computer,
  // logo: Code,
  close: X,
  menu: Menu,
  code: Code,
  copied: ClipboardCheck,
  success: CheckCircle,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  tags: Tags,
  tag: Tag,
  share: ShareIcon,
  posts: Newspaper,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  logIn: LogIn,
  logOut: LogOut,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  info: Info,
  arrowUpRight: ArrowUpRight,
  chevronDown: ChevronDown,
  mail: Mail,
  send: SendHorizonal,
  gitHub: ({ ...props }: LucideProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  linkedin: ({ ...props }: LucideProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  logo: ({ ...props }: LucideProps) => (
    <svg
      width={400}
      height={400}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M135 50C154.33 50 170 65.67 170 85L170 350L125 350C105.67 350 90 334.33 90 315L90 50L135 50Z"
        fill="var(--logo-color-1)"
      />
      <path
        d="M310 315C310 334.33 294.33 350 275 350L90 350L90 305C90 285.67 105.67 270 125 270L310 270L310 315Z"
        fill="var(--logo-color-2)"
      />
      <path
        d="M250 315C250 334.33 234.33 350 215 350L90 350L90 305C90 285.67 105.67 270 125 270L250 270L250 315Z"
        fill="var(--logo-color-3)"
      />
    </svg>
  ),
  check: Check,
  rss: Rss,
};
