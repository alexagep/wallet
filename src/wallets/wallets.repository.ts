import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { GetBalanceRequestDto } from './dto/get-balance-response-dto';

@Injectable()
export class WalletsRepository {
  constructor(private readonly db: PrismaService) {}

  async findOne(data: GetBalanceRequestDto) {
    const wallet = await this.db.wallet.findUnique({
      where: { userId: data.user_id },
    });

    console.log(wallet, data.user_id);

    return wallet;
  }

  async update(
    user_id: string,
    amount: number,
    trxPrisma: Prisma.TransactionClient,
  ) {
    const wallet = await trxPrisma.wallet.update({
      where: { userId: user_id },
      data: { balance: { increment: amount } },
      select: { id: true, balance: true },
    });

    return wallet;
  }
}
