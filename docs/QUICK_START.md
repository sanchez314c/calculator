# Quick Start Guide

## Getting Started with Electron Calculator

This guide will help you get the Electron Calculator up and running in minutes.

## Prerequisites

### System Requirements

- **Node.js**: v24.5.0 or higher
- **npm**: v9.0.0 or higher (comes with Node.js)
- **Operating System**:
  - macOS 10.15+ (Intel or Apple Silicon)
  - Windows 10+ (x64 or x86)
  - Linux (Ubuntu 18.04+, CentOS 7+, or equivalent)

### Development Tools (Optional)

- **Git**: For version control
- **VS Code**: Recommended IDE with Electron extensions
- **Chrome DevTools**: For debugging

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/calculator.git
cd calculator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Verify Installation

```bash
npm --version
node --version
```

## Running the Application

### Development Mode

Start the calculator in development mode with hot reload:

```bash
npm start
```

This will:

- Launch the Electron application
- Enable developer tools
- Watch for file changes
- Show debug console

### Production Mode

Build and run the production version:

```bash
# Build for your current platform
npm run build

# Run the built application
npm run dist
```

## Basic Usage

### Calculator Operations

- **Basic Math**: Addition (+), Subtraction (-), Multiplication (\*), Division (/)
- **Advanced**: Square root (√), Percentage (%), Memory functions
- **Keyboard Support**: Use number pad and operators for quick input

### Keyboard Shortcuts

- `Escape`: Clear all (AC)
- `Backspace`: Delete last digit
- `Enter`: Equals (=)
- `+`, `-`, `*`, `/`: Basic operations

## Development Workflow

### Making Changes

1. Edit source files in `src/` directory
2. Changes auto-reload in development mode
3. Check console for errors
4. Test functionality

### Project Structure

```
src/
├── main/           # Main process (Node.js)
│   ├── main.cjs    # Application entry point
│   └── preload.js  # Security bridge
└── renderer/       # Renderer process (Chromium)
    ├── index.html   # Main window
    ├── css/         # Stylesheets
    └── js/          # Calculator logic
```

### Common Development Tasks

#### Adding New Features

1. Update `src/renderer/js/calculator.js` for logic
2. Modify `src/renderer/index.html` for UI
3. Style in `src/renderer/css/styles.css`
4. Test in development mode

#### Debugging

- **Renderer Process**: Use Chrome DevTools (F12)
- **Main Process**: Check terminal console
- **IPC Issues**: Check both consoles for errors

## Building for Distribution

### All Platforms

```bash
npm run build
```

### Specific Platforms

```bash
# macOS (Intel + Apple Silicon)
npm run build-mac

# Windows (x64 + x86)
npm run build-win

# Linux (x64)
npm run build-linux
```

### Output Location

Built applications are saved to:

- `dist/` directory
- Platform-specific installers created
- Ready for distribution

## Troubleshooting

### Common Issues

#### Application Won't Start

```bash
# Check Node.js version
node --version  # Should be v24.5.0+

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Build Errors

```bash
# Clear build cache
npm run clean
npm run build
```

#### Permission Issues (macOS/Linux)

```bash
# Fix permissions
chmod +x scripts/*.sh
```

### Getting Help

- Check [Troubleshooting Guide](TROUBLESHOOTING.md)
- Review [FAQ](FAQ.md)
- Open an issue on GitHub

## Next Steps

### For Users

- Read the [User Guide](../README.md#usage)
- Explore advanced features
- Customize settings

### For Developers

- Read [Development Guide](DEVELOPMENT.md)
- Understand [Architecture](ARCHITECTURE.md)
- Review [Contributing Guidelines](CONTRIBUTING.md)

### For Deployers

- Follow [Deployment Guide](DEPLOYMENT.md)
- Configure build settings
- Set up distribution

## Quick Reference

### Essential Commands

```bash
npm start              # Development mode
npm run build          # Build all platforms
npm run build-mac      # macOS only
npm run build-win      # Windows only
npm run build-linux    # Linux only
npm run dist           # Create installers
npm run lint           # Code quality check
npm test               # Run tests
```

### Important Files

- `package.json` - Project configuration
- `src/main/main.cjs` - Main process entry
- `src/renderer/index.html` - UI structure
- `src/renderer/js/calculator.js` - Application logic

### Development Tips

- Use `npm start` for development
- Check console for errors
- Test on all target platforms
- Follow security best practices

---

_Need more help? Check our comprehensive documentation in the `docs/` directory._
