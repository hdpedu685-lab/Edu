#!/bin/bash

# Script to resolve @convex-dev/auth peer dependency conflicts

echo "Updating pnpm.overrides in package.json..."

# Use jq or sed to update package.json
# Since jq might not be available, use sed or node to edit

# For simplicity, since we have the tool, but in script, assume jq is available or use node

# But to make it simple, the script can use node to edit json

cat > update_package.js << 'EOF'
const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

if (!packageJson.pnpm) packageJson.pnpm = {};
if (!packageJson.pnpm.overrides) packageJson.pnpm.overrides = {};

packageJson.pnpm.overrides['@simplewebauthn/browser'] = '9.0.1';
packageJson.pnpm.overrides['@simplewebauthn/server'] = '9.0.3';
packageJson.pnpm.overrides['@auth/core'] = '^0.37.0';
packageJson.pnpm.overrides['react'] = '^19.0.0';
packageJson.pnpm.overrides['react-dom'] = '^19.0.0';

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
console.log('package.json updated with new overrides');
EOF

node update_package.js

echo "Force-installing @convex-dev/auth..."
pnpm install --force @convex-dev/auth

echo "Clearing Turbopack cache..."
rm -rf .next

echo "Done! Try running pnpm dev again."