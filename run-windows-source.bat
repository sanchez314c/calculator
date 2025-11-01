@echo off

REM Windows Source Run Script
REM Runs the application from source code in development mode

setlocal enabledelayedexpansion

echo [%time%] Starting Windows application from source...

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed. Please install npm first.
    exit /b 1
)

REM Get script directory and change to project root
set SCRIPT_DIR=%~dp0
cd /d "%SCRIPT_DIR%.."

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo [%time%] Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install dependencies.
        exit /b 1
    )
)

REM Check if project is built
if not exist "dist" (
    echo [%time%] Building project...
    npm run build
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to build project.
        exit /b 1
    )
)

REM Run the application
echo [%time%] Starting application from source...
npm run electron:dev

if %errorlevel% equ 0 (
    echo [%time%] Application started successfully!
) else (
    echo [ERROR] Failed to start application.
    exit /b 1
)