import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";
import UserAuthForm from "@/components/UserAuthForm";

export const metadata: Metadata = {
  title: "アカウントの作成",
  description: "アカウント作成して開始します。",
};

export default function RegisterPage() {
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 md:left-8 md:top-8"
        )}
      >
       ホームに戻る
      </Link>
      <div className="h-full bg-muted lg:block hidden" />
      <div className="lg:p-8">
        <div className="mx-auto w-full flex flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              アカウントの作成
            </h1>
            <p className="text-sm text-muted-foreground">
              メールアドレスを入力してアカウントを作成してください。
            </p>
          </div>

          <UserAuthForm />

          <p className="px-8 text-center text-sm text-muted-foreground">
            続けてクリックすれば私たちの
            <Link
              href="/terms"
              className="hover:text-brand underline underline-offset-4"
            >
              利用規約
            </Link>
            と
            <Link
              href="/privacy"
              className="hover:text-brand underline underline-offset-4"
            >
              プライバシーポリシー
            </Link>
            に同意します。
          </p>
        </div>
      </div>
    </div>
  );
}