import { extract } from "https://deno.land/std@0.162.0/encoding/front_matter.ts";

export interface Post {
  slug: string;
  title: string;
  publishedAt: Date;
  content: string;
  author: {
    name: string;
    link: string;
  }
}

export async function loadPost(slug: string): Promise<Post | null> {
  let text: string;
  try {
    text = await Deno.readTextFile(`./posts/${slug}/index.md`);
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return null;
    }
    throw err;
  }
  const { attrs, body } = extract(text);
  const params = attrs as Record<string, string>;
  const publishedAt = new Date(params.date);
  return {
    slug,
    title: params.title,
    publishedAt,
    content: body,
    author: {
      name: params.authorName,
      link: params.authorLink,
    }
  };
}

export async function listPosts(): Promise<Post[]> {
  const promises = [];
  for await (const entry of Deno.readDir("./posts")) {
    if(entry.isDirectory)
      promises.push(loadPost(entry.name));
  }
  const posts = await Promise.all(promises) as Post[];
  posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  return posts;
}
