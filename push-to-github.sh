#!/bin/bash

# Push to GitHub Script
# Usage: ./push-to-github.sh
# You'll need either:
# 1. GitHub CLI authenticated (gh auth login)
# 2. Or a Personal Access Token set as GH_TOKEN env variable

echo "🚀 Pushing CleanAgent Australia to GitHub..."
echo ""

cd /root/portfolio-website

# Check if gh CLI is authenticated
if gh auth status 2>/dev/null; then
    echo "✅ GitHub CLI authenticated"
    gh repo create navyapdh11/portfolio-website --public --source=. --push --remote origin 2>/dev/null || \
    git push -u origin main
    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 Repository: https://github.com/navyapdh11/portfolio-website"
else
    echo "⚠️  GitHub CLI not authenticated."
    echo ""
    echo "Choose one of these options:"
    echo ""
    echo "Option 1: Use GitHub CLI (Recommended)"
    echo "  gh auth login"
    echo "  Then run this script again"
    echo ""
    echo "Option 2: Use Personal Access Token"
    echo "  git push -u origin main"
    echo "  (Enter your GitHub username and token when prompted)"
    echo ""
    echo "Option 3: Set token as environment variable"
    echo "  export GH_TOKEN=your_token_here"
    echo "  Then run: gh repo create navyapdh11/portfolio-website --public --source=. --push"
    echo ""
fi
