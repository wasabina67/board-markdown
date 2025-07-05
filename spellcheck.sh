#!/bin/bash

cspell .
echo "====="

files=( $(find . -type f ! -path "./.git/*" ! -path "./node_modules/*" ! -name "*.svg" ! -name "package-lock.json") )
printf '%s\n' "${files[@]}"
echo "Files found: ${#files[@]}"
echo "====="
