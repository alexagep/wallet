import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class WalletRepository {
  constructor(private prisma: PrismaClient) {}

  async userExists(userId: string): Promise<boolean> {
    const user = await this.prisma.wallet.findUnique({
      where: { user_id: userId },
      select: { user_id: true },
    });
    return !!user;
  }

  // Add more repository methods for other wallet-related queries as needed
}
