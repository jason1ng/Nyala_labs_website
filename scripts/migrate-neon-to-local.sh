#!/usr/bin/env bash
# Copy Neon (neondb) → local nyala_payload (public schema only).
#
# Usage:
#   export NEON_DATABASE_URL='postgresql://neondb_owner:PASSWORD@ep-....neon.tech/neondb?sslmode=require'
#   sudo -u postgres ./scripts/migrate-neon-to-local.sh
#
# Or add NEON_DATABASE_URL to .env (gitignored) and:
#   set -a && source .env && set +a && sudo -u postgres ./scripts/migrate-neon-to-local.sh
set -euo pipefail

LOCAL_DB="${LOCAL_DB:-nyala_payload}"
LOCAL_OWNER="${LOCAL_OWNER:-payload}"
DUMP_FILE="${DUMP_FILE:-/tmp/nyala_neon_to_local.dump}"

if [[ -z "${NEON_DATABASE_URL:-}" ]]; then
  echo "Set NEON_DATABASE_URL to your Neon connection string (database: neondb)." >&2
  exit 1
fi

if [[ "$(whoami)" != "postgres" ]]; then
  echo "Run as the postgres OS user: sudo -u postgres env NEON_DATABASE_URL='…' $0" >&2
  exit 1
fi

echo "==> Dumping Neon public schema to ${DUMP_FILE}"
pg_dump "${NEON_DATABASE_URL}" \
  --schema=public \
  --no-owner \
  --no-acl \
  --format=custom \
  --file="${DUMP_FILE}"

echo "==> Recreating local database ${LOCAL_DB}"
psql -v ON_ERROR_STOP=1 -d postgres <<SQL
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname = '${LOCAL_DB}' AND pid <> pg_backend_pid();
DROP DATABASE IF EXISTS ${LOCAL_DB};
CREATE DATABASE ${LOCAL_DB} OWNER ${LOCAL_OWNER};
SQL

echo "==> Restoring into ${LOCAL_DB}"
pg_restore \
  --no-owner \
  --no-acl \
  --dbname="${LOCAL_DB}" \
  "${DUMP_FILE}" 2>&1 | grep -v 'schema "public" already exists' || true

echo "==> Granting ownership and privileges to ${LOCAL_OWNER}"
psql -v ON_ERROR_STOP=1 -d "${LOCAL_DB}" <<SQL
GRANT ALL ON SCHEMA public TO ${LOCAL_OWNER};
GRANT ALL ON ALL TABLES IN SCHEMA public TO ${LOCAL_OWNER};
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO ${LOCAL_OWNER};
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO ${LOCAL_OWNER};
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO ${LOCAL_OWNER};
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO ${LOCAL_OWNER};

DO \$\$
DECLARE r RECORD;
BEGIN
  FOR r IN SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  LOOP
    EXECUTE format('ALTER TABLE public.%I OWNER TO ${LOCAL_OWNER}', r.tablename);
  END LOOP;
  FOR r IN SELECT sequence_name FROM information_schema.sequences WHERE sequence_schema = 'public'
  LOOP
    EXECUTE format('ALTER SEQUENCE public.%I OWNER TO ${LOCAL_OWNER}', r.sequence_name);
  END LOOP;
END \$\$;
SQL

echo "==> Row counts after migration"
psql -d "${LOCAL_DB}" -c "
SELECT 'users' AS t, COUNT(*) FROM users
UNION ALL SELECT 'blog_posts', COUNT(*) FROM blog_posts
UNION ALL SELECT 'media', COUNT(*) FROM media
UNION ALL SELECT 'activities', COUNT(*) FROM activities
UNION ALL SELECT 'committee_members', COUNT(*) FROM committee_members
UNION ALL SELECT 'homepage', COUNT(*) FROM homepage;
"

echo ""
echo "Done. Point .env DATABASE_URL at:"
echo "  postgresql://${LOCAL_OWNER}:****@127.0.0.1:5432/${LOCAL_DB}"
