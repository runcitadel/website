---
title: 'One year of Citadel'
date: 2022-06-29
authorName: Aaron Dewes
authorLink: https://twitter.com/AaronDewes
customOgImage: https://blog.runcitadel.space/one-year.png
---

![Header](./one-year.png)

Today marks the one year anniversary of Citadel.

One year ago, [I decided to leave Umbrel](https://twitter.com/AaronDewes/status/1409951211017625600) with the goal of building an alternative that is open, free and eas-to-use. At that time, Citadel did not even have a name yet.

I knew that I couldn't build such a project alone. Luckily, [Erik](https://twitter.com/uxerik_) joined the Citadel team early on, and built [our website](https://runcitadel.space) and also is helping a lot with designing the new dashboard.

Later that year, [William](https://github.com/WilliamConnatser) joined as a full-stack developer and is helping to build a new dashboard for Citadel.

This year, [Phil](https://github.com/pwltr) also joined the Citadel team as a full-stack developer.

All Citadel releases this year would not have been possible without them, and I am really grateful that to be able to develop Citadel together with them.

## What we did over this year

We launched quite a lot of features in Citadel, so here's a short summary:

- We created [sats4me](https://sats4.me), to give everyone a Lightning address for their node
- We rewrote most of Umbrel's non-free code and released it under the GNU GPL
- We rewrote Umbrel's API in TypeScript
- We launched a Citadel integration in [Alby](https://getalby.com/)
- We implemented a decentralized app store
- We created an open-source backup system so you can easily recover the funds from your Lightning channels
- We added dark mode
- We made apps updatable
- We released new apps on Citadel

And a lot more.

Today, Citadel powers both home nodes and at least two online shops with BTCPay (We know of [snoepjes](https://snoepjes.de) and [Lightning Bits](https://lightning-bits.de))

So huge thanks to all of our users and I hope you will continue running Citadel.

![Our user count](./users.png)


Overall, I am happy to say that my original goal for Citadel has been basically achieved. While our UI is not fully FOSS yet, everything else is.

Citadel also allows 3rd party apps by modifying one config file. You can add apps from as many 3rd party sources as you like, while still keeping the security of your node (You can at least see what apps have access to before installing them, if an app has wallet access, you of course need to check its code to ensure it doesn't steal funds).

## What's coming in July

Today, we are announcing Citadel 0.1.0. While this is not a very big update, we still introduced some notable features:

### Searching for apps in the app store

![App store search](./app-store.png)

As our app store grows, searching for certain apps has become a lot harder. So in this release, we added a search bar to the app store.

This allows you to search for apps easily, and even if you make a typo, you should still get the result you're looking for.

As you can see, you may see other apps that are not the ones you are looking for. However, in all of our testing, the app we were looking for was the first result.

### Choosing an update branch

You can choose what kind of updates you want to get in this release.

Do you only want stable features? Or would you prefer some beta features? Or would you like to experiment with Core Lightning? All of that is now possible easily with our latest release.

### App system

This update brings another internal redesign to our app system.

We also removed the initial version of our app.yml format, version 1.
Version 1 was the initial version of our app file format that made some Citadel features like updating apps and a more decentralized app store possible.

However, it had certain security risks and things that made it harder to use.

It was initially replaced by version 2, which still has certain issues, and later version 3, which fixes most of them.

We've removed version 1 in this update and version 2 will be removed in Citadel 0.2.0.

In the current release, we are releasing version 4 of that app format. Version 4 makes porting apps from Umbrel much easier, and also prepares for our next feature: quick updates.

### New apps

This update features two new apps: Woofbot and Agora.

Woofbot allows you to set up Telegram notifications for various things.

Agora allows you to sell files over Tor & Lightning.

Please note that Woofbot is not a FOSS app. We still decided to include it, because it may be useful for some users.
This does not affect the Citadel license. Woofbot is still source viewable.

Woofbot is part of our nonfree apps repository. That repository includes apps which are not open source or who have parts based on Umbrel's app integration.

Removing the non-free app repository can easily be done, which will be explained on our wiki when it launches.

### Quick updates

With Citadel 0.1.0, we are changing the way you can update your node. Most updates can now be installed with one click and take less than a minute of downtime, while keeping your Lightning node running.

This was made possible by some changes we made to Citadel to be more modular. Our app parser now runs in Docker, and so does most other stuff.

So we have implemented a way to simply update a Docker container without having to restart everything.
This means that most future updates can be done in less than a minute, without your Lightning node being down.

### Translations

![Translations](./translations.png)
s
Our goal is to make Bitcoin & Lightning accessible to everyone. This update takes another step towards that goal.
We've translated parts of our dashboard into German, to make Citadel accessible to more people who don't speak English.

Not everything is translated yet, and you can not translate Citadel yourself easily, but we will soon make translations much easier to contribute to, so keep an eye on this blog to learn more.

## When is this releasing?

This version of Citadel will be released during the next month. We will release some of these features to our beta testers today.

## Citadel chat changes

We've finalized the changes to the Citadel chat announced in our forum. We now have these chats:

- [Discord server](https://discord.gg/VfBMzYzprr)
- [Matrix Space](https://matrix.to/#/#citadel:synapse.runcitadel.space)
- Telegram chats: [Citadel main](https://t.me/runcitadel); [Citadel german](https://t.me/citadelgerman); [Citadel testers](https://t.me/citadeltesters); [Citadel developers](https://t.me/citadeldevelopers)

## Future plans

From the beginning of Citadel, we wanted to stay fully open. That also means sharing every plan with the community. While we shared most of these plans on various platforms already, here is a short list of what we currently have on our roadmap:

- Support for more hardware (RockPro64, SoQuartz, Quartz64, ...)
- A FOSS UI
- More apps
- A community app store
- Tipping app creators
- Liquid integration
- Finalizing Core Lightning integration
- I2P
- Easy SSL setup

And many more things. Not all of this will launch during the next year, but some things will.

## DTV Electronics

![DTV + Citadel](./dtv-citadel.svg)

I'm also really excited to announce that we are working together with [DTV (Don't trust, verify) Electronics](https://dtvelectronics.com/).

DTV Electronics is a newly-founded company that focuses on Bitcoin products.

There are two products I can announce today:

First, DTV Electronics will offer prebuilt Citadel nodes with optimized hardware.
With DTV's nodes, you get reliable hardware that is optimized for Citadel. That means: No more power issues, no more SSD issues, everything is ready out of the box.

DTV Electronics shares our vision for a decentralized world where you don't have to trust anyone, so any firmware they developed for the hardware will be 100% open source under the GNU GPL.

I will share more updates on that project soon.

The second product by DTV Electronics is sats4me. We've transferred ownership of it to DTV Electronics, which will make it possible to offer some additional features for sats4me:

While the core service and all features we have right now will stay free, there will be two paid tiers for sats4me.

Depending on what plan you choose, you can get some or all of these features:

- **Custom domains**: You can have @yourdomain.com addresses instead of ones @sats4.me
- **Tipping page customization**: You can customize your sats4me tipping page
- **Faster speed**: Additionally, you can get a faster speed for your account. This works by using a specially optimized version of Tor.

A feature we will launch for everyone are widgets. Widgets allow you to receive sats4me tips on any website easily.

The new sats4me will launch once we've finished deciding on prices and have set up payment handling.

## How you can help us

Citadel is run entirely by volunteers in their free time, so we rely on your help to keep up the Citadel development.

You can support us by

- [Donating](https://runcitadel.space)
- Contributing to the development ([Get in touch](https://t.me/citadeldevelopers)) - We're mostly looking for JavaScript/TypeScript developers. Citadel also uses Python & Rust. On the front-end, we use Vue and React. If you are familiar with one of these technologies, please consider contributing.
- **Translating**: Soon, Citadel will be translatable in more languages. We are looking for volunteers to translate Citadel. Join our community chat to learn more.
- Using Citadel and **giving us feedback**: We are always looking for feedback. We're still a relatively small project with only [about 200 users](https://users.runcitadel.space), so if you use Citadel, recommend it to others or let us know how we can do better, you can help a lot.
