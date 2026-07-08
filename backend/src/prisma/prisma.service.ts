import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
    console.log('✅ Database connected successfully');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Database disconnected');
  }

  async isHealthy(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }

  async getStats() {
    try {
      const [
        userCount,
        eventCount,
        unitCount,
        participationCount,
      ] = await Promise.all([
        this.user.count(),
        this.event.count(),
        this.unit.count(),
        this.participation.count(),
      ]);

      return {
        connected: true,
        statistics: {
          users: userCount,
          events: eventCount,
          units: unitCount,
          participations: participationCount,
        },
      };
    } catch (error) {
      return {
        connected: false,
        error: error.message,
      };
    }
  }
}
