#!/bin/bash

echo "🚀 DEPLOY ACHZOD AUDIT PLATFORM TO RENDER"
echo ""

# Check if gh CLI is installed
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI detected"
    echo ""

    # Check if authenticated
    if gh auth status &> /dev/null; then
        echo "✅ GitHub authenticated"
        echo ""

        # Create repo and push
        echo "📦 Creating GitHub repo and pushing..."
        gh repo create achzod-audit-platform --private --source=. --push

        echo ""
        echo "✅ Code pushed to GitHub!"
        echo ""
    else
        echo "⚠️  Not authenticated with GitHub"
        echo "Run: gh auth login"
        exit 1
    fi
else
    echo "⚠️  GitHub CLI not installed"
    echo ""
    echo "Option 1: Install gh CLI"
    echo "  brew install gh"
    echo "  gh auth login"
    echo "  ./deploy.sh"
    echo ""
    echo "Option 2: Manual deployment"
    echo "  1. Create repo on https://github.com/new"
    echo "  2. git remote add origin <your-repo-url>"
    echo "  3. git push -u origin main"
    echo ""
    exit 1
fi

echo "📋 NEXT STEPS:"
echo ""
echo "1. Go to https://dashboard.render.com"
echo ""
echo "2. Create PostgreSQL Database:"
echo "   - New → PostgreSQL"
echo "   - Name: achzod-audit-db"
echo "   - Database: achzod_audits"
echo "   - Plan: Free"
echo "   - Copy the Internal Database URL"
echo ""
echo "3. Create Web Service:"
echo "   - New → Web Service"
echo "   - Connect your GitHub repo: achzod-audit-platform"
echo "   - Name: achzod-audit-platform"
echo "   - Build Command: npm install && npx prisma generate && npm run build"
echo "   - Start Command: npm start"
echo "   - Add Environment Variables:"
echo "     DATABASE_URL=<your-postgres-internal-url>"
echo "     ANTHROPIC_API_KEY=<your-claude-api-key>"
echo "     STRIPE_SECRET_KEY=<your-stripe-key>"
echo "     NEXT_PUBLIC_APP_URL=https://achzod-audit-platform.onrender.com"
echo ""
echo "4. Deploy!"
echo ""
echo "📖 Full guide: DEPLOY_RENDER.md"
echo ""
echo "🎉 Your app will be live at:"
echo "   https://achzod-audit-platform.onrender.com"
