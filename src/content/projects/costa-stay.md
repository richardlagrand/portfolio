---
title: Costa Stay
description: A turn-key off-season rental platform validating a circular, guide-driven content engine for the Dutch winter-stay market.
date: 2026-05-19
techStack:
  - Node.js
  - TypeScript
  - Next.js
  - Tailwind CSS
  - MongoDB
  - Cron
  - Brevo API
heroImage: ../../assets/projects/project_costastay.jpeg
link: https://costastay.homes
featured: true
inProgress: false
---
## The opportunity

On the Costa de la Luz — the Atlantic-facing southern Spanish coast where I live — thousands of beach houses sit empty from November to March. Meanwhile, social feeds are full of digital nomads and early retirees looking for somewhere mild, affordable and genuinely Spanish to spend the winter.

The arithmetic is what makes this interesting. The same budget that buys a week at the Costa del Sol in high season, or two weeks in the Canarias in February, buys a month here — often longer — off-season. With Cádiz, Sevilla, Jerez, Doñana and the Sierra de Grazalema each within an hour or two, "stay longer, see more" is a far stronger pitch than "stay a week and lie still."

## The hypothesis

Supply was the easy half. Owners I spoke to are willing — often eager — to earn something between high seasons rather than nothing.

The harder question is demand: will a specific, identifiable audience actually book multi-week stays on this coast ahead of, say, the Algarve or Tenerife? That is what Costa Stay is built to answer over the coming off-season.

## The product

Costa Stay is a turn-key off-season rental operation. It handles the full chain so a homeowner doesn't have to:

- Lead generation and qualification
- Booking and payment handling
- Visitor onboarding and arrival information
- Coordinated check-in and check-out
- In-stay support and cleaning logistics

Revenue is operator margin on each rental — a single, clean stream with no affiliate dependencies and no advertising surface.

## The Dutch wedge

The first test market is the Netherlands. The reasoning is deliberate: Dutch is my native language, the audience has both the disposable income and the remote-friendly work culture to take long winter stays, the market is small enough to saturate with modest spend, and the English-language competition is thinner here than at the Costa Brava or the Algarve.

It is a wedge — narrow enough to win in, wide enough to teach me something about long-stay winter demand more generally.

A dedicated Dutch landing page sits alongside the international site, content-led rather than booking-funnel-led. It is the front door to the guide engine that follows.

## A circular content engine

This is where the project earns its name.

The Dutch funnel is powered by **twenty mini-guides** covering what a long-stay visitor actually wants to know: which towns to base yourself in, the practical day-trip routes, the visa and tax shape of multi-month stays, what a Spanish winter actually feels like, the food calendar, where Dutch retirees have already settled, and so on.

A subscriber does not start at "guide one." They start where the topic that caught them lives. Someone who signs up via guide 8 receives guide 8 immediately, then 9 through 20 in sequence, then loops back to 1 through 7, and continues to 21 when it is written. **No subscriber runs out of content, and every subscriber eventually receives every guide.**

It is circular in the literal sense: the sequence is a ring, and new subscribers enter at the point of their curiosity rather than at an arbitrary welcome message.

Mechanically:

- A custom Node.js backend, scheduled by cron, determines on a weekly cadence which guide each subscriber should receive next.
- Brevo holds both the marketing templates (the guides themselves) and the transactional templates (booking confirmations, arrival packs, owner notifications).
- The backend resolves per-subscriber state, hands Brevo the right template for the right contact, and triggers the send.
- Cadence is weekly — frequent enough to keep the relationship warm, never frequent enough to feel like a campaign.

The result is a list that **compounds rather than fatigues**. Every new guide written becomes a permanent ring addition, working for every past, present and future subscriber without further intervention.

## What didn't work

The first iteration of the landing surface was a sprawl: multiple domains for multiple angles — a Dutch site, a retiree site, a nomad site, a German exploratory site — each its own deployment, each its own analytics property, each its own content tree.

Within weeks this was a maintenance liability. A single copy change meant four edits. SEO signals were diluted. Analytics required mental reconciliation across four dashboards. The system was working against the operator.

I consolidated. About 80% of the surface area now lives under a single domain, with audience-targeting and localisation handled in-page rather than in DNS. Tracking, deploys, SEO and content updates collapsed back into a single workflow. A boring win — but the kind of compounding boring win that lets the rest of the system stay simple enough to iterate on.

## Where it stands

Live. Supply side validated. Demand-side validation runs through the upcoming off-season — the guide engine is the primary instrument for measuring how serious that demand actually is, with booking conversion the eventual scoreboard.

The interesting questions next: which guides correlate with bookings (not opens), how long the average subscriber stays on the ring before converting or unsubscribing, and whether a second-language wedge (German, likely) is worth opening before the engine has fully proven itself in Dutch.
