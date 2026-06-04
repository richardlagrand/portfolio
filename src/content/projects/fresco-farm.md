---
title: Fresco.Farm
description: A community-bound marketplace that lets small farms sell directly to nearby consumers — ecological produce, an honest price, and zero food miles, de la huerta a tu puerta.
date: 2026-06-04
techStack:
  - Next.js
  - TypeScript
  - Prisma
  - PostgreSQL
  - Stripe Connect
  - Tailwind CSS
heroImage: ../../assets/projects/project_frescofarm.jpeg
link: https://fresco.farm
featured: true
inProgress: true
---
## The brief

This one came in as a client project. The starting point wasn't a feature list — it was a frustration shared by a specific group of people: they wanted ecological fruit and vegetables, grown without pesticides, at a price that was honest to both sides, and they wanted it to arrive without a thousand kilometres of refrigerated transport sitting on the carbon bill.

In Spain there's a phrase for exactly this: **de la huerta a tu puerta** — from the vegetable garden to your door. The client wanted a platform that made that literal, not aspirational.

## The people

The audience is narrower than "people who like vegetables," and that narrowness is the point. These are consumers who already care where their food comes from. On the other side sit the small producers: farms with genuinely good produce and no realistic route to market beyond a weekly stall or a wholesaler who sets the price for them. Between the two there's a missing piece of infrastructure, and that gap is the opportunity.

## The product

Fresco.Farm is a community-bound marketplace. A producer lists what they actually have, sets their own price, and chooses how an order reaches the buyer — collection at the farm, a market stall, or optional home delivery. A consumer browses, orders, pays, and picks up. The platform's job is administration: discovery, ordering, payment, and the paperwork around it. The deliberate decision was to keep it *thin* — there's no distributor role and no warehouse, because that's how a small farm already works.

The larger objective is what makes this more than a shop. The unit isn't the individual buyer — it's the **community**: a town, a neighbourhood, a co-op of households that organise their buying together. Any local group can stand one up and start trading, and the same software that serves one circle of farms and households can serve the next town over without rebuilding anything.

## The quirk that is the whole project

On a normal platform — Uber, Airbnb — you offer a thing, the thing has a price, and the platform brings two parties together and arranges the handover. The thing that was offered is the thing that's paid for. Clean.

Food doesn't behave like that. **5 kg of potatoes is never 5 kg.** It's 4.8, or 5.3, and it cannot be otherwise — you're pulling produce out of the ground, not assembling a SKU. The producer prices that in, more or less. But the real mess starts at the consumer end: people don't all collect at once. They come in across the day, across the week, and each one takes a little more or a little less than their order said. Whoever turns up last inherits the result — either there's a shortage, or there's a pile of product left over that nobody is going to claim.

Those discrepancies are called **picos** in Spanish — the little peaks and shortfalls. And reconciling them is, genuinely, the entire complexity of this project. The platform has to close the loop: track what was actually taken versus what was ordered, bill the right amounts, and account for leftovers — written off or charged to someone — so that at the end of a cycle the quantities, and the money, both add up to a full circle.

## What that meant in the code

The naïve version charges a card every time reality differs from the order. That's a disaster, because **every Stripe transaction is another fee** — settling a 200-gram potato difference by card would cost more than the potatoes. So the difference can't live on the card network.

The system I built keeps the card out of it. Real money only moves at real payment moments; the picos — the over- and under-collections — are settled in a **ledger** between consumer and producer instead. A small shortfall or surplus this week becomes a credit that squares up against the same person's next order, rather than a new charge. Producers are paid out in **batches** sized from what consumers actually took, not eagerly per order, and the leftover at the end of a cycle is reconciled explicitly: taken, written off, or charged — never left as a silent gap in the books.

So the engineering challenge here wasn't the marketplace; that part is ordinary. It was building an honest, self-closing accounting loop on top of a product that refuses to weigh exactly what it said it would, while touching the payment processor as few times as possible.

## Where it stands

In active build, working toward a first live launch with real money on real orders. The marketplace, communities, ordering, and the reconciliation flows are in place; the remaining work is the last stretch between "runs on my laptop" and "live for a real community paying real farmers."

The questions that matter next are the operational ones: whether the ledger keeps the picos invisible to people in practice, and whether the second community is as easy to switch on as the thesis promises.
