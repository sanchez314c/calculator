# Troubleshooting Guide

This guide helps you resolve common issues with the Calculator application.

---

## Table of Contents

- [Installation Issues](#installation-issues)
- [Application Startup Problems](#application-startup-problems)
- [Performance Issues](#performance-issues)
- [User Interface Problems](#user-interface-problems)
- [Calculation Errors](#calculation-errors)
- [Platform-Specific Issues](#platform-specific-issues)
- [Development Issues](#development-issues)
- [Getting Additional Help](#getting-additional-help)

---

## Installation Issues

### Issue: Installation fails on macOS

**Symptoms:**
- Gatekeeper prevents app from opening
- "Calculator.app can't be opened because Apple cannot check it for malicious software"
- Installer won't run

**Solutions:**

1. **Allow the app manually:**
   ```bash
   xattr -d com.apple.quarantine Calculator.app
   ```

2. **Right-click and Open:**
   - Right-click on Calculator.app
   - Select "Open" from the context menu
   - Click "Open" in the security dialog

3. **System Preferences:**
   - Go to System Preferences > Security & Privacy
   - Click "Open Anyway" for the Calculator app

### Issue: Installation fails on Windows

**Symptoms:**
- Windows Defender blocks installation
- "Windows protected your PC"
- Installation wizard won't complete

**Solutions:**

1. **Run as Administrator:**
   - Right-click the installer
   - Select "Run as administrator"

2. **Windows Defender Exception:**
   - Open Windows Security
   - Go to Virus & threat protection > Allowed threats
   - Add the installer to exceptions if it was quarantined

3. **SmartScreen Bypass:**
   - Click "More info" in the SmartScreen dialog
   - Click "Run anyway"

### Issue: Installation fails on Linux

**Symptoms:**
- Permission denied errors
- AppImage won't execute
- Package manager errors

**Solutions:**

1. **Make AppImage executable:**
   ```bash
   chmod +x Calculator.AppImage
   ```

2. **Install missing dependencies:**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install libgtk-3-0 libnotify4 libnss3 libxss1 libxtst6 xdg-utils libatspi2.0-0 libdrm2 libxcomposite1 libxdamage1 libxrandr2 libgbm1 libxkbcommon0 libasound2

   # Fedora
   sudo dnf install gtk3 libnotify nss libXScrnSaver xdg-utils atk at-spi2-atk libdrm libXcomposite libXcursor libXdamage libXrandr libgbm libxkbcommon alsa-lib
   ```

3. **Package installation issues:**
   ```bash
   # Fix broken packages
   sudo apt --fix-broken install

   # Update package lists
   sudo apt update
   ```

---

## Application Startup Problems

### Issue: Calculator won't start

**Symptoms:**
- Double-clicking icon does nothing
- Error messages on startup
- Application closes immediately

**Solutions:**

1. **Check System Requirements:**
   - macOS: 10.15 (Catalina) or higher
   - Windows: 10 or higher
   - Linux: See supported distributions

2. **Restart the application:**
   - Close all instances
   - Wait 5 seconds
   - Restart the application

3. **Check for updates:**
   - Download the latest version from [GitHub Releases](https://github.com/sanchez314c/calculator/releases)

4. **Run from terminal (for debugging):**
   ```bash
   # macOS/Linux
   ./Calculator.app/Contents/MacOS/Calculator

   # Linux AppImage
   ./Calculator.AppImage

   # Windows
   Calculator.exe
   ```

### Issue: Development build won't start

**Symptoms:**
- `npm run dev` fails
- Build errors
- Module not found errors

**Solutions:**

1. **Check Node.js version:**
   ```bash
   node --version  # Should be 18+
   npm --version   # Should be 8+
   ```

2. **Clean and reinstall dependencies:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

---

## Performance Issues

### Issue: Calculator is slow to respond

**Symptoms:**
- Delayed button responses
- Lag in display updates
- High CPU usage

**Solutions:**

1. **Close other applications:**
   - Free up system resources
   - Check Activity Monitor/Task Manager

2. **Restart the application:**
   - Memory leaks can accumulate over time

3. **Check system resources:**
   - Ensure at least 100MB free RAM
   - Check for high disk usage

### Issue: High memory usage

**Symptoms:**
- Application uses excessive memory
- System becomes slow
- Memory usage increases over time

**Solutions:**

1. **Restart the application:**
   - Memory leaks can cause gradual increases

2. **Check for memory leaks (development):**
   ```bash
   npm run dev -- --inspect
   # Use Chrome DevTools to profile memory
   ```

3. **Report persistent issues:**
   - Create a GitHub issue with memory usage details

---

## User Interface Problems

### Issue: Keyboard doesn't work

**Symptoms:**
- Keyboard input not recognized
- Number keys don't work
- Operator keys don't respond

**Solutions:**

1. **Focus the application:**
   - Click anywhere in the calculator window
   - Try pressing Tab to ensure focus

2. **Check keyboard settings:**
   - Ensure keyboard is working in other applications
   - Check for keyboard accessibility settings

3. **Restart the application:**
   - Focus can sometimes get stuck

### Issue: Display shows wrong numbers

**Symptoms:**
- Incorrect calculation results
- Display shows garbled text
- Numbers don't update

**Solutions:**

1. **Clear the calculator:**
   - Press 'C' or 'Escape' key
   - Click the Clear button

2. **Restart the application:**
   - State corruption can occur rarely

3. **Report the issue:**
   - Include the exact sequence of operations
   - Provide screenshots if possible

### Issue: Window size problems

**Symptoms:**
- Window too small to use
- Can't resize window
- Window positioned off-screen

**Solutions:**

1. **Reset window position (macOS):**
   ```bash
   defaults delete com.electron.calculator
   ```

2. **Use keyboard shortcuts:**
   - `F11` or `Cmd+M`: Minimize/Maximize
   - `Arrow keys`: Move window when focused

3. **Restart the application:**
   - Window settings will reset to defaults

---

## Calculation Errors

### Issue: Division by zero

**Symptoms:**
- Calculator shows "Error"
- Can't perform further operations

**Solutions:**

1. **Clear the error:**
   - Press 'C' or 'Escape'
   - Start a new calculation

2. **Verify your input:**
   - Ensure you're not dividing by zero
   - Check for accidental decimal points

### Issue: Incorrect results

**Symptoms:**
- Wrong mathematical results
- Precision errors
- Unexpected rounding

**Solutions:**

1. **Verify your calculation:**
   - Break down complex calculations
   - Use a different calculator to verify

2. **Check operator precedence:**
   - Calculator follows standard mathematical order
   - Use parentheses for complex operations

3. **Report calculation errors:**
   - Include the exact calculation
   - Provide expected vs. actual results

---

## Platform-Specific Issues

### macOS Issues

#### Issue: Menu bar missing
**Solution:** The calculator uses a minimal menu bar. Right-click the dock icon to access options.

#### Issue: Can't switch to other applications
**Solution:** Use `Cmd+Tab` to switch applications, or click outside the calculator window.

### Windows Issues

#### Issue: Calculator stays on top
**Solution:** This is intentional for a calculator utility. Use `Alt+Tab` to switch applications.

#### Issue: Windows Defender false positive
**Solution:** Add the calculator to Windows Defender exceptions.

### Linux Issues

#### Issue: No desktop entry
**Solution:** Create a desktop entry manually or install from package manager.

#### Issue: HiDPI scaling problems
**Solution:** Set environment variable:
```bash
export ELECTRON_FORCE_WINDOW_MENU_BAR=1
./Calculator.AppImage
```

---

## Development Issues

### Issue: Build fails

**Symptoms:**
- `npm run build` fails
- Package errors
- Icon generation errors

**Solutions:**

1. **Clean build artifacts:**
   ```bash
   npm run temp-clean
   rm -rf dist build
   ```

2. **Check dependencies:**
   ```bash
   npm audit fix
   npm install
   ```

3. **Check platform tools:**
   - macOS: Xcode Command Line Tools
   - Windows: Visual Studio Build Tools
   - Linux: Build-essential packages

### Issue: Development server won't start

**Symptoms:**
- `npm run dev` hangs
- Port already in use
- Hot reload not working

**Solutions:**

1. **Kill existing processes:**
   ```bash
   # macOS/Linux
   pkill -f electron

   # Windows
   taskkill /F /IM electron.exe
   ```

2. **Clear development cache:**
   ```bash
   npm run temp-clean
   ```

3. **Check for port conflicts:**
   ```bash
   lsof -i :3000  # Check default port
   ```

---

## Getting Additional Help

### Before Requesting Help

1. **Check this guide first** - Your issue may already be solved
2. **Search existing issues** - Someone else may have reported the same problem
3. **Try the latest version** - Your issue may already be fixed

### Information to Include

When reporting an issue, please include:

- **Operating System:** macOS version, Windows version, or Linux distribution
- **Calculator Version:** Check Help → About or version number
- **Steps to Reproduce:** Detailed steps to reproduce the issue
- **Expected Behavior:** What you expected to happen
- **Actual Behavior:** What actually happened
- **Error Messages:** Any error messages or screenshots
- **System Specs:** RAM, CPU, disk space if relevant

### How to Report Issues

1. **GitHub Issues:** [Create a new issue](https://github.com/sanchez314c/calculator/issues/new)
2. **Security Issues:** See [Security Policy](./SECURITY.md) for reporting vulnerabilities
3. **Feature Requests:** Use the feature request template

### Community Resources

- **GitHub Discussions:** Community discussions and Q&A
- **Documentation:** Check other documentation files for related information
- **Wiki:** Additional tips and tricks (coming soon)

---

## Common Debugging Steps

### General Troubleshooting

1. **Restart the application** - This solves most issues
2. **Check for updates** - Ensure you're using the latest version
3. **Clear cache/data** - Remove corrupted data
4. **Try a different user** - Rule out user-specific issues
5. **Check system resources** - Ensure sufficient resources are available

### Development Debugging

1. **Enable debug mode:**
   ```bash
   npm run dev -- --inspect=9229
   ```

2. **Use Chrome DevTools:**
   - Navigate to `chrome://inspect`
   - Connect to the Electron process

3. **Check console output:**
   - Look for error messages in the terminal
   - Check the developer console in the application

---

**Still having issues?** Please don't hesitate to [create a GitHub issue](https://github.com/sanchez314c/calculator/issues/new) or check the [FAQ](./FAQ.md) for common questions.

---

*Last updated: 2025-10-29*