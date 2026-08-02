#!/bin/bash
# Sobe o board do workflow. Uso: bash tools/viz/serve.sh <slug> [porta]
# O slug vira a URL ?filme=<slug>; a página busca /<slug>/estado.json.
set -euo pipefail
SLUG="${1:?uso: serve.sh <slug> [porta]}"
PORTA="${2:-8123}"
RAIZ="$(cd "$(dirname "$0")/../.." && pwd)"
echo "Board: http://localhost:${PORTA}/tools/viz/?filme=${SLUG}"
exec python3 -m http.server "$PORTA" -d "$RAIZ" --bind 127.0.0.1
