"use client";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "./ui/button";
import { useState } from "react";
import { Icons } from "./icon";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";

interface PostCreateButtonProps extends ButtonProps {}

export const PostCreateButton = ({
  className,
  variant,
  ...props
}: PostCreateButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onClick() {
    setIsLoading(true);
    const response = await fetch("api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Untitled Post",
      }),
    });

    if (response.status === 402) {
      toast({
        title: "投稿の上限に達したため、新しい投稿を作成できません。",
        description: "Proプランにアップグレードしてください。",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    setIsLoading(false);

    const post = await response.json();

    router.refresh();

    router.push(`editor/${post.id}`);
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className,
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      新しい投稿
    </button>
  );
};
