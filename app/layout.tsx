import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { sitCongig } from "@/config/site";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";

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
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background antialiased min-h-screen",
          fontoNoto.className,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
