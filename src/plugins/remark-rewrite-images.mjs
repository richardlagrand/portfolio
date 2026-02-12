import { visit } from "unist-util-visit";

/**
 * Remark plugin that rewrites absolute `src/` image paths (from PagesCMS)
 * to relative paths that Astro's content layer can resolve.
 *
 * PagesCMS writes: ![alt](src/assets/projects/filtered/diagram.jpg)
 * Astro expects:   ![alt](../../assets/projects/filtered/diagram.jpg)
 */
export default function remarkRewriteImages() {
  return (tree, file) => {
    const contentDir = file.history[0]?.replace(/\/[^/]+$/, "") ?? "";
    const projectRoot = file.cwd ?? "";

    visit(tree, "image", (node) => {
      if (node.url.startsWith("src/")) {
        const abs = `${projectRoot}/${node.url}`;
        const rel = getRelativePath(contentDir, abs);
        node.url = rel;
      }
    });
  };
}

function getRelativePath(from, to) {
  const fromParts = from.split("/").filter(Boolean);
  const toParts = to.split("/").filter(Boolean);
  let common = 0;
  while (common < fromParts.length && common < toParts.length && fromParts[common] === toParts[common]) {
    common++;
  }
  const ups = fromParts.length - common;
  return "../".repeat(ups) + toParts.slice(common).join("/");
}
