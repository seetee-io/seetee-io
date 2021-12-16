#!/bin/bash

git rm -r --cached $1
git add .
echo $1 >> .gitignore

echo "Removed and added to gitignore: $1"
