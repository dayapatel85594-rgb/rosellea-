@echo off
echo ========================================
echo    🏥 ROSELLEA HEALTH CHECK 🏥
echo    System Diagnostics and Verification
echo ========================================
echo.

:: Check Node.js
echo 🔍 Checking Node.js...
node --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('node --version') do echo ✅ Node.js: %%i
) else (
    echo ❌ Node.js not found
)

:: Check npm
echo 🔍 Checking npm...
npm --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('npm --version') do echo ✅ npm: %%i
) else (
    echo ❌ npm not found
)

:: Check MongoDB service
echo 🔍 Checking MongoDB service...
sc query MongoDB >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ MongoDB service is installed
    for /f "tokens=3" %%i in ('sc query MongoDB ^| findstr STATE') do (
        if "%%i"=="RUNNING" (
            echo ✅ MongoDB is running
        ) else (
            echo ⚠️  MongoDB is not running
        )
    )
) else (
    echo ⚠️  MongoDB service not found
)

echo.
echo 📁 Checking project structure...

:: Check server files
if exist "server\package.json" (
    echo ✅ Server package.json exists
) else (
    echo ❌ Server package.json missing
)

if exist "server\server.js" (
    echo ✅ Server main file exists
) else (
    echo ❌ Server main file missing
)

if exist "server\node_modules" (
    echo ✅ Server dependencies installed
) else (
    echo ⚠️  Server dependencies not installed
)

:: Check client files
if exist "client\package.json" (
    echo ✅ Client package.json exists
) else (
    echo ❌ Client package.json missing
)

if exist "client\src\main.jsx" (
    echo ✅ Client main file exists
) else (
    echo ❌ Client main file missing
)

if exist "client\node_modules" (
    echo ✅ Client dependencies installed
) else (
    echo ⚠️  Client dependencies not installed
)

echo.
echo 🌐 Checking server connectivity...

:: Check if backend is running
curl -s http://localhost:5000/api/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend server is responding
    for /f "tokens=*" %%i in ('curl -s http://localhost:5000/api/health') do echo    Response: %%i
) else (
    echo ⚠️  Backend server not responding
)

:: Check if frontend is accessible
curl -s http://localhost:5173 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Frontend server is accessible
) else (
    echo ⚠️  Frontend server not accessible
)

echo.
echo 🔧 Port status check...

:: Check port 5000
netstat -an | findstr :5000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Port 5000 is in use (Backend)
) else (
    echo ⚠️  Port 5000 is free
)

:: Check port 5173
netstat -an | findstr :5173 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Port 5173 is in use (Frontend)
) else (
    echo ⚠️  Port 5173 is free
)

echo.
echo 📊 System Summary:
echo ================

:: Count issues
set issues=0
node --version >nul 2>&1 || set /a issues+=1
npm --version >nul 2>&1 || set /a issues+=1
if not exist "server\package.json" set /a issues+=1
if not exist "client\package.json" set /a issues+=1

if %issues% equ 0 (
    echo 🎉 All systems operational!
    echo 🚀 Ready to run Rosellea
) else (
    echo ⚠️  Found %issues% potential issues
    echo 🔧 Please review the items marked with ❌ or ⚠️
)

echo.
echo 💡 Quick Actions:
echo - To install dependencies: npm run install:all
echo - To start application: start-rosellea.bat
echo - To clean and reset: npm run reset
echo.
pause