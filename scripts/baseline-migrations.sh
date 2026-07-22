#!/usr/bin/env bash
# One-time migration baseline for BluishBoy.
# Run from the project root with DATABASE_URL in .env pointing at the
# database that ALREADY matches the pre-checkout schema (your Neon DB).
#
#   bash scripts/baseline-migrations.sh
#
# Afterwards, create the checkout migration with:
#   npx prisma migrate dev --name checkout_guest_fields
set -euo pipefail

if [ -d "prisma/migrations" ] && [ -n "$(ls -A prisma/migrations 2>/dev/null)" ]; then
  echo "prisma/migrations already exists and is not empty — refusing to re-baseline." >&2
  exit 1
fi

mkdir -p prisma/migrations/0_init

echo "Generating baseline SQL from the pre-checkout schema..."
# Baseline must reflect the schema BEFORE the checkout fields were added.
# fd2fa56 is the last commit prior to the purchase-path work.
git show fd2fa56:prisma/schema.prisma > /tmp/schema-baseline.prisma

npx prisma migrate diff \
  --from-empty \
  --to-schema-datamodel /tmp/schema-baseline.prisma \
  --script > prisma/migrations/0_init/migration.sql

echo "Marking 0_init as already applied on the target database..."
npx prisma migrate resolve --applied 0_init

echo
echo "Baseline complete. Now run:"
echo "  npx prisma migrate dev --name checkout_guest_fields"
echo "to create and apply the migration for clerkUserId / customerPhone / itemsSnapshot."
