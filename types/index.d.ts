export type siteCongig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    x: string;
    github: string;
  };
};

export type navItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type marketingNavConfig = {
  items: navItem[];
};
