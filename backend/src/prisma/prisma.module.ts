import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaHealthController } from './prisma-health.controller';
import { DatabaseAdminController } from './database-admin.controller';
import { DatabaseSeedService } from './database-seed.service';

@Global()
@Module({
  providers: [PrismaService, DatabaseSeedService],
  exports: [PrismaService, DatabaseSeedService],
  controllers: [PrismaHealthController, DatabaseAdminController],
})
export class PrismaModule {}