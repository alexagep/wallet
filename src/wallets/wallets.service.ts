import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
// Dto
import { BalanceResponseDto } from 'src/wallets/dto/get-balance-request-dto';
import { WalletTransactionDto } from 'src/wallets/dto/wallet-transaction-request-dto';
import { GetBalanceRequestDto } from 'src/wallets/dto/get-balance-response-dto';
import { TransactionResponseDto } from 'src/wallets/dto/wallet-transaction-response-dto';
// utility
import { Cron } from '@nestjs/schedule';
import { WalletsRepository } from './wallets.repository';
import { TransactionRepository } from 'src/transaction/transaction.repository';
import { DailyTransactionRepository } from 'src/dailyTransaction/dailyTransaction.repository';

@Injectable()
export class WalletsService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly walletsRepository: WalletsRepository,
    private readonly transactionRepository: TransactionRepository,
    private readonly dailyTransactionRepository: DailyTransactionRepository,
  ) {}
  async getBalance(data: GetBalanceRequestDto): Promise<BalanceResponseDto> {
    const wallet = await this.walletsRepository.findOne(data);

    if (!wallet) {
      throw new NotFoundException(
        `wallet for user with userId: ${data.user_id} not found`,
      );
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
    let transaction: { id: string };

    // Start a transaction
    await this.prisma.$transaction(async (trxPrisma) => {
      // Update the wallet balance
      const wallet = await this.walletsRepository.update(
        user_id,
        amount,
        trxPrisma,
      );

      // Insert the transaction record
      transaction = await this.transactionRepository.create(
        user_id,
        amount,
        wallet.id,
        trxPrisma,
      );
    });

    // Return the reference ID
    return { reference_id: transaction.id };
  }

  @Cron('0 59 23 * * *')
  async calculateTotalTransactions() {
    try {
      const today = new Date();

      const startOfDay = new Date(today);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(today);
      endOfDay.setHours(23, 59, 59, 999);

      await this.prisma.$transaction(async (trxPrisma) => {
        const transactions = await this.transactionRepository.findMany(
          startOfDay,
          endOfDay,
          trxPrisma,
        );

        const totalTransactions = transactions.reduce(
          (sum: number, trx: { amount: any }) => sum + trx.amount,
          0,
        );

        transactions.map(async (transaction: { wallet_id: number; }) => {
          await this.dailyTransactionRepository.create(
            transaction.wallet_id,
            totalTransactions,
            trxPrisma,
          );
        });
      });

      console.log('Daily transaction total inserted successfully.');
    } catch (error) {
      console.error('Error calculating daily transactions:', error);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

