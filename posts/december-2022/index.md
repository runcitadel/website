---
title: "December 2022 update"
date: 2022-12-07
authorName: Aaron Dewes
authorLink: https://twitter.com/AaronDewes
---

In this blog post, I want to share some news regarding the future development of Citadel and the issues we're facing right now.

## Server hosting

We previously received an ARM64 VM from FOSSHOST to host our ar build infrastructure, which is required for Raspberry Pi support.
We recently were informed that FOSSHOST is shutting down, and because of this, we are currently lacking an important part of our infrastructure,
making it harder to develop updates.

We are working to find other hosting providers, but have not yet found a solution.

## Time

This year, I often spend 3 hours more time at school than I did last year. This means that I have at least 3h less time to develop Citadel every day.

With the project growing, the amount of users that need support is also growing. This takes even more time away from development.

## Funding

FOSSHOST provided free hosting for us and alternative hosting providers are expensive.
We already host a amd64 server with a full Citadel node, which is quite expensive.

Our current donations do not cover that cost in full.
With DTV Electronics also sponsoring the Citadel project (new frontend development), we at least have some backing, but we still have to save some costs,
especially because DTV Electronics is not making any money yet.

I don't want Citadel to be in control of any company, so I try to make sure that DTV Electronics isn't our only sponsor.

Individuals can support us on [OpenCollective](https://opencollective.com/runcitadel).

If you're a companyy interested in using our software or integrating it with your products, you can also send an email to [aaron@runcitadel.space](mailto:aaron.runcitadel.space) to discuss how we could collaborate.

## The changes we're making

- Citadel will not receive any new features this year. Instead, we will focus on code cleanups and bug fixes to make Citadel easier to maintain long-term.
- For the last month and for the next few weeks, we'll not publish any install guides on our website to reduce the amount of new users we get.
- We're shutting down our main node to save costs there.
- Citadel's architecture will be changed to allow publishing bug fixes more easily.
- We're reducing the amount of Docker containers we maintain by switching to official ones when possible or contributing to upstream projects to add them.
- We're looking for alternatives to FOSSHOST for hosting arm64 servers.

The goal is to implement all of these changes within this year and do a big relaunch with new features in March of 2023.

**All existing users will continue to receive bug fixes and other improvements, but updates will be a bit slower.**

## Looking for volunteers

I'm also currently the only one who can actively spend time on the project, so we're looking for volunteers who can help in the following areas:

- Software development (We mostly use Nuxt/Vue with Tailwind on the front-end, but also [Fresh](https://fresh.deno.dev). On the backend, we use TypeScript together with either Deno or Node. Large parts of our app system are written in Rust and Python.
- Community managment/support (You should at least be a bit familiar with how Citadel works for this)
- UI/UX

If you think you can help, please message me on Telegram: [@AaronDewes](https://t.me/AaronDewes).
