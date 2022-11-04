---
title: "Development update #1"
date: 2022-05-23
authorName: Aaron Dewes
authorLink: https://twitter.com/AaronDewes
---

While it has been some time since the last development update,
we will try to post them more frequently now.

In this update, I want to share some of the things we did since the last update:

- App system improvements
- Citadel 0.0.3
- New beta channel
- Community app store
- sats4me launch
- Changes to our support channels
- Karen v2
- Plans for the next month

### App system improvements

A big change in the recently released Citadel 0.0.3 was the new app format. While it mostly affected internal things, it made apps easier to develop and fixed a lot of issues we had before.

A key change in the new app system is how port assignments are handled. 
Previously, ports had been assigned randomly with apps being able to bypass port assignment entirely, which could lead to security issues and conflicts.
To avoid this, we rewrote the app system to ensure port assignment is now handled better and also to fix multiple other issues we had. 
The new app system automatically assigns ports to apps based on what port they use by default. If that port is available, it gets used. Otherwise, 
it will move one port further until a free one is found.

Apps are also now able to specify if they'd prefer to have a specific port exposed, for example if it's simpler to configure for users in client software because it is the default value there. This should be done if an app does not require the port to function, but having the port makes stuff easier.

If a port is required for an app, it can be specified too. This means if other apps have this port required too, only one app which uses this port be installed.

### Citadel 0.0.3

Citadel 0.0.3 introduced multiple things we showed in our last blog post, like the new theme toggle. It also contains the new app system. Our focus for this release however has been bug fixes. While I don't want to list all bugs we fixed here, I can say there have been a lot of them and 0.0.3 should improve the user experience.

However, we also introduced some new bugs, which is why we are releasing a new update over the next few days.


### New beta channel

We're also introducing a new [Citadel testers chat on Telegram](https://t.me/citadeltesters), which is where beta updates will be shared in the future.

We now have a beta update channel you can join (only via CLI for now) to get beta apps and features.

We also split the app store into 3 channels:

- Stable: Tested, working apps
- Beta: Not well-tested yet, but no auto-updates for security reasons
- Dev: Automatically updated apps, completely untested

### Community app store

Another thing we are currently preparing is a community app store. The community app store will include additional apps we do not maintain, but are instead maintained by trustworthy members of the Citadel community.

If you are interested in contributing to that (as a developer), check out [our developer chat](https://t.me/citadeldevelopers).

### sats4me launch

We also launched sats4.me recently. Sats4me gives you a Lightning tipping page for your node behind Tor.

It is much simpler and easier to use than our previous system where you had to contact us for a Lightning address.

We will soon expand ths service even more, so stay tuned for future updates.

### Changes to our support channels

We currently run a lot of channels to get support for Citadel on, including a forum, Discord server, Telegram chats and Matrix chat.

This is hard to manage, so we have decided to change that system a bit.

As a first change, we will soon shut down the Citadel forum, but it may be relaunched later on. The forum is an additional place to respond requests and managing replies on so many platforms is very time-consuming, taking away a lot of development time.

Our Discord server will be recreated with every channel corresponding to a Telegram chat with the messages automatically synced between Telegram and Discord.

These chats will be bridged to Matrix too. The goal is for a setup where we only have one Citadel chat, but accessible on as many platforms as possible.

We will also launch a new support platform where you can directly contact our team. This will be available over Telegram and as a website.

To still make sharing knowledge in an easily searchable way possible, we will launch a new platform: The Citadel wiki. This wiki will contain a lot more information about Citadel.

Similar to Wikipedia, changes will require approval by either the Citadel team or a trusted reviewer.

In conclusion, we will have these platforms:

- Citadel wiki
- Citadel chat: Split into categories and languages, accessible on Matrix, Telegram and Discord.
- Citadel support: We help with problems, available over Telegram and our website

The Citadel forum will be archived and later deleted.

I will make another blog post once these changes have been made.

### Karen v2

For a Docker-based system like Citadel, we still need a way to communicate between the host and docker containers.

Previously, we used a system from Umbrel called "karen". A Docker container could create a "signal" file which would then cause karen to execute the corresponding "trigger" script.

This system was inefficient and slow. We recreated this system, but instead of using files, we used an Unix socket.

This way, karen is much faster, we can ensure triggers are only executed once (because of a bug, they were often executed twice), and we have a more reliable and future-proof communication system.


### Plans for the next month

Next month, we will implement the chat changes we already discussed above.

We will also make tipping at sats4me easier by adding a simple way to add payment widgets to your own website.

The app system will be improved to be able to handle more apps than it can right now. Also, all non-scam apps available in Umbrel will be added to Citadel.

We will also focus on the new Citadel OS, which will work on more devices than our current OS.

Finally, we will try to publish more updates like this in the future.

I look forward to the next month and hope you will enjoy the new things that will be released.
