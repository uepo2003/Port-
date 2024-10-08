"use client";
import Link from "next/link";
import { NavItem } from "@/types";
import { ReactNode, useState } from "react";
import { MobileNav } from "./MobileNav";
import { Link as Scroll } from "react-scroll";

interface NavItemProps {
  items: NavItem[];
  chiledren?: ReactNode;
  isLoggedin?: boolean;
}

export const MainNav = ({ items, isLoggedin }: NavItemProps) => {
  const [showMobileMenu, setShowMobikeMenu] = useState<boolean>(false);
  return (
    <div className="flex items-center md:gap-10">
      {isLoggedin ? (
        <Link
          href={"/dashboard"}
          className=" hidden md:flex items-center space-x-2"
        >
          <span className="font-bold hidden sm:inline-block">Blog Writer</span>
        </Link>
      ) : (
        <Link href={"/"} className=" hidden md:flex items-center space-x-2">
          <span className="font-bold hidden sm:inline-block">Blog Writer</span>
        </Link>
      )}
      <nav className="md:flex gap-6 hidden">
        {items?.map((item, index) => {
          if (item.title === "特徴") {
            return (
              <Scroll
                key={index}
                to="features"
                className="text-lg sm:text-sm font-medium hover:text-foreground/80"
                smooth={true}
                duration={600}
                offset={-50}
              >
                {item.title}
              </Scroll>
            );
          }

          if (item.title === "お問い合わせ") {
            return (
              <Scroll
                key={index}
                to="contact"
                className="text-lg sm:text-sm font-medium hover:text-foreground/80"
                smooth={true}
                duration={600}
                offset={-50}
              >
                {item.title}
              </Scroll>
            );
          }
          return (
            <Link
              key={index}
              href={item.href}
              className="text-lg sm:text-sm font-medium hover:text-foreground/80"
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
      <button
        className="md; hidden"
        onClick={() => {
          setShowMobikeMenu(!setShowMobikeMenu);
        }}
      >
        <span>メニュー</span>
      </button>

      {showMobileMenu && <MobileNav items={items} />}
    </div>
  );
};
