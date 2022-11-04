---
title: "The current status of Citadel"
date: 2022-10-16
authorName: Aaron Dewes
authorLink: https://twitter.com/AaronDewes
---

In this blog post, I'll try to explain why the next update is taking so long to develop, and provide more information about the current state of Citadel.

## Current development status

Currently, I am the only one actively working on Citadel's code. This means that if you compare Citadel to other open source projects, you'll see a slower speed of development, because these other projects have more developers. Especially compared to commercial projects like Umbrel or Embassy OS, development is a lot slower with Citadel, because I am doing all of the development in my free time.

This year, I also have to spend a lot more time at school, which results in me having less time for Citadel.

However, I am trying to still continue developing Citadel actively. I am also really thankful to DTV Electronics for supporting the development of Citadel.

These are the changes I have been working on recently, and that are planned to be rolled out during the next few weeks.

### New app system

All app-related tools and systems have been replaced with one, new tool: [The Citadel app CLI](https://github.com/runcitadel/app-cli). We previously had multiple tools that all tried to parse our app.yml format, but all had slight differences which could lead to incompatibilities and bugs.

The app-cli replaces all these tools with one new tool written in Rust. It can be used by developers to validate their apps, as part of our automated update checks, and is used on Citadel to convert app.yml files to docker-compose.yml.

This also extended our app system with more capabilities for developers, including "virtual apps", a concept that will allow multiple apps that implement the same API to be used interchangeably. For example, this will allow us to move Electrs and Fulcrum to the app store, and apps to just access them as "Electrum Server", without having to worry about different implementations. With app-cli, this can be done without impacting the security of our app system.

### Deno

![Deno artwork](https://deno.land/v1.png)

I'm currently rewriting large parts of Citadel's Node.js services, most notably [manager](https://github.com/runcitadel/manager) and [middleware](https://github.com/runcitadel/middleware).

Deno is a more modern node alternative and makes development much easier, while also increasing the speed of our API.

In addition, Deno will make it cheaper to deploy Citadel in the cloud (on a VPS for example). I'll share more details about that in a future post.

### Faster update process

Together with the new app system, the update process is also getting some updates. Useless steps were removed, which should cause updates to be much faster and less likely to fail on future versions.

### DTV Electronics

![DTV + Citadel](./dtv-citadel.svg)

Finally, I want to clarify the relationship of Citadel and DTV Electronics.

DTV Electronics is a company focused on building Bitcoin hardware and software services. While it is supporting Citadel financially, Citadel is completely independent from DTV Electronics.

I do not work for DTV Electronics and DTV Electronics does not own any copyright over any of Citadel's code.

I am still very grateful for their support.

### Donations

Even though we are partially supported by DTV Electronics, Citadel still needs donations to operate. We're now on Open Collective, and you can donate using Fiat or Bitcoin. Everything we spend is tracked publicly there, meaning you'll know where your donations go.

[Citadel on Open Collective](https://opencollective.com/runcitadel)

### Beta testing

The next update for Citadel is currently in beta and being tested by users.

I hope to be able to publish this update soon and will try to be more active in the support chats and development over the next weeks.
