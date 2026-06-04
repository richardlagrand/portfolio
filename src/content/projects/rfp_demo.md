---
title: "Omnicle RFP Assistant"
description: "A demo that turns a painful RFP into minutes of AI-assisted drafting — upload the document, auto-extract its questions, generate answers with company context, then edit and export, all with a human in the loop."
date: 2025-08-20
techStack: ["Next.js", "TypeScript", "shadcn/ui", "Tailwind CSS"]
heroImage: ../../assets/projects/project_rfp_demos.jpeg
link: "https://demo.omnicle.ai"
featured: false
inProgress: false
---

## Overview

The RFP Assistant is a demo built to show Omnicle's workflow orchestration in action, using RFP responses as the vertical. It isn't a standalone product competing in the RFP space — it's a capability demonstration for partners, taking one universally-understood, document-heavy chore and showing the whole arc: hours of manual work compressed into minutes of AI-assisted drafting.

## Why RFPs

RFPs make an ideal showcase. The pain is instantly legible — everyone has lost a week to one — so the before/after needs no explanation. And nobody trusts a fully autonomous RFP response, which makes it the perfect place to prove the part that matters most: a human stays in control throughout. Under the surface it exercises Omnicle's core loop — ingest complex documents, decompose unstructured content into structured tasks, orchestrate AI generation against company context, and produce a professional, exportable result.

## The flow

The happy path runs in six steps:

1. **Upload** — drop in an RFP document (PDF, Word, Excel)
2. **Review parsed questions** — the system extracts the questions; the user confirms or adjusts
3. **Set context** — pick the product/service, tone, and key strengths to answer from
4. **Generate** — AI drafts each answer with confidence indicators
5. **Edit & refine** — rework answers in a rich editor, or ask the AI to rewrite a section inline
6. **Export** — download a polished proposal as Word or PDF

## Human in the loop

The design draws a hard line between machine-generated and human-edited content, so it's always clear what came from the AI and what a person changed. Editing, approving and overriding are first-class — the assistant drafts, the human decides. The aesthetic is deliberately credible rather than flashy: a professional B2B feel, progressive disclosure so the interface never overwhelms, and graceful loading and empty states.

## Under the hood

The front end is **Next.js** (App Router) with **TypeScript**, **shadcn/ui** and **Tailwind CSS**, state kept deliberately simple with React's own primitives rather than a heavyweight store. The public demo runs against a mocked backend — fixtures behind realistic delays — so it stays fast and predictable in a partner meeting, but the flow it stands in for is where the real engineering lives.

That hard part is a **RAG** (retrieval-augmented generation) pipeline that embeds the company's own documentation — past proposals, product specs, policies — into a vector store, so every answer is grounded in the company's real material rather than a model's general knowledge. On top of that sits a **reinforced feedback loop**: the human-in-the-loop edits and approvals aren't just corrections to a single answer, they're signal. Each accepted or rewritten response feeds back into retrieval and ranking, so the system learns which sources and phrasings win — and answering RFPs gets measurably more accurate and faster over time, the more the team uses it.

## The bigger point

The RFP is just the costume. The same engine that parses RFP questions can parse training requirements, compliance checklists or onboarding forms — any document-heavy workflow. As the pitch puts it: _you bring the domain expertise; we bring the orchestration._
