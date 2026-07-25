#!/usr/bin/env python3
"""Review de linguagem de camera: movimento global (phase correlation) +
estabilidade de enquadramento (centroide do sueter vermelho).
Le rawvideo rgb24 do stdin (180x320)."""
import sys
import numpy as np

W, H = 180, 320
FPS = 24.0
frame_bytes = W * H * 3

def read_frames(f):
    while True:
        buf = f.read(frame_bytes)
        if len(buf) < frame_bytes:
            return
        yield np.frombuffer(buf, dtype=np.uint8).reshape(H, W, 3).astype(np.float32)

def phase_shift(a, b):
    # translacao global entre frames (subpixel ignorado - inteiro basta p/ QC)
    fa = np.fft.rfft2(a)
    fb = np.fft.rfft2(b)
    cross = fa * np.conj(fb)
    denom = np.abs(cross)
    denom[denom < 1e-9] = 1e-9
    r = np.fft.irfft2(cross / denom, s=a.shape)
    peak = np.unravel_index(np.argmax(r), r.shape)
    dy, dx = peak
    if dy > H // 2: dy -= H
    if dx > W // 2: dx -= W
    return dx, dy

prev_gray = None
rows = []  # t, dx, dy, cx, cy, area
for i, rgb in enumerate(read_frames(sys.stdin.buffer)):
    t = i / FPS
    gray = rgb @ np.array([0.299, 0.587, 0.114], dtype=np.float32)
    dx = dy = 0.0
    if prev_gray is not None:
        dx, dy = phase_shift(prev_gray, gray)
    prev_gray = gray
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    mask = (r > 100) & (r > 1.6 * g) & (r > 1.6 * b)
    area = mask.mean()
    if area > 0.001:
        ys, xs = np.nonzero(mask)
        cx, cy = xs.mean() / W, ys.mean() / H
    else:
        cx = cy = float('nan')
    rows.append((t, dx, dy, cx, cy, area))

a = np.array(rows, dtype=np.float64)
t, dx, dy = a[:, 0], a[:, 1], a[:, 2]
speed = np.hypot(dx, dy)
jerk = np.abs(np.diff(speed))

def win(t0, t1):
    m = (t >= t0) & (t < t1)
    return m

label = sys.argv[1] if len(sys.argv) > 1 else "clip"
dur = t[-1]
print(f"== {label} ({dur:.1f}s, {len(rows)} frames) ==")
# 1) suavidade global
print(f"velocidade média da câmera: {speed[1:].mean():.2f} px/f | p95: {np.percentile(speed[1:],95):.2f} | max: {speed[1:].max():.0f}")
print(f"jerk (variação de velocidade) médio: {jerk.mean():.2f} px/f² | p95: {np.percentile(jerk,95):.2f}")
spikes = [(t[i+1], jerk[i]) for i in range(len(jerk)) if jerk[i] > 6]
print(f"picos de jerk >6px: {len(spikes)}" + ("" if not spikes else "  em: " + ", ".join(f"{ts:.2f}s({j:.0f})" for ts, j in spikes[:8])))
# 2) por janelas de 1s: velocidade média (para ver assentamento e rampas)
print("perfil por segundo (vel média px/f):")
for s in range(int(np.ceil(dur))):
    m = win(s, s + 1)
    if m.sum() > 2:
        print(f"  {s:2d}-{s+1:2d}s: {speed[m][1:].mean() if s==0 else speed[m].mean():5.2f}")
# 3) enquadramento: estabilidade do centroide do sujeito
valid = ~np.isnan(a[:, 3])
if valid.sum() > 10:
    cx, cy, area = a[valid, 3], a[valid, 4], a[valid, 5]
    tv = t[valid]
    print(f"sujeito: cx médio {cx.mean():.3f} (desvio {cx.std():.3f}) | cy médio {cy.mean():.3f} (desvio {cy.std():.3f})")
    print(f"área do vermelho: média {area.mean()*100:.2f}% | min {area.min()*100:.2f}% | max {area.max()*100:.2f}%")
    # drift lateral por segundo
    drift = [(int(s), cx[(tv>=s)&(tv<s+1)].mean()) for s in range(int(dur)) if ((tv>=s)&(tv<s+1)).sum()>2]
    print("cx por segundo: " + " ".join(f"{s}:{v:.2f}" for s, v in drift))
