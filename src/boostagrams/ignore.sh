#!/bin/bash

git rm -r --cached $1
git add .
echo $1 >> .gitignore
git commit -m "Remove $1"
git push

echo "Removed and added to gitignore: $1"
