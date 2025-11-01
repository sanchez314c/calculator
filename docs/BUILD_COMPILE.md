# 🔨 Build & Compilation Guide

**Complete build and compilation instructions for the Electron Calculator application.**

---

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Build Commands](#build-commands)
- [Platform-Specific Builds](#platform-specific-builds)
- [Build Configuration](#build-configuration)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This guide covers the complete build process for the Electron Calculator application across all supported platforms. The project uses `electron-builder` for cross-platform packaging and distribution.

### Build System Features

- **Multi-Platform Support**: macOS, Windows, Linux
- **Parallel Processing**: 18-worker build configuration
- **Automatic Icon Generation**: Multi-format icon creation
- **Code Signing**: Infrastructure prepared for all platforms
- **Error Handling**: Comprehensive build error management

---

## 🔧 Prerequisites

### System Requirements

**Node.js Environment:**

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

**Platform-Specific Tools:**

**macOS:**

```bash
# Install Xcode Command Line Tools
xcode-select --install
```

**Windows:**

```bash
# Install Visual Studio Build Tools or Visual Studio 2019+
# Ensure Windows 10 SDK is installed
```

**Linux:**

```bash
# Ubuntu/Debian
sudo apt-get install build-essential libgtk-3-dev libnotify-dev libnss3-dev

# Fedora
sudo dnf install gcc-c++ gtk3-devel libnotify-devel nss-devel
```

### Dependency Installation

```bash
# Clone repository
git clone https://github.com/sanchez314c/calculator.git
cd calculator

# Install dependencies
npm install

# Install native dependencies
npm run postinstall
```

---

## 🚀 Build Commands

### Development Build

```bash
# Start development mode
npm start

# Development with debugging
npm run dev
```

### Production Builds

```bash
# Build for current platform
npm run build

# Build for all platforms
npm run dist:maximum

# Build specific platforms
npm run build-mac      # macOS build
npm run build-win      # Windows build
npm run build-linux    # Linux build

# Create distribution packages
npm run dist

# Directory packaging (no installer)
npm run pack
```

### Utility Commands

```bash
# Analyze bundle size
npm run bloat-check

# Clean temporary files
npm run temp-clean

# Security vulnerability check
npm audit

# Fix security issues
npm audit fix
```

---

## 🍎 macOS Builds

### Build Configuration

```json
{
  "mac": {
    "category": "public.app-category.utilities",
    "icon": "build_resources/icons/icon.icns",
    "target": [
      {
        "target": "dmg",
        "arch": ["x64", "arm64"]
      },
      {
        "target": "pkg",
        "arch": ["x64", "arm64"]
      }
    ]
  }
}
```

### Build Commands

```bash
# Build for macOS (Intel + ARM)
npm run build-mac

# Build specific architecture
electron-builder --mac --x64      # Intel
electron-builder --mac --arm64    # Apple Silicon

# Create DMG installer
electron-builder --mac --publish=never
```

### Output Files

- `Calculator-1.0.0.dmg` - DMG installer (Intel)
- `Calculator-1.0.0-arm64.dmg` - DMG installer (Apple Silicon)
- `Calculator-1.0.0.pkg` - PKG installer for enterprise deployment

---

## 🪟 Windows Builds

### Build Configuration

```json
{
  "win": {
    "target": [
      {
        "target": "nsis",
        "arch": ["x64", "ia32"]
      },
      {
        "target": "msi",
        "arch": ["x64", "ia32"]
      }
    ],
    "icon": "build_resources/icons/icon.ico"
  },
  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true,
    "createDesktopShortcut": true,
    "createStartMenuShortcut": true
  }
}
```

### Build Commands

```bash
# Build for Windows (x64 + x86)
npm run build-win

# Build specific architecture
electron-builder --win --x64      # 64-bit
electron-builder --win --ia32     # 32-bit

# Create NSIS installer
electron-builder --win --publish=never
```

### Output Files

- `CalculatorSetup-1.0.0.exe` - NSIS installer (x64)
- `CalculatorSetup-1.0.0-ia32.exe` - NSIS installer (x86)
- `Calculator-1.0.0.msi` - MSI package for enterprise deployment

---

## 🐧 Linux Builds

### Build Configuration

```json
{
  "linux": {
    "icon": "build_resources/icons/icon-256.png",
    "category": "Utility",
    "target": [
      {
        "target": "AppImage",
        "arch": ["x64"]
      },
      {
        "target": "deb",
        "arch": ["x64"]
      },
      {
        "target": "rpm",
        "arch": ["x64"]
      }
    ]
  }
}
```

### Build Commands

```bash
# Build for Linux
npm run build-linux

# Build specific package format
electron-builder --linux AppImage    # AppImage
electron-builder --linux deb        # Debian package
electron-builder --linux rpm        # RPM package
```

### Output Files

- `Calculator-1.0.0.AppImage` - Universal AppImage
- `calculator_1.0.0_amd64.deb` - Debian/Ubuntu package
- `calculator-1.0.0-1.x86_64.rpm` - RedHat/Fedora package

---

## ⚙️ Build Configuration

### electron-builder Configuration

The build configuration is defined in `package.json`:

```json
{
  "build": {
    "appId": "com.calculator.electron",
    "productName": "Calculator",
    "directories": {
      "output": "dist"
    },
    "files": ["src/**/*", "node_modules/**/*"],
    "extraResources": [
      {
        "from": "build_resources/",
        "to": "resources/"
      }
    ],
    "mac": {
      "category": "public.app-category.utilities",
      "icon": "build_resources/icons/icon.icns",
      "hardenedRuntime": true,
      "gatekeeperAssess": false
    },
    "win": {
      "target": [
        {
          "target": "nsis",
          "arch": ["x64", "ia32"]
        }
      ],
      "icon": "build_resources/icons/icon.ico"
    },
    "linux": {
      "icon": "build_resources/icons/icon-256.png",
      "category": "Utility",
      "target": [
        {
          "target": "AppImage",
          "arch": ["x64"]
        }
      ]
    }
  }
}
```

### Build Scripts

The project includes comprehensive build scripts:

**Main Build Script**: `scripts/build-universal.sh`

- Multi-platform build automation
- Parallel processing with 18 workers
- Automatic icon generation
- Comprehensive error handling
- Automated cleanup and optimization

**Utility Scripts**:

- `scripts/repository-cleanup.sh` - Repository maintenance
- `scripts/temp-cleanup.sh` - Temporary file cleanup

---

## 🔧 Troubleshooting

### Common Build Issues

#### Build Fails on macOS

```bash
# Check Xcode tools
xcode-select --print-path

# Reinstall if missing
xcode-select --install

# Clear build cache
npm run temp-clean
rm -rf dist/ build/
```

#### Build Fails on Windows

```bash
# Check Visual Studio Build Tools
where cl

# Reinstall if missing
# Download and install Visual Studio Build Tools

# Clear npm cache
npm cache clean --force
```

#### Build Fails on Linux

```bash
# Check dependencies
dpkg -l | grep build-essential
rpm -qa | grep gcc

# Install missing dependencies
sudo apt-get install build-essential libgtk-3-dev

# Clear build artifacts
npm run temp-clean
```

### Memory Issues During Build

```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"

# Use less parallel workers
export BUILD_WORKERS=4
```

### Permission Issues

```bash
# macOS: Fix file permissions
chmod +x scripts/*.sh

# Linux: Fix executable permissions
chmod +x dist/*.AppImage
```

---

## 📊 Build Optimization

### Bundle Size Optimization

```bash
# Analyze bundle size
npm run bloat-check

# Remove unused dependencies
npm prune --production

# Enable tree shaking
export NODE_ENV=production
```

### Performance Optimization

```bash
# Enable parallel builds
export BUILD_WORKERS=18

# Use native modules
npm rebuild

# Optimize assets
npm run optimize-assets
```

---

## 🚀 Advanced Build Options

### Custom Build Configuration

```bash
# Build with custom configuration
electron-builder --config custom-build.json

# Build specific targets
electron-builder --mac dmg --x64
electron-builder --win nsis --x64
electron-builder --linux AppImage
```

### Development Builds

```bash
# Build with source maps
npm run build:dev

# Build with debugging
npm run build:debug

# Build for testing
npm run build:test
```

### Release Builds

```bash
# Build for production
npm run build:prod

# Build with code signing
npm run build:signed

# Build with notarization (macOS)
npm run build:notarized
```

---

## 📚 Additional Resources

### Documentation

- [electron-builder Documentation](https://electron.build/)
- [Electron Build Guide](https://electronjs.org/docs/tutorial/building/)
- [Cross-Platform Building](https://electron.build/configuration/configuration)

### Tools

- [Node.js Documentation](https://nodejs.org/docs/)
- [npm Documentation](https://docs.npmjs.com/)
- [GitHub Actions](https://github.com/features/actions)

---

_Last Updated: 2025-10-31_
_Build Guide Version: 1.0_
_Maintainer: Calculator Development Team_
