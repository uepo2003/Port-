import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { DeleteAcountButton } from "./_components/DeleteAcountButton";
import React from "react";
import { SubscriptionDetailButton } from "./_components/SubscriptionDetailButton";
import { ThemeSwitch } from "@/components/ThemeSwitch";

export default async function SettingsPage() {
  const currentUser = await getCurrentUser();
  const user = await db.user.findUnique({
    select: {
      name: true,
      email: true,
      image: true,
    },
    where: {
      id: currentUser?.id,
    },
  });

  return (
    <div className="flex flex-col container w-full mx-auto py-8">
      <div className="mb-10">
        <h2 className="font-extrabold text-4xl">あなたのプロフィール</h2>
        <p className="text-xl text-muted-foreground mt-4 leading-6">
          これはあなたのプロフィールです。GitHubから変更できます。
        </p>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-40 h-40 rounded-full overflow-hidden">
          <img
            src={user!.image || ""}
            width={160}
            height={160}
            alt="User Profile"
            className="w-full h-full object-cover"
            style={{ aspectRatio: "160/160", objectFit: "cover" }}
          />
        </div>
        <h1 className="text-3xl font-bold mt-6">{user!.name}</h1>
        <p className="text-muted-foreground text-lg mt-2">{user!.email}</p>
        <div className="container flex flex-col items-center mt-8 gap-4">
          <section className="flex flex-row justify-between w-8/12">
            <p className="text-muted-foreground text-xl mt-2">テーマ選択</p>
            <ThemeSwitch />
          </section>
          <section className="flex flex-row justify-between w-8/12">
            <p className="text-muted-foreground text-lg mt-2 text-xl ">
              お支払いプラン
            </p>
            <SubscriptionDetailButton />
          </section>
          <form
            id="deleteAccountForm"
            action={async () => {
              "use server";
              await db.user.delete({ where: { id: currentUser?.id } });
            }}
          >
            <DeleteAcountButton />
          </form>
        </div>
      </div>
    </div>
  );
}
