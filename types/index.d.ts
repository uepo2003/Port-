import { Icons } from "@/components/Icon";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export interface siteCongig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    x: string;
    githubUepo: string;
    github: string;
    vercel: string;
  };
}


export type MarketingNavConfig = {
  items: NavItem []}
;
export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavItem[];
    }
);

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    x: string;
    github: string;
  };
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type ArticleConfig = { mainNav: MainNavItem[] };
