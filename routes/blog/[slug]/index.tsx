import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import * as gfm from "$gfm";
import { loadPost, Post } from "../../../utils/posts.ts";
import { Header } from "../../../components/Header.tsx";

interface Data {
  post: Post;
}

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const post = await loadPost(ctx.params.slug);
    if (post) {
      return ctx.render({ ...ctx.state, post });
    } else return ctx.renderNotFound();
  },
};

export default function PostPage(props: PageProps<Data>) {
  const { post } = props.data;
  return (
    <>
      <Head>
        <title>{post.title} - Citadel Blog</title>
        <link rel="stylesheet" href="/style.css" type="text/css" />
        <script src="/piwik.js" />
        <meta
          name="description"
          content="Citadel is an open source personal server and Bitcoin node to run in your home."
        />
      </Head>
      <div class="dark:bg-gray-800 dark:text-white">
        <Header />
        <div class="px-4 mx-auto max-w-screen-md">
          <h1 class="font-bold text-5xl pt-20">{post.title}</h1>
          <span class="inline-block mt-4">
            Written by{" "}
            <a class="inline" href={post.author.link}>{post.author.name}</a> -
            {" "}
            <time class="inline">
              {new Date(post.publishedAt).toLocaleDateString(
                navigator.language,
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )}
            </time>
          </span>
          <style dangerouslySetInnerHTML={{ __html: gfm.CSS }} />
          <article
            class="mt-12 markdown-body dark:bg-gray-800 dark:text-white"
            dangerouslySetInnerHTML={{
              __html: gfm.render(post.content).replace(
                '<img src="./',
                `<img src="./${post.slug}/`,
              ),
            }}
          />
          <p class="mt-6 pb-3 text-center text-sm text-gray-600 dark:text-gray-200">
            (C) 2022 Citadel
          </p>
        </div>
      </div>
    </>
  );
}
