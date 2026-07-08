import { Controller, Get, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { DatabaseSeedService } from './database-seed.service';
import { PrismaService } from './prisma.service';

@Controller('database')
export class DatabaseAdminController {
  constructor(
    private prisma: PrismaService,
    private seedService: DatabaseSeedService,
  ) {}

  @Get('info')
  @HttpCode(HttpStatus.OK)
  async getDatabaseInfo() {
    const stats = await this.prisma.getStats();
    const seedStatus = await this.seedService.getSeedStatus();

    return {
      ...stats,
      seedStatus,
      version: '1.0.0',
      provider: 'PostgreSQL',
    };
  }

  @Post('seed')
  @HttpCode(HttpStatus.CREATED)
  async runSeed() {
    return this.seedService.seedDemoData();
  }

  @Post('reset')
  @HttpCode(HttpStatus.OK)
  async resetDatabase() {
    return this.seedService.resetDatabase();
  }

  @Get('tables')
  @HttpCode(HttpStatus.OK)
  async listTables() {
    const tables = [
      'tenants',
      'users',
      'colleges',
      'program_categories',
      'courses',
      'specializations',
      'batches',
      'divisions',
      'units',
      'unit_wallets',
      'events',
      'participations',
      'notifications',
      'audit_logs',
    ];

    const tableStats = await Promise.all(
      tables.map(async (table) => {
        const query = `SELECT COUNT(*) as count FROM "${table}"`;
        const result: any = await this.prisma.$queryRawUnsafe(query);
        return {
          name: table,
          count: parseInt(result[0].count, 10),
        };
      }),
    );

    return {
      tables: tableStats,
      totalTables: tables.length,
    };
  }

  @Get('connections')
  @HttpCode(HttpStatus.OK)
  async getConnectionInfo() {
    const result: any = await this.prisma.$queryRawUnsafe(
      'SELECT COUNT(*) as count FROM users');

    return {
      activeConnections: result[0].active_connections,
      maxConnections: parseInt(result[0].max_connections, 10),
      availableConnections: parseInt(result[0].max_connections, 10) - result[0].active_connections,
    };
  }
}
