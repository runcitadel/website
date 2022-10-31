import { Head } from "$fresh/runtime.ts";
import { Header } from "../components/Header.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Octokit } from "https://cdn.skypack.dev/octokit?dts";
import type { components } from "https://cdn.skypack.dev/@octokit/openapi-types?dts";
import Slider from "../islands/Slider.tsx";
import shuffle from "https://cdn.skypack.dev/lodash/shuffle?dts";
import { parse } from "https://deno.land/std@0.161.0/encoding/yaml.ts";

interface HomeProps {
  apps: {
    name: string;
    id: string;
    tagline: string;
  }[];
}

export const handler: Handlers<HomeProps | null> = {
  async GET(_, ctx) {
    const octokitOptions = Deno.env.get("GITHUB_TOKEN")
      ? {
        auth: Deno.env.get("GITHUB_TOKEN"),
      }
      : {};
    const octokit = new Octokit(octokitOptions);
    const apps = (await octokit.rest.repos.getContent({
      repo: "apps",
      owner: "runcitadel",
      path: "apps"
    })).data as components["schemas"]["content-directory"];
    const nonfreeApps = (await octokit.rest.repos.getContent({
      repo: "apps-nonfree",
      owner: "runcitadel",
      path: "apps"
    })).data as components["schemas"]["content-directory"];
    const allApps = shuffle([...nonfreeApps, ...apps]);
    const simplified_apps = allApps.map(async (app) => {
      const repo = app.html_url!.replace("https://github.com/", "").split("/").slice(0, 2).join("/");
      const app_file = await fetch(`https://raw.githubusercontent.com/${repo}/v4-stable/apps/${app.name}/app.yml`);
      let app_data = parse(await app_file.text()) as any;
      if (!app_data?.metadata?.name || !app_data?.metadata?.tagline) {
        const app_file = await fetch(`https://raw.githubusercontent.com/${repo}/v4-stable/apps/${app.name}/app.yml.jinja`);
        const text = await app_file.text();
        const metadata = {
          name: "",
          tagline: "",
        };
        for (const line of text.split("\n")) {
          const _line = line.trim();
          if (_line.startsWith("name: ")) {
            metadata.name = line.replace("name: ", "").trim();
            if (metadata.tagline) {
              break;
            }
          }
          if (_line.startsWith("tagline: ")) {
            metadata.tagline = line.replace("tagline: ", "").trim();
            if (metadata.name) {
              break;
            }
          }
        }
        app_data = { metadata };
      }
      return {
        name: app_data?.metadata?.name || app.name,
        id: app.name,
        tagline: app_data?.metadata?.tagline || "A cool app",
      };
    });
    apps;
    return ctx.render({
      apps: await Promise.all(simplified_apps),
    });
  },
};

export default function Home(ctx: PageProps<HomeProps>) {
  return (
    <>
      <Head>
        <title>Citadel</title>
        <link
          rel="stylesheet"
          src="https://esm.sh/keen-slider/keen-slider.min.css"
        />
        <link rel="stylesheet" src="/slider.css" />
      </Head>
      <div class="dark:bg-gray-800 dark:text-white">
        <div class="absolute top-0 right-0 left-0">
          <Header class="absolute" />
        </div>
        <div
          class="p-4 mx-auto dark:bg-gray-800 dark:text-white flex flex-col items-center justify-center min-h-screen text-center lg:text-left lg:flex-row-reverse"
          id="header"
        >
          <img
            src="/citadel-logo-gradient-overlap.png"
            class="h-64 ml-auto mr-auto lg:h-96 mt-4"
          />
          <div class="m-4 ml-auto">
            <h1 class="text-5xl mb-4">
              <b>Your</b> personal server
            </h1>
            <h3 class="mb-12">
              Take control of your data and run your personal server, together
              with a Bitcoin Lightning node, in your home.
            </h3>
            <a class="mt-12 rounded bg-blue-600 p-2" href="#install">
              Get started
            </a>
          </div>
        </div>
        <div class="mt-4 px-4 py-12 flex flex-col justify-center items-center text-center bg-gray-200 dark:bg-gray-700">
          <h2 class="font-bold text-5xl mb-2">Completely transparent</h2>
          <h4 class="text-2xl mb-6">
            Our code, our finances, completely public
          </h4>
          <p class="max-w-screen-md text-center">
            At Citadel, we value transparency. Every part of our code, every
            cent and satoshi we receive, everything we build, is completely
            transparent.
          </p>
          <p>
            <a
              class="text-underline text-blue-700 dark:text-blue-400"
              href="https://github.com/runcitadel"
            >
              Have a look at our code
            </a>{" "}
            or{" "}
            <a
              class="text-underline text-blue-700 dark:text-blue-400"
              href="https://opencollective.com/runcitadel"
            >
              view our finances
            </a>.
          </p>
          {
            /*<figure class="max-w-screen-md text-center">
            <blockquote class="p-4 my-4 bg-gray-50 border-l-4 border-gray-300 dark:border-gray-500 dark:bg-gray-800">
              Bitcoin is an ecosystem built on a foundation of free and open
              source software and ideas. Progress in Bitcoin is made as we build
              on each other's work. Bitcoin users must have full freedom over
              the hardware and software infrastructure they use – freedom to
              fork, freedom to change, freedom to run the programs they want
              without any intermediaries.
            </blockquote>
            <figcaption>
              - Foundation Devices,{" "}
              <cite>
                <a href="https://foundationdevices.com/2021/08/the-foundations-of-freedom-in-bitcoin/">
                  The foundations of freedom in bitcoin
                </a>
              </cite>
            </figcaption>
          </figure>*/
          }
        </div>
        <div class="mt-8 p-4 flex flex-col justify-center items-center text-center ">
          <Slider apps={ctx.data.apps.slice(0, Math.floor(ctx.data.apps.length / 2))} isReverse />
          <h2 class="font-bold text-5xl mb-2 mt-8">Unlimited possibilities</h2>
          <h4 class="text-2xl mb-6">
            With our app store, you can run literally anything on your node.
          </h4>
          <p class="mb-8">
            Not only does Citadel include a large selection of apps already
            available, anyone from the community can build their own app store
            and you can install it. This even includes app stores built for
            Umbrel!
          </p>
          <Slider apps={ctx.data.apps.slice(Math.floor(ctx.data.apps.length / 2), ctx.data.apps.length - 1)} />
        </div>
      </div>
    </>
  );
}
