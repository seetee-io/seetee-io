#!/bin/bash

episodes=$(
  curl -sS https://closing-the-loop.github.io/feed.xml \
    | yq -p xml -o json \
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

rm -rf /tmp/ctl-thumbnails
mkdir -p /tmp/ctl-thumbnails

echo $episodes | jq --compact-output | while read episode ; do
  e=$(echo $episode | jq '.episode' | tr -d '"')
  s=$(echo $episode | jq '.season' | tr -d '"')
  i=$(echo $episode | jq '.image' | tr -d '"')

  if [ -z $($(find_command) "public/assets/podcast/thumbnails" -maxdepth 1 -name "s${s}e${e}_*x*.jpg" -printf 1 -quit) ] || \
     [ -z $($(find_command) "public/assets/podcast/thumbnails" -maxdepth 1 -name "s${s}e${e}_*x*.webp" -printf 1 -quit) ]
  then
    wget -q -O "/tmp/ctl-thumbnails/s${s}e${e}_original.jpg" $i
    convert "/tmp/ctl-thumbnails/s${s}e${e}_original.jpg" -resize 400x400 -quality 90 "public/assets/podcast/thumbnails/s${s}e${e}_400x400.jpg"
    convert "/tmp/ctl-thumbnails/s${s}e${e}_original.jpg" -resize 400x400 -quality 90 "public/assets/podcast/thumbnails/s${s}e${e}_400x400.webp"
  fi
done
