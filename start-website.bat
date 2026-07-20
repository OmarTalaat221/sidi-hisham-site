@echo off
echo Starting Sedi Hisham Website...
echo.

echo Step 1: Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Step 2: Starting development server...
call npm run dev
if %errorlevel% neq 0 (
    echo Error: Failed to start development server
    pause
    exit /b 1
)

pause
