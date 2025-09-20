class Calculator {
  constructor() {
    this.display = document.getElementById('display');
    this.operationDisplay = document.getElementById('operation-display');
    this.versionDisplay = document.getElementById('version');
    
    this.currentInput = '0';
    this.previousInput = '';
    this.operation = null;
    this.waitingForNewInput = false;
    this.hasDecimal = false;
    
    this.init();
  }
  
  async init() {
    this.setupEventListeners();
    this.setupElectronListeners();
    await this.loadVersion();
    this.updateDisplay();
  }
  
  setupEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-number]')) {
        this.inputNumber(e.target.dataset.number);
        this.addPressAnimation(e.target);
      }
      
      if (e.target.matches('[data-action]')) {
        this.handleAction(e.target.dataset.action);
        this.addPressAnimation(e.target);
      }
    });
    
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      this.handleKeyPress(e.key);
    });
    
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  }
  
  setupElectronListeners() {
    if (window.electronAPI) {
      window.electronAPI.onCopyDisplay(() => {
        this.copyToClipboard();
      });
      
      window.electronAPI.onPasteToDisplay(() => {
        this.pasteFromClipboard();
      });
      
      window.electronAPI.onClearCalculator(() => {
        this.clear();
      });
    }
  }
  
  async loadVersion() {
    if (window.electronAPI) {
      try {
        const version = await window.electronAPI.getVersion();
        this.versionDisplay.textContent = `v${version}`;
      } catch (error) {
        this.versionDisplay.textContent = 'v1.0.0';
      }
    } else {
      this.versionDisplay.textContent = 'v1.0.0';
    }
  }
  
  handleKeyPress(key) {
    const keyMappings = {
      '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
      '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
      '+': 'add',
      '-': 'subtract',
      '*': 'multiply',
      '/': 'divide',
      'Enter': 'equals',
      '=': 'equals',
      '.': 'decimal',
      ',': 'decimal',
      'Escape': 'clear',
      'Delete': 'clear',
      'Backspace': 'backspace',
      'c': 'clear',
      'C': 'clear'
    };
    
    const mappedAction = keyMappings[key];
    if (mappedAction) {
      if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(key)) {
        this.inputNumber(key);
        this.highlightButton(`[data-number="${key}"]`);
      } else {
        this.handleAction(mappedAction);
        this.highlightButton(`[data-action="${mappedAction}"]`);
      }
    }
  }
  
  highlightButton(selector) {
    const button = document.querySelector(selector);
    if (button) {
      this.addPressAnimation(button);
    }
  }
  
  addPressAnimation(button) {
    button.classList.add('pressed');
    setTimeout(() => {
      button.classList.remove('pressed');
    }, 200);
  }
  
  inputNumber(number) {
    if (this.waitingForNewInput) {
      this.currentInput = number;
      this.waitingForNewInput = false;
      this.hasDecimal = false;
    } else {
      if (this.currentInput === '0') {
        this.currentInput = number;
      } else {
        if (this.currentInput.length < 15) {
          this.currentInput += number;
        }
      }
    }
    this.updateDisplay();
  }
  
  handleAction(action) {
    switch (action) {
      case 'clear':
        this.clear();
        break;
      case 'clear-entry':
        this.clearEntry();
        break;
      case 'backspace':
        this.backspace();
        break;
      case 'decimal':
        this.inputDecimal();
        break;
      case 'add':
      case 'subtract':
      case 'multiply':
      case 'divide':
        this.setOperation(action);
        break;
      case 'equals':
        this.calculate();
        break;
    }
  }
  
  clear() {
    this.currentInput = '0';
    this.previousInput = '';
    this.operation = null;
    this.waitingForNewInput = false;
    this.hasDecimal = false;
    this.operationDisplay.textContent = '';
    this.display.classList.remove('error');
    this.updateDisplay();
  }
  
  clearEntry() {
    this.currentInput = '0';
    this.hasDecimal = false;
    this.updateDisplay();
  }
  
  backspace() {
    if (this.currentInput.length > 1) {
      if (this.currentInput.slice(-1) === '.') {
        this.hasDecimal = false;
      }
      this.currentInput = this.currentInput.slice(0, -1);
    } else {
      this.currentInput = '0';
      this.hasDecimal = false;
    }
    this.updateDisplay();
  }
  
  inputDecimal() {
    if (this.waitingForNewInput) {
      this.currentInput = '0';
      this.waitingForNewInput = false;
    }
    
    if (!this.hasDecimal) {
      this.currentInput += '.';
      this.hasDecimal = true;
      this.updateDisplay();
    }
  }
  
  setOperation(operation) {
    if (this.operation && !this.waitingForNewInput) {
      this.calculate();
    }
    
    this.operation = operation;
    this.previousInput = this.currentInput;
    this.waitingForNewInput = true;
    this.hasDecimal = false;
    
    const operationSymbols = {
      add: '+',
      subtract: '−',
      multiply: '×',
      divide: '÷'
    };
    
    this.operationDisplay.textContent = `${this.formatNumber(this.previousInput)} ${operationSymbols[operation]}`;
  }
  
  calculate() {
    if (!this.operation || !this.previousInput) return;
    
    const prev = parseFloat(this.previousInput);
    const current = parseFloat(this.currentInput);
    
    if (isNaN(prev) || isNaN(current)) {
      this.showError('Invalid input');
      return;
    }
    
    let result;
    
    try {
      switch (this.operation) {
        case 'add':
          result = prev + current;
          break;
        case 'subtract':
          result = prev - current;
          break;
        case 'multiply':
          result = prev * current;
          break;
        case 'divide':
          if (current === 0) {
            this.showError('Cannot divide by zero');
            return;
          }
          result = prev / current;
          break;
        default:
          return;
      }
      
      if (!isFinite(result)) {
        this.showError('Result too large');
        return;
      }
      
      this.currentInput = this.formatResult(result);
      this.operation = null;
      this.previousInput = '';
      this.waitingForNewInput = true;
      this.hasDecimal = this.currentInput.includes('.');
      this.operationDisplay.textContent = '';
      this.display.classList.remove('error');
      
    } catch (error) {
      this.showError('Error');
    }
    
    this.updateDisplay();
  }
  
  formatResult(result) {
    if (Number.isInteger(result) && result.toString().length <= 15) {
      return result.toString();
    }
    
    if (Math.abs(result) >= 1e15 || (Math.abs(result) < 1e-10 && result !== 0)) {
      return result.toExponential(6);
    }
    
    const rounded = Math.round(result * 1e12) / 1e12;
    const str = rounded.toString();
    
    if (str.length > 15) {
      return result.toPrecision(8);
    }
    
    return str;
  }
  
  formatNumber(num) {
    const str = num.toString();
    if (str.length <= 12) {
      return str;
    }
    return parseFloat(num).toExponential(6);
  }
  
  showError(message) {
    this.currentInput = message;
    this.display.classList.add('error');
    this.operation = null;
    this.previousInput = '';
    this.operationDisplay.textContent = '';
    
    setTimeout(() => {
      this.clear();
    }, 2000);
    
    this.updateDisplay();
  }
  
  updateDisplay() {
    if (this.currentInput === 'Error' || this.currentInput.includes('Cannot') || this.currentInput.includes('Invalid') || this.currentInput.includes('Result too large')) {
      this.display.textContent = this.currentInput;
    } else {
      this.display.textContent = this.formatNumber(this.currentInput);
    }
    
    const fontSize = this.calculateFontSize(this.display.textContent);
    this.display.style.fontSize = fontSize;
  }
  
  calculateFontSize(text) {
    const length = text.length;
    if (length <= 8) return '48px';
    if (length <= 10) return '40px';
    if (length <= 12) return '32px';
    if (length <= 15) return '28px';
    return '24px';
  }
  
  async copyToClipboard() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(this.currentInput);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = this.currentInput;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
  
  async pasteFromClipboard() {
    try {
      let text;
      if (navigator.clipboard && window.isSecureContext) {
        text = await navigator.clipboard.readText();
      } else {
        return;
      }
      
      const number = parseFloat(text.trim());
      if (!isNaN(number) && isFinite(number)) {
        this.currentInput = text.trim();
        this.waitingForNewInput = false;
        this.hasDecimal = this.currentInput.includes('.');
        this.updateDisplay();
      }
    } catch (err) {
      console.error('Failed to paste: ', err);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.calculator = new Calculator();
});

window.addEventListener('beforeunload', () => {
  if (window.electronAPI) {
    window.electronAPI.removeAllListeners('copy-display');
    window.electronAPI.removeAllListeners('paste-to-display');
    window.electronAPI.removeAllListeners('clear-calculator');
  }
});