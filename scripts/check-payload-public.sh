#!/usr/bin/env bash
# Smoke test Payload API + public pages (run after deploy).
set -euo pipefail
cd "$(dirname "$0")/.."
set -a
# shellcheck disable=SC1091
source .env
set +a

BASE="https://${DOMAIN:?Set DOMAIN in .env}"
FAIL=0

check_http() {
  local name="$1" url="$2" expect="$3"
  local code
  code="$(curl -sS -o /dev/null -w '%{http_code}' --max-time 20 "$url" || echo 000)"
  if [[ "$code" =~ $expect ]]; then
    echo "OK  $name ($code) $url"
  else
    echo "FAIL $name ($code, want $expect) $url" >&2
    FAIL=1
  fi
}

echo "==> HTTP"
check_http "site" "$BASE/" '^(200)$'
check_http "admin" "$BASE/admin/" '^(200|307|308)$'
check_http "api blogs" "$BASE/api/blog-posts?limit=1&depth=1" '^200$'

echo "==> API JSON"
blogs="$(curl -sS --max-time 20 "$BASE/api/blog-posts?limit=1&depth=1")"
echo "$blogs" | grep -q '"docs"' && echo "OK  blog-posts API returns docs" || { echo "FAIL blog-posts API" >&2; FAIL=1; }

committee="$(curl -sS --max-time 20 "$BASE/api/committee-members?limit=1&depth=1")"
echo "$committee" | grep -q 'r2.dev' && echo "OK  committee media URLs use R2 public base" || { echo "FAIL committee R2 URLs" >&2; FAIL=1; }

home="$(curl -sS --max-time 20 "$BASE/api/globals/homepage?depth=1")"
echo "$home" | grep -q 'heroMedia' && echo "OK  homepage global API" || { echo "FAIL homepage global" >&2; FAIL=1; }

echo "==> DB dev-migration blocker"
PGURL="${DATABASE_URL/host.docker.internal/127.0.0.1}"
if command -v psql >/dev/null; then
  dev_row="$(psql "$PGURL" -tAc "SELECT count(*) FROM payload_migrations WHERE batch = -1" 2>/dev/null || echo 0)"
  if [[ "${dev_row// /}" == "0" ]]; then
    echo "OK  no payload_migrations batch=-1 (Payload won't hang on startup)"
  else
    echo "FAIL payload_migrations has batch=-1 — run: DELETE FROM payload_migrations WHERE batch = -1;" >&2
    FAIL=1
  fi
fi

if [[ "$FAIL" -eq 0 ]]; then
  echo "All Payload public checks passed."
else
  exit 1
fi
