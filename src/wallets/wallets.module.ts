import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { WalletsRepository } from './wallets.repository';
import { TransactionModule } from 'src/transaction/transaction.module';
import { DailyTransactionModule } from 'src/dailyTransaction/dailyTransaction.module';
// import { DailyTransactionRepository } from 'src/dailyTransaction/dailyTransaction.repository';
// import { TransactionRepository } from 'src/transaction/transaction.repository';

@Module({
  imports: [],
  providers: [
    WalletsService,
    WalletsRepository,
  ],
  controllers: [WalletsController],
})
export class WalletsModule {}
