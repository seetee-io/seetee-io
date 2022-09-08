#!/bin/bash

set -e

PODCAST_FEED="https://closing-the-loop.github.io/feed.xml"
THUMBNAIL_SIZE=400
THUMBNAIL_QUALITY=90

rm -rf /tmp/ctl-thumbnails
mkdir -p /tmp/ctl-thumbnails

if ! command -v wget &> /dev/null; then
  echo "This script needs 'wget' to run. Consider installing it."
  exit 1
fi

if ! command -v jq &> /dev/null; then
    echo "This script needs 'jq' to run. Consider installing it."
    exit 1
fi

if ! command -v convert &> /dev/null; then
    echo "This script needs 'imagemagick' to run. Consider installing it."
    exit 1
fi

if ! command -v yq &> /dev/null; then
  if [ "$CI" = "true" ]; then
    wget -q https://github.com/mikefarah/yq/releases/download/v4.27.3/yq_linux_amd64 -O yq && chmod +x yq
  else
    echo "This script needs 'yq' to run. Consider installing it."
    exit 1
  fi
fi

yq_command() {
  if [ "$CI" = "true" ]; then
    echo "./yq"
  else
    echo "yq"
  fi
}

episodes=$(
  curl -sS $PODCAST_FEED \
    | $(yq_command) -p xml -o json \
    | jq '
        .rss.channel.item
          | .[]
          | {episode: .episode, season: .season, image: .image["+href"]}
      '
)

find_command() {
  if [[ $(uname -s) == "Darwin" ]]; then
    echo "gfind"
  else
    echo "find"
  fi
}

echo $episodes | jq --compact-output | while read episode ; do
  e=$(echo $episode | jq '.episode' | tr -d '"')
  s=$(echo $episode | jq '.season' | tr -d '"')
  i=$(echo $episode | jq '.image' | tr -d '"')

  if [ -z $($(find_command) "public/assets/podcast/thumbnails" -maxdepth 1 -name "s${s}e${e}_*x*.jpg" -printf 1 -quit) ] || \
     [ -z $($(find_command) "public/assets/podcast/thumbnails" -maxdepth 1 -name "s${s}e${e}_*x*.webp" -printf 1 -quit) ]
  then
    echo "Generating thumbnails for S${s}, E${e}..."

    wget -q -O "/tmp/ctl-thumbnails/s${s}e${e}_original.jpg" $i
    convert "/tmp/ctl-thumbnails/s${s}e${e}_original.jpg" -resize "${THUMBNAIL_SIZE}x${THUMBNAIL_SIZE}" -quality $THUMBNAIL_QUALITY "public/assets/podcast/thumbnails/s${s}e${e}_${THUMBNAIL_SIZE}x${THUMBNAIL_SIZE}.jpg"
    convert "/tmp/ctl-thumbnails/s${s}e${e}_original.jpg" -resize "${THUMBNAIL_SIZE}x${THUMBNAIL_SIZE}" -quality $THUMBNAIL_QUALITY "public/assets/podcast/thumbnails/s${s}e${e}_${THUMBNAIL_SIZE}x${THUMBNAIL_SIZE}.webp"
  fi
done
