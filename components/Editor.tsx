"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Icons } from "./icon";
import { Post } from "@prisma/client";
import { useCallback, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postPatchSchema } from "@/lib/validations/post";
import { z } from "zod";
import EditorJS from "@editorjs/editorjs";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { ImageBucket } from "@/lib/bucket";

interface EditorProps {
  post: Pick<Post, "id" | "title" | "content" | "published">;
}

type FormData = z.infer<typeof postPatchSchema>;

export default function Editor({ post }: EditorProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [currentPlan, setCurrentPlan] = useState<"FREE" | "PRO">();
  const [isPublic, setIsPublic] = useState<boolean>(post.published);
  const ref = useRef<EditorJS>();

  const router = useRouter();
  const { toast } = useToast();

  const initializeEditor = useCallback(async () => {
    // @ts-ignore
    const Header = (await import("@editorjs/header")).default;
    // @ts-ignore
    const Embed = (await import("@editorjs/embed")).default;
    // @ts-ignore
    const Table = (await import("@editorjs/table")).default;
    // @ts-ignore
    const List = (await import("@editorjs/list")).default;
    // @ts-ignore
    const Code = (await import("@editorjs/code")).default;
    // @ts-ignore
    const Image = (await import("@editorjs/image")).default;
    // @ts-ignore
    const InlineCode = (await import("@editorjs/inline-code")).default;

    const body = postPatchSchema.parse(post);

    if (!ref.current) {
      const editor = new EditorJS({
        autofocus: true,
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "ここに記事を書く",
        inlineToolbar: true,
        data: body.content,
        tools: {
          header: {
            // @ts-ignore
            class: Header,
            inlineToolbar: true,
            config: {
              placeholder: "ヘディングを入力してください",
              levels: [1, 2],
            },
          },
          image: {
            // @ts-ignore
            class: Image,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const filePath = `images/${file.name}`;
                  const { data, error } = await ImageBucket.storage
                    .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET!)
                    .upload(filePath, file, {
                      cacheControl: "3600",
                      upsert: false,
                    });
                  if (data) {
                    return {
                      success: 1,
                      file: {
                        url: `https://zzdpammbvjtoemfmqbkr.supabase.co/storage/v1/object/public/${data?.fullPath}`,
                      },
                    };
                  }
                  if (error) {
                    console.error(error);
                    return {
                      success: 0,
                      file: {
                        url: "",
                      },
                    };
                  }
                },
              },
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, [post]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
    fetch("/api/plan", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrentPlan(data.subscriptionPlan);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    if (isMounted) {
      initializeEditor();
    }

    return () => {
      ref.current?.destroy();
      ref.current = undefined;
    };
  }, [isMounted, initializeEditor]);

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(postPatchSchema),
  });

  async function onSubmit(data: FormData) {
    setIsSaving(true);
    const blocks = await ref.current?.save();
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        content: blocks,
        published: isPublic,
      }),
    });

    setIsSaving(false);

    if (!response.ok) {
      return toast({
        title: "エラーが発生しました",
        description:
          "あなたの記事は保存されませんでした。もう一度お試しください。",
        variant: "destructive",
      });
    }
    router.refresh();

    return toast({
      description: "正常に保存されました🚀",
    });
  }

  if (!isMounted) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="space-x-10 flex items-center">
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                戻る
              </>
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsPublic(!isPublic);
              }}
            >
              {currentPlan === "PRO" && (
                <p className="text-sm text-muted-foreground">
                  {isPublic ? "公開" : "ドラフト"}
                </p>
              )}
            </button>
          </div>
          <button type="submit" className={cn(buttonVariants())}>
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>保存</span>
          </button>
        </div>
        <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
          <TextareaAutosize
            autoFocus
            id="title"
            defaultValue={post.title}
            placeholder="Post title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            {...register("title")}
          />
          <div id="editor" className="min-h-[500px]" />
          <p className="text-sm text-gray-500">
            Use
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>
            to open the command menu.
          </p>
        </div>
      </div>
    </form>
  );
}
