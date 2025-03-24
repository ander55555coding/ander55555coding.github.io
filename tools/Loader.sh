#!/bin/bash
echo "Installing npm packages..."
npm install

echo "Running first JavaScript file..."
node tools/CreateGameFiles.js

echo "Running second JavaScript file..."
node tools/ConvertJson.js

echo "Deleting node_modules..."
rm -rf node_modules

echo "Done!"