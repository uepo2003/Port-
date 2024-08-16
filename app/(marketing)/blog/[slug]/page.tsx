import { allPosts } from "@/.contentlayer/generated";
import { Mdx } from "@/components/MdxComponents";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Icons } from "@/components/icon";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: any) {
  const slug = params?.slug!;
  
  const post = allPosts.find(
    (post) => post._raw.flattenedPath.split("/")[1] === slug,
  );

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const page = await getPostFromParams(params);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <article className="container max-w-3xl py-6 lg:py-10">
      <Link
        href={"/blog"}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[170px] top-40 xl:inline-flex",
        )}
      >
        <Icons.back className="mr-1" />
        全ての記事を見る
      </Link>
      <div>
        {post.date && (
          <time
            dateTime={post.date}
            className="block text-sm text-muted-foreground"
          >
            Published on {formatDate(post.date)}
          </time>
        )}
        <h1 className="mt-2 font-extrabold text-4xl leading-tight lg:text-5xl">
          {post.title}
        </h1>
      </div>
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={720}
          height={405}
          priority
          className="my-8 rounded-md border bg-muted transition-colors"
        />
      )}
      <Mdx code={post.body.code} />
      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link
          href={"/blog"}
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          <Icons.back className="mr-1" />
          全ての記事を見る
        </Link>
      </div>
    </article>
  );
}
