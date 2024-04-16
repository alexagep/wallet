import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class DailyTransactionRepository {
  async create(
    wallet_id: string,
    totalTransactions: number,
    trxPrisma: Prisma.TransactionClient,
  ) {
    const dailyTrx = await trxPrisma.dailyTransaction.create({
      data: {
        wallet_id,
        totalTransactions,
      },
    });

    return dailyTrx;
  }
}
