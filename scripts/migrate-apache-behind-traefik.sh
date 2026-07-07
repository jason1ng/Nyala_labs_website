#!/usr/bin/env bash
# Move Apache mail (Roundcube) to :8080 so Traefik can bind :80 / :443.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORTS_CONF=/etc/apache2/ports.conf
STAMP="$(date +%Y%m%d%H%M%S)"

if [[ "$(id -u)" -ne 0 ]]; then
  echo "Run with sudo: sudo $0" >&2
  exit 1
fi

echo "==> Backing up Apache config"
cp -a "$PORTS_CONF" "${PORTS_CONF}.bak.${STAMP}"
cp -a /etc/apache2/sites-enabled "${PORTS_CONF}.sites-enabled.bak.${STAMP}" 2>/dev/null || true

echo "==> Apache listens on 8080 only (TLS handled by Traefik)"
cat >"$PORTS_CONF" <<'EOF'
# Managed by Nyala Labs migrate-apache-behind-traefik.sh — Traefik owns :80/:443
Listen 8080
EOF

echo "==> Install internal mail vhost"
cp "${ROOT}/docker/apache-mail-internal.conf" /etc/apache2/sites-available/mail-internal.conf

a2dissite 000-default.conf 000-default-le-ssl.conf 2>/dev/null || true
a2ensite mail-internal.conf

echo "==> Validate and reload Apache"
apache2ctl configtest
systemctl reload apache2

echo "==> Port check (Apache should be on 8080, not 80/443)"
ss -tlnp | grep -E ':80|:443|:8080' || true

if ss -tlnp | grep -q 'apache2.*:80 '; then
  echo "WARNING: Apache still listening on :80" >&2
fi
if ss -tlnp | grep -q 'apache2.*:443 '; then
  echo "WARNING: Apache still listening on :443" >&2
fi

echo "==> acme.json permissions for Traefik"
if [[ -f "${ROOT}/docker/traefik/acme.json" ]]; then
  chmod 600 "${ROOT}/docker/traefik/acme.json"
fi

echo "Done. Start Traefik: cd ${ROOT} && docker compose up -d --build"
