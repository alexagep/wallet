import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { GetBalanceRequestDto } from './dto/get-balance-response-dto';

@Injectable()
export class WalletsRepository {
  constructor(private prisma: PrismaClient) {}

  async userExists(userId: string): Promise<boolean> {
    const user = await this.prisma.wallet.findUnique({
      where: { user_id: userId },
      select: { user_id: true },
    });
    return !!user;
  }

  async findOne(data: GetBalanceRequestDto) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { user_id: data.user_id },
    });

    return wallet;
  }

  async update(user_id: string, amount: number, prisma) {
    const wallet = await prisma.wallet.update({
      where: { user_id },
      data: { balance: { increment: amount } },
      select: { id: true, balance: true },
    });

    return wallet;
  }
}
