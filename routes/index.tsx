import { Head } from "$fresh/runtime.ts";
import { Header } from "../components/Header.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Octokit } from "https://cdn.skypack.dev/octokit?dts";
import type { components } from "https://cdn.skypack.dev/@octokit/openapi-types?dts";
import Slider from "../islands/Slider.tsx";
import shuffle from "https://cdn.skypack.dev/lodash/shuffle?dts";
import { parse } from "https://deno.land/std@0.161.0/encoding/yaml.ts";
import MailerLite from "../islands/MailerLite.tsx";
import { Footer } from "../components/Footer.tsx";
import { Redis } from 'https://cdn.skypack.dev/@upstash/redis?dts';

const redis = Deno.env.get("UPSTASH_REDIS_REST_URL") ? new Redis({
  url: Deno.env.get("UPSTASH_REDIS_REST_URL"),
  token: Deno.env.get("UPSTASH_REDIS_REST_TOKEN"),
}) : null;

interface HomeProps {
  apps: {
    name: string;
    id: string;
    tagline: string;
  }[];
}

const ignoredApps = ["btc-rpc-explorer-public", "btc-rpc-explorer-public-fast"];

export const handler: Handlers<HomeProps | null> = {
  async GET(_, ctx) {
    const res = ctx.render();
  res.headers.set(
      "Link",
      '<https://s2.svgbox.net/pen-brushes.svg?ic=brush-1&color=ffff43>; rel="preconnect", <https://s2.svgbox.net/pen-brushes.svg?ic=brush-1&color=0da200>; rel="preconnect", </style.css>; rel="preconnect"',
    );
  return res;
  },
};

export default function Home(ctx: PageProps<HomeProps>) {
  return (
    <>
      <Head>
        <title>Citadel</title>
        <link rel="stylesheet" href="/style.css" type="text/css" />
        <meta
          name="description"
          content="Citadel is an open source personal server and Bitcoin node to run in your home."
        />
        <script src="/piwik.js" />
      </Head>
      <div class="dark:bg-gray-800 dark:text-white py-3 h-screen flex flex-col items-center justify-center relative">
        <h1 class="text-center font-bold text-6xl mt-5 font-serif">
          Coming <span class="marked">soon</span>
        </h1>
        <h3 class="text-center mb-5 mt-1 text-xl font-serif">
          We'll be back online soon - please be patient.
        </h3>
      </div>
    </>
  );
}
