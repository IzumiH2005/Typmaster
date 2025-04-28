#!/usr/bin/env bash

# Build the application
npm run build

# Make sure the _redirects file exists
echo "/* /index.html 200" > dist/public/_redirects

# Exit with success
exit 0