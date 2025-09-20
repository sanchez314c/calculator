#!/bin/bash
# Run Compiled Binary on macOS

cd "$(dirname "$0")"

# Check platform
if [ "$(uname)" != "Darwin" ]; then
    echo "This script is for macOS only"
    exit 1
fi

# Check for symlink to .app
if [ -L "Calculator.app" ]; then
    open "Calculator.app"
elif [ -d "dist/mac/Calculator.app" ]; then
    open "dist/mac/Calculator.app"
elif [ -d "dist/mac-arm64/Calculator.app" ]; then
    open "dist/mac-arm64/Calculator.app"
else
    echo "No compiled application found. Run: ./scripts/compile-build-dist.sh"
    exit 1
fi