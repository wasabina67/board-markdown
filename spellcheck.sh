#!/bin/bash

echo "====="
cspell .
echo "====="

result=`find . -type f ! -path "./.git/*" ! -path "./node_modules/*" ! -name "*.svg" ! -name "package-lock.json"`
echo "$result" | tr ' ' '\n'
echo "====="
