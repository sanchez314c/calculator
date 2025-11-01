# Frequently Asked Questions (FAQ)

**Common questions about the Calculator application.**

---

## 🚀 Quick Start Questions

### Q: What platforms does Calculator support?
A: Calculator supports:
- **macOS**: 10.15+ (Catalina and higher), both Intel and Apple Silicon
- **Windows**: 10 and higher (x64 and x86)
- **Linux**: Ubuntu 18.04+, Fedora 29+, Debian 10+

### Q: What are the system requirements?
A: **Minimum Requirements:**
- 4GB RAM (100MB typical usage)
- 150MB available storage space
- Modern 64-bit processor

### Q: How do I install Calculator?
A: **Two options:**
1. **Download Prebuilt Binaries** (Recommended):
   - Go to [GitHub Releases](https://github.com/sanchez314c/calculator/releases)
   - Download for your platform
   - Install and launch

2. **Build from Source**:
   ```bash
   git clone https://github.com/sanchez314c/calculator.git
   cd calculator
   npm install
   npm run build
   npm start
   ```

---

## 🧮 Usage Questions

### Q: How do I perform basic calculations?
A: **Mouse or Keyboard:**
- **Mouse**: Click number buttons and operation keys (+, -, ×, ÷)
- **Keyboard**: Type numbers and operators, press Enter for results
- **Clear**: Press C or Escape

### Q: What keyboard shortcuts are available?
A: **Keyboard Support:**
- **Numbers**: 0-9
- **Operations**: +, -, *, /
- **Equals**: Enter or =
- **Clear**: Escape or C
- **Decimal**: .
- **Backspace**: Backspace

### Q: Does Calculator support scientific functions?
A: **Current version** includes basic operations (addition, subtraction, multiplication, division, square root, percentage). **Scientific functions** (trigonometry, logarithms) are planned for v1.1.

### Q: How do I use memory functions?
A: Memory functions (M+, M-, MR, MC) are **planned for v1.1**. Currently, you can use the display to store intermediate results.

### Q: Why does Calculator show "Error"?
A: **Common Error Causes:**
- Division by zero
- Invalid mathematical operations
- Input that cannot be parsed
- Clear and restart the calculation

---

## 🐛 Troubleshooting

### Q: Calculator won't start on macOS
A: **Solutions:**
1. **Gatekeeper Issue**: Right-click Calculator.app → "Open"
2. **Command Line**: `xattr -d com.apple.quarantine Calculator.app`
3. **System Update**: Ensure macOS is updated

### Q: Calculator won't start on Windows
A: **Solutions:**
1. **Run as Administrator**: Right-click installer → "Run as administrator"
2. **Windows Defender**: Add calculator to exclusions if blocked
3. **Reinstall**: Download fresh installer and reinstall

### Q: Calculator won't start on Linux
A: **Solutions:**
1. **Permissions**: `chmod +x Calculator.AppImage`
2. **Dependencies**: Install missing libraries:
   ```bash
   sudo apt-get install libgtk-3-0 libnotify4 libnss3
   ```
3. **Graphics**: Ensure desktop environment is running

### Q: Keyboard input isn't working
A: **Solutions:**
1. **Focus Window**: Click anywhere in the calculator window
2. **Check Other Apps**: Verify keyboard works in other applications
3. **Restart Application**: Close and reopen calculator

### Q: Display shows unexpected results
A: **Solutions:**
1. **Verify Input**: Check your calculation sequence
2. **Clear Calculator**: Press C or Escape to reset
3. **Check Operation Order**: Calculator follows standard mathematical order of operations

---

## 🔧 Development Questions

### Q: How do I set up the development environment?
A: **Setup Steps:**
1. Install Node.js 18+ and npm
2. Clone repository: `git clone https://github.com/sanchez314c/calculator.git`
3. Install dependencies: `npm install`
4. Start development: `npm run dev`

### Q: What development tools are recommended?
A: **Recommended Tools:**
- **VS Code**: With Electron, ESLint, and Prettier extensions
- **Chrome DevTools**: For debugging and profiling
- **GitHub Desktop**: For version control

### Q: How do I build for all platforms?
A: **Build Commands:**
```bash
npm run dist:maximum  # Build for all platforms
npm run build-mac      # macOS only
npm run build-win      # Windows only
npm run build-linux    # Linux only
```

### Q: How do I contribute to the project?
A: **Contribution Process:**
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make changes following code standards
4. Test thoroughly on all platforms
5. Submit pull request with comprehensive description

---

## 🔒 Security Questions

### Q: Is Calculator secure?
A: **Yes, Calculator implements:**
- **Context Isolation**: Prevents code injection
- **Node Integration Disabled**: No Node.js access in renderer
- **Content Security Policy**: Restricts resource loading
- **Input Validation**: Comprehensive input sanitization

### Q: Does Calculator collect my data?
A: **No**, Calculator is completely offline and does not:
- Store personal information
- Transmit data over the internet
- Track usage or analytics
- Collect any user data

### Q: How do I report a security vulnerability?
A: **Security Reporting:**
- **Email**: sanchez314c@jasonpaulmichaels.co
- **GitHub Security Advisories**: Use "Report a vulnerability" button
- **Do NOT** report security issues through public GitHub issues

### Q: Are there any known security vulnerabilities?
A: **No known vulnerabilities**. Regular security audits are performed and all dependencies are kept updated.

---

## 📦 Platform-Specific Questions

### Q: Does Calculator work on Apple Silicon (M1/M2)?
A: **Yes**, Calculator supports both Intel and Apple Silicon Macs with native performance.

### Q: Can Calculator be installed from package managers?
A: **Currently** available via direct download. Package manager support (Homebrew, Chocolatey, etc.) is planned for future releases.

### Q: Does Calculator support high-DPI displays?
A: **Yes**, Calculator automatically adapts to high-DPI displays and scaling settings.

### Q: Is Calculator available on the Mac App Store?
A: **Not currently**, but the project is structured to support App Store distribution in the future.

---

## 🆘 Feature Questions

### Q: Will Calculator support themes?
A: **Theme customization** is planned for v1.2+. Currently features a modern dark theme optimized for extended use.

### Q: Will Calculator have a mobile version?
A: **No current plans** for mobile development. Focus remains on desktop platforms.

### Q: Can Calculator save calculation history?
A: **Calculation history** is planned for v1.1, including the ability to recall previous calculations.

### Q: Will Calculator support unit conversions?
A: **Unit conversion features** are planned for future versions (v1.2+).

### Q: Can Calculator be customized or extended?
A: **Yes**, the codebase is open source and follows professional development standards. See the [Development Guide](DEVELOPMENT.md) for contributing.

---

## 📊 Performance Questions

### Q: How much memory does Calculator use?
A: **Typical Usage**: < 100MB
- **Startup**: Minimal memory footprint
- **Calculations**: No significant memory increase
- **Idle**: Background memory usage is minimal

### Q: How fast does Calculator start?
A: **Startup Time**: < 2 seconds on modern hardware
- **Optimized**: Fast application startup sequence
- **Responsive**: Immediate user interface availability

### Q: Is Calculator battery efficient?
A: **Yes**, Calculator is designed for:
- **Low CPU usage** during calculations
- **Efficient memory management**
- **Battery-friendly** dark theme on OLED displays

---

## 🤝 Community Questions

### Q: How can I request a feature?
A: **Feature Requests:**
1. Check [GitHub Issues](https://github.com/sanchez314c/calculator/issues) for existing requests
2. Create new issue using the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md)
3. Provide clear description of the feature and use case

### Q: How can I report a bug?
A: **Bug Reports:**
1. Check [Troubleshooting Guide](TROUBLESHOOTING.md) for common solutions
2. Search existing issues for duplicates
3. Create new issue using the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md)
4. Include detailed reproduction steps

### Q: How can I contribute documentation?
A: **Documentation Contributions:**
1. Identify gaps or unclear sections
2. Update content for accuracy
3. Add examples and use cases
4. Submit pull request following contribution guidelines

### Q: Is the project looking for maintainers?
A: **Yes**, the project is open to long-term maintainers. See the [Contributing Guidelines](CONTRIBUTING.md) for getting involved.

---

## 📄 License Questions

### Q: What license does Calculator use?
A: **MIT License** - permissive free software license allowing commercial use, modification, and distribution.

### Q: Can I use Calculator in commercial applications?
A: **Yes**, the MIT License permits commercial use. You must include the original copyright and license terms.

### Q: Can I modify and distribute Calculator?
A: **Yes**, you can modify and distribute Calculator under the MIT License terms.

### Q: What are the attribution requirements?
A: **MIT License Attribution** requires:
- Including the original copyright notice
- Including the license text
- Preserving attribution to original contributors

---

## 🔗 Getting More Help

### Still Have Questions?

1. **Check the [Main README](../README.md)** for project overview
2. **Read the [Troubleshooting Guide](TROUBLESHOOTING.md)** for detailed help
3. **Search [GitHub Issues](https://github.com/sanchez314c/calculator/issues)** for existing questions
4. **Create a new issue** if your question isn't covered

### Contact Information

- **Project Maintainer**: Jasonn Michaels
- **Email**: sanchez314c@jasonpaulmichaels.co
- **GitHub**: https://github.com/sanchez314c
- **Issues**: https://github.com/sanchez314c/calculator/issues

---

**Last updated: 2025-10-29**