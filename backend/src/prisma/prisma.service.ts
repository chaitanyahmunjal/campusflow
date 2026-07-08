import { Injectable, OnModuleInit, OnModuleDestroy, HealthCheckService, HealthCheck, HealthCheckResult } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly maxRetries = 3;
  private readonly retryDelay = 1000; // 1 second

  constructor(private configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get('DATABASE_URL'),
        },
      },
      log: [
        { level: 'query', emit: 'event' },
        { level: 'error', emit: 'event' },
        { level: 'warn', emit: 'event' },
      ],
    });

    // Set connection pool settings for production
    this.$use(async (params, next) => {
      const before = Date.now();
      const result = await next(params);
      const after = Date.now();
      
      if (after - before > 1000) {
        console.warn(`Slow query detected: ${params.model}.${params.action} took ${after - before}ms`);
      }
      
      return result;
    });
  }

  async onModuleInit() {
    let retries = 0;
    
    while (retries < this.maxRetries) {
      try {
        await this.$connect();
        console.log('✅ Database connected successfully');
        
        // Enable query logging
        this.$on('query', (e) => {
          console.log(`Query: ${e.query} Params: ${e.params} Duration: ${e.duration}ms`);
        });
        
        this.$on('error', (e) => {
          console.error(`Database Error: ${e}`);
        });
        
        return;
      } catch (error) {
        retries++;
        console.error(`Database connection failed (attempt ${retries}/${this.maxRetries}):`, error.message);
        
        if (retries < this.maxRetries) {
          console.log(`Retrying in ${this.retryDelay}ms...`);
          await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        } else {
          console.error('❌ Failed to connect to database after all retries');
          throw error;
        }
      }
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Database disconnected');
  }

  /**
   * Health check for database connectivity
   */
  async isHealthy(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }

  /**
   * Get database statistics
   */
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

  /**
   * Enable/disable query logging
   */
  enableQueryLogging(enable: boolean) {
    if (enable) {
      this.$on('query', (e) => {
        console.log(`[QUERY] ${e.query} - ${e.duration}ms`);
      });
    }
  }

  /**
   * Run raw SQL query with error handling
   */
  async runQuery<T>(query: string, params?: any[]): Promise<T> {
    try {
      return await this.$queryRawUnsafe<T>(query, ...(params || []));
    } catch (error) {
      console.error(`Query failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Execute a transaction with timeout
   */
  async transaction<T>(fn: (tx: Omit<this, '$disconnect' | '$connect' | '$on' | '$use'>) => Promise<T>, timeout = 5000): Promise<T> {
    return this.$transaction(fn, { timeout });
  }
}