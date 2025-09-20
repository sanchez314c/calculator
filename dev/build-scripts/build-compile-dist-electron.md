# Electron Build Script Template

This is the comprehensive build script for Electron applications with multi-platform support.

```bash
#!/bin/bash
# Comprehensive Electron Build Script
# Supports macOS (Intel/ARM), Windows (x64/x86), Linux (x64)
# Generates all installer types: .dmg, .exe, .msi, .deb, .rpm, .AppImage, .snap

set -e  # Exit on any error

PROJECT_NAME=$(node -p "require('./package.json').name")
PROJECT_VERSION=$(node -p "require('./package.json').version")

echo "🚀 Starting build for $PROJECT_NAME v$PROJECT_VERSION"

# Function to cleanup system temp directories
cleanup_system_temp() {
    echo "🧹 Cleaning system temp directories..."
    
    # macOS temp cleanup
    if [ "$(uname)" = "Darwin" ]; then
        TEMP_DIR=$(find /private/var/folders -name "Temporary*" -type d 2>/dev/null | head -1)
        if [ -n "$TEMP_DIR" ]; then
            PARENT_DIR=$(dirname "$TEMP_DIR")
            # Clean up build artifacts (older than 1 day)
            find "$PARENT_DIR" -name "t-*" -type d -mtime +1 -exec rm -rf {} + 2>/dev/null || true
            find "$PARENT_DIR" -name "electron-download-*" -type d -mtime +1 -exec rm -rf {} + 2>/dev/null || true
            find "$PARENT_DIR" -name "npm-*" -type d -mtime +1 -exec rm -rf {} + 2>/dev/null || true
        fi
    fi
    
    # Linux temp cleanup
    if [ "$(uname)" = "Linux" ]; then
        if [ -d "/tmp" ]; then
            find /tmp -name "electron-*" -type d -mtime +1 -exec rm -rf {} + 2>/dev/null || true
            find /tmp -name "npm-*" -type d -mtime +1 -exec rm -rf {} + 2>/dev/null || true
        fi
    fi
    
    # Project-specific cleanup
    rm -rf node_modules/.cache 2>/dev/null || true
    rm -rf .build 2>/dev/null || true
    rm -rf build-temp 2>/dev/null || true
    find . -name ".DS_Store" -delete 2>/dev/null || true
}

# Function to setup build temp directory
setup_build_temp() {
    BUILD_TEMP_DIR="$(pwd)/build-temp"
    mkdir -p "$BUILD_TEMP_DIR"
    export TMPDIR="$BUILD_TEMP_DIR"
    export TMP="$BUILD_TEMP_DIR"
    export TEMP="$BUILD_TEMP_DIR"
    export ELECTRON_CACHE="$BUILD_TEMP_DIR/electron-cache"
    echo "📁 Using custom temp directory: $BUILD_TEMP_DIR"
}

# Function to cleanup build temp
cleanup_build_temp() {
    if [ -n "$BUILD_TEMP_DIR" ] && [ -d "$BUILD_TEMP_DIR" ]; then
        echo "🧹 Cleaning build temp directory..."
        rm -rf "$BUILD_TEMP_DIR" 2>/dev/null || true
    fi
}

# Function to handle icons
prepare_icons() {
    echo "🎨 Preparing application icons..."
    
    ICON_DIR="assets/icons"
    
    if [ ! -d "$ICON_DIR" ]; then
        echo "⚠️  Icons directory not found: $ICON_DIR"
        echo "Creating basic icon..."
        mkdir -p "$ICON_DIR"
        # You could add icon generation logic here
    fi
    
    # Check for required icon files
    if [ ! -f "$ICON_DIR/icon.png" ]; then
        echo "⚠️  Base icon.png not found in $ICON_DIR"
    fi
    
    # Convert PNG to ICO for Windows (requires ImageMagick on macOS/Linux)
    if [ -f "$ICON_DIR/icon.png" ] && ! [ -f "$ICON_DIR/icon.ico" ]; then
        if command -v convert &> /dev/null; then
            echo "🔄 Converting PNG to ICO for Windows..."
            convert "$ICON_DIR/icon.png" -resize 256x256 "$ICON_DIR/icon.ico"
        else
            echo "⚠️  ImageMagick not found - Windows icon conversion skipped"
        fi
    fi
    
    # Ensure .icns exists for macOS
    if [ ! -f "$ICON_DIR/icon.icns" ] && [ -f "$ICON_DIR/icon.png" ]; then
        echo "⚠️  macOS icon.icns not found - using PNG fallback"
    fi
}

# Function to install dependencies
install_dependencies() {
    echo "📦 Installing dependencies..."
    if [ ! -d "node_modules" ] || [ "package.json" -nt "node_modules" ]; then
        npm ci --no-audit
    else
        echo "✅ Dependencies already up to date"
    fi
}

# Function to run pre-build checks
pre_build_checks() {
    echo "🔍 Running pre-build checks..."
    
    # Check Node.js version
    NODE_VERSION=$(node --version)
    echo "📋 Node.js version: $NODE_VERSION"
    
    # Check if main entry point exists
    MAIN_FILE=$(node -p "require('./package.json').main")
    if [ ! -f "$MAIN_FILE" ]; then
        echo "❌ Main entry point not found: $MAIN_FILE"
        exit 1
    fi
    
    # Verify package.json has required fields
    if ! node -p "require('./package.json').build" &> /dev/null; then
        echo "⚠️  No electron-builder configuration found in package.json"
    fi
}

# Main build function
build_application() {
    echo "🏗️  Building application..."
    
    # Set parallel build optimization
    export ELECTRON_BUILDER_PARALLELISM=18
    
    # Clean dist directory first (REQUIRED)
    echo "🗑️  Purging dist directory..."
    rm -rf dist/*
    
    # Build for current platform by default, or all platforms if specified
    if [ "$1" = "all" ]; then
        echo "🌐 Building for all platforms..."
        npm run build
    elif [ "$1" = "mac" ]; then
        echo "🍎 Building for macOS..."
        npm run build-mac
    elif [ "$1" = "win" ]; then
        echo "🪟 Building for Windows..."
        npm run build-win
    elif [ "$1" = "linux" ]; then
        echo "🐧 Building for Linux..."
        npm run build-linux
    else
        echo "🏗️  Building for current platform..."
        npm run dist
    fi
}

# Function to create macOS app symlink
create_macos_symlink() {
    if [ "$(uname)" = "Darwin" ] && [ -d "dist/mac" ]; then
        APP_NAME=$(find dist/mac -name "*.app" -type d | head -1)
        if [ -n "$APP_NAME" ]; then
            APP_BASENAME=$(basename "$APP_NAME")
            echo "🔗 Creating symlink: $APP_BASENAME"
            ln -sf "$APP_NAME" "$APP_BASENAME"
        fi
    fi
    
    if [ "$(uname)" = "Darwin" ] && [ -d "dist/mac-arm64" ]; then
        APP_NAME=$(find dist/mac-arm64 -name "*.app" -type d | head -1)
        if [ -n "$APP_NAME" ]; then
            APP_BASENAME=$(basename "$APP_NAME")
            echo "🔗 Creating ARM64 symlink: ${APP_BASENAME%.*}-arm64.app"
            ln -sf "$APP_NAME" "${APP_BASENAME%.*}-arm64.app"
        fi
    fi
}

# Function to display build results
show_build_results() {
    echo ""
    echo "📊 Build Results:"
    echo "================"
    
    if [ -d "dist" ]; then
        echo "📁 Output directory: dist/"
        
        # Count different types of builds
        INSTALLERS=$(find dist -maxdepth 1 \( -name "*.dmg" -o -name "*.exe" -o -name "*.msi" -o -name "*.deb" -o -name "*.rpm" -o -name "*.AppImage" \) | wc -l)
        PORTABLE=$(find dist -maxdepth 1 -name "*.zip" | wc -l)
        UNPACKED=$(find dist -maxdepth 1 -name "*unpacked" -type d | wc -l)
        
        echo "🎁 Installers: $INSTALLERS"
        echo "📦 Portable: $PORTABLE" 
        echo "📂 Unpacked: $UNPACKED"
        
        echo ""
        echo "📋 Generated files:"
        find dist -maxdepth 1 -type f \( -name "*.dmg" -o -name "*.exe" -o -name "*.msi" -o -name "*.deb" -o -name "*.rpm" -o -name "*.AppImage" -o -name "*.zip" \) | sort
        
        # Calculate total size
        TOTAL_SIZE=$(du -sh dist 2>/dev/null | cut -f1)
        echo ""
        echo "💾 Total size: $TOTAL_SIZE"
    else
        echo "❌ No dist directory found"
        exit 1
    fi
}

# Function to run post-build tasks
post_build_tasks() {
    echo "🔧 Running post-build tasks..."
    
    # Create macOS symlinks
    create_macos_symlink
    
    # Verify builds
    echo "✅ Verifying builds..."
    if [ -d "dist" ] && [ "$(find dist -type f \( -name "*.dmg" -o -name "*.exe" -o -name "*.AppImage" -o -name "*.deb" \) | wc -l)" -gt 0 ]; then
        echo "✅ Build verification passed"
    else
        echo "⚠️  Warning: No installer files found"
    fi
    
    # Create checksums for installers
    if command -v shasum &> /dev/null; then
        echo "🔐 Generating checksums..."
        cd dist
        find . -type f \( -name "*.dmg" -o -name "*.exe" -o -name "*.msi" -o -name "*.deb" -o -name "*.rpm" -o -name "*.AppImage" -o -name "*.zip" \) -exec shasum -a 256 {} \; > checksums.sha256
        cd ..
        echo "✅ Checksums saved to dist/checksums.sha256"
    fi
}

# Main execution
main() {
    echo "🚀 Electron Build System"
    echo "======================="
    echo "Project: $PROJECT_NAME v$PROJECT_VERSION"
    echo "Platform: $(uname)"
    echo "Date: $(date)"
    echo ""
    
    # Setup
    cleanup_system_temp
    setup_build_temp
    
    # Prepare
    prepare_icons
    install_dependencies
    pre_build_checks
    
    # Build
    build_application "$1"
    
    # Finalize
    post_build_tasks
    show_build_results
    cleanup_build_temp
    
    echo ""
    echo "🎉 Build completed successfully!"
    echo ""
    echo "🏃 Run the application:"
    echo "  macOS:   ./run-macos.sh"
    echo "  Windows: ./run-windows.bat"
    echo "  Linux:   ./run-linux.sh"
    echo ""
    echo "📂 Build outputs in: dist/"
}

# Cleanup on exit
trap cleanup_build_temp EXIT

# Execute main function with all arguments
main "$@"
```