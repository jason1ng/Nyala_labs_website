#!/usr/bin/env node
/**
 * Reset a Payload user password (Payload-compatible pbkdf2 salt/hash in Postgres).
 *
 * Usage:
 *   set -a && source .env && set +a
 *   node scripts/reset-payload-password.mjs marcusyeokh2796@gmail.com 'NewPassword'
 */
import crypto from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const email = process.argv[2]?.trim();
const newPassword = process.argv[3];

if (!email || !newPassword) {
  console.error(
    "Usage: node scripts/reset-payload-password.mjs <email> <new-password>",
  );
  process.exit(1);
}

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

let dbUrl = process.env.DATABASE_URL?.trim();
if (!dbUrl) {
  console.error("DATABASE_URL missing in .env");
  process.exit(1);
}
dbUrl = dbUrl.replace("host.docker.internal", "127.0.0.1");

const salt = crypto.randomBytes(32).toString("hex");
const hash = crypto
  .pbkdf2Sync(newPassword, salt, 25000, 512, "sha256")
  .toString("hex");

const sql = `
UPDATE users
SET salt = '${salt}',
    hash = '${hash}',
    login_attempts = 0,
    lock_until = NULL
WHERE email = '${email.replace(/'/g, "''")}'
RETURNING id, email;
`;

const out = execSync(`psql "${dbUrl}" -tAc "${sql.replace(/\n/g, " ")}"`, {
  encoding: "utf8",
});

if (!out.trim()) {
  console.error(`No user found with email: ${email}`);
  process.exit(1);
}

console.log(`Password updated for ${email} (user id ${out.trim()}).`);
console.log("Sign in at https://nyalalabs.org/admin/");
