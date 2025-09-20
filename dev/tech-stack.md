# Technology Stack

## Core Technologies
- **Language**: JavaScript (ES6+)
- **Framework**: Electron v27.3.11
- **Runtime**: Node.js
- **Package Manager**: npm
- **Build Tool**: electron-builder v24.6.4

## Key Dependencies
- **electron**: ^27.3.11 - Main framework for cross-platform desktop app
- **electron-builder**: ^24.6.4 - Build and packaging tool

## Development Tools
- **Linter**: None configured (ESLint recommended)
- **Formatter**: None configured (Prettier recommended)
- **Testing**: None configured (Jest recommended)
- **Build Tool**: electron-builder with custom configuration

## Project Type
Desktop Application (Calculator)

## Architecture
- **Main Process**: `main.js` - Window management, menu, IPC
- **Renderer Process**: `src/index.html` + `src/js/calculator.js` + `src/css/styles.css`
- **Preload Script**: `preload.js` - Secure IPC bridge
- **Build Configuration**: `package.json` build section

## Platform Support
- **macOS**: .dmg installer, universal binary (Intel + ARM64)
- **Windows**: NSIS installer + portable .exe, MSI installer
- **Linux**: AppImage + .deb package

## File Structure
- **Source**: `src/` directory with HTML/CSS/JS
- **Main Process**: Root level `main.js`
- **Assets**: `resources/icons/` for app icons
- **Build Output**: `dist/` directory
- **Configuration**: `package.json` with electron-builder config

## Development Workflow
- **Development**: `npm run dev` (opens with dev tools)
- **Production Build**: `npm run build` or `npm run dist`
- **Platform-specific**: `npm run build-mac`, `npm run build-win`, `npm run build-linux`