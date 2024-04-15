import { Injectable } from '@nestjs/common';

@Injectable()
export class DailyTransactionRepository {
  async create(
    totalTransactions: number,
    transaction: { wallet_id: string },
    trxPrisma: any,
  ) {
    const dailyTrx = await trxPrisma.dailyTransaction.create({
      data: {
        wallet_id: transaction.wallet_id,
        totalTransactions,
      },
    });

    return dailyTrx;
  }
}
