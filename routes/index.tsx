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
    let parsed_apps;
    const cached_apps = await redis?.get("available_apps");
    if (cached_apps && typeof cached_apps === "string") {
      parsed_apps = JSON.parse(cached_apps);
    } else if (cached_apps) {
      console.error(JSON.stringify(cached_apps));
    } else {
      const octokitOptions = Deno.env.get("GITHUB_TOKEN")
        ? {
          auth: Deno.env.get("GITHUB_TOKEN"),
        }
        : {};
      const octokit = new Octokit(octokitOptions);
      const apps = (await octokit.rest.repos.getContent({
        repo: "apps",
        owner: "citadel-core",
        path: "v4",
        ref: "main",
      })).data as components["schemas"]["content-directory"];
      const nonfreeApps = (await octokit.rest.repos.getContent({
        repo: "apps-nonfree",
        owner: "citadel-core",
        path: "v4",
        ref: "main",
      })).data as components["schemas"]["content-directory"];
      const allApps = [...nonfreeApps, ...apps];
      const simplified_apps = allApps.filter((app) =>
        !ignoredApps.includes(app.name)
      ).map(async (app) => {
        const split = app.html_url!.replace("https://github.com/", "").split(
          "/",
        );
        const repo = [split[0], split[1], split[3]].join("/");
        const app_file = await fetch(
          `https://raw.githubusercontent.com/${repo}/v4/${app.name}/app.yml`,
        );
        // deno-lint-ignore no-explicit-any
        let app_data = parse(await app_file.text()) as any;
        if (!app_data?.metadata?.name || !app_data?.metadata?.tagline) {
          const app_file = await fetch(
            `https://raw.githubusercontent.com/${repo}/v4/${app.name}/app.yml.jinja`,
          );
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
      parsed_apps = await Promise.all(simplified_apps);

      await redis?.set("available_apps", JSON.stringify(parsed_apps), {
        ex: 60 * 5,
      });
    }
    return ctx.render({
      apps: shuffle(parsed_apps),
    });
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
      </Head>
      <div class="dark:bg-gray-800 dark:text-white">
        <div class="absolute top-0 right-0 left-0">
          <Header />
        </div>
        <div
          class="p-4 mx-auto dark:bg-gray-800 dark:text-white flex flex-col items-center justify-center min-h-screen text-center lg:text-left lg:flex-row-reverse"
          id="header"
        >
          <img
            src="/citadel-logo-gradient-overlap.webp"
            class="h-64 ml-auto mr-auto mt-4 lg:h-4/6 xl:h-5/6 hover"
          />
          <div class="m-4 ml-auto">
            <h1 class="text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl mb-4">
              Your personal server
            </h1>
            <h3 class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Take control of your data and run your personal server, together
              with a Bitcoin Lightning node, in your home.
            </h3>
            <a
              class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              href="#install"
            >
              Get started
            </a>
          </div>
        </div>
        <div class="mt-4 px-4 py-12 flex flex-col justify-center items-center text-center bg-gray-200 dark:bg-gray-700">
          <h2 class="font-bold text-5xl mb-2">100% transparent</h2>
          <h4 class="text-2xl mb-6">
            Our code and our finances, completely public
          </h4>
          <p class="max-w-screen-md text-center">
            At Citadel, we value transparency. Every part of our code, every
            cent and satoshi we receive, everything we build and everything else
            we do is completely transparent.
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
          <figure class="max-w-screen-md text-center">
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
          </figure>
        </div>
        <div class="mt-8 py-4 flex flex-col justify-center items-center text-center">
          <Slider
            apps={ctx.data.apps.slice(0, Math.floor(ctx.data.apps.length / 2))}
            isReverse
          />
          <h2 class="font-bold text-5xl mb-2 mt-8">Unlimited possibilities</h2>
          <h4 class="text-2xl mb-6">
            With our app store, you can run literally anything on your node.
          </h4>
          <p class="mb-2">
            Not only does Citadel include a large selection of apps already
            available, anyone from the community can build their own app store
            and you can install it. This even includes app stores built for
            Umbrel*!
          </p>
          <p class="mb-8 text-sm text-gray-700 dark:text-gray-300">
            *Unlike Umbrel's app system, Citadel's app system is secure and
            implements a permission system that not all Umbrel apps support.
          </p>
          <Slider
            apps={ctx.data.apps.slice(
              Math.floor(ctx.data.apps.length / 2),
              ctx.data.apps.length - 1,
            )}
          />
        </div>
        <div class="mt-4 px-4 pt-10 pb-6 flex flex-col justify-center items-center text-center bg-indigo-700 text-white">
          <h2 class="font-bold text-5xl mb-2">A modern Umbrel alternative</h2>
          <h4 class="text-2xl mb-6">
            100% transparent and a lot more up-to-date
          </h4>
          <p class="max-w-screen-md text-center">
            Citadel started out as a modified version of Umbrel. Our goal was to
            keep the oiginal idea of Bitcoin: Build in the open. Unlike Umbrel,
            which only publishes their code after releases, we stay transparent
            with what we do and allow you to use our code for any purpose.
          </p>
          <p class="max-w-screen-md text-center">
            We also ensure all of our apps are up to date. On Umbrel{" "}
            <a
              href="https://upbrel.deno.dev"
              class="text-underline text-blue-700 dark:text-blue-400"
            >
              a lot of apps are outdated
            </a>. On Citadel, app updates are made available almost daily (If
            there are any updates available upstream).
          </p>
          <p class="max-w-screen-md text-center">
            Citadel also has a more secure community app store system. We still
            try to allow importing apps from Umbrel community app stores, but
            because of Umbrel's insecure design, not all apps can be imported
            into Citadel's safe app system.
          </p>
          <h2 class="font-bold text-2xl mb-2 mt-8">Upgrade to Citadel</h2>
          <h4 class="text-lg mb-6">
            Join our waitlist to get notified when you can upgrade your node
          </h4>
          <p class="max-w-screen-md text-center mb-4">
            We're planning to make it possible to switch from Umbrel to Citadel.
            Join our waitlist to get notified when you can upgrade your node.
          </p>

          <MailerLite submitUrl="https://assets.mailerlite.com/jsonp/208143/forms/70567193145771829/subscribe" />
        </div>
        <div class="my-16 px-4 py-12 flex flex-col justify-center items-center text-center bg-gray-200 dark:bg-gray-700">
          <h2 class="font-bold text-5xl mb-2">Secure &amp; fast by default</h2>
          <h4 class="text-2xl mb-6">
            We offer a fully secure HTTPS experience for the local network
          </h4>
          <div class="flex">
            <div>
              <p class="max-w-screen-md text-center">
                With our one-click HTTPS setup, you can encrypt all your nodes
                traffic in the local network and for remote access. If you have
                a public IP, you can also expose any services on your node
                publicly and get one-click HTTPS configuration. This feature
                also speeds up your node by enabling HTTP/2 and HTTP/3.
              </p>
              <p class="max-w-screen-md text-center">
                This feature is powered by{" "}
                <a
                  class="text-underline text-blue-700 dark:text-blue-400"
                  href="https://letsencrypt.org/"
                >
                  Let's Encrypt
                </a>{"  "}
                and{" "}
                <a
                  class="text-underline text-blue-700 dark:text-blue-400"
                  href="https://runningcitadel.com/"
                >
                  runningcitadel.com
                </a>.
              </p>
            </div>
          </div>
        </div>
        <div class="mt-8 px-4 flex flex-col justify-center items-center text-center">
          <h2 class="font-bold text-5xl mb-2">Easy to use</h2>
          <h4 class="text-2xl mb-6">
            With a simple user interface, we make it easy to use your node.
          </h4>
          <img class="w-5/6" src="/dashboard.webp" />
        </div>
        <div
          class="mt-8 p-4 flex flex-col justify-center items-center text-center"
          id="install"
        >
          <h2 class="font-bold text-5xl mb-2 mt-8">Get started</h2>
          <h4 class="text-2xl mb-6">
            Build your own, or purchase a prebuilt node.
          </h4>
          <p class="mb-8">
            There are multiple ways to build your own Citadel. We've also
            partnered with DTV Electronics to offer prebuilt nodes you can just
            plug in and use immediately.
          </p>
          <div class="p-4 bg-yellow-200 rounded-lg mb-4 text-black">
            Having trouble finding Raspberry Pi parts?{" "}
            <a
              class="text-underline text-blue-700"
              href="https://rpilocator.com/"
            >
              rpilocator
            </a>{" "}
            may be able to help you.
          </div>
          <div class="flex flex-row w-screen lg:w-5/6">
            <div class="bg-gray-200 dark:bg-gray-700 p-4 m-2 rounded max-w-lg">
              <h2 class="font-bold text-2xl">Raspberry Pi 4</h2>
              <h4 class="text-lg">The most popular setup</h4>
              <p>
                This is simple to configure, and used by most members of the
                community.
              </p>
              <h4>
                Estimated cost: <b>$200</b>
              </h4>
              <h4 class="text-lg mt-5">Requirements:</h4>
              <ul>
                <li>Raspberry Pi 4</li>
                <li>microSD Card</li>
                <li>1TB SATA SSD</li>
                <li>USB to SATA adapter</li>
                <li>Power Supply</li>
                <li>Case</li>
              </ul>
            </div>
            <div class="bg-gray-200 dark:bg-gray-700 p-4 m-2 rounded max-w-lg">
              <h2 class="font-bold text-2xl">Basic CM4 setup</h2>
              <h4 class="text-lg">More advanced and stable setup</h4>
              <p>
                This is a bit harder to configure, but will be faster and less
                likely to cause issues in the future.
              </p>
              <h4>
                Estimated cost: <b>$230</b>
              </h4>
              <h4 class="text-lg mt-5">Requirements:</h4>
              <ul>
                <li>Raspberry Pi CM4 Lite</li>
                <li>microSD Card</li>
                <li>1TB NVME SSD</li>
                <li>CM4 IO Board</li>
                <li>M.2 to PCIe Adapter</li>
              </ul>
            </div>
            <div class="bg-gray-200 dark:bg-gray-700 p-4 m-2 rounded max-w-lg">
              <h2 class="font-bold text-2xl">Advanced CM4 setup</h2>
              <h4 class="text-lg">Even more advanced and stable setup</h4>
              <p>
                This is harder to configure, but will be faster and also work
                during power outages. It also supports PoE.
              </p>
              <h4>
                Estimated cost: <b>$270</b>
              </h4>
              <h4 class="text-lg mt-5">Requirements:</h4>
              <ul>
                <li>Raspberry Pi CM4 Lite</li>
                <li>microSD Card</li>
                <li>1TB NVME SSD</li>
                <li>
                  <a href="https://www.waveshare.com/cm4-poe-ups-base-en.htm?sku=22849">
                    CM4 PoE board kit
                  </a>{" "}
                  (Make sure to choose the correct plug)
                </li>
                <li>
                  <a href="https://www.amazon.com/dp/B0BKZZKXJM/">
                    parallel 18650 Li-ion battery
                  </a>
                </li>
              </ul>
            </div>
            <div class="bg-gray-200 dark:bg-gray-700 p-4 m-2 rounded max-w-lg">
              <h2 class="font-bold text-2xl">BitPiRat</h2>
              <h4 class="text-lg">The easiest way</h4>
              <p>
                Prebuilt nodes from DTV Electronics make setting up your node
                even easier.
              </p>
              <h4>
                Estimated cost: <b>$300-350</b>
              </h4>
              <h4 class="text-lg mt-5">Requirements:</h4>
              <ul>
                <li>
                  <a href="https://dtvelectronics.com">
                    A BitPiRat with Citadel
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="mt-4 px-4 py-12 flex flex-col justify-center items-center text-center bg-gray-200 dark:bg-gray-700">
          <h2 class="font-bold text-5xl mb-2">Join the waitlist</h2>
          <h4 class="text-2xl mb-6">
            Get access to Citadel as soon as we launch
          </h4>
          <p class="max-w-screen-md text-center mb-4">
            Citadel is currently in beta and we do not have an install guide
            yet. However, you can join our waitlist to get access as soon as we
            launch.
          </p>

          <MailerLite submitUrl="https://assets.mailerlite.com/jsonp/208143/forms/70562846841243609/subscribe" />
        </div>
        <Footer />
      </div>
    </>
  );
}
