# Architecture Documentation

## Overview

The Electron Calculator is built using a multi-process architecture that separates concerns between the main process (Node.js) and renderer process (Chromium). This architecture ensures security, performance, and maintainability.

## System Architecture

### Multi-Process Model

```
┌─────────────────────────────────────────────────────────────┐
│                    Electron Application                    │
├─────────────────────────────────────────────────────────────┤
│  Main Process (Node.js Runtime)                          │
│  ├── Application Lifecycle Management                     │
│  ├── Window Management                                   │
│  ├── System Integration                                  │
│  └── IPC Coordination                                   │
├─────────────────────────────────────────────────────────────┤
│  Renderer Process (Chromium Browser)                      │
│  ├── UI Rendering (HTML/CSS/JS)                         │
│  ├── User Interaction Handling                           │
│  ├── Calculator Logic                                   │
│  └── DOM Manipulation                                   │
├─────────────────────────────────────────────────────────────┤
│  Preload Script (Security Bridge)                         │
│  ├── Context Isolation                                   │
│  ├── Secure IPC Bridge                                   │
│  └── API Exposure Control                               │
└─────────────────────────────────────────────────────────────┘
```

### Security Model

The application implements Electron's recommended security best practices:

- **Context Isolation**: Enabled to prevent prototype pollution
- **Node Integration**: Disabled in renderer process
- **Preload Script**: Secure bridge for IPC communication
- **Content Security Policy**: Configured for XSS prevention
- **Process Separation**: Main and renderer processes are isolated

## Component Architecture

### Main Process Components

#### Application Entry Point

- **File**: `src/main/main.cjs`
- **Responsibilities**:
  - Application lifecycle management
  - Window creation and management
  - Event handling
  - IPC server setup

#### Preload Script

- **File**: `src/main/preload.js`
- **Responsibilities**:
  - Secure IPC bridge implementation
  - API exposure to renderer
  - Context isolation enforcement

### Renderer Process Components

#### User Interface

- **File**: `src/renderer/index.html`
- **Responsibilities**:
  - Main application window structure
  - Calculator layout definition
  - Event binding setup

#### Styling

- **File**: `src/renderer/css/styles.css`
- **Responsibilities**:
  - Visual design implementation
  - Responsive layout
  - Theme management

#### Application Logic

- **File**: `src/renderer/js/calculator.js`
- **Responsibilities**:
  - Calculator operations
  - Display management
  - Input validation
  - State management

## Data Flow

### User Interaction Flow

```
User Input → Renderer Process → Calculator Logic → Display Update
     ↓              ↓                    ↓              ↓
Button Click → Event Handler → Operation → DOM Update
```

### IPC Communication Flow

```
Renderer Process ←→ Preload Script ←→ Main Process
      ↓                    ↓              ↓
  UI Events          Secure Bridge    System APIs
```

## File Structure

```
src/
├── main/                    # Main Process (Node.js)
│   ├── main.cjs            # Application entry point
│   └── preload.js          # Security bridge
└── renderer/               # Renderer Process (Chromium)
    ├── index.html          # Main window
    ├── css/
    │   └── styles.css      # Application styles
    └── js/
        └── calculator.js   # Application logic
```

## Technology Stack

### Core Technologies

- **Electron**: v27.3.11 - Desktop application framework
- **Node.js**: v24.5.0+ - Backend runtime
- **Chromium**: Browser engine for renderer process

### Build Tools

- **electron-builder**: v26.0.12 - Cross-platform packaging
- **Node.js native modules**: System integration

### Development Tools

- **ESLint**: Code quality enforcement
- **Prettier**: Code formatting
- **TypeScript**: Type checking (configuration available)

## Performance Considerations

### Memory Management

- Process isolation prevents memory leaks between processes
- Garbage collection handled separately for each process
- Event listener cleanup on window close

### Rendering Optimization

- Efficient DOM manipulation
- Minimal reflows and repaints
- CSS-based animations for smooth UI

### Startup Performance

- Lazy loading of non-critical components
- Optimized bundle size
- Efficient resource loading

## Security Architecture

### Process Isolation

- Main process has system access
- Renderer process runs in sandbox
- No direct Node.js access in renderer

### Input Validation

- All user inputs validated in renderer
- Sanitization before processing
- Type checking for operations

### Secure Communication

- IPC through preload script only
- No direct eval() usage
- Content Security Policy enforcement

## Extension Points

### Adding New Calculator Features

1. Update `calculator.js` with new operations
2. Add UI elements to `index.html`
3. Style new components in `styles.css`
4. Test across all platforms

### System Integration

1. Add IPC handlers in `main.cjs`
2. Expose through `preload.js`
3. Call from renderer process
4. Maintain security boundaries

## Platform-Specific Considerations

### macOS

- Native menu bar integration
- Keychain access for secure storage
- Notification system integration

### Windows

- Taskbar integration
- Windows registry access
- System tray support

### Linux

- Desktop environment integration
- Package manager compatibility
- System service integration

## Monitoring and Debugging

### Development Tools

- Chrome DevTools for renderer debugging
- Node.js debugging for main process
- Electron DevTools extension

### Production Monitoring

- Error reporting integration
- Performance metrics collection
- User analytics (privacy-compliant)

## Future Architecture Considerations

### Potential Enhancements

- Plugin system for extensibility
- Cloud synchronization for settings
- Advanced calculation engines
- Multi-language support

### Scalability

- Modular architecture supports feature additions
- Clean separation of concerns
- Well-defined interfaces between components

---

_Last Updated: 2025-10-31_  
_Maintainer: Development Team_
