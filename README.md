# Portfolio

Personal portfolio and blog of Richard Lagrand, a full stack engineer based in Amsterdam. Live at [richardlagrand.com](https://richardlagrand.com).

The site is fully static: Astro renders everything to HTML at build time and ships no client-side framework. Content lives as Markdown files in this repo and is edited through [Pages CMS](https://pagescms.org), which commits straight to GitHub. Netlify rebuilds on every push.

## Stack

| Concern    | Choice                                                                         |
| ---------- | ------------------------------------------------------------------------------ |
| Framework  | [Astro](https://astro.build) 5 (`output: "static"`, zero JS hydration)         |
| Styling    | Tailwind CSS 4 via `@tailwindcss/vite`, plus `@tailwindcss/typography`         |
| Content    | Astro Content Layer (`glob` loader) with Zod schemas, Markdown files           |
| CMS        | [Pages CMS](https://app.pagescms.org), configured by `.pages.yml`              |
| Images     | `astro:assets` with the `sharp` service (AVIF/WebP, hashed filenames)          |
| Search     | [Pagefind](https://pagefind.app), index built after `astro build`              |
| Code       | Shiki syntax highlighting (`github-light` / `github-dark`)                     |
| Analytics  | [Umami](https://umami.is) Cloud, proxied through `/stats` to dodge ad blockers |
| Components | Storybook (HTML) for the component library                                     |
| Runtime    | [Bun](https://bun.sh) for installs and scripts                                 |
| Hosting    | Netlify                                                                        |

Design: `#FAFAFA` background, `#333333` text, `#4A7BA7` accent, Raleway, 20px base size, 70ch reading width.

## Getting started

```bash
bun install
bun run dev          # http://localhost:4321
```

| Command                 | What it does                                     |
| ----------------------- | ------------------------------------------------ |
| `bun run dev`           | Dev server on port 4321                          |
| `bun run build`         | `astro build`, then `pagefind --site dist`       |
| `bun run preview`       | Serve `dist/` locally                            |
| `bun run lint`          | `astro check` (type check)                       |
| `bun run format`        | Prettier                                         |
| `bun run storybook`     | Component library on http://localhost:6006       |

Search only works against a built site, because the Pagefind index is generated after the build. Use `bun run build && bun run preview` to test it.

## Project structure

```
src/
├── assets/
│   ├── projects/        Hero images and per-project diagrams (processed by sharp)
│   └── blog/            Blog hero images
├── components/          Header, Footer, ProjectCard, BlogCard, SearchModal, ...
├── content/
│   ├── projects/        One .md file per project
│   └── blog/            One .md file per post
├── content.config.ts    Collection schemas (Zod)
├── layouts/BaseLayout.astro
├── pages/               index, about, projects/, blog/, 404
├── plugins/
│   └── remark-rewrite-images.mjs
├── styles/              global.css (Tailwind theme tokens), fonts.css
└── utils/schema.ts      JSON-LD structured data
.pages.yml               Pages CMS configuration
netlify.toml             Build, redirects, headers
astro.config.mjs
```

## Content model

Defined in `src/content.config.ts`. Frontmatter that fails validation fails the build.

**Projects** (`src/content/projects/*.md`)

| Field         | Type       | Notes                                |
| ------------- | ---------- | ------------------------------------ |
| `title`       | string     | required                             |
| `description` | string     | required, at least 10 characters     |
| `date`        | date       | required                             |
| `techStack`   | string[]   | required (may be empty)              |
| `heroImage`   | image      | optional, resolved by Astro          |
| `link`        | URL        | optional, must be a valid URL        |
| `featured`    | boolean    | default `false`                      |
| `inProgress`  | boolean    | default `false`, shows a badge       |

**Blog** (`src/content/blog/*.md`)

| Field         | Type       | Notes                         |
| ------------- | ---------- | ----------------------------- |
| `title`       | string     | required                      |
| `description` | string     | required, at least 10 chars   |
| `pubDate`     | date       | required                      |
| `updatedDate` | date       | optional                      |
| `tags`        | string[]   | default `[]`                  |
| `featured`    | boolean    | default `false`               |
| `heroImage`   | image      | optional                      |

Routes use the entry `id` (the filename without `.md`) as the slug: `/projects/<id>` and `/blog/<id>`.

## Editing content with Pages CMS

[Pages CMS](https://pagescms.org) is a Git-backed editor. It has no database of its own: it reads and writes the Markdown files and images in this repo. The collections, fields and media folders are all declared in [`.pages.yml`](.pages.yml).

### Access

1. Go to **https://app.pagescms.org** and sign in with GitHub.
2. Pick the `richardlagrand/portfolio` repository and the `master` branch.
3. You'll see two collections, **Projects** and **Blog**, and two media folders.

Access is controlled by GitHub. Anyone who needs to edit must have write access to the repository (Settings, Collaborators) and must have installed the Pages CMS GitHub app on it. There are no separate CMS passwords.

### Day-to-day flow

1. Open **Projects** or **Blog** and pick an entry, or click **Add** for a new one.
2. Edit the fields and the rich-text body. Upload a hero image with the image field.
3. Save. Pages CMS commits to `master`.
4. Netlify sees the push, runs `bun run build` and deploys. This takes roughly one to two minutes.

A new entry is created as `<title>.md` (the `filename: "{primary}.md"` setting in `.pages.yml`). The filename becomes the URL slug, so keep titles short and URL-friendly or rename the file in Git afterwards.

### Things to know

- **Edits go live directly.** There is no draft or preview step in the CMS, since it commits to the production branch. For risky changes, edit locally on a branch instead.
- **Images are stored in Git** under `src/assets/projects` and `src/assets/blog`, and are optimised at build time by Astro and sharp. Keep uploads under about 2 MB.
- **Inline images in the body.** Pages CMS writes image paths like `src/assets/projects/filtered/diagram.jpg`, which Astro can't resolve from inside a content file. `src/plugins/remark-rewrite-images.mjs` rewrites those to relative paths at build time, so don't change them by hand.
- **Schema drift.** If you add a frontmatter field in `src/content.config.ts`, also add it to `.pages.yml`, otherwise the CMS won't show it. A field missing from the Zod schema is ignored by the site.
- **Pulling changes.** After editing in the CMS, `git pull` before working locally to avoid diverging from `master`.

You can also skip the CMS entirely: edit the Markdown in your editor, commit and push. Both routes produce the same result.

## Images

- Hero images are referenced in frontmatter relative to the content file, for example `heroImage: "../../assets/projects/project_costastay.jpeg"`.
- Astro's `sharp` image service generates AVIF/WebP variants with content-hashed filenames, which Netlify caches for a year.
- Cached transforms live in `.astro/cache/images`, so repeated builds are fast.

## Search

`bun run build` runs `npx pagefind --site dist` after Astro, which crawls the generated HTML and writes the index to `dist/pagefind/`. `SearchModal.astro` loads it at runtime with an `is:inline` script, because Vite can't resolve `/pagefind/pagefind.js` at build time.

## Analytics

Umami Cloud tracks page views. To keep it working with ad blockers, the script and event endpoint are proxied through the site's own domain (`netlify.toml`):

- `/stats/script.js` to `cloud.umami.is/script.js`
- `/stats/api/send` to `cloud.umami.is/api/send`

The tracking snippet is in `src/layouts/BaseLayout.astro`. The website id there is public by design.

## Deployment

Netlify builds from `master` using `netlify.toml`:

- Build command `bun run build`, publish directory `dist/`
- `SITE_URL` is set to `https://richardlagrand.com`
- Security headers on all routes, 1-year immutable caching for `/fonts/*` and `/_astro/*`
- `/sitemap.xml` is rewritten to `/sitemap-index.xml` (generated by `@astrojs/sitemap`; `/search` is excluded)

Every push to `master`, including CMS commits, triggers a deploy.

## Tailwind v4 notes

Design tokens live in an `@theme` block in `src/styles/global.css`, and the variable prefix decides which utilities exist: `--text-*` for font sizes, `--leading-*` for line heights, `--color-*` for colours, `--spacing-*`, `--radius-*`, `--shadow-*`, `--font-*`, `--max-width-*`. Changes to `@theme` tokens need a dev server restart. Keep any global CSS inside an `@layer`, because unlayered CSS beats Tailwind's utilities.

## Performance targets

Lighthouse 97+ in every category, load under 1 second, LCP under 2.5 s, CLS under 0.1, WCAG AA contrast and keyboard navigation.

## Further reading

Longer design notes (file structure, Astro and Tailwind config, base components, SEO schema, Netlify) are in `docs/`. That folder is listed in `.gitignore`, so it exists only on the author's machine.

## License

MIT
