# 🏗️ Architecture Documentation

Technical overview of the Calculator application architecture, design decisions, and implementation details.

---
title: Calculator Architecture
description: System design and component overview for the Electron calculator application
audience: developers
last-updated: 2025-09-13
version: 1.0.0
related-docs: [../dev/tech-stack.md, ../development/workflow.md]
---

## 📊 System Overview

The Calculator is built as an Electron desktop application using a modern web technology stack with cross-platform compatibility.

### High-Level Architecture

```
┌─────────────────────────────────────────┐
│                 Electron                │
├─────────────────────────────────────────┤
│  Main Process          Renderer Process │
│  ┌─────────────────┐  ┌─────────────────┐│
│  │   src/main/     │  │  src/renderer/  ││
│  │   ├─ main.js    │  │  ├─ index.html  ││
│  │   ├─ preload.js │  │  ├─ css/        ││
│  │   └─ ipc-*      │  │  └─ js/         ││
│  └─────────────────┘  └─────────────────┘│
└─────────────────────────────────────────┘
           │                    │
           ├─ Window Management │
           ├─ File System      │
           ├─ Native APIs      │
           └─ Security Context │
```

## 🧩 Component Architecture

### Main Process (`src/main/`)

**Purpose**: Application lifecycle, window management, and system integration

**Key Components**:
- `main.js` - Application entry point and window creation
- `preload.js` - Secure bridge between main and renderer processes
- `ipc-handlers/` - Inter-process communication handlers

**Responsibilities**:
- Window lifecycle management (create, show, hide, close)
- Menu bar and application menu setup
- Security policy enforcement
- File system access (if needed)
- Native OS integration

### Renderer Process (`src/renderer/`)

**Purpose**: User interface and calculator logic

**Key Components**:
- `index.html` - Main application UI structure
- `css/styles.css` - Application styling and theming
- `js/calculator.js` - Calculator logic and user interaction

**Responsibilities**:
- User interface rendering
- Calculator operations and logic
- User input handling (mouse and keyboard)
- Display updates and animations
- Error handling and validation

### Shared Resources (`src/shared/`)

**Purpose**: Common utilities and constants used by both processes

**Contents**:
- Constants and configuration
- Utility functions
- Type definitions (if using TypeScript)

## 🔐 Security Architecture

### Process Isolation
- **Context Isolation**: Enabled to prevent access to Node.js APIs from renderer
- **Node Integration**: Disabled in renderer for security
- **Preload Scripts**: Secure communication bridge using `contextBridge`

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';">
```

### IPC Communication
- **Secure Channels**: Validated message passing between processes
- **API Exposure**: Minimal, controlled API surface in preload script
- **Input Validation**: All IPC messages validated and sanitized

## 💾 Data Architecture

### State Management
- **Local State**: Calculator state managed in renderer process
- **Persistence**: Minimal - calculator doesn't store user data
- **Memory Management**: Efficient cleanup and garbage collection

### Data Flow
```
User Input → Event Handler → Calculator Logic → Display Update
     ↓              ↓              ↓              ↓
  Keyboard     Mouse Handler    Operation      DOM Update
  KeyDown      Click Event     Processing     Display Refresh
```

## 🎨 UI Architecture

### Design System
- **Dark Theme**: Modern dark UI optimized for extended use
- **Responsive Design**: Adapts to window resizing
- **Accessibility**: Keyboard navigation and screen reader support

### Layout Structure
```
calculator-container
├── display-container
│   ├── display (main result)
│   └── operation-display (current operation)
├── buttons-container
│   ├── numbers (0-9)
│   ├── operators (+, -, ×, ÷)
│   └── functions (=, C, .)
└── footer
    └── version-info
```

### CSS Architecture
- **CSS Grid**: Main layout system for button grid
- **Flexbox**: Component-level layouts
- **CSS Variables**: Theme colors and consistent spacing
- **Media Queries**: Responsive breakpoints

## 🔧 Build Architecture

### Build Pipeline
```
Source Code → Preprocessing → Bundling → Packaging → Distribution
     ↓              ↓           ↓          ↓           ↓
  src/main/    Code Linting   Electron   electron-   Multi-platform
  src/renderer/  Validation   Builder    builder     Installers
  assets/                    Packaging   Config      (.dmg, .exe, etc.)
```

### Build Tools
- **electron-builder**: Packaging and distribution
- **npm scripts**: Build automation
- **Asset processing**: Icon generation and optimization

### Distribution Formats
- **macOS**: `.dmg` installer, universal binary (Intel + ARM64)
- **Windows**: NSIS `.exe` installer, `.msi` package, portable `.zip`
- **Linux**: `.AppImage`, `.deb`, `.rpm` packages

## 📱 Platform Integration

### macOS
- **Native Menu Bar**: macOS-style application menu
- **Window Controls**: Traffic light buttons
- **Keyboard Shortcuts**: Command key combinations
- **App Signing**: Code signing for Gatekeeper compatibility

### Windows
- **Native Window Frame**: Windows-style controls
- **Registry Integration**: File associations (if applicable)
- **Windows Defender**: SmartScreen compatibility
- **Installer Integration**: Proper Windows installer experience

### Linux
- **Desktop Integration**: .desktop file generation
- **Icon Theme**: System icon theme integration
- **Package Managers**: Native package format support
- **Accessibility**: AT-SPI compatibility

## 🚀 Performance Architecture

### Optimization Strategies
- **Lazy Loading**: Components loaded on demand
- **Event Delegation**: Efficient event handling
- **Memory Management**: Cleanup of unused resources
- **Rendering Optimization**: Minimal DOM manipulation

### Metrics
- **Startup Time**: < 2 seconds on modern hardware
- **Memory Usage**: < 100MB typical usage
- **CPU Usage**: Minimal during idle state
- **Bundle Size**: Optimized for fast distribution

## 🔄 Development Architecture

### Development Workflow
```
Code → Lint → Test → Build → Package → Distribute
  ↓      ↓      ↓      ↓        ↓         ↓
Edit   ESLint  Jest   npm   electron-  GitHub
Files  Check   Tests  build  builder   Releases
```

### Code Organization
- **Separation of Concerns**: Clear boundaries between components
- **Modular Design**: Reusable components and utilities
- **Code Standards**: Consistent formatting and style
- **Documentation**: Inline documentation and API docs

## 🛠️ Extension Points

### Customization Options
- **Themes**: CSS variable system for easy theming
- **Plugins**: Modular architecture for feature extensions
- **Configuration**: Settings management for user preferences
- **Localization**: i18n-ready string management

### API Extensibility
- **IPC Channels**: Extensible communication system
- **Event System**: Custom event handling and emission
- **Module Loading**: Dynamic feature loading capability
- **Plugin Architecture**: Standardized plugin interface

## 📚 Related Documentation

### Technical References
- [Technology Stack](../../dev/tech-stack.md) - Complete technical specifications
- [Build Scripts](../../scripts/compile-build-dist.sh) - Build system implementation
- [Package Configuration](../../package.json) - Electron-builder setup

### Development Resources
- [Development Workflow](../development/workflow.md) - Development setup and process
- [Contributing Guidelines](../../CONTRIBUTING.md) - Contribution standards
- [Testing Strategy](../development/workflow.md#testing) - Quality assurance approach

### User Documentation
- [Setup Guide](../guides/setup.md) - Installation instructions
- [Usage Guide](../guides/usage.md) - Feature documentation

---

**📧 Questions about the architecture?**
- Review the [Technology Stack](../../dev/tech-stack.md) for implementation details
- Check the [Development Workflow](../development/workflow.md) for development setup
- Open an issue for architectural discussions

*Last updated: 2025-09-13*