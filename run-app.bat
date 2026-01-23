@echo off
echo Starting Auxillium Development Server...
echo.
echo Make sure Node.js is installed and in your PATH
echo.

REM Check if node is available
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not found in PATH
    echo Please install Node.js from https://nodejs.org/
    echo After installation, restart this terminal and try again
    pause
    exit /b 1
)

echo Node.js found!
node --version
echo.

REM Check if npm is available
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm is not found in PATH
    echo Please make sure Node.js is properly installed
    pause
    exit /b 1
)

echo npm found!
npm --version
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    echo.
)

echo Starting development server...
echo The app will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev
