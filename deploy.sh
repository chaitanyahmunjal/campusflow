#!/bin/bash

# CampusFlow Cloud Deployment Helper Script
# This script helps you deploy to Railway + Vercel

set -e

echo "🚀 CampusFlow Cloud Deployment Helper"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}📦 Initializing Git repository...${NC}"
    git init
    git add .
    git commit -m "Initial commit - CampusFlow deployment"
fi

# Check if GitHub remote is configured
if ! git remote | grep -q "origin"; then
    echo -e "${YELLOW}🔗 Please add your GitHub repository:${NC}"
    echo "   1. Create a new repo on GitHub"
    echo "   2. Run: git remote add origin <your-repo-url>"
    echo ""
    read -p "Enter your GitHub repo URL: " REPO_URL
    git remote add origin $REPO_URL
fi

echo ""
echo -e "${GREEN}✅ Git repository ready${NC}"
echo ""

# Install CLI tools
echo -e "${YELLOW}📦 Installing deployment tools...${NC}"
bun install -g @railway/cli vercel 2>/dev/null || npm install -g @railway/cli vercel

echo ""
echo "=========================================="
echo "📋 DEPLOYMENT CHECKLIST"
echo "=========================================="
echo ""
echo "Step 1: Backend to Railway"
echo "  ☐ Go to https://railway.app and sign in"
echo "  ☐ Click 'New Project' → 'Deploy from GitHub'"
echo "  ☐ Select your campusflow repository"
echo "  ☐ Add environment variables (see DEPLOY_TO_CLOUD.md)"
echo "  ☐ Run: railway run -- bun prisma migrate deploy"
echo "  ☐ Run: railway run -- bun run seed"
echo ""
echo "Step 2: Frontend to Vercel"
echo "  ☐ Go to https://vercel.com and sign in"
echo "  ☐ Click 'Add New' → 'Project'"
echo "  ☐ Import your GitHub repository"
echo "  ☐ Add API_URL environment variable"
echo "  ☐ Click Deploy"
echo ""
echo "Step 3: Update CORS"
echo "  ☐ Copy your Vercel URL"
echo "  ☐ Add CORS_ORIGIN to Railway with your Vercel URL"
echo ""
echo "=========================================="
echo ""

# Prompt for deployment
read -p "Do you want to deploy backend to Railway now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}🚀 Deploying backend to Railway...${NC}"
    cd backend
    railway up
    echo -e "${GREEN}✅ Backend deployed!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Add environment variables in Railway dashboard"
    echo "2. Run: railway run -- bun prisma migrate deploy"
    echo "3. Run: railway run -- bun run seed"
fi

echo ""
read -p "Do you want to deploy frontend to Vercel now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}🚀 Deploying frontend to Vercel...${NC}"
    cd ../frontend
    vercel --prod
    echo -e "${GREEN}✅ Frontend deployed!${NC}"
fi

echo ""
echo "=========================================="
echo "🎉 Deployment Complete!"
echo "=========================================="
echo ""
echo "📖 For detailed instructions, see: DEPLOY_TO_CLOUD.md"
echo ""