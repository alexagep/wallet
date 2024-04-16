import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { WalletsRepository } from './wallets.repository';
import { TransactionModule } from 'src/wallets/domain/transaction/transaction.module';
import { DailyTransactionModule } from 'src/wallets/domain/dailyTransaction/dailyTransaction.module';
import { GrpcWalletController } from './grpc-wallet.controller';

@Module({
  imports: [DailyTransactionModule, TransactionModule],
  providers: [WalletsService, WalletsRepository],
  controllers: [WalletsController, GrpcWalletController],
})
export class WalletsModule {}
