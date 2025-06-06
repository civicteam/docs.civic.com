#!/bin/bash

# Script to check links locally using Lychee
# Install lychee first: https://github.com/lycheeverse/lychee#installation

set -e

echo "🔍 Checking links in documentation..."

# Check if lychee is installed
if ! command -v lychee &> /dev/null; then
    echo "❌ Lychee is not installed."
    echo "Install it using one of these methods:"
    echo "  - Homebrew: brew install lychee"
    echo "  - Cargo: cargo install lychee"
    echo "  - Download from: https://github.com/lycheeverse/lychee/releases"
    exit 1
fi

# Run lychee with configuration
lychee \
  --config lychee.toml \
  --format markdown \
  --output lychee-report.md \
  './**/*.md' './**/*.mdx'

# Check exit code
if [ $? -eq 0 ]; then
    echo "✅ All links are valid!"
else
    echo "❌ Broken links found. Check lychee-report.md for details."
    exit 1
fi