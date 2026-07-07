#!/usr/bin/env bash
# Idempotent setup for Nyala Labs Payload CMS on the host Postgres instance.
# Run with: sudo ./scripts/ensure-local-postgres.sh
set -euo pipefail

DB_NAME="${POSTGRES_DB:-nyala_payload}"
DB_USER="${POSTGRES_USER:-payload}"
# Set POSTGRES_PASSWORD before running, or pass inline:
#   sudo POSTGRES_PASSWORD='secret' ./scripts/ensure-local-postgres.sh
DB_PASSWORD="${POSTGRES_PASSWORD:-}"

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run as root: sudo $0" >&2
  exit 1
fi

if [[ -z "${DB_PASSWORD}" ]]; then
  echo "Set POSTGRES_PASSWORD (used for role ${DB_USER}):" >&2
  echo "  sudo POSTGRES_PASSWORD='your-password' $0" >&2
  exit 1
fi

PG_VERSION="$(psql --version | sed -n 's/.* \([0-9]*\).*/\1/p')"
PG_HBA="/etc/postgresql/${PG_VERSION}/main/pg_hba.conf"

echo "==> Ensuring role ${DB_USER}"
sudo -u postgres psql -v ON_ERROR_STOP=1 <<SQL
DO \$\$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '${DB_USER}') THEN
    CREATE ROLE ${DB_USER} LOGIN PASSWORD '${DB_PASSWORD}';
  ELSE
    ALTER ROLE ${DB_USER} WITH PASSWORD '${DB_PASSWORD}';
  END IF;
END
\$\$;
SQL

echo "==> Ensuring database ${DB_NAME}"
if ! sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='${DB_NAME}'" | grep -q 1; then
  sudo -u postgres createdb -O "${DB_USER}" "${DB_NAME}"
  echo "Created database ${DB_NAME}"
else
  sudo -u postgres psql -v ON_ERROR_STOP=1 -c "ALTER DATABASE ${DB_NAME} OWNER TO ${DB_USER};"
  echo "Database ${DB_NAME} already exists"
fi

sudo -u postgres psql -v ON_ERROR_STOP=1 -d "${DB_NAME}" -c "GRANT ALL ON SCHEMA public TO ${DB_USER};"

if [[ -f "${PG_HBA}" ]]; then
  echo "==> Ensuring Docker bridge can reach Postgres (non-TLS, local network)"
  for CIDR in "172.16.0.0/12" "127.0.0.1/32"; do
    LINE="host    ${DB_NAME}    ${DB_USER}    ${CIDR}    scram-sha-256"
    if ! grep -qF "${LINE}" "${PG_HBA}"; then
      echo "${LINE}" >> "${PG_HBA}"
      echo "Added pg_hba: ${LINE}"
    fi
  done
  systemctl reload postgresql
fi

echo ""
echo "Done. Connection URLs:"
echo "  Host / pnpm:  postgresql://${DB_USER}:****@127.0.0.1:5432/${DB_NAME}"
echo "  Docker:       postgresql://${DB_USER}:****@host.docker.internal:5432/${DB_NAME}"
