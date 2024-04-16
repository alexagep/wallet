import { Injectable } from '@nestjs/common';
import { PrismaOptionsFactory, PrismaServiceOptions } from 'nestjs-prisma';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaConfigService implements PrismaOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createPrismaOptions(): PrismaServiceOptions | Promise<PrismaServiceOptions> {
    return {
      prismaOptions: {
        log: ['error'],
        datasources: {
          db: {
            url: this.configService.get('DATABASE_URL'),
          },
        },
      },
      explicitConnect: true,
    };
  }
}
