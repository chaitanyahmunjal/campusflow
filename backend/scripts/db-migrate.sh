#!/bin/bash

# Database Migrations Helper Script
# ==================================
# This script helps you manage database migrations for CampusFlow

set -e

echo "🗄️  CampusFlow Database Migration Tool"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ .env file not found!${NC}"
    echo "   Please create .env file with DATABASE_URL"
    exit 1
fi

# Load environment variables
source .env

echo -e "${BLUE}Database: ${DATABASE_URL}${NC}"
echo ""

# Function to show menu
show_menu() {
    echo "Select an option:"
    echo "  1) Generate new migration"
    echo "  2) Run pending migrations"
    echo "  3) Reset database (⚠️  DELETES ALL DATA)"
    echo "  4) Seed database with demo data"
    echo "  5) Check migration status"
    echo "  6) Open Prisma Studio"
    echo "  7) Exit"
    echo ""
}

# Main loop
while true; do
    show_menu
    read -p "Enter choice (1-7): " choice

    case $choice in
        1)
            echo ""
            echo -e "${BLUE}📝 Generating new migration...${NC}"
            read -p "Enter migration name: " migration_name
            bun prisma migrate dev --name "$migration_name"
            echo -e "${GREEN}✅ Migration created!${NC}"
            ;;
        2)
            echo ""
            echo -e "${BLUE}🔄 Running pending migrations...${NC}"
            bun prisma migrate deploy
            echo -e "${GREEN}✅ Migrations applied!${NC}"
            ;;
        3)
            echo ""
            echo -e "${RED}⚠️  WARNING: This will DELETE ALL DATA!${NC}"
            read -p "Are you sure? Type 'yes' to confirm: " confirm
            if [ "$confirm" = "yes" ]; then
                bun prisma migrate reset --force
                echo -e "${GREEN}✅ Database reset complete!${NC}"
            else
                echo -e "${YELLOW}❌ Cancelled${NC}"
            fi
            ;;
        4)
            echo ""
            echo -e "${BLUE}🌱 Seeding database...${NC}"
            bun run seed
            echo -e "${GREEN}✅ Database seeded!${NC}"
            ;;
        5)
            echo ""
            echo -e "${BLUE}📊 Checking migration status...${NC}"
            bun prisma migrate status
            ;;
        6)
            echo ""
            echo -e "${BLUE}🔧 Opening Prisma Studio...${NC}"
            bun prisma studio
            ;;
        7)
            echo ""
            echo -e "${GREEN}👋 Goodbye!${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}❌ Invalid option${NC}"
            ;;
    esac

    echo ""
    echo "Press Enter to continue..."
    read
done