#!/bin/bash
# Run from Source on Linux (Development Mode)

cd "$(dirname "$0")"

# Check platform
if [ "$(uname)" != "Linux" ]; then
    echo "This script is for Linux only"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ] && [ -f "package.json" ]; then
    npm install
fi

# Run based on project type
if [ -f "package.json" ]; then
    npm start
else
    echo "Unknown project type"
    exit 1
fi