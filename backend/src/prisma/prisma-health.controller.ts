import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('database')
export class PrismaHealthController {
  constructor(private prisma: PrismaService) {}

  @Get('health')
  @HttpCode(HttpStatus.OK)
  async healthCheck() {
    const isHealthy = await this.prisma.isHealthy();
    
    if (!isHealthy) {
      return {
        status: 'error',
        database: 'disconnected',
        timestamp: new Date().toISOString(),
      };
    }

    return {
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('stats')
  @HttpCode(HttpStatus.OK)
  async getStats() {
    return this.prisma.getStats();
  }

  @Get('ping')
  @HttpCode(HttpStatus.OK)
  async ping() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return {
        success: true,
        message: 'Database is reachable',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }
}