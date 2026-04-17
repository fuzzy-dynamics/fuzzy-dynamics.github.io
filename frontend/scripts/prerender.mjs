// Postbuild prerender: duplicates dist/index.html into a folder per route with
// route-specific <title>, meta description, canonical, and OG tags. This gives
// crawlers a correct first-paint HTML per route. React Router + react-helmet-async
// take over after hydration.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");
const indexPath = join(distDir, "index.html");

if (!existsSync(indexPath)) {
  console.error(`[prerender] dist/index.html not found — did the build run?`);
  process.exit(1);
}

const SITE = "https://fydy.ai";
const DEFAULT_IMAGE = `${SITE}/og-image.png`;

const routes = [
  {
    path: "/openscientist",
    title: "OpenScientist — AI Research Studio by Fuzzy Dynamics",
    description:
      "OpenScientist is an AI research studio for scientific discovery. Built by Fuzzy Dynamics to plan, read, and run experiments. Now in private beta.",
  },
  {
    path: "/enterprise",
    title: "Enterprise — Fuzzy Dynamics",
    description:
      "Fuzzy Dynamics for enterprise research teams. Deploy OpenScientist inside your organization.",
  },
  {
    path: "/research",
    title: "Research — Fuzzy Dynamics",
    description:
      "Research from Fuzzy Dynamics on machine cognition, continual learning, and AI for scientific discovery.",
  },
  {
    path: "/blog",
    title: "Blog — Fuzzy Dynamics",
    description:
      "Writing from the Fuzzy Dynamics team on machine cognition, AI research, and OpenScientist.",
  },
  {
    path: "/pricing",
    title: "Pricing — OpenScientist by Fuzzy Dynamics",
    description: "Pricing for OpenScientist, the AI research studio by Fuzzy Dynamics.",
  },
  {
    path: "/privacy",
    title: "Privacy & Security — Fuzzy Dynamics",
    description: "Privacy and security policy for Fuzzy Dynamics and OpenScientist.",
  },
];

const escapeHtml = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const baseHtml = readFileSync(indexPath, "utf8");

function rewrite(html, { title, description, path }) {
  const url = `${SITE}${path}`;
  const t = escapeHtml(title);
  const d = escapeHtml(description);

  let out = html;

  // <title>
  out = out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${t}</title>`);

  // meta description
  out = out.replace(
    /<meta\s+name="description"[^>]*>/i,
    `<meta name="description" content="${d}" />`
  );

  // canonical
  if (/<link\s+rel="canonical"[^>]*>/i.test(out)) {
    out = out.replace(
      /<link\s+rel="canonical"[^>]*>/i,
      `<link rel="canonical" href="${url}" />`
    );
  } else {
    out = out.replace(
      /(<link\s+rel="icon"[^>]*>)/i,
      `$1\n    <link rel="canonical" href="${url}" />`
    );
  }

  // og:title
  out = out.replace(
    /<meta\s+property="og:title"[^>]*>/i,
    `<meta property="og:title" content="${t}" />`
  );
  // og:description
  out = out.replace(
    /<meta\s+property="og:description"[^>]*>/i,
    `<meta property="og:description" content="${d}" />`
  );
  // og:url
  if (/<meta\s+property="og:url"[^>]*>/i.test(out)) {
    out = out.replace(
      /<meta\s+property="og:url"[^>]*>/i,
      `<meta property="og:url" content="${url}" />`
    );
  }
  // twitter:title / description
  out = out.replace(
    /<meta\s+name="twitter:title"[^>]*>/i,
    `<meta name="twitter:title" content="${t}" />`
  );
  out = out.replace(
    /<meta\s+name="twitter:description"[^>]*>/i,
    `<meta name="twitter:description" content="${d}" />`
  );

  return out;
}

for (const r of routes) {
  const html = rewrite(baseHtml, r);
  const outDir = join(distDir, r.path.replace(/^\//, ""));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html, "utf8");
  console.log(`[prerender] wrote ${r.path}/index.html`);
}

console.log(`[prerender] ${routes.length} route(s) prerendered.`);
