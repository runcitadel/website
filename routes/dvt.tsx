import { Head } from "$fresh/runtime.ts";
import { Header } from "../components/Header.tsx";
import MailerLite from "../islands/MailerLite.tsx";
import { Footer } from "../components/Footer.tsx";

export default function DV() {
  return (
    <>
      <Head>
        <title>Don't verify, trust</title>
        <link rel="stylesheet" href="/style.css" type="text/css" />
        <meta
          name="description"
          content="Why you should choose Umbrel."
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
            src="https://uploads-ssl.webflow.com/62966b49981ba146f4842f45/629d2c69b61221a3238470bc_ios-icon.png"
            class="h-64 ml-auto mr-auto mt-4 max-w-1/3 max-h-1/2 hover"
          />
          <div class="m-4 ml-auto">
            <h1 class="text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl mb-4">
              Don't verify, trust
            </h1>
            <h3 class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              A fact-based campaign explaining why you should run Umbrel
            </h3>
            <a
              class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            >
              Get started
            </a>
          </div>
        </div>
        <div class="mt-4 px-4 py-12 flex flex-col justify-center items-center text-center bg-gray-200 dark:bg-gray-700">
          <h2 class="font-bold text-5xl mb-2">100% non-transparent</h2>
          <h4 class="text-2xl mb-6">
            Exactly what open source always meant
          </h4>
          <p class="max-w-screen-md text-center">
            We don't share all our code. Some parts are published after a
            release. During development, you don't know what happens. After an
            update, Umbrel may stay closed source for a few months. You can't
            modify our code or use it for any commercial purpose.

            We ignore all principles open source ever meant, and redefine open
            source so we can use it for marketing.
          </p>

          <figure class="max-w-screen-md text-center">
            <blockquote class="p-4 my-4 bg-gray-50 border-l-4 border-gray-300 dark:border-gray-500 dark:bg-gray-800">
              Commons Clause is reviving the original ethos of open source.
              Academics, hobbyists or developers wishing to use a popular
              open-source project to power a component of their application can
              still do so. But if you want to take substantially the same
              software that someone else has built, and offer it as a service,
              for your own profit, that's not in the spirit of the open-source
              community.
            </blockquote>
            <figcaption>
              - Salil Deshpande
            </figcaption>
          </figure>
        </div>
        <div class="mt-8 p-4 flex flex-col justify-center items-center text-center">
          <h2 class="font-bold text-5xl mb-2 mt-8">Unlimited trust</h2>
          <h4 class="text-2xl mb-6">
            With our app store, you can trust even more third parties.
          </h4>
          <p class="mb-8 max-w-screen-md">
            With Umbrels 3rd party app store system, you can also trust 3rd
            parties. We ensure apps don't have to deal with declaring
            permissions, they just get full root access to your node.
          </p>
        </div>
        <div class="mt-4 px-4 pt-10 pb-6 flex flex-col justify-center items-center text-center bg-indigo-700 text-white">
          <h2 class="font-bold text-5xl mb-2">A modern Citadel alternative</h2>
          <h4 class="text-2xl mb-6">
            100% non-transparent and a lot more out-of-date
          </h4>
          <p class="max-w-screen-md text-center">
            On Umbrel, we don't publish updates. Unlike Citadel, which updated
            their OS to speed up their software and release new features, we
            chose an old version of Raspberry Pi OS, so we can ensure you don't
            get confused because your node is too fast.
          </p>
          <p class="max-w-screen-md text-center">
            We also ensure most of our apps{" "}
            <a
              href="https://upbrel.deno.dev"
              class="text-underline text-blue-700 dark:text-blue-400"
            >
              out-of-date
            </a>. Updates only break stuff. Especially security updates, which
            are made to seem required and only end up breaking your node, are
            dangerous. So we simply prevent you from installing them.
          </p>
          <p class="max-w-screen-md text-center">
            Citadel also has a more secure community app store system. We don't
            even try to make ours secure, because then we'd have to fix
            vulnerabilities if they're found. By just keeping it insecure, we
            save a lot of time.
          </p>
        </div>
        <div class="mt-8 px-4 flex flex-col justify-center items-center text-center">
          <h2 class="font-bold text-5xl mb-2">Easy to use</h2>
          <h4 class="text-2xl mb-6">
            With a seemingly simple user interface, we get you to use our
            insecure software.
          </h4>
          <img
            class="w-5/6"
            src="https://uploads-ssl.webflow.com/62966b49981ba146f4842f45/629d2c5a73e50ebe33087761_app-store-dark-1-p-800.jpeg"
          />
        </div>
        <div
          class="mt-8 p-4 flex flex-col justify-center items-center text-center"
          id="install"
        >
          <h2 class="font-bold text-5xl mb-2 mt-8">Get started</h2>
          <h4 class="text-2xl mb-6">
            Convinced? Make your node insecure now!
          </h4>
          <p class="mb-8">
            There are multiple ways to build your own Umbrel. Use a Pi or set up
            Umbrel on Linux.
          </p>
          <a
            class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          >
            Get started
          </a>
        </div>
        <Footer />
      </div>
    </>
  );
}
