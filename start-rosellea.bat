@echo off
setlocal enabledelayedexpansion

echo ========================================
echo    🌹 ROSELLEA STARTUP SCRIPT 🌹
echo    Boutique Elegance Redefined
echo ========================================
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

:: Check if npm is available
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not available
    echo Please ensure Node.js is properly installed
    pause
    exit /b 1
)

echo ✅ Node.js and npm are available

:: Kill any existing processes on ports 5000 and 5173
echo 🔄 Cleaning up existing processes...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5000') do (
    if not "%%a"=="0" (
        echo Killing process %%a on port 5000
        taskkill /PID %%a /F >nul 2>&1
    )
)

for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5173') do (
    if not "%%a"=="0" (
        echo Killing process %%a on port 5173
        taskkill /PID %%a /F >nul 2>&1
    )
)

:: Wait a moment for processes to terminate
timeout /t 2 /nobreak >nul

echo.
echo 📦 Installing dependencies...

:: Install server dependencies
echo Installing server dependencies...
cd server
if not exist node_modules (
    echo Running npm install for server...
    call npm install
    if !errorlevel! neq 0 (
        echo ❌ Failed to install server dependencies
        pause
        exit /b 1
    )
) else (
    echo ✅ Server dependencies already installed
)

:: Install client dependencies
echo Installing client dependencies...
cd ..\client
if not exist node_modules (
    echo Running npm install for client...
    call npm install
    if !errorlevel! neq 0 (
        echo ❌ Failed to install client dependencies
        pause
        exit /b 1
    )
) else (
    echo ✅ Client dependencies already installed
)

echo.
echo 🚀 Starting Rosellea Application...

:: Start backend server
echo Starting backend server...
cd ..\server
start "Rosellea Backend Server" cmd /k "echo Starting Rosellea Backend... && npm start"

:: Wait for backend to initialize
echo Waiting for backend to initialize...
timeout /t 8 /nobreak >nul

:: Test backend health
echo Testing backend connection...
curl -s http://localhost:5000/api/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend server is responding
) else (
    echo ⚠️  Backend server may still be starting up
)

:: Start frontend development server
echo Starting frontend development server...
cd ..\client
start "Rosellea Frontend" cmd /k "echo Starting Rosellea Frontend... && npm run dev"

echo.
echo ✨ Rosellea is starting up!
echo.
echo 🌐 Frontend: http://localhost:5173
echo 🔧 Backend API: http://localhost:5000
echo 💖 Health Check: http://localhost:5000/api/health
echo 📊 Admin Stats: http://localhost:5000/api/admin/stats
echo.
echo 📝 Logs:
echo - Backend logs will appear in the "Rosellea Backend Server" window
echo - Frontend logs will appear in the "Rosellea Frontend" window
echo.
echo 🛑 To stop the application:
echo - Close both command windows or press Ctrl+C in each
echo.
echo Press any key to open the application in your browser...
pause >nul

:: Open the application in default browser
start http://localhost:5173

echo.
echo 🎉 Rosellea is now running!
echo Enjoy your boutique elegance experience!
echo.
pause