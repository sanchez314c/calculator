# 🛠️ Development Guide

**Complete development setup, workflow, and contribution guide for the Electron Calculator application.**

---

## 🎯 Quick Start

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (comes with Node.js)
- **Git**: Latest stable version
- **Code Editor**: VS Code recommended

### Quick Setup
```bash
# Clone and setup
git clone https://github.com/sanchez314c/calculator.git
cd calculator
npm install

# Start development
npm run dev          # Development with auto-reload
npm start            # Standard development mode
```

---

## 📋 Table of Contents

- [Development Environment Setup](#development-environment-setup)
- [Project Architecture](#project-architecture)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing Strategy](#testing-strategy)
- [Build Process](#build-process)
- [Debugging](#debugging)
- [Security Considerations](#security-considerations)
- [Code Review Process](#code-review-process)
- [Common Issues](#common-issues)

---

## 🚀 Development Environment Setup

### Platform-Specific Requirements

**macOS:**
- macOS 10.15 (Catalina) or higher
- Xcode Command Line Tools: `xcode-select --install`

**Windows:**
- Windows 10 or higher
- Visual Studio Build Tools 2019+ or Visual Studio 2019+
- Windows 10 SDK

**Linux:**
- Ubuntu 18.04+, Fedora 29+, Debian 10+
- GCC 7+ or Clang 8+
- Required development libraries:
  ```bash
  sudo apt-get install build-essential libgtk-3-dev libnotify-dev \
    libnss3-dev libxss1-dev libxtst6-dev xdg-utils
  ```

### Development Commands

```bash
# Development
npm run dev           # Development with debugging
npm start            # Standard development mode

# Building
npm run build         # Build for current platform
npm run build-mac     # macOS build
npm run build-win     # Windows build
npm run build-linux   # Linux build
npm run dist          # Create distribution packages

# Utilities
npm run bloat-check   # Analyze bundle size
npm run temp-clean     # Clean temporary files
npm audit             # Security vulnerability check
```

---

## 🏗️ Project Architecture

### Electron Multi-Process Architecture

```
┌─────────────────────────────────────────┐
│              Electron App               │
├─────────────────┬─────────────────────┤
│   Main Process   │  Renderer Process    │
│   (Node.js)      │   (Chromium)         │
├─────────────────┼─────────────────────┤
│ • App Lifecycle  │ • UI Rendering       │
│ • Window Mgmt     │ • User Interactions  │
│ • System APIs     │ • Calculator Logic   │
│ • IPC Coordination│ • DOM Manipulation   │
│ • Security Context│ • Display Updates     │
└─────────────────┴─────────────────────┘
```

### Directory Structure

```
src/
├── main/                    # Main Electron process
│   ├── main.js             # Application entry point
│   ├── preload.js          # Secure IPC bridge
│   └── ipc-handlers/       # IPC communication
├── renderer/               # Renderer process (UI)
│   ├── index.html          # Main application window
│   ├── css/                # Stylesheets
│   ├── js/                 # Calculator logic
│   └── components/         # UI components
└── shared/                 # Shared utilities
```

### Security Architecture

- **✅ Context Isolation**: Enabled to prevent prototype pollution
- **✅ Node Integration**: Disabled in renderer process
- **✅ Preload Script**: Secure bridge between main and renderer
- **✅ CSP Headers**: Content Security Policy configured
- **✅ Process Separation**: Main/renderer isolation maintained

---

## 🔄 Development Workflow

### 1. Feature Development

```bash
# Create feature branch
git checkout -b feature/new-calculator-function

# Make changes
# Edit files in src/

# Test changes
npm run dev

# Build and test
npm run build
npm start  # Test built version
```

### 2. Code Standards

**JavaScript Style:**
- Use ES6+ features with camelCase naming
- Add JSDoc comments for functions
- Follow modular design patterns
- Implement proper error handling

**HTML/CSS Guidelines:**
- Use semantic HTML elements
- Follow BEM naming for CSS classes
- Maintain responsive design principles
- Ensure accessibility compliance

### 3. Testing Strategy

**Current Status:** Infrastructure ready, implementation needed

**Planned Testing:**
```bash
npm test                 # Run all tests
npm run test:unit        # Unit tests only
npm run test:integration # Integration tests
npm run test:e2e         # End-to-end tests
npm run test:coverage    # Coverage report
```

---

## 📝 Code Standards

### JavaScript Standards

```javascript
/**
 * Performs mathematical calculation with error handling
 * @param {string} operation - Mathematical operation to perform
 * @param {number[]} operands - Array of numbers to operate on
 * @returns {number} Calculation result
 * @throws {Error} When operation is invalid or division by zero
 */
function calculate(operation, operands) {
    try {
        // Validate input
        if (!isValidOperation(operation)) {
            throw new Error(`Invalid operation: ${operation}`);
        }

        // Perform calculation
        const result = performOperation(operation, operands);
        return result;
    } catch (error) {
        console.error('Calculation error:', error);
        throw error;
    }
}
```

### Code Review Checklist

- [ ] Code follows project style guidelines
- [ ] Functionality works as expected
- [ ] No breaking changes without justification
- [ ] Documentation updated if needed
- [ ] Build passes successfully

---

## 🔨 Build Process

### Build for Current Platform
```bash
npm run build
```

### Build for All Platforms
```bash
npm run dist:maximum
```

### Platform-Specific Builds
```bash
npm run build-mac      # macOS (Intel + ARM)
npm run build-win      # Windows (x64 + x86)
npm run build-linux    # Linux (x64)
```

### Build Features
- Multi-platform support (macOS, Windows, Linux)
- Code signing integration ready
- Parallel processing (18 workers)
- Automatic icon generation
- Comprehensive error handling

---

## 🐛 Debugging

### Main Process Debugging
```bash
# Start with debugging enabled
npm run dev -- --inspect=9229

# Connect Chrome DevTools to chrome://inspect
```

### Renderer Process Debugging
```bash
# DevTools open automatically in development mode
npm run dev
```

### Common Issues

**Application won't start:**
```bash
# Check Node.js version
node --version  # Should be 18+

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Build fails:**
```bash
# Clean build artifacts
npm run temp-clean
rm -rf dist/ build/

# Rebuild native modules
npm rebuild
```

---

## 🔒 Security Considerations

### Secure Coding Practices

```javascript
// Good: Secure IPC communication
contextBridge.exposeInMainWorld('electronAPI', {
    calculate: (operation) => ipcRenderer.invoke('calculate', operation)
});

// Bad: Exposing entire IPC
contextBridge.exposeInMainWorld('electronAPI', {
    ipcRenderer: ipcRenderer  // DON'T DO THIS
});
```

### Security Best Practices
- Validate all input and sanitize user data
- Never expose sensitive information in error messages
- Keep dependencies updated and security-audited
- Use secure defaults (context isolation, no node integration)

---

## 📚 Additional Resources

### Documentation
- [Architecture Guide](technical/architecture.md) - System design overview
- [API Reference](API_REFERENCE.md) - Complete API documentation
- [Deployment Guide](DEPLOYMENT.md) - Build and deployment instructions

### External Resources
- [Electron Documentation](https://electronjs.org/docs)
- [Node.js Documentation](https://nodejs.org/docs/)
- [electron-builder Documentation](https://electron.build/)

### Community
- [GitHub Issues](https://github.com/sanchez314c/calculator/issues) - Bug reports and feature requests
- [GitHub Discussions](https://github.com/sanchez314c/calculator/discussions) - Community conversations

---

**🎯 Ready to contribute?**
1. Read the [Contributing Guidelines](CONTRIBUTING.md)
2. Set up your development environment using this guide
3. Pick an issue or propose a new feature
4. Submit a pull request following our process

*Last updated: 2025-10-29*