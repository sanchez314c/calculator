# 🚀 Setup Guide

This guide will help you set up the Calculator application on your system.

## 📋 Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **npm**: Comes with Node.js
- **Operating System**: macOS, Windows, or Linux

## 💿 Installation Methods

### Method 1: Download Prebuilt Binaries (Recommended)

1. Go to the [Releases](https://github.com/calculator/electron-calculator/releases) page
2. Download the appropriate installer for your platform:
   - **macOS**: `.dmg` file
   - **Windows**: `.exe` installer or `.msi` package
   - **Linux**: `.AppImage`, `.deb`, or `.rpm` package

### Method 2: Run from Source (Development)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/calculator/electron-calculator.git
   cd electron-calculator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application:**
   - **macOS**: `./run-source-macos.sh`
   - **Windows**: `./run-source-windows.bat`
   - **Linux**: `./run-source-linux.sh`

### Method 3: Build from Source

1. Follow steps 1-2 from Method 2
2. **Build the application:**
   ```bash
   ./scripts/compile-build-dist.sh
   ```
3. **Run the built application:**
   - **macOS**: `./run-macos.sh`
   - **Windows**: `./run-windows.bat`
   - **Linux**: `./run-linux.sh`

## 🔧 Configuration

The calculator works out of the box with no configuration required. However, you can customize:

- **Theme**: Dark theme is enabled by default
- **Window size**: Resizable within minimum constraints
- **Keyboard shortcuts**: Built-in keyboard support

## ⚠️ Troubleshooting

### Common Issues

**Installation fails on macOS:**
- Check that Gatekeeper allows the application
- Try running: `xattr -d com.apple.quarantine Calculator.app`

**Installation fails on Windows:**
- Run as administrator
- Ensure Windows Defender doesn't block the installer

**Installation fails on Linux:**
- Make sure you have proper permissions
- For AppImage: `chmod +x Calculator.AppImage`

**Application won't start:**
- Check that Node.js version is 18+ if running from source
- Verify all dependencies are installed: `npm install`

### Getting Help

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section above
2. Search existing [Issues](https://github.com/calculator/electron-calculator/issues)
3. Create a new issue with:
   - Your operating system and version
   - Node.js version (if running from source)
   - Steps to reproduce the problem
   - Error messages or logs

## ✅ Verification

To verify the installation:

1. **Launch the calculator**
2. **Test basic operations**: 2 + 2 = 4
3. **Check keyboard input**: Try typing numbers
4. **Verify window controls**: Resize, minimize, maximize

If everything works correctly, you're all set! 

## 📚 Next Steps

- Read the [Usage Guide](usage.md) to learn calculator features
- Check the [Architecture Guide](../technical/architecture.md) for technical details
- Visit the [Development Workflow](../development/workflow.md) if you want to contribute

---

📖 **Related Documentation:**
- [Usage Guide](usage.md) - How to use the calculator
- [Architecture](../technical/architecture.md) - System design
- [Contributing](../../CONTRIBUTING.md) - Development setup

*Last updated: 2025-09-13*