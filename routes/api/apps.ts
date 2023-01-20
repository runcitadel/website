import { Handlers } from "$fresh/server.ts";
import { Octokit } from "https://cdn.skypack.dev/octokit?dts";
import type { components } from "https://cdn.skypack.dev/@octokit/openapi-types?dts";
import shuffle from "https://cdn.skypack.dev/lodash/shuffle?dts";
import { parse } from "https://deno.land/std@0.161.0/encoding/yaml.ts";
import { connect } from "https://deno.land/x/redis@v0.29.0/mod.ts";

const cache = Deno.env.get("REDIS_HOST") ? await connect({
  port: Number(Deno.env.get("REDIS_PORT")),
  hostname: Deno.env.get("REDIS_HOST") as string,
  username: Deno.env.get("REDIS_USERNAME"),
  password: Deno.env.get("REDIS_PASSWORD"),
}) : null;


const ignoredApps = ["btc-rpc-explorer-public", "btc-rpc-explorer-public-fast"];

export const handler: Handlers = {
  async GET(_, ctx) {
    let parsed_apps;
    const cached_apps = await cache?.get("available_apps");
    if (cached_apps) {
      parsed_apps = JSON.parse(cached_apps);
    } else {
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
        ref: "0.1.0"
      })).data as components["schemas"]["content-directory"];
      const nonfreeApps = (await octokit.rest.repos.getContent({
        repo: "apps-nonfree",
        owner: "runcitadel",
        path: "apps",
      })).data as components["schemas"]["content-directory"];
      const allApps = [...nonfreeApps, ...apps];
      const simplified_apps = allApps.filter((app) =>
        !ignoredApps.includes(app.name)
      ).map(async (app) => {
        const split = app.html_url!.replace("https://github.com/", "").split("/");
        const repo = [split[0], split[1], split[3]].join("/");
        const app_file = await fetch(
          `https://raw.githubusercontent.com/${repo}/apps/${app.name}/app.yml`,
        );
        // deno-lint-ignore no-explicit-any
        let app_data = parse(await app_file.text()) as any;
        if (!app_data?.metadata?.name || !app_data?.metadata?.tagline) {
          const app_file = await fetch(
            `https://raw.githubusercontent.com/${repo}/apps/${app.name}/app.yml.jinja`,
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

      await cache?.set("available_apps", JSON.stringify(parsed_apps), {
        ex: 60 * 5,
      });
    }
    return new Response(JSON.stringify(shuffle(parsed_apps)), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
