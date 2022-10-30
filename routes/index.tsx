import { Head } from "$fresh/runtime.ts";
import { Header } from "../components/Header.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Octokit } from "https://cdn.skypack.dev/octokit?dts";
import type { components } from "https://cdn.skypack.dev/@octokit/openapi-types?dts";
import Slider from "../islands/Slider.tsx";

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
      path: "apps",
    })).data as components["schemas"]["content-directory"];
    const simplified_apps = apps.map(async (app) => {
      return {
        name: app.name,
        id: app.name,
        tagline: "A cool app",
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
          <h2 class="font-bold text-5xl mb-2">Unlimited possibilities</h2>
          <h4 class="text-2xl mb-6">
            With our app store, you can run literally anything on your node.
          </h4>
          <p>
            Not only does Citadel include a large selection of apps already
            available, anyone from the community can build their own app store
            and you can install it. This even includes app stores built for
            Umbrel!
          </p>
          <Slider apps={ctx.data.apps} />
        </div>
      </div>
    </>
  );
}
