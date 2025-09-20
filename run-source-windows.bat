@echo off
REM Run from Source on Windows (Development Mode)

cd /d "%~dp0"

REM Check for Node.js project
if exist "package.json" (
    if not exist "node_modules" (
        npm install
    )
    npm start
    exit /b
)

echo Unknown project type
exit /b 1