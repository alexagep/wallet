import { Module } from '@nestjs/common';
import { DailyTransactionRepository } from './dailyTransaction.repository';

@Module({
  providers: [DailyTransactionRepository],
  exports: [DailyTransactionRepository],
})
export class DailyTransactionModule {}
