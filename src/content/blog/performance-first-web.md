---
title: "Why I Build Performance-First Websites"
description: "The case for static generation, zero JavaScript defaults, and sub-second load times"
pubDate: 2025-02-05
tags: ["performance", "web", "astro", "engineering"]
featured: false
---

Every 100ms of load time costs conversions. Every kilobyte of JavaScript delays interactivity. Yet most modern web frameworks ship megabytes of client-side code by default.

## The Numbers

- **53% of mobile users** abandon sites that take over 3 seconds to load
- **Every 100ms** of latency reduces conversion by 1%
- The median web page ships **over 500KB of JavaScript**

## My Approach

I start with zero JavaScript and add it only when genuinely needed. Static HTML is fast, cacheable, and accessible by default.

### Tools I Reach For

- **Astro** for static generation with zero JS by default
- **Tailwind CSS** for utility-first styling without runtime overhead
- **Pagefind** for client-side search without a server
- **Self-hosted fonts** to eliminate third-party requests

### What I Measure

Every project starts with a performance budget:
- **LCP under 2.5 seconds** (ideally under 1s)
- **CLS under 0.1** (no layout shift)
- **Zero render-blocking resources**
- **Lighthouse 97+** across all categories

## The Trade-off That Isn't

People assume performance-first means ugly or limited. It doesn't. It means thoughtful. You can build beautiful, interactive experiences that load instantly — you just have to be intentional about what ships to the browser.
