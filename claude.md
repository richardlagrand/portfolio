# Claude Code Instructions for Portfolio Site

## Quick Reference

**Stack:** Astro 5.3+ | TailwindCSS 4.0 (`@tailwindcss/vite`) | Bun | Raleway fonts | Pagefind | Netlify

**Targets:** Lighthouse 97+ | <1s load | WCAG AA | Zero JS hydration by default

**Design:** #FAFAFA bg | #333333 text | #4A7BA7 accent (muted blue) | 20px base | 70ch max-width

---

## Key Rules

1. **Read `/docs/` for detailed instructions** — Each doc (DOC-1 through DOC-12) has full context
2. **Deviate on errors** — Package versions don't exist? Use latest. API changed? Adapt it.
3. **Always explain deviations** — Why you changed it, show the corrected code, verify it works
4. **Test before proceeding** — `bun run build` must pass, no errors
5. **Use semantic HTML** — Components: PascalCase | Pages: kebab-case | No utility clutter

---

## Content Schema (Quick)

**Projects:** title | description | date | techStack[] | heroImage | link? | featured? | inProgress?

**Blog:** title | description | pubDate | updatedDate? | tags[]? | featured? | heroImage?

See `/docs/DOC-6-CONTENT-SCHEMA.md` for full spec with examples.

---

## Essential Commands

```bash
bun install           # Install deps
bun run dev          # Dev server (http://localhost:4321)
bun run build        # Production build
bun run preview      # Preview dist/
bun run lint         # Type check
bun run format       # Code format
bun run storybook    # Component library (http://localhost:6006)
```

---

## Workflow

1. **Check relevant doc** in `/docs/` folder for task at hand
2. **Read full context** in that doc (not this file)
3. **Execute with flexibility** (fix versions, adapt APIs)
4. **Report what changed** and verify with `bun run build`

Examples:

- File structure? → `/docs/DOC-1-FILE-STRUCTURE.md`
- Astro config? → `/docs/DOC-3-ASTRO-CONFIG.md`
- Components? → `/docs/DOC-7-BASE-COMPONENTS.md`
- Deployment? → `/docs/DOC-12-NETLIFY-DEPLOYMENT.md`

---

## Performance Checklist

- [ ] `bun run build` completes <60s, zero errors
- [ ] `dist/` folder <5 MB
- [ ] Google PageSpeed Insights: 97+ all categories
- [ ] Lighthouse Core Web Vitals: LCP <2.5s, CLS <0.1
- [ ] Fonts load (no FOUT)
- [ ] Mobile responsive (320px, 768px, 1024px)
- [ ] Accessibility: alt text, contrast, keyboard nav

---

## Success = Done When

- ✅ All 12 docs executed
- ✅ 6 projects + 2 blog posts created
- ✅ Deployed to Netlify
- ✅ Lighthouse 97+ all categories
- ✅ WCAG AA compliant

**See `EXECUTION-SUMMARY.md` for detailed timeline and file structure.**
