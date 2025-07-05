#!/bin/bash

cspell .
echo "===================="

files=(
    $(find . \
        -type f \
        ! -path "./.git/*" \
        ! -path "./node_modules/*" \
        ! -name "*.svg" \
        ! -name "package-lock.json"
    )
)
printf '%s\n' "${files[@]}"
echo "find: Files found: ${#files[@]}"
echo "===================="
