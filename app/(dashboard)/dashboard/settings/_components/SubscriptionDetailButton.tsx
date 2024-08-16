"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { cancelSubscription } from "@/app/actions/subscription";

export const SubscriptionDetailButton = () => {
  const [status, setStatus] = useState();
  const handleCancelSubscription = async () => {
    try {
      await cancelSubscription();
      toast({
        title: "プランを解約しました",
        description: "プランを解約しました。無料プランに変更されました。",
        variant: "default",
      });
    } catch (error) {
      console.error("Subscription cancellation failed:", error);
      toast({
        title: "エラー",
        description: "プランの解約に失敗しました。",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      fetch("/api/plan", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setStatus(data.subscriptionPlan);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    fetchSubscriptionStatus();
  }, []);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>確認する</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>現在のプラン</DialogTitle>
            <DialogDescription>
              <p className="text-lg">
                今のあなたのプランは、
                {status === "PRO" ? (
                  <span className="font-bold text-slate-800">Proプラン</span>
                ) : (
                  <span className="font-bold text-slate-800">無料プラン</span>
                )}
                です。
              </p>
              {status === "PRO" ? (
                <>
                  <p className="text-sm mt-2">
                    次回の支払い日は、
                    <span className="font-bold text-slate-800">
                      2022年12月31日
                    </span>
                    です。
                  </p>
                  <p className="text-sm sm:max-w-[350px]">
                    プランを解約する場合は、下の
                    <span className="font-bold text-slate-800 mx-1">
                      解約する
                    </span>
                    ボタンをクリックしてください。
                  </p>{" "}
                </>
              ) : (
                <p className="text-sm mt-2">
                  有料プランにアップグレードする場合は、お支払いページからアップグレードしてください。
                </p>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {status === "PRO" && (
              <Button
                onClick={handleCancelSubscription}
                className={cn(
                  buttonVariants({ variant: "default", size: "default" }),
                )}
              >
                解約する
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
