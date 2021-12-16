#!/bin/bash

# Remove and ignore specific custom records.
#
# Usage: ./ignore.sh custom_records/custom_record_NNNNN.json
#
# Todo: We could probably easily automate this via a GitHub workflow that
# that is triggered by comments on the "Update Boostagrams" PR itself.

FILE_DIR="$(cd -- "$(dirname "$1")" && pwd)"
FILE="$(basename "$1")"
FILE_FULL_PATH="$FILE_DIR/$FILE"

git rm -r --cached $FILE_FULL_PATH
echo "custom_records/$FILE" >> .gitignore
git add .
git commit -m "Remove $FILE"
git push

echo -e "\nRemoved and added to gitignore: $FILE\n"
