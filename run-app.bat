@echo off
echo ========================================
echo    🌹 Starting Rosellea Application 🌹
echo    Boutique Elegance Redefined
echo ========================================

echo.
echo 📦 Installing dependencies...

echo Installing server dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install server dependencies
    pause
    exit /b 1
)

echo Installing client dependencies...
cd ..\client
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install client dependencies
    pause
    exit /b 1
)

echo.
echo 🚀 Starting servers...

echo Starting backend server...
cd ..\server
start "Rosellea Backend" cmd /k "npm start"

echo Waiting for backend to initialize...
timeout /t 5 /nobreak >nul

echo Starting frontend development server...
cd ..\client
start "Rosellea Frontend" cmd /k "npm run dev"

echo.
echo ✨ Rosellea is starting up!
echo.
echo 🌐 Frontend: http://localhost:5173
echo 🔧 Backend API: http://localhost:5000
echo 💖 Health Check: http://localhost:5000/api/health
echo.
echo Press any key to close this window...
pause >nul