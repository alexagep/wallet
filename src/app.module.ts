import { Module } from '@nestjs/common';
// import { WalletsModule } from './wallets/wallets.module';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaClientExceptionFilter, PrismaModule } from 'nestjs-prisma';
import { ConfigModule } from '@nestjs/config';
import { PrismaConfigService } from './config/database.config';
import { APP_FILTER } from '@nestjs/core';
import { WalletsModule } from './wallets/wallets.module';

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
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter,
    },
  ],
})
export class AppModule {}
