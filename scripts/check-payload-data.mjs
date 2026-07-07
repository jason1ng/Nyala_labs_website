#!/usr/bin/env node
/** Quick Payload + DB content audit. Run from repo root with .env sourced. */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    process.env[t.slice(0, i)] ??= t.slice(i + 1);
  }
}

// Host check: use localhost for Postgres when .env has host.docker.internal
if (process.env.DATABASE_URL?.includes("host.docker.internal")) {
  process.env.DATABASE_URL = process.env.DATABASE_URL.replace(
    "host.docker.internal",
    "127.0.0.1",
  );
}

const { getPayload } = await import("payload");
const { default: config } = await import("../src/payload.config.ts");

const payload = await getPayload({ config });

const collections = [
  "blog-posts",
  "activities",
  "committee-members",
  "news",
  "media",
];

for (const slug of collections) {
  try {
    const r = await payload.find({ collection: slug, limit: 5, depth: 1 });
    console.log(`\n${slug}: ${r.totalDocs} doc(s)`);
    for (const doc of r.docs) {
      const title = doc.title || doc.name || doc.filename || doc.id;
      const url =
        doc.url ||
        doc.coverImage?.url ||
        doc.image?.url ||
        "(no url)";
      console.log(`  - [${doc.id}] ${title}`);
      if (typeof url === "string" && url.startsWith("http")) console.log(`      media: ${url}`);
    }
  } catch (e) {
    console.error(`${slug}: ERROR`, e.message);
  }
}

try {
  const home = await payload.findGlobal({ slug: "homepage", depth: 1 });
  const hero = (home.heroMedia || []).length;
  const hi = (home.highlights || []).length;
  console.log(`\nhomepage global: heroMedia=${hero}, highlights=${hi}`);
} catch (e) {
  console.error("homepage: ERROR", e.message);
}

process.exit(0);
