#!/bin/bash
# Setup Script for Calculator Application

cd "$(dirname "$0")"

echo "=== Calculator Setup ==="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js from: https://nodejs.org/"
    exit 1
else
    NODE_VERSION=$(node --version)
    echo "✅ Node.js $NODE_VERSION"
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
else
    NPM_VERSION=$(npm --version)
    echo "✅ npm $NPM_VERSION"
fi

echo ""
echo "Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "Available commands:"
    echo "  Development:"
    echo "    ./run-source-macos.sh     - Run from source (macOS)"
    echo "    ./run-source-windows.bat  - Run from source (Windows)" 
    echo "    ./run-source-linux.sh     - Run from source (Linux)"
    echo ""
    echo "  Production:"
    echo "    ./scripts/compile-build-dist.sh  - Build application"
    echo "    ./run-macos.sh            - Run compiled app (macOS)"
    echo "    ./run-windows.bat         - Run compiled app (Windows)"
    echo "    ./run-linux.sh            - Run compiled app (Linux)"
    echo ""
    echo "To start development: ./run-source-$(uname -s | tr '[:upper:]' '[:lower:]').sh"
else
    echo "❌ Setup failed"
    exit 1
fi