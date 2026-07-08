"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function bootstrap() {
    try {
        await prisma.$connect();
        console.log('✅ Database connection successful');
        console.log('📝 Run seed script separately: bun run seed');
    }
    catch (error) {
        console.error('❌ Database initialization failed:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
bootstrap();
//# sourceMappingURL=index.js.map