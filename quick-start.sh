#!/bin/bash

# CampusFlow Quick Start with Docker
# Run this script to start everything automatically

set -e

echo "🚀 CampusFlow - Quick Start with Docker"
echo "======================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 1: Starting Docker containers...${NC}"
docker-compose up -d
echo -e "${GREEN}✅ PostgreSQL and Redis started${NC}"
echo ""

echo -e "${YELLOW}Step 2: Waiting for database to be ready...${NC}"
sleep 8

echo -e "${YELLOW}Step 3: Setting up backend...${NC}"
cd backend

echo "   Installing dependencies..."
bun install > /dev/null 2>&1

echo "   Generating Prisma client..."
bun prisma generate > /dev/null 2>&1

echo "   Running migrations..."
bun prisma migrate dev --name init > /dev/null 2>&1

echo "   Seeding database..."
bun run seed

echo -e "${GREEN}✅ Backend setup complete${NC}"
echo ""

echo -e "${YELLOW}Step 4: Starting backend server...${NC}"
echo "   Backend will start on http://localhost:3000"
echo "   API Docs: http://localhost:3000/api/docs"
echo ""
echo "   Press Ctrl+C to stop backend, then run 'bun run web' in frontend folder for the UI"
echo ""

# Start backend
bun run start:dev