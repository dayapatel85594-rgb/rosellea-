#!/bin/bash

echo "========================================"
echo "   🌹 Starting Rosellea Application 🌹"
echo "   Boutique Elegance Redefined"
echo "========================================"
echo

echo "📦 Installing dependencies..."

echo "Installing server dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install server dependencies"
    exit 1
fi

echo "Installing client dependencies..."
cd ../client
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install client dependencies"
    exit 1
fi

echo
echo "🚀 Starting servers..."

echo "Starting backend server..."
cd ../server
npm start &
SERVER_PID=$!

echo "Waiting for backend to initialize..."
sleep 5

echo "Starting frontend development server..."
cd ../client
npm run dev &
CLIENT_PID=$!

echo
echo "✨ Rosellea is running!"
echo
echo "🌐 Frontend: http://localhost:5173"
echo "🔧 Backend API: http://localhost:5000"
echo "💖 Health Check: http://localhost:5000/api/health"
echo
echo "Press Ctrl+C to stop all servers"

# Wait for user interrupt
trap "echo 'Stopping servers...'; kill $SERVER_PID $CLIENT_PID; exit" INT
wait