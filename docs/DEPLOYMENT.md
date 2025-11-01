# 🚀 Deployment Guide

**Complete deployment and distribution guide for the Electron Calculator application.**

---

## 📋 Table of Contents

- [Overview](#overview)
- [Build Process](#build-process)
- [Platform-Specific Deployment](#platform-specific-deployment)
- [Distribution Channels](#distribution-channels)
- [Code Signing](#code-signing)
- [Automatic Updates](#automatic-updates)
- [Release Management](#release-management)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This guide covers the complete deployment process for the Electron Calculator across all supported platforms. The application is packaged using `electron-builder` and distributed through multiple channels.

### Supported Platforms

| Platform | Architectures | Package Formats | Status |
|----------|-------------|----------------|--------|
| **macOS** | x64, arm64 | DMG, PKG | ✅ Production Ready |
| **Windows** | x64, ia32 | NSIS, MSI, ZIP | ✅ Production Ready |
| **Linux** | x64 | AppImage, DEB, RPM | ✅ Production Ready |

---

## 🔨 Build Process

### Prerequisites

```bash
# Install dependencies
npm install

# Install platform-specific build tools
# macOS: Xcode Command Line Tools
# Windows: Visual Studio Build Tools
# Linux: build-essential and related packages
```

### Build Commands

```bash
# Build for current platform
npm run build

# Build for all platforms and architectures
npm run dist:maximum

# Build specific platform
npm run build-mac      # macOS only
npm run build-win      # Windows only
npm run build-linux    # Linux only

# Build without cleanup (for debugging)
npm run build-clean
```

### Build Configuration

The build configuration is in `package.json`:

```json
{
  "build": {
    "appId": "com.calculator.electron",
    "productName": "Calculator",
    "directories": {
      "output": "dist"
    },
    "files": [
      "src/**/*"
    ],
    "mac": {
      "category": "public.app-category.utilities",
      "icon": "assets/icons/icon.icns",
      "target": [
        {
          "target": "dmg",
          "arch": ["x64", "arm64"]
        }
      ]
    },
    "win": {
      "target": [
        {
          "target": "nsis",
          "arch": ["x64", "ia32"]
        }
      ]
    },
    "linux": {
      "icon": "assets/icons/icon-256.png",
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

---

## 🍎 macOS Deployment

### Build for macOS

```bash
# Build macOS version (Intel and Apple Silicon)
npm run build-mac

# Build specific architecture
electron-builder --mac --x64      # Intel
electron-builder --mac --arm64    # Apple Silicon
```

### Package Formats

#### DMG (Recommended for Distribution)

```bash
# Build DMG installer
electron-builder --mac --publish=never
```

**Output:** `dist/Calculator-1.0.0.dmg`

#### PKG (For Enterprise Deployment)

```json
{
  "mac": {
    "target": [
      {
        "target": "pkg",
        "arch": ["x64", "arm64"]
      }
    ]
  }
}
```

### Code Signing (macOS)

#### Certificate Setup

```bash
# Install Developer ID Certificate from Apple Developer Portal
# Certificate should be installed in Keychain Access
```

#### Configuration

```json
{
  "mac": {
    "identity": "Developer ID Application: Your Name (TEAM_ID)",
    "hardenedRuntime": true,
    "entitlements": "build/entitlements.mac.plist",
    "entitlementsInherit": "build/entitlements.mac.plist"
  }
}
```

#### Entitlements File (`build/entitlements.mac.plist`)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.security.cs.allow-jit</key>
    <true/>
    <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
    <true/>
</dict>
</plist>
```

### Notarization

```bash
# Notarize with Xcode
xcrun altool --notarize-app \
  --primary-bundle-id "com.calculator.electron" \
  --username "sanchez314c@jasonpaulmichaels.co" \
  --password "@keychain:AC_PASSWORD" \
  --file "dist/Calculator-1.0.0.dmg"
```

---

## 🪟 Windows Deployment

### Build for Windows

```bash
# Build Windows version (x64 and x86)
npm run build-win

# Build specific architecture
electron-builder --win --x64      # 64-bit
electron-builder --win --ia32     # 32-bit
```

### Package Formats

#### NSIS Installer (Recommended)

```json
{
  "win": {
    "target": [
      {
        "target": "nsis",
        "arch": ["x64", "ia32"]
      }
    ],
    "icon": "assets/icons/icon.ico"
  },
  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true,
    "createDesktopShortcut": true,
    "createStartMenuShortcut": true
  }
}
```

#### MSI Installer (For Enterprise)

```json
{
  "win": {
    "target": [
      {
        "target": "msi",
        "arch": ["x64", "ia32"]
      }
    ]
  }
}
```

### Code Signing (Windows)

#### Certificate Setup

```bash
# Install code signing certificate (.pfx file)
# Import certificate to Windows Certificate Store
```

#### Configuration

```json
{
  "win": {
    "certificateFile": "build/certificate.pfx",
    "certificatePassword": "",
    "publisherName": "Your Company Name"
  }
}
```

---

## 🐧 Linux Deployment

### Build for Linux

```bash
# Build Linux version
npm run build-linux

# Build specific architecture
electron-builder --linux --x64      # 64-bit
```

### Package Formats

#### AppImage (Recommended for Distribution)

```json
{
  "linux": {
    "target": [
      {
        "target": "AppImage",
        "arch": ["x64"]
      }
    ],
    "icon": "assets/icons/icon-256.png",
    "category": "Utility"
  }
}
```

#### Debian Package (.deb)

```json
{
  "linux": {
    "target": [
      {
        "target": "deb",
        "arch": ["x64"]
      }
    ],
    "depends": [
      "libgtk-3-0",
      "libnotify4",
      "libnss3",
      "libxss1",
      "libxtst6",
      "xdg-utils",
      "libatspi2.0-0",
      "libdrm2",
      "libxcomposite1",
      "libxdamage1",
      "libxrandr2",
      "libgbm1",
      "libxkbcommon0",
      "libasound2"
    ]
  }
}
```

#### RPM Package

```json
{
  "linux": {
    "target": [
      {
        "target": "rpm",
        "arch": ["x64"]
      }
    ]
  }
}
```

---

## 📦 Distribution Channels

### GitHub Releases

#### Automated Release Process

```bash
# Tag release
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# Create release with artifacts
npm run dist:maximum
```

#### Release Script

```bash
#!/bin/bash
# scripts/release.sh

VERSION=$(node -p "require('./package.json').version")
echo "Releasing version $VERSION"

# Build all platforms
npm run dist:maximum

# Create GitHub release
gh release create "v$VERSION" \
  dist/* \
  --title "Release v$VERSION" \
  --notes "Release notes for version $VERSION"
```

### Direct Download

#### File Hosting Structure

```
downloads/
├── latest/
│   ├── mac/
│   │   ├── Calculator.dmg
│   │   └── checksum.txt
│   ├── win/
│   │   ├── CalculatorSetup.exe
│   │   └── checksum.txt
│   └── linux/
│       ├── Calculator.AppImage
│       └── checksum.txt
└── v1.0.0/
    ├── mac/
    ├── win/
    └── linux/
```

#### Update Server

```javascript
// Simple update server
const express = require('express');
const app = express();

app.get('/update/:platform/:version', (req, res) => {
    const { platform, version } = req.params;
    const latestVersion = require('./package.json').version;

    if (version !== latestVersion) {
        res.json({
            updateAvailable: true,
            version: latestVersion,
            downloadUrl: `/downloads/latest/${platform}/`
        });
    } else {
        res.json({ updateAvailable: false });
    }
});

app.listen(3000);
```

---

## 🔐 Code Signing

### macOS Code Signing

```bash
# Sign application
codesign --force --deep --sign "Developer ID Application: Your Name" \
  dist/Calculator.app

# Verify signature
codesign --verify --verbose dist/Calculator.app
```

### Windows Code Signing

```bash
# Sign executable
signtool sign /f certificate.pfx /p password /t http://timestamp.digicert.com \
  dist/Calculator.exe

# Sign MSI package
signtool sign /f certificate.pfx /p password /t http://timestamp.digicert.com \
  dist/Calculator.msi
```

### GPG Signing (Linux)

```bash
# Create GPG signature
gpg --detach-sign --armor dist/calculator_1.0.0_amd64.deb

# Verify signature
gpg --verify dist/calculator_1.0.0_amd64.deb.asc
```

---

## 🔄 Automatic Updates

### electron-updater Integration

#### Installation

```bash
npm install electron-updater
```

#### Main Process Setup

```javascript
// src/main/updater.js
const { autoUpdater } = require('electron-updater');
const { dialog } = require('electron');

autoUpdater.checkForUpdatesAndNotify();

autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
        type: 'info',
        title: 'Update Available',
        message: 'A new version of Calculator is available.',
        buttons: ['Update Now', 'Later']
    }).then((result) => {
        if (result.response === 0) {
            autoUpdater.downloadUpdate();
        }
    });
});

autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
        type: 'info',
        title: 'Update Ready',
        message: 'Update downloaded. Restart to apply.',
        buttons: ['Restart Now', 'Later']
    }).then((result) => {
        if (result.response === 0) {
            autoUpdater.quitAndInstall();
        }
    });
});
```

#### Configuration

```json
{
  "build": {
    "publish": {
      "provider": "github",
      "owner": "calculator",
      "repo": "electron-calculator"
    }
  }
}
```

---

## 📋 Release Management

### Version Management

#### Semantic Versioning

```bash
# Patch version (bug fixes)
npm version patch

# Minor version (new features)
npm version minor

# Major version (breaking changes)
npm version major
```

#### Release Checklist

```markdown
## Pre-Release Checklist
- [ ] All tests passing
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version number updated
- [ ] Build tested on all platforms
- [ ] Code signing configured
- [ ] Update mechanism tested

## Post-Release Checklist
- [ ] GitHub release created
- [ ] Download links verified
- [ ] Update mechanism confirmed
- [ ] User notifications sent
- [ ] Metrics tracking enabled
```

### Automated CI/CD

#### GitHub Actions Workflow

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [macos-latest, windows-latest, ubuntu-latest]

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm ci

    - name: Build
      run: npm run dist:maximum

    - name: Upload artifacts
      uses: actions/upload-artifact@v3
      with:
        name: dist-${{ matrix.os }}
        path: dist/
```

---

## 🔧 Troubleshooting

### Common Build Issues

#### macOS Notarization Failed

```bash
# Check notarization status
xcrun altool --notarization-info <RequestUUID> \
  --username "sanchez314c@jasonpaulmichaels.co" \
  --password "@keychain:AC_PASSWORD"

# Common fixes
# - Ensure bundle ID matches provisioning profile
# - Check app signature before notarization
# - Verify network connectivity
```

#### Windows Code Signing Issues

```bash
# Check certificate store
certmgr.msc

# Verify certificate chain
signtool verify /pa Calculator.exe

# Common fixes
# - Ensure timestamp server is accessible
# - Check certificate validity period
# - Verify certificate chain installation
```

#### Linux Dependency Issues

```bash
# Check dependencies
ldd Calculator.AppImage

# Install missing dependencies
sudo apt-get install libgtk-3-0 libnotify4 libnss3 libxss1 libxtst6

# Bundle dependencies with AppImage
export APPIMAGE_EXTRACT_AND_RUN=1
```

### Runtime Issues

#### Application Won't Start

```bash
# Check system requirements
# - Node.js version compatibility
# - System libraries installed
# - Permissions correct

# Debug startup
./Calculator --enable-logging
./Calculator --v=1
```

#### Update Mechanism Issues

```bash
# Check update server
curl https://your-update-server.com/update/mac/1.0.0

# Verify download URLs
curl -I https://github.com/sanchez314c/calculator/releases/latest/mac/Calculator.dmg

# Common fixes
# - Check SSL certificates
# - Verify file permissions
# - Test download endpoints
```

---

## 📊 Monitoring and Analytics

### Crash Reporting

```javascript
// Integration with crash reporting service
const { crashReporter } = require('electron');

crashReporter.start({
    productName: 'Calculator',
    companyName: 'Your Company',
    submitURL: 'https://crash.calculator.example.com/crash',
    uploadToServer: true
});
```

### Usage Analytics

```javascript
// Track application usage
const usage = {
    startTime: Date.now(),
    calculations: 0,
    features: new Set()
};

// Send analytics
function sendAnalytics() {
    const data = {
        version: app.getVersion(),
        platform: process.platform,
        usage: {
            sessionDuration: Date.now() - usage.startTime,
            calculations: usage.calculations,
            featuresUsed: Array.from(usage.features)
        }
    };

    // Send to analytics service
    fetch('https://analytics.calculator.example.com/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}
```

---

## 📚 Additional Resources

### Documentation
- [electron-builder Documentation](https://electron.build/)
- [Code Signing Guides](https://electron.build/code-signing)
- [Auto Updater Guide](https://electron.build/auto-update)

### Tools
- [GitHub Actions](https://github.com/features/actions)
- [Semaphore CI](https://semaphoreci.com/)
- [Travis CI](https://travis-ci.org/)

### Services
- [GitHub Releases](https://help.github.com/en/articles/creating-releases)
- [DigitalOcean Spaces](https://www.digitalocean.com/products/spaces/)
- [AWS S3](https://aws.amazon.com/s3/)

---

*Last Updated: $(date +"%Y-%m-%d")*
*Deployment Guide Version: 1.0.0*