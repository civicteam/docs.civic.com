#!/usr/bin/env bash
# Render the Bryn docs diagrams: every .mmd here -> ../<name>-light.svg and
# ../<name>-dark.svg, transparent background, brand theme configs alongside.
# Usage: bash render.sh   (requires npx; downloads @mermaid-js/mermaid-cli on first run)
set -euo pipefail
cd "$(dirname "$0")"
for f in *.mmd; do
  name="${f%.mmd}"
  for variant in light dark; do
    npx --yes @mermaid-js/mermaid-cli \
      -i "$f" -o "../${name}-${variant}.svg" \
      -c "theme-${variant}.json" -b transparent --quiet
    echo "rendered ${name}-${variant}.svg"
  done
done
