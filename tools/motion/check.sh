#!/bin/bash
# Gate do workspace motion: tipos + render-smoke de 1s.
# Uso: bash tools/motion/check.sh
set -euo pipefail
cd "$(dirname "$0")"
npx tsc --noEmit
npx remotion render Sanity --frames=0-23 /tmp/motion-smoke.mp4 --log=error
ffprobe -v error -show_entries format=duration -of csv=p=0 /tmp/motion-smoke.mp4
echo "motion check OK"
