"use client";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export const SignOut = () => {
  return (
    <div>
      <Button className="button" onClick={() => signOut({ callbackUrl: "/" })}>
        ログアウト
      </Button>
    </div>
  );
};
