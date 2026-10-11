#!/usr/bin/env bash
# Turns the raw local-AI clips (Wan 2.2 TI2V 5B via Wan2GP, see docs/AI-MEDIA.md)
# and the Flowber footage into the web assets under public/.
# Run from the repo root in Git Bash:  bash scripts/encode-ai-media.sh
set -euo pipefail

FF=${FF:-/d/AI/Wan2GP/ffmpeg_bins/ffmpeg.exe}
RAW=${RAW:-/d/AI/portfolio-out}
FLOWBER=${FLOWBER:-/c/Users/juni2/Desktop/Flowber/flowber-barberia}

# Flowber cover: keep the first 2.0 s (an extra figure walks in at ~2.2 s), then
# play it forward + reversed so the loop has no visible seam.
"$FF" -v error -y -i "$RAW/flowber-cover.mp4" -filter_complex \
  "[0:v]trim=0:2.0,setpts=PTS-STARTPTS,split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1,scale=1280:-2,format=yuv420p[v]" \
  -map "[v]" -an -c:v libx264 -crf 26 -preset slow -movflags +faststart public/ai/flowber-cover.mp4
"$FF" -v error -y -i public/ai/flowber-cover.mp4 -c:v libvpx-vp9 -crf 38 -b:v 0 -row-mt 1 -an public/ai/flowber-cover.webm

# Data-flow clip for the home tagline band: half speed with motion blending, boomerang.
"$FF" -v error -y -i "$RAW/hero-data.mp4" -filter_complex \
  "[0:v]setpts=2*PTS,minterpolate=fps=24:mi_mode=blend,scale=960:-2,split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1,format=yuv420p[v]" \
  -map "[v]" -an -c:v libx264 -crf 28 -preset slow -movflags +faststart public/ai/hero-data.mp4
"$FF" -v error -y -i public/ai/hero-data.mp4 -c:v libvpx-vp9 -crf 40 -b:v 0 -row-mt 1 -an public/ai/hero-data.webm
"$FF" -v error -y -ss 1 -i public/ai/hero-data.mp4 -frames:v 1 -c:v libwebp -quality 70 public/ai/hero-data.webp

# Flowber brand film (Remotion render in the Flowber repo) at 540p, and the real haircut clips.
mkdir -p public/flowber/cortes
"$FF" -v error -y -i "$FLOWBER/public/video/flowber-film.mp4" -vf scale=540:-2 \
  -c:v libx264 -crf 27 -preset slow -c:a aac -b:a 96k -movflags +faststart public/flowber/flowber-film.mp4
cp "$FLOWBER/public/video/flowber-film.webp" public/flowber/
for c in danover platinado rizos taper; do
  cp "$FLOWBER/public/video/cortes/$c.mp4" "$FLOWBER/public/video/cortes/$c.webp" public/flowber/cortes/
done

echo "done"
