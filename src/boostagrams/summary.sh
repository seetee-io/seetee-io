#!/bin/bash

# Generates a summary of newly added boostagrams.
# This is used by the GitHub workflow.

set -e

echo -e "| :page_facing_up: File | :speech_balloon: Message |"
echo -e "|:-----|:--------|"

git ls-files . --exclude-standard --others \
  | grep "custom_records/custom_record_.*\.json" \
  | while read line; do
      message=$(jq . $line | grep message | awk -F '"message": ' '{print $2}')
      echo -e "| $line | $message |"
    done
