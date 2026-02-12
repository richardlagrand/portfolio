---
title: "RFP proposal creator"
description: "Lightweight project management tool with real-time collaboration features"
date: 2023-08-20
techStack: ["SvelteKit", "Supabase", "WebSockets", "Tailwind CSS"]
heroImage: ../../assets/projects/project_rfp_demos.jpeg
featured: false
inProgress: false
---

## Overview

Taskflow is a lightweight project management tool focused on speed and real-time collaboration for small teams.

## Challenge

Existing tools like Jira were too complex for small teams. They needed something fast, simple, and collaborative.

## Solution

Built a kanban-style board with real-time updates via WebSockets, instant search, and a minimal UI that stays out of the way.

## Results

- Real-time sync under 50ms latency
- 8 active teams during beta
- 95+ Lighthouse performance score

## Tech Deep Dive

- **SvelteKit** for fast, minimal client bundle
- **Supabase** for auth, database, and real-time subscriptions
- **WebSockets** for live collaboration
- **Tailwind CSS** for rapid UI development
