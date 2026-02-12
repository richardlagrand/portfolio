---
title: "Filtered AI"
description: "Content curation platform with AI-powered recommendations"
date: 2024-03-10
techStack: ["Next.js", "TypeScript", "OpenAI API", "PostgreSQL"]
heroImage: ../../assets/projects/project_filtered.jpeg
featured: true
inProgress: false
---

## Overview

Filtered is a content curation platform that uses AI to surface relevant articles, videos, and resources based on user interests.

## Challenge

Information overload makes it hard to find high-quality content without spending hours scrolling.

## Solution

Built a recommendation engine using OpenAI embeddings to match content with user preferences, presented in a clean, distraction-free feed.

## Results

- Reduced average content discovery time by 60%
- 200+ curated sources indexed
- Sub-second recommendation latency

## Tech Deep Dive

- **Next.js** for SSR and API routes
- **OpenAI API** for semantic content matching
- **PostgreSQL** with pgvector for embedding storage
- Rate limiting and caching for API cost control
