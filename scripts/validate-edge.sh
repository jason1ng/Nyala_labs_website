#!/usr/bin/env bash
# Quick smoke test after Traefik edge deploy.
set -euo pipefail

cd "$(dirname "$0")/.."
set -a
# shellcheck disable=SC1091
source .env
set +a

SITE_HOST="${DOMAIN:?DOMAIN not set in .env}"
# Mail hostname is fixed in Apache/Traefik config (docker/traefik/dynamic/mail.yml)
MAIL_HOST="smtp.nyalalabs.org"
FAIL=0

check() {
  local name="$1"
  shift
  if "$@"; then
    echo "OK  $name"
  else
    echo "FAIL $name" >&2
    FAIL=1
  fi
}

echo "==> Docker"
DC=(docker compose)
if ! docker compose version &>/dev/null; then
  DC=(docker-compose)
fi

running_services="$("${DC[@]}" ps --services --filter status=running 2>/dev/null || true)"
check "traefik running" grep -q traefik <<<"$running_services"
check "web running" grep -q web <<<"$running_services"

echo "==> HTTPS endpoints"
code_site="$(curl -sS -o /dev/null -w '%{http_code}' --max-time 15 "https://${SITE_HOST}/" || echo 000)"
echo "    https://${SITE_HOST}/ → HTTP ${code_site}"
[[ "$code_site" =~ ^(200|301|302|307|308)$ ]] || FAIL=1

code_mail="$(curl -sS -o /dev/null -w '%{http_code}' --max-time 15 "https://${MAIL_HOST}/" || echo 000)"
echo "    https://${MAIL_HOST}/ → HTTP ${code_mail}"
[[ "$code_mail" =~ ^(200|301|302|307|308)$ ]] || FAIL=1

echo "==> TLS certificate names"
site_cn="$(echo | openssl s_client -connect "${SITE_HOST}:443" -servername "${SITE_HOST}" 2>/dev/null | openssl x509 -noout -subject 2>/dev/null || true)"
mail_cn="$(echo | openssl s_client -connect "${MAIL_HOST}:443" -servername "${MAIL_HOST}" 2>/dev/null | openssl x509 -noout -subject 2>/dev/null || true)"
echo "    site: ${site_cn:-unknown}"
echo "    mail: ${mail_cn:-unknown}"
echo "$site_cn" | grep -q "${SITE_HOST}" || FAIL=1
echo "$mail_cn" | grep -q "${MAIL_HOST}" || FAIL=1

echo "==> Mail body (Roundcube)"
mail_html="$(curl -sS --max-time 15 "https://${MAIL_HOST}/" || true)"
if grep -qiE 'roundcube|webmail' <<<"$mail_html"; then
  echo "OK  Roundcube HTML present"
else
  echo "FAIL Roundcube HTML not found on mail vhost" >&2
  FAIL=1
fi

if [[ "$FAIL" -eq 0 ]]; then
  echo "All edge checks passed."
else
  echo "Some checks failed — see Traefik logs: docker compose logs traefik --tail 80" >&2
  exit 1
fi
