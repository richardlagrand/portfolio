---
title: Okki for bright students
description: "Gamified learning app for students linked to official curriculum "
date: 2024-06-15
techStack:
  - Next.JS
  - Capacitator
  - OneSignal
  - Mixpanel
heroImage: ../../assets/projects/project_brightpath.jpeg
link: https://brightpath.study
featured: true
inProgress: true
---

# Building an EdTech Platform Nobody Told Me Was Hard

Still generating EdTech questions one at a time in 2026? There's a better way...

My son came home frustrated with math class. Not because it was hard. Because the pacing was wrong.

Meanwhile, he's deep-diving into physics YouTube videos on his own time.

The gap? Textbooks, teacher, homework. Three different explanations, none matching how he needed to learn it.

So I started building something simple: a 5-10 minute daily tool that actually helps with homework students are already doing.

Sounds easy. It wasn't.

Here's what went wrong, the technical problems nobody warns you about, and how I kept moving when everything got out of hand...

## How This Got Out of Hand: Scope Creep and Knowledge Boundaries

Let me be honest about what happened.

I started with project management. I knew the problem. I could sketch the architecture. I built the skeleton myself: auth, basic data models, schema structure.

Then the scope exploded.

Teacher dashboards. Admin CMS. AI content pipeline. Capacitor mobile wrapper. PostgreSQL optimization. Real cost tracking. Proficiency algorithms. Tag-based taxonomy at scale.

Each one seemed simple on paper. Each one required deep knowledge I didn't have.

The timeline: needed a prototype in 4-6 weeks.

I couldn't learn PostgreSQL GIN indexes, Capacitor mobile optimization, curriculum API design, and proficiency algorithms fast enough while building. I was out of my depth. Losing speed. Making bad decisions.

That's when I shifted: vibe coding with Claude Code.

Instead of trying to learn everything, I'd define the problem precisely, let Claude explore the space, iterate on solutions, debug the weird edge cases. I'd handle architecture and decisions. Claude would handle the uncharted terrain.

This worked. It also came at a cost.

## The Hidden Cost: Context Windows and Iteration Speed

Using Claude Code to navigate unknown territory sounds great until you hit limits.

Here's what happened:

Problem: PostgreSQL tag queries are slow. I know the concept. I don't know the indexing patterns.

The iteration loop:

1.  Explain problem to Claude (current query times, table size, tag structure)
2.  Claude generates GIN index setup and test queries
3.  Test locally
4.  "Queries still slow for multi-tag filters"
5.  Explain the specific query that's failing
6.  Claude sees only the new query (old context is gone)
7.  Misses the earlier optimization we tried
8.  Suggests something similar to what already failed
9.  Iterate again

Result: what should take 2-3 iterations takes 6-7.

Each iteration I'm re-explaining context. Re-pasting code. Re-validating old solutions. Re-documenting decisions.

For a feature like "build proficiency tracking with spaced repetition," the context window became the bottleneck. Too much state to carry. Too many past decisions.

The real cost:

- Slower iteration cycles
- Repeated explanations of the same problem
- Claude unable to "remember" why we rejected approach A, so we explore it again
- Had to manually manage context (keep notes, reference earlier solutions)

For a 6-week timeline, this mattered.

The tradeoff:

With Claude Code: slower iteration, but I kept moving. Didn't get stuck learning PostgreSQL from scratch.

Without Claude Code: stuck on indexing, curriculum parsing, Capacitor bundling. Project would slip 3-4 weeks easy.

Net win: shipped on time. But not seamlessly.

## What I'd Do Differently: Narrower Scope Earlier

If redoing this:

1.  Build the skeleton myself (done)
2.  Pick ONE unknown area to explore with Claude Code (not four simultaneously)
3.  Document decisions as we go (saves context window pain)
4.  Stop scope creep earlier (tried to do too much too fast)

What I actually did:

1.  Skeleton (done)
2.  AI pipeline and schema optimization and mobile wrapper and cost tracking and proficiency tracking simultaneously
3.  Context windows melting
4.  Iteration speed suffering
5.  Shipped anyway, but messy

The honest assessment: Claude Code saved the timeline. But I used it wrong. Tried to solve too many unknowns at once. Should have been more surgical.

If I could restart, I'd pick the absolute highest-risk thing (curriculum alignment, because it's truly unique) and use Claude Code for that. Everything else I'd either learn properly or defer.

## The Problem I Didn't See Coming: Data Structure at Scale

Somewhere in that chaos of exploring uncharted territory, I realized: my data structure couldn't answer simple queries fast enough.

Trying to find "all 2º ESO biology questions about cells that are at the 'understand' level"?

With a rigid hierarchy (Country → Grade → Subject → Unit → Topic → Question), that query touched 5+ tables. Slow. Painful. Wrong.

The fix: PostgreSQL arrays with GIN indexes

Instead of building a tree, I made every question carry multi-dimensional tags:

```
["geo:country:es", "edu:grade:2", "curr:subject:biology",
 "curr:topic:celula-procariota", "ped:bloom:understand",
 "ped:difficulty:2"]
```

One query. No joins. 15-50ms even with 100,000+ questions.

```sql
SELECT * FROM questions
WHERE tags @> ARRAY['edu:grade:2', 'curr:subject:biology']
```

But here's where it got messy:

- Batch updating tags on millions of questions? PostgreSQL does full table rewrites. Killed my builds for 10+ minutes.
- GIN indexes only work if you query them correctly. One small mistake and your query runs 500ms instead of 50ms.
- Denormalized fields became essential. Storing gradeLevel INT as a column (not just a tag) saved hours of optimization later.

This was uncharted territory. I'd never optimized PostgreSQL at this scale before. Claude Code explored the space. I made the final calls.

The real lesson? Get the schema right before generating lots of data. Once you have 10,000+ questions tagged wrong, refactoring becomes a nightmare.

## The Challenge: Curriculum Alignment at Scale

I needed official curriculum standards to generate aligned content.

Simple, right? Download Spanish BOE standards, map content, generate questions.

Except:

- BOE standards are PDFs. 200+ pages. Hand-written mappings. No APIs.
- Andalusian regional standards (BOJA) add another layer (national standards and regional variations).
- Textbooks organize content differently than official standards.
- Two teachers teaching the same topic often structure it completely differently.

The solution was architectural, not just procedural:

Tag-based system meant I could represent multiple interpretations simultaneously:

- Content aligned to BOE standard A
- Also aligned to textbook X organization
- Also aligned to this specific teacher's lesson sequence
- All in the same question

One question. Multiple valid interpretations. No schema change needed.

But the dev cost was brutal:

- Parsing PDFs to extract structured data took 3x longer than expected
- Validating that every question actually mapped to official standards (not just generic biology) required manual review
- Curriculum standards change. BOJA 2023 vs. BOJA 2025. Updating 1,000+ questions takes discipline and automation.

Tools I built to handle this:

- Curriculum parser that extracts topics and objectives from PDFs
- Validation script that checks: does this question actually cover this official objective?
- Tagging pipeline that associates questions with multiple curriculum standards

None of this was fun. All of it was essential.

## The Pain Point Nobody Talks About: Cost Visibility

Generated 1,383 questions using Claude. Initial estimate: €200. Actual cost: €650.

Why? Each question required multiple passes:

1.  Initial generation (prompt engineering wasn't right)
2.  Curriculum enrichment (add examples, context)
3.  Difficulty rating refinement
4.  Explanation generation
5.  Option variation (make wrong answers plausible)

Every pass was an API call. Every API call cost money. And I had no idea how much I was actually spending.

The fix: Real cost tracking, not estimates

Most developers hardcode AI pricing in their code:

```typescript
// Wrong
const COST_PER_1M_TOKENS = {
  "claude-sonnet": 300, // Outdated. Wrong. Painful.
};
```

Prices change. Models get cheaper. Your estimates become lies.

Instead, I built real cost tracking using OpenRouter's Generation API:

```typescript
// Right
const response = await openrouter.generate({...});
const actualCost = response.cost; // Real cost, not estimate

// Store in database
await prisma.aiUsageLog.create({
  data: {
    model: response.model,
    inputTokens: response.usage.prompt_tokens,
    outputTokens: response.usage.completion_tokens,
    actualCostUsd: response.cost,
    costVerified: true
  }
});
```

Now I know: average cost per question is €0.47. If student lifetime value is €20, I can spend €9.40 on content generation and still have margin.

Without this, I was flying blind.

The dev challenge here: setting this up from day 1 feels paranoid when you're generating 10 questions. By question 1,000, it's the difference between knowing if this is sustainable and guessing.

## The Technical Problem: Engagement Mechanics Without Content

I built a full Duolingo-style system: daily streaks, XP, leaderboards, achievement badges.

Research backs this. 7-day streaks equal 2.4x higher retention.

Loss aversion is real. Streaks hurt to break.

So my son's friends ignored all of it.

They didn't care about XP. Leaderboards meant nothing. What they used? The questions. Because they actually explained homework.

The engagement mechanics didn't fail. They just didn't matter without good content.

The dev lesson: you can't gamify bad content. Don't build the game economy first. Build the core product first. Then amplify it with engagement mechanics.

I built this backwards. Wasted 2 weeks on game loops that didn't matter.

## The Architecture Decision That Actually Mattered: Snapshot Lessons

When a teacher creates a lesson, the system freezes the question IDs:

```prisma
model Lesson {
  questionIds: String[]  // Frozen at creation
  templateId: String     // Reference, not binding
}
```

If the template changes, that lesson doesn't. All students in the class see the same questions.

Why this works:

- Teachers need consistency (no surprises)
- Students need fairness (same test for everyone)
- You can edit questions without breaking lessons
- New lessons pull from updated templates

Why this feels wrong:

- Inelegant (why not just query dynamically?)
- Requires discipline (must refresh caches manually)
- Scaling lesson creation means caching millions of IDs

The dev cost:

- Cache invalidation is hard. Built a nightly refresh and manual trigger.
- Logging what changed between cache refreshes (audit trail).
- Handling edge cases (what if a question is deleted? What if a template evolves?)

Simple concept. Surprisingly complex at scale.

## The Database Problem: Proficiency Tracking With Spaced Repetition

Eventually I need adaptive learning. That requires tracking student proficiency per tag.

Not just "did they get it right?" but:

- Total attempts per tag
- Recent performance (last 10 attempts)
- Confidence level (how sure are we about this score?)
- Trend (improving? Declining? Stable?)
- Next review date (spaced repetition scheduling)

That's per-student, per-tag. At 100 students x 50 tags equals 5,000 proficiency records to update on every answer.

The challenge: you can't compute this in real-time. Queries get slow. Calculations get complex.

The solution: pre-compute and cache.

```prisma
model TagProficiency {
  learnerId: String
  tag: String
  totalAttempts: Int
  correctAttempts: Int
  proficiency: Float      // 0.0-1.0
  confidence: Float       // 0.0-1.0
  recentAttempts: Int     // Last 10
  recentCorrect: Int
  trend: String           // "improving", "stable", "declining"
  nextReviewAt: DateTime  // Spaced repetition date
}
```

After each answer, async job updates this. Doesn't block the student's UI.

The dev pain:

- Race conditions (what if two answers come in simultaneously?)
- Eventual consistency (student might see stale proficiency)
- Testing this is annoying (need to simulate multiple answer sequences)

## What Went Right: PostgreSQL GIN Indexes

Early queries were 500ms+. Unacceptable.

Added GIN index:

```sql
CREATE INDEX questions_tags_gin ON "Question" USING GIN (tags);
```

Same queries: 15-50ms.

The catch: GIN indexes only help if you query them right.

```sql
-- Fast (uses GIN)
SELECT * FROM "Question" WHERE tags @> ARRAY['edu:grade:2'];

-- Slow (index ignored)
SELECT * FROM "Question" WHERE tags[1] = 'edu:grade:2';
```

One character difference. 40x performance change.

Spent 4 hours debugging why a query wasn't using the index. Turned out I was using = instead of @>.

The real win: denormalized columns for common queries.

```sql
-- 3-10ms (B-tree index on gradeLevel column)
SELECT * FROM "Question" WHERE "gradeLevel" = 2;

-- 50ms (GIN index on tags)
SELECT * FROM "Question" WHERE tags @> ARRAY['edu:grade:2', 'curr:subject:biology'];

-- 500ms (no index)
SELECT * FROM "Question" WHERE tags @> ARRAY['edu:grade:2', 'curr:subject:biology', 'ped:bloom:understand', ...];
```

Reserve GIN for complex multi-dimensional queries. Use denormalized columns for frequent, simple filters.

## The Mobile Problem: Bundle Size With Capacitor

Wrapped the Next.js web app with Capacitor for iOS/Android.

Initial bundle: 15MB. Too large. App store distribution is painful at that size.

What bloated it:

- Tailwind CSS (full stylesheet, even unused classes)
- shadcn components (importing more than necessary)
- Unused libraries left in package.json

The optimization:

- Purged unused CSS with Tailwind's tree-shaking
- Lazy-loaded components with React.lazy()
- Audited node_modules (removed 40+ unused packages)

Final bundle: 6MB. Manageable.

The dev lesson: test bundle size early. At 15MB, you're already behind. Add a bundle size CI check.

## The Pain of Real-Time Cost Tracking

Tracking actual AI costs from OpenRouter sounds simple.

It's not.

The problems:

- Batch generation (generate 50 questions overnight) needs rate limiting
- Cost calculation includes tokens OpenRouter uses (not just your tokens)
- Model pricing changes weekly
- You need to reconcile estimated costs vs. actual costs

The solution I built:

```typescript
// After each generation request
const response = await openrouter.generate({...});

// Query generation details (includes actual cost)
const costData = await fetch(`https://openrouter.ai/api/v1/generation?id=${response.id}`, {
  headers: { Authorization: `Bearer ${OPENROUTER_KEY}` }
});

// Store in database with timestamp for auditing
await prisma.aiUsageLog.create({
  data: {
    openrouterGenId: response.id,
    model: response.model,
    inputTokens: costData.native_tokens_prompt,
    outputTokens: costData.native_tokens_completion,
    actualCostUsd: costData.total_cost,
    costVerified: true,
    costVerifiedAt: new Date()
  }
});

// Alert if spending crosses threshold
const totalSpent = await prisma.aiUsageLog.aggregate({
  _sum: { actualCostUsd: true }
});

if (totalSpent._sum.actualCostUsd > BUDGET_THRESHOLD) {
  await sendAlert(`Spending is at $${totalSpent._sum.actualCostUsd}`);
}
```

Not elegant. Works perfectly. Prevents surprises.

## The Architecture Win: Curriculum-First Instead of Content-First

This was the pivot that mattered.

Initially: build generic question bank and hope it aligns with schools.

Instead: download official standards, generate aligned questions, add engagement mechanics.

Why this changed everything:

Students used it because it matched their actual curriculum. Parents trusted it because it aligned to official standards. Teachers could assign it without worrying about content quality.

Contrast this with "generic homework helper" (thousands exist, none matter).

The dev cost of curriculum alignment:

- Parsing Spanish BOE standards
- Building tag system flexible enough for multiple interpretations
- Validating 1,383 questions actually map to standards (not just adjacent topics)
- Handling curriculum updates (BOJA 2023 vs. BOJA 2025)

Boring work. Critical work.

## What I'd Change: Schema Design Before Content Generation

I did this backwards:

1.  Generated questions
2.  Realized schema was suboptimal
3.  Refactored tags while preserving content

If redoing:

1.  Design schema (tag taxonomy, question structure, proficiency model)
2.  Validate schema with 50 test questions
3.  Only then generate at scale

Schema changes at 1,000 questions equals annoying. Schema changes at 10,000 questions equals painful. Schema changes at 100,000 questions equals nightmare.

## What Actually Shipped

PostgreSQL tag system with GIN indexes (scales to 100K+ questions, 15-50ms queries) Snapshot lesson caching (teachers create lessons in less than 5 seconds) Real AI cost tracking (know cost-per-question, predict sustainability) Curriculum alignment to official standards (BOE/BOJA mapping with audit trail) Type-safe database with Prisma (schema errors caught before production) Mobile bundle optimized (15MB to 6MB with Capacitor) Proficiency tracking infrastructure (ready for adaptive learning)

The stack:

- Next.js 14, TypeScript, Supabase, Prisma
- PostgreSQL arrays and GIN indexes (not traditional ORMs)
- Claude Sonnet (content generation) and Haiku (real-time feedback)
- OpenRouter (unified API, cost tracking)
- Capacitor (web to mobile without rewriting)

## The Numbers

- 1,383 questions generated (€0.47 each on average)
- 2 subjects mapped (Physics/Chemistry, Geography/History)
- 1 grade level (2º ESO, Andalusia)
- 5-10 students testing
- Query performance: 15-50ms for complex tag searches
- Bundle size: 6MB
- Cache refresh: less than 5 seconds
- Zero revenue (validating product-market fit first)

## The Real Lesson

Nobody warns you about the technical challenges of EdTech until you hit them.

Engagement mechanics are easy (everyone copies Duolingo). Curriculum alignment is hard (requires understanding standards, teacher workflows, textbook organizations).

Data structure at scale matters more than business strategy. Get the schema right, everything else is easy. Get it wrong, you're refactoring at 10,000 rows.

Cost visibility matters. "It's just €0.47 per question" compounds to €650 before you notice.

Teacher adoption matters more than student engagement. Student engagement without teacher support equals feature, not product.

And if you're building something with hard deadlines and unknowns, having a partner to explore uncharted territory with (even at context window cost) beats being stuck learning from scratch.

Anyway, we're launching with the first 90 students in March. If retention works (targeting 30%+ at 10-day streaks), this becomes more than a hobby project.

If it doesn't, I've already learned more about EdTech architecture than most people building in this space.

## Resources For The Next Person

PostgreSQL GIN Indexes: [https://www.postgresql.org/docs/current/gin.html](https://www.postgresql.org/docs/current/gin.html)

Prisma Type-Safe Migrations: [https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/what-is-prisma-migrate](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/what-is-prisma-migrate)

Bundle Size Optimization: [https://bundlephobia.com/](https://bundlephobia.com/)
