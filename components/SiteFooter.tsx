import Link from "next/link";
import React from "react";

export const SiteFooter = () => {
  return (
    <footer>
      <div className="container py-10 md:py-0 md:h-20">
        <p className="text-center text-sm md:text-left">
          Built by {""}
          <Link
            href={"/login"}
            className="underline underline-offset-4 font-medium"
            target="_blank"
            rel="noreferrer"
          >
            kairiueno
          </Link>
          .Hosted on {""}
          <Link
            href={"https://vercel.com/"}
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
