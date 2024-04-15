import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class TransactionRepository {
  async create(
    user_id: string,
    amount: number,
    wallet_id: string,
    trxPrisma: any,
  ) {
    const wallet = await trxPrisma.transaction.create({
      data: {
        user_id,
        amount,
        wallet_id,
      },
      select: { id: true },
    });

    return wallet;
  }

  async findMany(startOfDay: Date, endOfDay: Date, prismaTrx) {
    const transactions = await prismaTrx.transaction.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    return transactions;
  }
}
