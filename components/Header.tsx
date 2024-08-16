import React from "react";
import { MainNav } from "./MainNav";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { maketingNavConfig } from "@/config/marketing";

type headerProps = {
  isActive: boolean;
};

const Header = ({ isActive }: headerProps) => {
  return (
    <div
      className={`sticky top-0 z-50 ${isActive ? "transition-opacity duration-500 opacity-100" : "transition-opacity duration-500 opacity-100"}`}
    >
      <header className="container bg-background">
        <div className="h-20 py-6 flex items-center justify-between">
          <MainNav items={maketingNavConfig.items} />
          <nav>
            <Link
              href={"/login"}
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4",
              )}
            >
              ログイン
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
