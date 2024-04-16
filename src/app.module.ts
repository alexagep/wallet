import { Module } from '@nestjs/common';
import { WalletsModule } from './wallets/wallets.module';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from 'nestjs-prisma';
import { ConfigModule } from '@nestjs/config';
import { PrismaConfigService } from './config/database.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BenchmarkInterceptor } from './wallets/interceptor/transaction-logging.interceptor';
import { checkDatabaseConnection } from './health/prisma.health';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useClass: PrismaConfigService,
    }),
    ScheduleModule.forRoot(),
    WalletsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: BenchmarkInterceptor,
    },
    checkDatabaseConnection,
  ],
})
export class AppModule {}
