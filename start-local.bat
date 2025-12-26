@echo off
echo ========================================
echo   SPARTAN CONQUEST - Quick Start
echo ========================================
echo.
echo This will start a local server to test your game.
echo.
echo Make sure you have updated firebase-config.js first!
echo.
pause

cd public

echo Starting local server...
echo.
echo The game will open at: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Try Python 3 first
python -m http.server 8000 2>nul
if errorlevel 1 (
    REM Try Python 2
    python -m SimpleHTTPServer 8000 2>nul
    if errorlevel 1 (
        echo ERROR: Python not found!
        echo.
        echo Please install Python from: https://www.python.org/
        echo OR use Firebase CLI: firebase serve
        echo.
        pause
    )
)
