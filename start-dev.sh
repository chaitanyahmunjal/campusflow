#!/bin/bash

# CampusFlow Development Startup Script
# This script initializes and starts all development services

set -e

echo "🚀 Starting CampusFlow Development Environment"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is running
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if bun is installed
if ! command -v bun &> /dev/null; then
    echo -e "${RED}❌ Bun is not installed. Please install Bun first.${NC}"
    exit 1
fi

# Function to check if a port is in use
is_port_in_use() {
    lsof -i :$1 > /dev/null 2>&1
    return $?
}

# Kill processes on required ports if running
echo -e "${YELLOW}📋 Checking for existing processes...${NC}"
for port in 3000 8081 5432 6379 5555; do
    if is_port_in_use $port; then
        echo "   Killing process on port $port"
        lsof -ti:$port | xargs kill -9 2>/dev/null || true
    fi
done

# Start Docker containers
echo -e "${YELLOW}🐳 Starting Docker containers (PostgreSQL & Redis)...${NC}"
docker-compose up -d

# Wait for PostgreSQL to be ready
echo -e "${YELLOW}⏳ Waiting for PostgreSQL to be ready...${NC}"
sleep 5

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
cd backend
bun install
cd ../frontend
bun install
cd ..

# Generate Prisma client
echo -e "${YELLOW}🔧 Generating Prisma client...${NC}"
cd backend
bunx prisma generate
cd ..

# Run database migrations
echo -e "${YELLOW}🗄️  Running database migrations...${NC}"
cd backend
bunx prisma migrate dev --name init
cd ..

# Start services
echo -e "${GREEN}✅ All services ready! Starting development servers...${NC}"
echo ""
echo "=============================================="
echo "📊 Service URLs:"
echo "   - Backend API:     http://localhost:3000"
echo "   - API Docs:        http://localhost:3000/api/docs"
echo "   - Frontend Web:    http://localhost:8081"
echo "   - Prisma Studio:   http://localhost:5555"
echo "   - PostgreSQL:      localhost:5432"
echo "   - Redis:           localhost:6379"
echo "=============================================="
echo ""

# Start backend in background
echo -e "${YELLOW}🚀 Starting Backend API...${NC}"
cd backend
bun run start:dev &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Start frontend
echo -e "${YELLOW}🚀 Starting Frontend (Expo Web)...${NC}"
cd frontend
bun run web --port 8081
cd ..

# Wait for processes
wait $BACKEND_PID