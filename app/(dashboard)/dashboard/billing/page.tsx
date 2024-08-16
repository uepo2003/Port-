"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icon";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";

const BillingPage = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentPlan, setCurrentPlan] = React.useState<"FREE" | "PRO">();

  const handleUpgrade = () => {
    fetch("/api/plan", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        setIsOpen(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  React.useEffect(() => {
    fetch("/api/plan", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrentPlan(data.subscriptionPlan);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [isOpen]);

  return (
    <>
      <section className="w-full h-[700px] py-8 dark:from-zinc-900 dark:to-zinc-800 flex flex-col items-center ">
        <div className="container">
          <div className="font-extrabold text-4xl">プランの選択と管理</div>
          <p className="text-xl text-muted-foreground mt-4 leading-6">
            以下の２つのプランからお選びください。
          </p>
        </div>
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 mt-8 md:grid-cols-2 md:gap-8">
            <div className="flex flex-col p-6 bg-white shadow-2xl rounded-lg dark:bg-zinc-850 justify-between border border-gray-300">
              <div>
                <h3 className="text-2xl font-bold text-center dark:text-black">
                  Free
                </h3>
                <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                  <span className="text-4xl font-bold">￥0</span>/ month
                </div>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center dark:text-black">
                    <Icons.CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    3回までのブログ投稿
                  </li>
                  <li className="flex items-center dark:text-black">
                    <Icons.XIcon className="text-white text-xs bg-gray-500 rounded-full mr-2 p-1" />
                    無制限のブログ投稿
                  </li>
                  <li className="flex items-center dark:text-black">
                    <Icons.XIcon className="text-white text-xs bg-gray-500 rounded-full mr-2 p-1" />
                    ドラフト機能
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative flex flex-col p-6 bg-white shadow-2xl rounded-lg dark:bg-zinc-850 justify-between border border-purple-500">
              <div className="px-3 py-1 text-sm text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                Popular
              </div>
              <div>
                <h3 className="text-2xl font-bold text-center dark:text-black">
                  Pro
                </h3>
                <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                  <span className="text-4xl font-bold">￥100</span>/ month
                </div>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center dark:text-black">
                    <Icons.CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    <span className="line-through">3回までのブログ投稿</span>
                  </li>
                  <li className="flex items-center dark:text-black">
                    <Icons.CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    無制限のブログ投稿
                  </li>
                  <li className="flex items-center dark:text-black">
                    <Icons.CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    ドラフト機能
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <Button
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-500 hover:to-pink-500"
                  onClick={() => {
                    if (currentPlan === "PRO") {
                      setIsOpen(false);
                      toast({
                        title: "あなたはすでにProプランに登録されています。",
                        description:
                          "マイページにてプランの詳細をご確認ください。",
                        variant: "default",
                      });
                      return;
                    }
                    setIsOpen(true);
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>本当にこのプランでいいですか？</AlertDialogTitle>
            <AlertDialogDescription>
              このアクションは取り消せません。Continueをクリックすると、Proプランにアップグレードされます。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleUpgrade();
                toast({
                  title: "プランをアップグレードしました",
                  description:
                    "プランをアップグレードしました。Proプランに変更されました。",
                  variant: "default",
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BillingPage;
