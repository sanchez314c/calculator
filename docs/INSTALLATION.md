# 📦 Installation Guide

**Complete installation instructions for the Electron Calculator application.**

---

## 📋 Table of Contents

- [System Requirements](#system-requirements)
- [Installation Methods](#installation-methods)
- [Platform-Specific Instructions](#platform-specific-instructions)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)

---

## 🎯 System Requirements

### Minimum Requirements

- **Operating System**:
  - macOS 10.15 (Catalina) or higher
  - Windows 10 or higher
  - Linux: Ubuntu 18.04+, Fedora 29+, Debian 10+

- **Hardware**:
  - 4GB RAM (100MB typical usage)
  - 150MB available storage space
  - Modern 64-bit processor

- **Software**:
  - Node.js 18.0.0 or higher (for development)
  - Git (for building from source)

### Recommended Specifications

- **Memory**: 8GB RAM or higher
- **Storage**: 500MB available space
- **Processor**: Modern multi-core processor
- **Display**: 1024x768 resolution or higher

---

## 🚀 Installation Methods

### Option 1: Download Prebuilt Binaries (Recommended)

**Advantages:**

- No development tools required
- Optimized for your platform
- Includes all dependencies
- Ready to run immediately

**Steps:**

1. Go to [GitHub Releases](https://github.com/sanchez314c/calculator/releases)
2. Download the appropriate package for your platform
3. Follow platform-specific installation instructions below

### Option 2: Build from Source

**Advantages:**

- Access to latest features
- Customizable build
- Development environment included

**Prerequisites:**

- Node.js 18+ and npm
- Git
- Platform-specific build tools (see below)

---

## 🍎 macOS Installation

### Prebuilt Installation

#### DMG Installer (Recommended)

1. **Download**: `Calculator-1.0.0.dmg` (Intel) or `Calculator-1.0.0-arm64.dmg` (Apple Silicon)
2. **Open**: Double-click the DMG file
3. **Install**: Drag Calculator.app to Applications folder
4. **Launch**: Open from Applications folder or Launchpad

#### PKG Installer (Enterprise)

1. **Download**: `Calculator-1.0.0.pkg`
2. **Open**: Double-click the PKG file
3. **Follow**: Installation wizard instructions
4. **Complete**: Enter password if prompted

### Build from Source

#### Prerequisites

```bash
# Install Xcode Command Line Tools
xcode-select --install

# Verify installation
xcode-select --print-path
```

#### Build Steps

```bash
# Clone repository
git clone https://github.com/sanchez314c/calculator.git
cd calculator

# Install dependencies
npm install

# Build application
npm run build-mac

# Run application
npm start
```

### macOS-Specific Notes

- **Gatekeeper**: If you see "unidentified developer" warning, right-click Calculator.app and select "Open"
- **Apple Silicon**: Use ARM64 version for best performance
- **Permissions**: Calculator requires no special permissions

---

## 🪟 Windows Installation

### Prebuilt Installation

#### NSIS Installer (Recommended)

1. **Download**: `CalculatorSetup-1.0.0.exe` (x64) or `CalculatorSetup-1.0.0-ia32.exe` (x86)
2. **Run**: Double-click the installer
3. **Follow**: Installation wizard prompts
4. **Launch**: Desktop shortcut or Start menu

#### MSI Package (Enterprise)

1. **Download**: `Calculator-1.0.0.msi`
2. **Run**: Double-click the MSI file
3. **Follow**: Enterprise installation wizard
4. **Deploy**: Use Group Policy for deployment

### Build from Source

#### Prerequisites

```bash
# Install Visual Studio Build Tools
# Download from Microsoft Visual Studio website
# Ensure Windows 10 SDK is included
```

#### Build Steps

```bash
# Clone repository
git clone https://github.com/sanchez314c/calculator.git
cd calculator

# Install dependencies
npm install

# Build application
npm run build-win

# Run application
npm start
```

### Windows-Specific Notes

- **Windows Defender**: May flag the application; add to exclusions if needed
- **Administrator**: Not required, but can resolve installation issues
- **.NET Framework**: No additional requirements needed

---

## 🐧 Linux Installation

### Prebuilt Installation

#### AppImage (Universal)

1. **Download**: `Calculator-1.0.0.AppImage`
2. **Make Executable**: `chmod +x Calculator-1.0.0.AppImage`
3. **Run**: `./Calculator-1.0.0.AppImage`

#### Debian Package

1. **Download**: `calculator_1.0.0_amd64.deb`
2. **Install**: `sudo dpkg -i calculator_1.0.0_amd64.deb`
3. **Launch**: Application menu or `calculator` command

#### RPM Package

1. **Download**: `calculator-1.0.0-1.x86_64.rpm`
2. **Install**: `sudo rpm -i calculator-1.0.0-1.x86_64.rpm`
3. **Launch**: Application menu or `calculator` command

### Build from Source

#### Prerequisites

```bash
# Ubuntu/Debian
sudo apt-get install build-essential libgtk-3-dev libnotify-dev \
  libnss3-dev libxss1-dev libxtst6-dev xdg-utils

# Fedora
sudo dnf install gcc-c++ gtk3-devel libnotify-devel nss-devel \
  libXScrnSaver-devel xdg-utils atk at-spi2-atk libdrm \
  libXcomposite libXcursor libXdamage libXrandr libgbm \
  libxkbcommon alsa-lib
```

#### Build Steps

```bash
# Clone repository
git clone https://github.com/sanchez314c/calculator.git
cd calculator

# Install dependencies
npm install

# Build application
npm run build-linux

# Run application
npm start
```

### Linux-Specific Notes

- **Dependencies**: All required libraries are bundled in AppImage
- **Desktop Integration**: Automatic for package manager installations
- **Wayland/X11**: Supported on both display servers

---

## ✅ Verification

### Check Installation

1. **Launch**: Calculator from your preferred method
2. **Verify**: Application window opens successfully
3. **Test**: Basic calculations (2 + 2 = 4)
4. **Check**: All buttons and keyboard shortcuts work

### Version Information

- **Menu**: Help → About Calculator
- **Command Line**: `Calculator --version` (if built from source)
- **Package**: Check version in package name

---

## 🔧 Troubleshooting

### Common Installation Issues

#### macOS Gatekeeper Issues

**Problem**: "Calculator.app can't be opened because Apple cannot check it for malicious software"

**Solutions**:

1. **Right-click** Calculator.app → "Open"
2. **System Preferences** → Security & Privacy → General → "App Store and identified developers"
3. **Command Line**: `xattr -d com.apple.quarantine Calculator.app`

#### Windows Security Issues

**Problem**: Windows Defender blocks installation

**Solutions**:

1. **Run as Administrator**: Right-click installer → "Run as administrator"
2. **Windows Security**: Add calculator to exclusions
3. **SmartScreen**: Click "More info" → "Run anyway"

#### Linux Permission Issues

**Problem**: Permission denied when running AppImage

**Solutions**:

1. **Make Executable**: `chmod +x Calculator.AppImage`
2. **Check Dependencies**: Install missing libraries with package manager
3. **Run with User**: Don't use sudo unless necessary

### Build Issues

#### Node.js Version

```bash
# Check Node.js version
node --version  # Should be 18+

# Update Node.js
# Use nvm or download from nodejs.org
```

#### Dependency Issues

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### Platform Tool Issues

```bash
# macOS: Check Xcode tools
xcode-select --install

# Windows: Check Visual Studio
where cl

# Linux: Check build tools
dpkg -l | grep build-essential
```

---

## 📚 Additional Resources

### Documentation

- [User Guide](docs/USAGE.md) - Features and functionality
- [Troubleshooting Guide](docs/TROUBLESHOOTING.md) - Common issues and solutions
- [FAQ](docs/FAQ.md) - Frequently asked questions

### Development

- [Development Guide](docs/DEVELOPMENT.md) - Development setup and workflow
- [API Reference](docs/API.md) - Technical documentation
- [Contributing Guidelines](docs/CONTRIBUTING.md) - How to contribute

### Community

- [GitHub Issues](https://github.com/sanchez314c/calculator/issues) - Report bugs and request features
- [GitHub Discussions](https://github.com/sanchez314c/calculator/discussions) - Community discussions
- [Project Repository](https://github.com/sanchez314c/calculator) - Source code and releases

---

## 🎯 Quick Start Summary

1. **Choose Installation Method**: Prebuilt (recommended) or build from source
2. **Download**: Get the appropriate package for your platform
3. **Install**: Follow platform-specific instructions
4. **Launch**: Start Calculator and verify it works
5. **Enjoy**: Use your new calculator application!

---

_Last Updated: 2025-10-31_
_Installation Guide Version: 1.0_
_Maintainer: Calculator Development Team_
