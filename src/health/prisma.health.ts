import { Injectable } from '@nestjs/common';
import { HealthIndicator } from '@nestjs/terminus';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class checkDatabaseConnection extends HealthIndicator {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  async checkDatabaseConnection(): Promise<boolean> {
    try {
      await this.prismaService.$queryRaw`SELECT 1`;
      return true; // Database connection is healthy
    } catch (error) {
      console.error('Failed to connect to the database', error);
      return false; // Database connection is not healthy
    }
  }
}
