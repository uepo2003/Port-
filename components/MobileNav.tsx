import { NavItem } from "@/types";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import Link from "next/link";
import React, { ReactNode } from "react";

interface MobileNavItemProps {
  items?: NavItem[];
  chiledren?: ReactNode;
}

export const MobileNav = ({ items }: MobileNavItemProps) => {
  useLockBodyScroll();
  return (
    <div className="fixed top-16 left-0 right-0 bottom-0 z-50 p-6 shadow-md md:hidden animate-in slide-in-from-bottom-80">
      <div className="grid gap-6 bg-popover p-4 text-popover-foreground">
        <Link href={"/"} className="font-bold">
         Blog Writer
        </Link>
        <nav className="text-sm flex gap-4">
          {items?.map((item, index) => (
            <Link href={item.href} key={index}>
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
