@echo off
REM Run Compiled Binary on Windows

cd /d "%~dp0"

REM Check for installer
if exist "dist\*.exe" (
    for %%f in (dist\*.exe) do (
        start "" "%%f"
        exit /b
    )
)

REM Check for unpacked version
if exist "dist\win-unpacked" (
    for %%f in (dist\win-unpacked\*.exe) do (
        start "" "%%f"
        exit /b
    )
)

echo No compiled application found. Run: scripts\compile-build-dist.sh
exit /b 1