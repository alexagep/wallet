import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
// import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class TransactionRepository {
  async create(
    user_id: string,
    amount: number,
    wallet_id: string,
    trxPrisma: Prisma.TransactionClient,
  ) {
    const wallet = await trxPrisma.transaction.create({
      data: {
        userId: user_id,
        amount,
        wallet_id,
      },
      select: { id: true },
    });

    return wallet;
  }

  async findMany(
    startOfDay: Date,
    endOfDay: Date,
    prismaTrx: Prisma.TransactionClient,
  ) {
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
