import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  output: "static",

  site: "https://richardlagrand.com",

  prefetch: {
    prefetchAll: true,
  },

  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
    cacheDir: "./.astro/cache/images",
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: 4096,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["pagefind"],
          },
        },
      },
    },
    ssr: {
      external: ["pagefind"],
    },
  },

  integrations: [
    sitemap({
      filter: (page) => !page.includes("/search"),
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en-US",
        },
      },
    }),
  ],

  markdown: {
    gfm: true,
    syntaxHighlight: "shiki",
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
      wrap: true,
    },
  },

  build: {
    inlineStylesheets: "auto",
    format: "directory",
  },

  server: {
    host: true,
    port: 4321,
  },

  trailingSlash: "never",
});
