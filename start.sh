#!/bin/bash

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

if ! command_exists npm; then
  echo "npm is not installed. Please install Node.js and npm first."
  exit 1
fi

echo "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
  echo "npm install failed. Please check your package.json and try again."
  exit 1
fi

echo "Starting the Angular application..."
npx ng serve &

sleep 7

if command_exists xdg-open; then
  xdg-open http://localhost:4200
elif command_exists open; then
  open http://localhost:4200
else
  echo "Unable to open browser automatically. Please open http://localhost:4200 in your browser."
fi

wait
