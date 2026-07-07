#!/usr/bin/env bash
# Recreate containers so docker compose reloads .env (Traefik Host + app env).
set -euo pipefail
cd "$(dirname "$0")/.."

if ! command -v docker >/dev/null 2>&1; then
  echo "docker not found. Install Docker and ensure the daemon is running." >&2
  exit 1
fi

if docker compose version &>/dev/null; then
  docker compose up -d --force-recreate --remove-orphans "$@"
else
  docker-compose up -d --force-recreate --remove-orphans "$@"
fi
echo "Done. Site should be at https://${DOMAIN:-nyalalabs.org}"
