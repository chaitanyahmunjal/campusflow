import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async health() {
    const isHealthy = await this.prisma.isHealthy();
    return {
      status: isHealthy ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
    };
  }
}
