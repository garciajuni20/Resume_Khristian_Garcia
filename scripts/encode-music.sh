#!/usr/bin/env bash
# Turns a generated track (ACE-Step 1.5 in Wan2GP, see docs/AI-MEDIA.md) into a
# page melody: a seamless loop, loudness-normalized, as a small MP3.
#
#   bash scripts/encode-music.sh <input.wav|mp3> public/audio/<page>.mp3 [crossfade_seconds]
#   BITRATE=96k bash scripts/encode-music.sh ...   (default 112k)
#
# Seamless loop: the last X seconds are faded out over the first X faded in and
# that seam is moved to the front. Playback then runs seam -> body -> seam, and
# both joins are continuous in the original track, so `loop` never clicks.
set -euo pipefail
FF=${FF:-/d/AI/Wan2GP/ffmpeg_bins/ffmpeg.exe}
FP=${FP:-/d/AI/Wan2GP/ffmpeg_bins/ffprobe.exe}
IN=${1:?input file}
OUT=${2:?output, e.g. public/audio/home.mp3}
X=${3:-4}
BITRATE=${BITRATE:-112k}

L=$("$FP" -v error -show_entries format=duration -of csv=p=0 "$IN")
END=$(awk -v l="$L" -v x="$X" 'BEGIN { printf "%.3f", l - x }')
mkdir -p "$(dirname "$OUT")"
TMP="${OUT%.*}.tmp.wav"

"$FF" -v error -y -i "$IN" -filter_complex "
  [0:a]atrim=0:${X},asetpts=PTS-STARTPTS,afade=t=in:d=${X}:curve=qsin[head];
  [0:a]atrim=${END},asetpts=PTS-STARTPTS,afade=t=out:d=${X}:curve=qsin[tail];
  [head][tail]amix=inputs=2:normalize=0[seam];
  [0:a]atrim=${X}:${END},asetpts=PTS-STARTPTS[body];
  [seam][body]concat=n=2:v=0:a=1,asetpts=N/SR/TB,loudnorm=I=-16:TP=-1.5:LRA=11,aresample=44100[out]" \
  -map "[out]" -ac 2 -c:a pcm_s16le "$TMP"
# Separate pass: loudnorm's variable frame sizes upset the MP3 muxer in one go
"$FF" -v error -y -i "$TMP" -c:a libmp3lame -b:a "$BITRATE" "$OUT"
rm -f "$TMP"

echo "ok $OUT ($(du -h "$OUT" | cut -f1), $("$FP" -v error -show_entries format=duration -of csv=p=0 "$OUT")s)"
