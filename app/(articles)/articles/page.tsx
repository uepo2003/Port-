import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { db } from "@/lib/db";
import Link from "next/link";
import React from "react";
import { ja } from "date-fns/locale/ja";
import { ImageOff } from "lucide-react";
import { format } from "date-fns";
import { getCurrentUser } from "@/lib/session";

const ArticlesPage = async () => {
  const currentUser = await getCurrentUser();
  const posts = await db.post.findMany({
    select: {
      id: true,
      title: true,
      published: true,
      createdAt: true,
      content: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
    where: { 
      published: true,
      authorId: currentUser?.id　|| "sample"
     },
  });

  return posts.length !== 0 ? (
    <main className="py-2 px-4 md:px-6 h-screen">
      <div className="flex flex-col items-center justify-center container">
        <div className="flex flex-col items-start w-full max-w-[1152px] gap-2 mb-6 mx-auto border-b pb-1">
          <h1 className="text-4xl font-bold">記事一覧</h1>
          <p className="text-muted-foreground text-lg font-semibold">
            ここに作成された記事が表示されます
          </p>
        </div>
        <div className="container mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts
            //@ts-ignore
            .map((post) => {
              let description = "";
              let imageUrl = "";
              if (post.content !== null) {
                // @ts-ignore
                description = post.content.blocks.find(
                  (block) => block.data?.level === 1,
                )?.data.text;
                // @ts-ignore
                imageUrl =
                  // @ts-ignore
                  post.content.blocks?.find((block) => block.type === "image")
                    ?.data?.file?.url ?? "";
              }
              return (
                <article className="bg-card rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-2xl" key={"article-component"}>
                  <Link
                    href={`articles/${post.id}`}
                    className="block"
                    prefetch={false}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="Article Image"
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div>
                        <ImageOff className="w-full h-48 object-cover py-8 bg-slate-300" />
                      </div>
                    )}
                    <div className="p-6">
                      <p className="text-muted-foreground text-base">
                        {format(post.createdAt, "yyyy年M月d日")}
                      </p>
                      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                      <p className="text-muted-foreground line-clamp-3">
                        {description
                          ? description
                          : "「見出し１」で設定したテキストがここに表示されます。"}
                      </p>
                    </div>
                  </Link>
                </article>
              );
            })}
        </div>
      </div>
    </main>
  ) : (
    <main className="flex flex-col py-6 px-4 md:px-12 h-screen justify-start">
      <EmptyPlaceholder className="border-slate-500 flex-grow h-screen">
        <EmptyPlaceholder.Icon name="user" />
        <EmptyPlaceholder.Title>
          何も投稿されていません。
        </EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          まずは記事を投稿してみましょう。
        </EmptyPlaceholder.Description>
      </EmptyPlaceholder>
    </main>
  );
};

export default ArticlesPage;
