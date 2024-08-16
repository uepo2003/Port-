"use client";
import { MainNav } from "@/components/MainNav";
import { SiteFooter } from "@/components/SiteFooter";
import { buttonVariants } from "@/components/ui/button";
import { maketingNavConfig } from "@/config/marketing";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { useHeaderScroll } from "../hooks/useHeaderScroll";

import Header from "@/components/Header";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isHeaderActive = useHeaderScroll(500);

  return (
    <div>
      <Header isActive={isHeaderActive} />
      <main>{children}</main>
      <SiteFooter className="border-t" />
    </div>
  );
}
