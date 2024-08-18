import { SiteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export const SiteFooter = ({
  className,
}: React.HTMLAttributes<HTMLElement>) => {
  return (
    <footer className={cn(className)}>
      <div className="container py-10 md:py-0 md:h-20">
        <p className="text-center text-sm md:text-left">
          Built by {""}
          <Link
            href={SiteConfig.links.githubUepo}
            className="underline underline-offset-4 font-medium"
            target="_blank"
            rel="noreferrer"
          >
            kairiueno
          </Link>
          .Hosted on {""}
          <Link
            href={SiteConfig.links.vercel}
            className="underline underline-offset-4 font-medium"
            target="_blank"
            rel="noreferrer"
          >
            Vercel
          </Link>
        </p>
      </div>
    </footer>
  );
};
