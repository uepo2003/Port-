import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const ContactCard = () => {
  return (
    <>
      <Card className="w-full max-w-[58rem] mx-auto">
        <CardHeader>
          <CardTitle>お問い合わせフォーム</CardTitle>
          <CardDescription>
            このwebサイトに関する質問、お仕事に関するお問い合わせはこちらからお願いします。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-4 text-start"
            method="post"
            action="https://kairi-com.form.newt.so/v1/NPTqsnGZr"
          >
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">名前</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  type="text"
                  name="Full name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">お問い合わせ内容</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your message"
                  className="min-h-[150px]"
                  name="ContactDetails"
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Button type="submit" className="w-1/3">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
