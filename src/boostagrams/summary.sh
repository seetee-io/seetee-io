#!/bin/bash

set -e

echo -e "| :page_facing_up: File | :speech_balloon: Message |"
echo -e "|:-----|:--------|"

git ls-files . --exclude-standard --others \
  | grep "custom_records/custom_record_.*\.json" \
  | while read line; do
      message=$(jq . $line | grep message | awk -F ': ' '{print $2}')
      echo -e "| $line | $message |"
    done
