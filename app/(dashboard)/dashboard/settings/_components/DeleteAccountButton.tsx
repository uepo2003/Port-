"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Icons } from "@/components/Icon";
import { toast } from "@/components/ui/use-toast";

export const DeleteAccountButton = () => {
  const handleDeleteAccountClick = async () => {
    await fetch("/api/delete", {
      method: "DELETE",
    })
    .then((response) => {
      const body = response.json()
      return body;
    })
    .then((data) => {  
      console.log(data);
      if (data.status === 200) {
        toast({
          title: "アカウントを削除しました",
          variant: "default",
        })
        signOut( {callbackUrl: "/" });
      } 
    })
    .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            className={cn(
              buttonVariants({
                variant: "ghost",
                className:
                  "text-gray-700 hover:bg-red-500 hover:text-white text-lg py-6 px-10 mt-6 border-2",
              })
            )}
          >
            サインアウト
          </button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              このアクションは取り消せません。アカウントを削除しますか？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 focus:ring-red-600"
              onClick={() => {
                handleDeleteAccountClick();
              }}
            >
              <Icons.trash className="mr-2 h-4 w-4" />
              <span>削除</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
