---
title: "Portfolio"
description: "Personal portfolio site built with Astro, Tailwind CSS, and zero JavaScript by default"
date: 2025-02-01
techStack: ["Astro", "Tailwind CSS", "Pagefind", "Netlify"]
heroImage: ../../assets/projects/project_portfolio.jpeg
featured: false
inProgress: true
---

## Overview
This very site — a performance-first portfolio built with Astro's static generation and zero client-side JavaScript by default.

## Challenge
Most portfolio templates ship heavy JavaScript bundles and score poorly on Lighthouse. I wanted sub-second load times with perfect accessibility.

## Solution
Used Astro's static output mode with Tailwind CSS for styling, self-hosted Raleway fonts, and Pagefind for client-side search — all without hydrating a single component.

## Goals
- Lighthouse 97+ across all categories
- WCAG AA compliant
- Under 1 second load time
- Zero JavaScript hydration

## Tech Deep Dive
- **Astro** for static HTML generation
- **Tailwind CSS v4** via Vite plugin
- **Pagefind** for static search indexing
- **Netlify** for deployment and edge caching
