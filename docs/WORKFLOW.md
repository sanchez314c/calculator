# Development Workflow

## Overview

This document outlines the standard development workflow for the Electron Calculator project. Following these guidelines ensures consistency, quality, and smooth collaboration.

## Git Workflow

### Branch Strategy

We use a simplified Git flow with feature branches:

```
main                    # Production-ready code
├── develop            # Integration branch (optional)
├── feature/*          # New features
├── fix/*             # Bug fixes
├── hotfix/*          # Critical production fixes
└── release/*         # Release preparation
```

### Branch Naming Conventions

- **Features**: `feature/calculator-history`
- **Bug Fixes**: `fix/memory-leak-display`
- **Hotfixes**: `hotfix/critical-security-patch`
- **Releases**: `release/v1.2.0`

### Workflow Steps

#### 1. Start New Work

```bash
# Ensure main is up to date
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name
```

#### 2. Development Process

```bash
# Make changes
# ...work on your feature...

# Stage changes
git add .

# Commit with conventional message
git commit -m "feat: add calculator history feature

Implement persistent history storage with:
- Local storage integration
- History display panel
- Clear history functionality

Closes #123"
```

#### 3. Keep Branch Updated

```bash
# Sync with main regularly
git checkout main
git pull origin main
git checkout feature/your-feature-name
git rebase main
```

#### 4. Submit for Review

```bash
# Push to remote
git push origin feature/your-feature-name

# Create Pull Request on GitHub
# Use PR template for description
```

## Commit Guidelines

### Conventional Commits

We follow conventional commit format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting (no functional change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process, dependency updates
- `perf`: Performance improvements
- `ci`: CI/CD configuration

#### Examples

```bash
feat(calculator): add scientific functions
fix(display): resolve decimal precision issue
docs(api): update IPC documentation
style(css): improve button hover effects
refactor(main): simplify window management
test(unit): add calculator operation tests
chore(deps): update electron to v27.3.11
perf(renderer): optimize display updates
ci(github): add automated testing workflow
```

## Code Quality

### Pre-commit Checks

Before committing, ensure:

```bash
# Run linting
npm run lint

# Run tests
npm test

# Check formatting
npm run format:check

# Type checking (if using TypeScript)
npm run typecheck
```

### Code Review Process

#### Review Checklist

- [ ] Code follows project conventions
- [ ] Functionality is correctly implemented
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No security vulnerabilities
- [ ] Performance considerations addressed
- [ ] Cross-platform compatibility verified

#### Review Guidelines

- Be constructive and specific
- Focus on code, not author
- Suggest improvements, don't just criticize
- Ask questions to understand intent

## Development Environment

### Setup

1. Clone repository
2. Install dependencies: `npm install`
3. Create feature branch
4. Start development: `npm start`

### Daily Workflow

```bash
# Morning sync
git checkout main
git pull origin main

# Start work
git checkout feature/current-work
npm start

# End of day
git add .
git commit -m "feat: progress on feature"
git push origin feature/current-work
```

## Testing Strategy

### Test Types

- **Unit Tests**: Individual function testing
- **Integration Tests**: Component interaction
- **E2E Tests**: Full user workflows
- **Manual Tests**: Cross-platform verification

### Running Tests

```bash
# All tests
npm test

# Unit tests only
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

### Test Structure

```
tests/
├── unit/
│   ├── calculator.test.js
│   └── display.test.js
├── integration/
│   ├── ipc.test.js
│   └── window.test.js
└── e2e/
    ├── basic-operations.test.js
    └── keyboard-input.test.js
```

## Release Process

### Version Management

We follow Semantic Versioning (SemVer):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Steps

#### 1. Prepare Release

```bash
# Update version in package.json
npm version patch  # or minor/major

# Update CHANGELOG.md
# Add release notes
# Update documentation
```

#### 2. Build and Test

```bash
# Clean build
npm run clean

# Build all platforms
npm run build

# Test builds
npm run test:builds
```

#### 3. Create Release

```bash
# Tag release
git tag -a v1.2.3 -m "Release version 1.2.3"

# Push tag
git push origin v1.2.3

# Create GitHub Release
# Upload build artifacts
```

## Issue Management

### Issue Types

- **Bug**: Unexpected behavior
- **Feature**: New functionality request
- **Enhancement**: Improvement to existing feature
- **Documentation**: Documentation issues
- **Infrastructure**: Build/deployment issues

### Issue Labels

- `bug`: Bug reports
- `enhancement`: Feature requests
- `documentation`: Documentation issues
- `good first issue`: Good for newcomers
- `help wanted`: Community contribution welcome
- `priority/high`: High priority
- `priority/medium`: Medium priority
- `priority/low`: Low priority

### Issue Workflow

1. **Report**: Use issue templates
2. **Triage**: Team assesses and labels
3. **Assign**: Assign to contributor
4. **Develop**: Create branch and implement
5. **Review**: Code review process
6. **Merge**: Merge to main
7. **Close**: Close issue with reference

## Collaboration Guidelines

### Communication

- Use GitHub issues for bug reports and features
- Use pull requests for code discussions
- Use discussions for general questions
- Be respectful and constructive

### Contributing

1. Fork repository
2. Create feature branch
3. Write code and tests
4. Submit pull request
5. Respond to feedback
6. Merge after approval

### Code of Conduct

- Be inclusive and respectful
- Welcome newcomers
- Focus on what is best for the community
- Show empathy towards other community members

## Tools and Automation

### CI/CD Pipeline

- **GitHub Actions**: Automated testing and building
- **Multi-platform**: Test on Windows, macOS, Linux
- **Node.js Matrix**: Test multiple Node.js versions
- **Security**: Automated vulnerability scanning

### Development Tools

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **lint-staged**: Pre-commit checks

### Build Tools

- **electron-builder**: Cross-platform building
- **Scripts**: Automated build processes
- **Icons**: Auto-generated icon sets

## Troubleshooting

### Common Issues

- **Build failures**: Check Node.js version
- **Test failures**: Clear cache, reinstall deps
- **Merge conflicts**: Use rebase, resolve carefully
- **Platform issues**: Test on target OS

### Getting Help

- Check documentation first
- Search existing issues
- Ask in discussions
- Create new issue with details

## Best Practices

### Code Quality

- Write clean, readable code
- Follow existing patterns
- Add comments for complex logic
- Keep functions small and focused

### Security

- Never commit secrets
- Use environment variables
- Follow Electron security guidelines
- Regular dependency updates

### Performance

- Profile regularly
- Optimize critical paths
- Minimize bundle size
- Test on minimum requirements

### Documentation

- Keep docs updated
- Use clear examples
- Document APIs
- Include troubleshooting

---

_Last Updated: 2025-10-31_  
_Maintainer: Development Team_
