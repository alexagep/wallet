import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
// Dto
import { BalanceResponseDto } from 'src/wallet/dto/get-balance-request-dto';
import { WalletTransactionDto } from 'src/wallet/dto/wallet-transaction-request-dto';
import { GetBalanceRequestDto } from 'src/wallet/dto/get-balance-response-dto';
import { TransactionResponseDto } from 'src/wallet/dto/wallet-transaction-response-dto';
// utility
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class WalletService {
  constructor(private readonly prisma: PrismaClient) {}
  async getBalance(data: GetBalanceRequestDto): Promise<BalanceResponseDto> {
    const wallet = await this.prisma.wallet.findUnique({
      where: { user_id: data.user_id },
    });
  
    if (!wallet) {
      throw new NotFoundException(`wallet for user with userId: ${data.user_id} not found`);
    }
  
    return { balance: wallet.balance };
  }

  async addOrSubtractMoney(
    query: GetBalanceRequestDto,
    body: WalletTransactionDto,
  ): Promise<TransactionResponseDto> {
    const { user_id } = query,
      { amount } = body;
    // Generate a reference ID for the transaction
    const reference_id = uuidv4();

    // Start a transaction
    await this.prisma.$transaction(async (prisma) => {
      // Find the wallet for the user
      const wallet = await prisma.wallet.findUnique({
        where: { user_id },
        select: { id: true, balance: true },
      });

      if (!wallet) {
        throw new Error(`wallet for user with userId: ${user_id} not found`);
      }

      // Update the wallet balance
      await prisma.wallet.update({
        where: { id: wallet.id },
        data: { balance: { increment: amount } },
      });

      // Insert the transaction record
      await prisma.transaction.create({
        data: {
          user_id,
          reference_id,
          amount,
          wallet_id: wallet.id,
        },
      });
    });

    // Return the reference ID
    return { reference_id };
  }
}
