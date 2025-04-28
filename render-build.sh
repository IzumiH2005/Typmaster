#!/usr/bin/env bash
# Exit on error
set -o errexit

# Build the application
npm run build

# Ensure output directory exists
mkdir -p dist/public

# Copy server.js to dist for deployment
cp server.js dist/

# Copy test page to public directory
cp test.html dist/public/

# Log the directory structure to debug
echo "Directory structure:"
find dist -type f | sort