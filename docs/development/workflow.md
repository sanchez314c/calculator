# 👩‍💻 Development Workflow

Complete guide for setting up a development environment and contributing to the Calculator project.

---
title: Development Workflow
description: Development setup and contribution process for Calculator
audience: developers
last-updated: 2025-09-13
version: 1.0.0
related-docs: [../../CONTRIBUTING.md, ../technical/architecture.md]
---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher (comes with Node.js)
- **Git**: Latest version
- **Code Editor**: VS Code recommended

### Initial Setup
```bash
# Clone the repository
git clone https://github.com/calculator/electron-calculator.git
cd electron-calculator

# Install dependencies
npm install

# Run setup script
./setup.sh

# Start development
./run-source-macos.sh    # macOS
./run-source-linux.sh    # Linux
./run-source-windows.bat # Windows
```

## 🏗️ Development Environment

### Recommended Tools
- **Editor**: [Visual Studio Code](https://code.visualstudio.com/)
- **Extensions**: 
  - ES6/JavaScript snippets
  - Electron debugging tools
  - ESLint and Prettier (when configured)
- **Terminal**: iTerm2 (macOS), Windows Terminal, or built-in terminal

### Project Structure Understanding
```
electron-calculator/
├── src/                    # Source code
│   ├── main/              # Main process (Node.js)
│   ├── renderer/          # Renderer process (Web)
│   └── shared/            # Shared utilities
├── assets/                # Static assets
├── docs/                  # Documentation
├── scripts/               # Build and utility scripts
├── tests/                 # Test files
└── dev/                   # Development resources
```

## 🔄 Development Workflow

### 1. Feature Development

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes to code
# Edit files in src/

# Test changes
./run-source-macos.sh  # Test development version

# Build and test
./scripts/compile-build-dist.sh
./run-macos.sh  # Test built version
```

### 2. Code Standards

#### JavaScript Style
- Use **ES6+** features where appropriate
- Follow **camelCase** naming for variables and functions
- Use **meaningful variable names**
- Add **JSDoc comments** for functions

```javascript
/**
 * Performs mathematical calculation
 * @param {number} a - First operand
 * @param {number} b - Second operand
 * @param {string} operator - Mathematical operator
 * @returns {number} Calculation result
 */
function calculate(a, b, operator) {
    // Implementation
}
```

#### HTML/CSS Guidelines
- Use **semantic HTML** elements
- Follow **BEM naming** for CSS classes
- Maintain **responsive design** principles
- Ensure **accessibility** compliance

### 3. Testing Strategy

#### Manual Testing
- **Functionality**: Test all calculator operations
- **UI/UX**: Verify interface responsiveness and appearance
- **Cross-platform**: Test on target platforms
- **Edge cases**: Division by zero, very large numbers

#### Automated Testing (Future)
```bash
# When tests are implemented
npm test              # Run all tests
npm run test:unit     # Unit tests only
npm run test:e2e      # End-to-end tests
```

### 4. Build and Validation

```bash
# Development build
npm run dev

# Production build
./scripts/compile-build-dist.sh

# Platform-specific builds
./scripts/compile-build-dist.sh mac     # macOS only
./scripts/compile-build-dist.sh win     # Windows only
./scripts/compile-build-dist.sh linux   # Linux only
./scripts/compile-build-dist.sh all     # All platforms
```

## 🔧 Development Commands

### Core Commands
```bash
# Development
npm start                           # Start in development mode
npm run dev                        # Development with auto-reload
./run-source-[platform].[sh/bat]  # Platform-specific development

# Building
npm run build                      # Build for current platform
npm run dist                       # Create distribution package
./scripts/compile-build-dist.sh    # Comprehensive build script

# Platform builds
npm run build-mac                  # macOS build
npm run build-win                  # Windows build
npm run build-linux                # Linux build
```

### Utility Commands
```bash
# Clean builds
rm -rf dist/ build-temp/

# Clean dependencies
rm -rf node_modules/
npm install

# Check for issues
npm audit                          # Security audit
npm outdated                       # Dependency updates
```

## 🐛 Debugging

### Electron Debugging

#### Main Process Debugging
```bash
# Start with debugging enabled
npm run dev

# Attach debugger (VS Code or Chrome DevTools)
# Process: Main
```

#### Renderer Process Debugging
```bash
# Development mode opens DevTools automatically
npm run dev

# Manual DevTools opening
# View → Toggle Developer Tools
```

### Common Issues

**Issue**: Application won't start
```bash
# Check Node.js version
node --version  # Should be 18+

# Reinstall dependencies
rm -rf node_modules/
npm install

# Clear Electron cache
rm -rf ~/Library/Caches/electron-calculator
```

**Issue**: Build fails
```bash
# Check build requirements
./scripts/compile-build-dist.sh

# Verify package.json configuration
node -p "require('./package.json').build"

# Clean and rebuild
rm -rf dist/ node_modules/
npm install
./scripts/compile-build-dist.sh
```

## 📝 Code Review Process

### Before Submitting
1. **Self-review**: Check your changes thoroughly
2. **Test functionality**: Verify all features work
3. **Check builds**: Ensure the application builds successfully
4. **Documentation**: Update relevant documentation

### Pull Request Guidelines
- **Clear title**: Describe the change concisely
- **Description**: Explain what changed and why
- **Testing**: Describe how you tested the changes
- **Screenshots**: Include UI changes if applicable

### Review Checklist
- [ ] Code follows project style guidelines
- [ ] Functionality works as expected
- [ ] No breaking changes without justification
- [ ] Documentation updated if needed
- [ ] Build passes successfully

## 🔒 Security Considerations

### Development Security
- **Dependencies**: Keep dependencies updated
- **Secrets**: Never commit sensitive information
- **CSP**: Maintain Content Security Policy compliance
- **IPC**: Validate all inter-process communication

### Best Practices
```javascript
// Good: Secure IPC communication
contextBridge.exposeInMainWorld('electronAPI', {
    calculate: (operation) => ipcRenderer.invoke('calculate', operation)
});

// Bad: Exposing entire IPC
contextBridge.exposeInMainWorld('electronAPI', {
    ipcRenderer: ipcRenderer
});
```

## 🚀 Deployment

### Local Testing
```bash
# Test development build
./run-source-[platform]

# Test production build
./scripts/compile-build-dist.sh
./run-[platform]
```

### Release Process
1. **Version bump**: Update `package.json` version
2. **Build**: Create distribution packages
3. **Test**: Verify all platforms work correctly
4. **Tag**: Create git tag for release
5. **Publish**: Upload to distribution channels

## 📚 Resources

### Documentation
- [Architecture Guide](../technical/architecture.md) - System design overview
- [Setup Guide](../guides/setup.md) - Installation instructions
- [Contributing Guidelines](../../CONTRIBUTING.md) - Contribution standards

### External Resources
- [Electron Documentation](https://electronjs.org/docs)
- [Node.js Documentation](https://nodejs.org/docs)
- [electron-builder Documentation](https://electron.build/)

### Community
- [GitHub Issues](https://github.com/calculator/electron-calculator/issues) - Bug reports and feature requests
- [GitHub Discussions](https://github.com/calculator/electron-calculator/discussions) - Community conversations

---

**🎯 Ready to contribute?**
1. Read the [Contributing Guidelines](../../CONTRIBUTING.md)
2. Set up your development environment using this guide
3. Pick an issue or propose a new feature
4. Submit a pull request following our process

*Last updated: 2025-09-13*