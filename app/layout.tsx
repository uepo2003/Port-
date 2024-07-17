import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { sitCongig } from "@/config/site";

const fontoNoto = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: sitCongig.name,
    template: `%s | ${sitCongig.name}`,
  },
  description: sitCongig.description,
  keywords: ["Next.js"],
  authors: [
    {
      name: "kairiueno",
      url: "",
    },
  ],
  // openGraph: {
  //   type: "website",
  //   locale: "ja",
  // },
  twitter: {
    card: "summary_large_image",
    title: sitCongig.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("おはよう1");
  return (
    <html lang="ja">
      <body
        className={cn(
          "bg-background antialiased min-h-screen",
          fontoNoto.className,
        )}
      >
        {children}
      </body>
    </html>
  );
}
