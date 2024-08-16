"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthSchema } from "@/lib/validations/auth";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { z } from "zod";
import { useState } from "react";
import { Icons } from "./Icon";
import { toast } from "./ui/use-toast";
import { signIn } from "next-auth/react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>;

export const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(userAuthSchema) });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    toast({
      title: "メールアドレス認証できませんでした。",
      description: "この機能は現在実装中です。Githubでログインしてください。",
      variant: "destructive",
    });
    setIsLoading(false);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGitHubLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            className={cn(buttonVariants())}
            disabled={isLoading}
            onClick={() => {}}
          >
            {isLoading && <span>Loading...</span>}
            Sign In with Email
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGitHubLoading(true);
          signIn("github");
        }}
        disabled={isLoading || isGitHubLoading}
      >
        {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.github className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </button>
    </div>
  );
};
