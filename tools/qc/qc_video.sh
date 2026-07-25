#!/bin/bash
# Suite de QC do workbench (fase 7b/8b do /novo-video). Uso:
#   bash tools/qc/qc_video.sh <video.mp4> <pasta_saida_qc>
# Gera folhas de contato 2fps, mede flicker (YAVG/frame), frames congelados,
# cortes duros (scene>0.25), pico de audio e loudness broadcast.
# Analise de camera (wobble/jerk + enquadramento): tools/qc/camera_review.py
#   ffmpeg -v error -i take.mp4 -vf scale=180:320 -f rawvideo -pix_fmt rgb24 - \
#     | tools/stable-audio/.venv/bin/python tools/qc/camera_review.py "take"
set -e
V="$1"; OUT="${2:-qc_out}"; mkdir -p "$OUT"
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$V")
echo "== $V (${DUR}s) =="

# folhas de contato 2fps, 16 frames (8s) por folha
N=$(python3 -c "import math;print(math.ceil($DUR/8.2))")
for i in $(seq 0 $((N-1))); do
  SS=$(python3 -c "print($i*8.2)")
  ffmpeg -y -loglevel error -ss "$SS" -t 8.2 -i "$V" -vf "fps=2,scale=270:480,tile=4x4" "$OUT/sheet$((i+1)).png"
done
echo "folhas: $N em $OUT/"

# flicker YAVG (fora de 0.6s das pontas)
ffmpeg -loglevel info -i "$V" -vf "signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=$OUT/yavg.txt" -f null - 2>/dev/null
awk -v dur="$DUR" '/pts_time/{split($0,a,"pts_time:"); t=a[2]+0} /YAVG/{split($0,b,"="); y=b[2]+0; if (prev!="" && (y-prevy>12 || prevy-y>12) && t>0.6 && t<dur-0.6) printf "FLICKER t=%.2fs %.1f->%.1f\n", t, prevy, y; prev=t; prevy=y}' "$OUT/yavg.txt" | head -10

# frames congelados / cortes duros
ffmpeg -i "$V" -vf "freezedetect=n=0.0005:d=0.4" -f null - 2>&1 | grep -E 'freeze_(start|end)' | head -6 || true
echo "cortes duros (scene>0.25):"
ffmpeg -i "$V" -vf "select='gt(scene,0.25)',showinfo" -f null - 2>&1 | grep -oE 'pts_time:[0-9.]+' | head -6 || true

# audio: pico, loudness broadcast, cobertura da cauda
ffmpeg -i "$V" -af astats=measure_overall=Peak_level:measure_perchannel=none -f null - 2>&1 | grep -i 'peak level' | head -1 || echo "(sem audio)"
ffmpeg -i "$V" -af "ebur128=peak=true" -f null - 2>&1 | grep -E '^\s+(I:|Peak:)' || true
TAIL=$(python3 -c "print(max(0,$DUR-3.5))")
echo "cauda (ultimos 3.5s):"
ffmpeg -ss "$TAIL" -i "$V" -af volumedetect -f null - 2>&1 | grep -E 'mean_volume|max_volume' || true
echo "== QC done =="
