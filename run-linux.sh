#!/bin/bash
# Run Compiled Binary on Linux

cd "$(dirname "$0")"

# Check platform
if [ "$(uname)" != "Linux" ]; then
    echo "This script is for Linux only"
    exit 1
fi

# Check for AppImage
if ls dist/*.AppImage 1> /dev/null 2>&1; then
    APPIMAGE=$(ls dist/*.AppImage | head -1)
    chmod +x "$APPIMAGE"
    "$APPIMAGE"
# Check for unpacked version
elif [ -d "dist/linux-unpacked" ]; then
    EXECUTABLE=$(find dist/linux-unpacked -maxdepth 1 -type f -executable | head -1)
    if [ -n "$EXECUTABLE" ]; then
        "$EXECUTABLE"
    else
        echo "No executable found in dist/linux-unpacked"
        exit 1
    fi
else
    echo "No compiled application found. Run: ./scripts/compile-build-dist.sh"
    exit 1
fi