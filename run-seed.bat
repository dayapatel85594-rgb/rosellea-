@echo off
echo 🌹 Starting Rosellea Database Seeding...
echo.

cd server
npm install
node scripts/seed.js

echo.
echo ✅ Seeding completed!
pause
