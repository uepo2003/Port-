import { db } from "@/lib/db";
import { Post } from "@prisma/client";
import dynamic from "next/dynamic";
import Heading from "./_components/Heading";
import Paragraph from "./_components/Paragraph";
import CodeBlock from "./_components/CodeBlock";
import ListBlock from "./_components/ListBlock";
import TableBlock from "./_components/TableBlock";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icon";
import { format } from "date-fns";

const ImageProp = dynamic(() => import("./_components/ImageProp"), {
  ssr: false,
});

interface ArticleProps {
  params: { postId: string };
}

async function getPostByPostId(postId: Post["id"]) {
  return await db.post.findFirst({
    where: {
      id: postId,
    },
  });
}

const ArticlePage = async ({ params }: ArticleProps) => {
  const post = await getPostByPostId(params.postId);

  if (!post) {
    return <p>投稿が見つかりませんでした。</p>;
  }

  return (
    <>
      <article
        key={post.id}
        className="prose prose-gray container mx-auto max-w-3xl dark:prose-invert"
      >
        <Link
          href={"/articles"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-[170px] top-40"
          )}
        >
          <Icons.back className="mr-1" />
          全ての記事を見る
        </Link>
        <div className="text-base text-muted-foreground mb-1">
          Published on {format(post.createdAt, "yyyy年M月d日")}
        </div>
        <div className="text-5xl font-bold tracking-tight text-gray-900 lg:text-5xl dark:text-white">
          {post.title}
        </div>
        {post.content?.blocks // @ts-ignore
          .map((block, index) => {
            switch (block.type) {
              case "header":
                return (
                  <Heading
                    key={index}
                    level={block.data.level}
                    text={block.data.text}
                  />
                );
              case "paragraph":
                return <Paragraph key={index} text={block.data.text} />;
              case "code":
                return <CodeBlock key={index} code={block.data.code} />;
              case "list":
                return <ListBlock key={index} items={block.data.items} />;
              case "image":
                // @ts-ignore
                return <ImageProp key={index} block={block} />;
              case "table":
                return <TableBlock key={index} content={block.data.content} />;
              default:
                return null;
            }
          })}
        <div className="flex justify-center py-6 lg:py-10">
          <Link
            href={"/articles"}
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <Icons.back className="mr-1" />
            全ての記事を見る
          </Link>
        </div>
      </article>
    </>
  );
};

export default ArticlePage;
