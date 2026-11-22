#!/bin/bash
set -e
cd "$(dirname "$0")/.."
docker compose -p ischeroth-dev --env-file config.dev.env -f docker-compose.yml -f docker-compose.dev.yml down
