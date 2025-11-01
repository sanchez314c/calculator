# 📡 API Reference

**Complete API documentation for the Electron Calculator application.**

---

## 📋 Table of Contents

- [Overview](#overview)
- [Main Process APIs](#main-process-apis)
- [Renderer Process APIs](#renderer-process-apis)
- [IPC Communication](#ipc-communication)
- [Calculator Engine](#calculator-engine)
- [UI Components](#ui-components)
- [Events](#events)
- [Error Handling](#error-handling)

---

## 🎯 Overview

The Electron Calculator provides a comprehensive API for calculator operations, UI interactions, and system integration. The API is organized into three main categories:

1. **Main Process APIs** - System-level operations and window management
2. **Renderer Process APIs** - UI interactions and calculator logic
3. **IPC Communication** - Secure communication between processes

---

## 🔧 Main Process APIs

### Application Lifecycle

#### `app.whenReady()`
Called when Electron has finished initialization.

```javascript
app.whenReady().then(() => {
    createMainWindow();
});
```

#### `app.quit()`
Quits the application.

```javascript
app.quit();
```

### Window Management

#### `createMainWindow()`
Creates the main application window.

```javascript
function createMainWindow() {
    const mainWindow = new BrowserWindow({
        width: 400,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        resizable: false,
        titleBarStyle: 'hiddenInset'
    });

    mainWindow.loadFile('src/renderer/index.html');
    return mainWindow;
}
```

### Menu Operations

#### `createApplicationMenu()`
Creates the application menu.

```javascript
function createApplicationMenu() {
    const template = [
        {
            label: 'Calculator',
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services' },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideothers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}
```

---

## 🖥️ Renderer Process APIs

### Calculator Display

#### `display.setValue(value)`
Sets the calculator display value.

```javascript
const display = document.querySelector('.calculator-display');
display.setValue('123.45');
```

#### `display.getValue()`
Gets the current calculator display value.

```javascript
const currentValue = display.getValue();
console.log(currentValue); // '123.45'
```

#### `display.clear()`
Clears the calculator display.

```javascript
display.clear();
```

### Button Interactions

#### `button.click()`
Simulates a button click.

```javascript
const button = document.querySelector('[data-action="add"]');
button.click();
```

#### `button.setState(state)`
Sets button state (normal, pressed, disabled).

```javascript
button.setState('disabled');
```

---

## 📡 IPC Communication

### Main Process Handlers

#### `calculator-operation`
Handles calculator operations.

```javascript
ipcMain.handle('calculator-operation', async (event, operation, operand1, operand2) => {
    try {
        const result = Calculator.calculate(operation, operand1, operand2);
        return { success: true, result };
    } catch (error) {
        return { success: false, error: error.message };
    }
});
```

#### `app-version`
Returns application version.

```javascript
ipcMain.handle('app-version', () => {
    return app.getVersion();
});
```

#### `system-theme`
Gets current system theme.

```javascript
ipcMain.handle('system-theme', () => {
    return nativeTheme.shouldUseDarkColors ? 'dark' : 'light';
});
```

### Renderer Process API

#### Preload Script Bridge

```javascript
// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    calculateOperation: (operation, operand1, operand2) =>
        ipcRenderer.invoke('calculator-operation', operation, operand1, operand2),

    getVersion: () => ipcRenderer.invoke('app-version'),

    getSystemTheme: () => ipcRenderer.invoke('system-theme'),

    onThemeChange: (callback) =>
        ipcRenderer.on('theme-changed', (event, theme) => callback(theme))
});
```

#### Usage in Renderer

```javascript
// Get application version
const version = await window.electronAPI.getVersion();

// Perform calculation
const result = await window.electronAPI.calculateOperation('add', 5, 3);

// Listen for theme changes
window.electronAPI.onThemeChange((theme) => {
    console.log('Theme changed to:', theme);
});
```

---

## ⚙️ Calculator Engine

### Core Calculation Methods

#### `Calculator.calculate(operation, operand1, operand2)`
Performs basic arithmetic operations.

```javascript
const result = Calculator.calculate('add', 5, 3);
console.log(result); // 8
```

**Supported Operations:**
- `'add'` - Addition
- `'subtract'` - Subtraction
- `'multiply'` - Multiplication
- `'divide'` - Division
- `'power'` - Exponentiation
- `'mod'` - Modulo

#### `Calculator.sqrt(value)`
Calculates square root.

```javascript
const result = Calculator.sqrt(16);
console.log(result); // 4
```

#### `Calculator.percentage(value)`
Calculates percentage.

```javascript
const result = Calculator.percentage(0.25);
console.log(result); // 25
```

### Advanced Math Functions

#### `Calculator.sin(angle)`
Calculates sine of angle (in radians).

```javascript
const result = Calculator.sin(Math.PI / 2);
console.log(result); // 1
```

#### `Calculator.cos(angle)`
Calculates cosine of angle (in radians).

```javascript
const result = Calculator.cos(0);
console.log(result); // 1
```

#### `Calculator.tan(angle)`
Calculates tangent of angle (in radians).

```javascript
const result = Calculator.tan(Math.PI / 4);
console.log(result); // 1
```

### Memory Functions

#### `Calculator.memory.store(value)`
Stores value in memory.

```javascript
Calculator.memory.store(42);
```

#### `Calculator.memory.recall()`
Recalls value from memory.

```javascript
const value = Calculator.memory.recall();
console.log(value); // 42
```

#### `Calculator.memory.clear()`
Clears memory.

```javascript
Calculator.memory.clear();
```

#### `Calculator.memory.add(value)`
Adds value to memory.

```javascript
Calculator.memory.add(8);
```

### History Management

#### `Calculator.history.add(expression, result)`
Adds calculation to history.

```javascript
Calculator.history.add('2 + 2', 4);
```

#### `Calculator.history.getRecent(limit)`
Gets recent calculations.

```javascript
const recent = Calculator.history.getRecent(10);
console.log(recent); // Array of recent calculations
```

#### `Calculator.history.clear()`
Clears calculation history.

```javascript
Calculator.history.clear();
```

---

## 🎨 UI Components

### Display Component

#### Methods

```javascript
// Set display value
display.setValue('123.45');

// Get current value
const value = display.getValue();

// Clear display
display.clear();

// Append digit
display.appendDigit('5');

// Append operator
display.appendOperator('+');

// Remove last character
display.backspace();
```

#### Events

```javascript
// Listen for value changes
display.on('change', (value) => {
    console.log('Display changed:', value);
});

// Listen for clear events
display.on('clear', () => {
    console.log('Display cleared');
});
```

### Button Component

#### Methods

```javascript
// Create button
const button = new CalculatorButton({
    text: '5',
    action: 'digit',
    value: '5'
});

// Set button state
button.setState('pressed');

// Enable/disable button
button.setEnabled(false);
button.setEnabled(true);

// Simulate click
button.click();
```

#### Events

```javascript
// Listen for clicks
button.on('click', () => {
    console.log('Button clicked');
});

// Listen for state changes
button.on('statechange', (state) => {
    console.log('Button state:', state);
});
```

### Keyboard Component

#### Methods

```javascript
// Initialize keyboard handler
const keyboard = new KeyboardHandler();

// Register key mapping
keyboard.registerMapping({
    '0': 'digit:0',
    '1': 'digit:1',
    '+': 'operator:add',
    '-': 'operator:subtract',
    'Enter': 'equals',
    'Escape': 'clear'
});

// Enable/disable keyboard
keyboard.setEnabled(true);
```

#### Events

```javascript
// Listen for key presses
keyboard.on('keypress', (key, action) => {
    console.log(`Key ${key} mapped to ${action}`);
});
```

---

## 📡 Events

### Application Events

#### `window-all-closed`
Fired when all windows are closed.

```javascript
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
```

#### `activate`
Fired when application is activated.

```javascript
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
    }
});
```

### Calculator Events

#### `calculation-start`
Fired when calculation starts.

```javascript
Calculator.on('calculation-start', (operation) => {
    console.log('Starting calculation:', operation);
});
```

#### `calculation-complete`
Fired when calculation completes.

```javascript
Calculator.on('calculation-complete', (operation, result) => {
    console.log(`${operation} = ${result}`);
});
```

#### `error`
Fired when an error occurs.

```javascript
Calculator.on('error', (error) => {
    console.error('Calculator error:', error);
});
```

### UI Events

#### `display-change`
Fired when display value changes.

```javascript
display.on('change', (value) => {
    console.log('Display changed to:', value);
});
```

#### `button-press`
Fired when a button is pressed.

```javascript
document.addEventListener('button-press', (event) => {
    const { action, value } = event.detail;
    console.log(`Button pressed: ${action}:${value}`);
});
```

---

## ⚠️ Error Handling

### Error Types

#### `CalculationError`
Thrown for calculation-related errors.

```javascript
try {
    const result = Calculator.calculate('divide', 10, 0);
} catch (error) {
    if (error instanceof CalculationError) {
        console.error('Calculation error:', error.message);
    }
}
```

#### `DisplayError`
Thrown for display-related errors.

```javascript
try {
    display.setValue('invalid');
} catch (error) {
    if (error instanceof DisplayError) {
        console.error('Display error:', error.message);
    }
}
```

### Error Recovery

#### Automatic Recovery

```javascript
Calculator.on('error', (error) => {
    // Log error
    console.error('Calculator error:', error);

    // Reset to safe state
    Calculator.reset();

    // Show user-friendly message
    showErrorMessage('An error occurred. Calculator has been reset.');
});
```

#### Manual Recovery

```javascript
// Reset calculator state
Calculator.reset();

// Clear display
display.clear();

// Clear history
Calculator.history.clear();
```

---

## 🔍 Debugging

### Console Methods

```javascript
// Enable debug mode
Calculator.setDebugMode(true);

// Log calculator state
Calculator.logState();

// Trace operation execution
Calculator.traceOperation('add', 5, 3);
```

### Development Tools

```javascript
// Open DevTools
mainWindow.webContents.openDevTools();

// Log IPC messages
ipcMain.on('debug-ipc', (event, message) => {
    console.log('IPC:', message);
});
```

---

## 📚 Examples

### Basic Calculation

```javascript
async function performCalculation() {
    const result = await window.electronAPI.calculateOperation('multiply', 7, 6);
    if (result.success) {
        display.setValue(result.result.toString());
    } else {
        console.error('Calculation failed:', result.error);
    }
}
```

### Keyboard Input Handler

```javascript
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        display.appendDigit(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        display.appendOperator(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Escape') {
        display.clear();
    }
});
```

### Theme Switching

```javascript
async function switchTheme() {
    const currentTheme = await window.electronAPI.getSystemTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}
```

---

## 🔗 Related Documentation

- [Development Guide](./DEVELOPMENT.md)
- [Architecture Overview](../docs/technical/ARCHITECTURE.md)
- [Troubleshooting Guide](../docs/TROUBLESHOOTING.md)

---

*Last Updated: $(date +"%Y-%m-%d")*
*API Version: 1.0.0*