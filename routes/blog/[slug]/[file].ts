import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const file = url.pathname.replace("/blog/", "posts/");
    console.log(file);
    try {
      const data = await Deno.readFile("./" + file);
      return new Response(data);
    } catch (err) {
      if (err instanceof Deno.errors.NotFound) {
        return ctx.renderNotFound();
      }
      throw err;
    }
  },
};
