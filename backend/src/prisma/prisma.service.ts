import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    const maxRetries = 5;
    let retries = 0;
  
    while (retries < maxRetries) {
      try {
        await this.$connect();
        console.log('✅ Database connected successfully');
        return;
      } catch (error) {
        retries++;
        console.error(`Database connection attempt ${retries} failed:`, error.message);
      
        if (retries === maxRetries) {
          console.error('❌ All database connection attempts failed. Exiting...');
          throw error;
        }
      
        const delay = Math.pow(2, retries) * 1000; // Exponential backoff
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
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
