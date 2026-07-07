#!/usr/bin/env node
/**
 * Smoke test Cloudflare R2 using the same S3 settings as payload.config.ts
 * Usage: set -a && source .env && set +a && node scripts/test-r2-connection.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  S3Client,
  HeadBucketCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const k = t.slice(0, i);
    const v = t.slice(i + 1);
    if (!(k in process.env)) process.env[k] = v;
  }
}

const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID?.trim();
const bucket = process.env.CLOUDFLARE_R2_BUCKET?.trim();
const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID?.trim();
const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY?.trim();
const publicUrl = (process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "").replace(/\/$/, "");

for (const [name, val] of [
  ["CLOUDFLARE_R2_ACCOUNT_ID", accountId],
  ["CLOUDFLARE_R2_BUCKET", bucket],
  ["CLOUDFLARE_R2_ACCESS_KEY_ID", accessKeyId],
  ["CLOUDFLARE_R2_SECRET_ACCESS_KEY", secretAccessKey],
]) {
  if (!val) {
    console.error(`Missing ${name} in .env`);
    process.exit(1);
  }
}

const client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId, secretAccessKey },
  forcePathStyle: true,
});

const testKey = `_connection-test/${Date.now()}.txt`;

try {
  await client.send(new HeadBucketCommand({ Bucket: bucket }));
  console.log("OK  S3 HeadBucket —", bucket);

  const list = await client.send(
    new ListObjectsV2Command({ Bucket: bucket, MaxKeys: 5 }),
  );
  const keys = (list.Contents ?? []).map((o) => o.Key);
  console.log("OK  S3 ListObjects —", list.KeyCount ?? keys.length, "object(s)");
  keys.forEach((k) => console.log("     ", k));

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: testKey,
      Body: "nyala-r2-connection-test",
      ContentType: "text/plain",
    }),
  );
  console.log("OK  S3 PutObject —", testKey);

  await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: testKey }));
  console.log("OK  S3 DeleteObject — cleaned up");

  if (publicUrl) {
    const rootRes = await fetch(`${publicUrl}/`);
    console.log("    Public URL base — HTTP", rootRes.status, publicUrl);
    if (keys[0]) {
      const fileRes = await fetch(`${publicUrl}/${keys[0]}`, { method: "HEAD" });
      console.log("    Public object HEAD —", keys[0], "→ HTTP", fileRes.status);
    }
  } else {
    console.log("    (NEXT_PUBLIC_R2_PUBLIC_URL unset — skip public URL check)");
  }

  console.log("\nResult: R2 connection is working.");
} catch (e) {
  console.error("FAIL", e.name || "Error", "-", e.message);
  if (e.$metadata?.httpStatusCode) {
    console.error("     HTTP", e.$metadata.httpStatusCode);
  }
  process.exit(1);
}
