# 🔌 API Documentation

API reference for the Calculator application's inter-process communication and extensibility.

---
title: Calculator API Reference
description: Inter-process communication APIs and extensibility interfaces
audience: developers
last-updated: 2025-09-13
version: 1.0.0
related-docs: [../technical/architecture.md, ../development/workflow.md]
---

## 📊 Overview

The Calculator application uses Electron's IPC (Inter-Process Communication) system to safely communicate between the main process and renderer process. This document outlines the available APIs and how to use them.

## 🔐 Security Context

All APIs are exposed through the secure `preload.js` script using Electron's `contextBridge` API, ensuring:
- **Context Isolation**: No direct access to Node.js APIs
- **Controlled Surface**: Only approved APIs are exposed
- **Input Validation**: All messages are validated and sanitized

## 📡 IPC Communications

### Main Process APIs

Currently, the Calculator application primarily operates within the renderer process for calculator logic. The main process handles:

- **Window Management**: Creating, showing, hiding, and closing the application window
- **Menu Management**: Application menu and context menus
- **Security Enforcement**: CSP and process isolation
- **System Integration**: Native OS features and file system access (if needed)

### Renderer Process APIs

The calculator logic runs entirely in the renderer process using standard web technologies:

```javascript
// Calculator operations (in renderer process)
class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.operationDisplay = document.getElementById('operation-display');
        // ... initialization
    }

    /**
     * Perform calculation operation
     * @param {string} operation - Mathematical operation (+, -, ×, ÷)
     * @param {number} operand - Number to operate with
     */
    calculate(operation, operand) {
        // Calculation logic
    }
}
```

## 🔧 Extension Points

### Future API Extensibility

The application architecture supports future extensions through:

#### Plugin System (Planned)
```javascript
// Future plugin API structure
window.electronAPI = {
    calculator: {
        addOperation: (name, func) => { /* Add custom operation */ },
        addTheme: (name, styles) => { /* Add custom theme */ },
        exportHistory: () => { /* Export calculation history */ }
    },
    
    system: {
        getVersion: () => { /* Get application version */ },
        getPlatform: () => { /* Get current platform */ },
        showNotification: (message) => { /* Show system notification */ }
    }
};
```

#### Event System (Planned)
```javascript
// Future event API
window.electronAPI.events = {
    on: (event, callback) => { /* Listen to calculator events */ },
    emit: (event, data) => { /* Emit custom events */ },
    off: (event, callback) => { /* Remove event listener */ }
};

// Example usage
window.electronAPI.events.on('calculation-complete', (result) => {
    console.log('Calculation result:', result);
});
```

## 📝 Current Implementation

### Calculator Core API

The current calculator implementation provides these internal methods:

```javascript
// Core calculator functionality
const CalculatorAPI = {
    // Basic operations
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => b !== 0 ? a / b : 'Error',
    
    // Display management
    updateDisplay: (value) => { /* Update main display */ },
    updateOperation: (operation) => { /* Update operation display */ },
    clear: () => { /* Clear all displays */ },
    
    // Input validation
    isValidInput: (input) => { /* Validate user input */ },
    formatNumber: (number) => { /* Format display number */ }
};
```

### Error Handling
```javascript
// Error handling patterns
try {
    const result = Calculator.divide(10, 0);
    if (result === 'Error') {
        Calculator.updateDisplay('Error');
        Calculator.showError('Division by zero');
    }
} catch (error) {
    console.error('Calculator error:', error);
    Calculator.updateDisplay('Error');
}
```

## 🎨 Theming API (Future)

### Theme Structure
```javascript
// Future theming API structure
const ThemeAPI = {
    themes: {
        dark: {
            background: '#1a1a1a',
            text: '#ffffff',
            buttons: '#2d2d2d',
            accent: '#007acc'
        },
        light: {
            background: '#ffffff',
            text: '#000000',
            buttons: '#f0f0f0',
            accent: '#0066cc'
        }
    },
    
    setTheme: (themeName) => { /* Apply theme */ },
    getTheme: () => { /* Get current theme */ },
    addTheme: (name, theme) => { /* Add custom theme */ }
};
```

## 📊 Configuration API (Future)

### Settings Management
```javascript
// Future configuration API
const ConfigAPI = {
    settings: {
        theme: 'dark',
        precision: 10,
        history: true,
        sounds: false
    },
    
    get: (key) => { /* Get setting value */ },
    set: (key, value) => { /* Set setting value */ },
    reset: () => { /* Reset to defaults */ },
    export: () => { /* Export settings */ },
    import: (settings) => { /* Import settings */ }
};
```

## 🔍 Debugging API

### Development Tools
```javascript
// Debug information access (development mode only)
if (process.env.NODE_ENV === 'development') {
    window.CalculatorDebug = {
        getState: () => { /* Get calculator state */ },
        getHistory: () => { /* Get calculation history */ },
        clearHistory: () => { /* Clear calculation history */ },
        enableVerbose: () => { /* Enable verbose logging */ }
    };
}
```

## 📚 Implementation Examples

### Basic Calculator Usage
```javascript
// Initialize calculator
const calc = new Calculator();

// Perform calculation
calc.input('5');
calc.input('+');
calc.input('3');
calc.calculate(); // Result: 8

// Chain operations
calc.input('*');
calc.input('2');
calc.calculate(); // Result: 16
```

### Error Handling Example
```javascript
// Handle division by zero
calc.input('10');
calc.input('/');
calc.input('0');
const result = calc.calculate();

if (result === 'Error') {
    // Handle error state
    calc.showErrorMessage('Cannot divide by zero');
    setTimeout(() => calc.clear(), 2000);
}
```

## 🚀 Migration Guide (Future)

When new APIs are introduced, this section will provide migration guidance:

### Version Compatibility
- **v1.0.x**: Current API (calculator operations only)
- **v1.1.x**: (Planned) Plugin system and theming
- **v1.2.x**: (Planned) Advanced configuration and export features

## 📚 Related Documentation

### Technical References
- [Architecture Guide](../technical/architecture.md) - System design and component interaction
- [Development Workflow](../development/workflow.md) - Development setup and contribution process

### Implementation Details
- [Main Process Code](../../src/main/main.js) - Window and lifecycle management
- [Renderer Process Code](../../src/renderer/js/calculator.js) - Calculator logic implementation
- [Preload Script](../../src/main/preload.js) - Security bridge between processes

### External Resources
- [Electron IPC Documentation](https://electronjs.org/docs/api/ipc-main)
- [Context Bridge Documentation](https://electronjs.org/docs/api/context-bridge)
- [Security Best Practices](https://electronjs.org/docs/tutorial/security)

---

**🔧 Need to extend the API?**
- Review the [Architecture Guide](../technical/architecture.md) for design patterns
- Follow the [Development Workflow](../development/workflow.md) for implementation
- Consider security implications of any new API surface

*Last updated: 2025-09-13*