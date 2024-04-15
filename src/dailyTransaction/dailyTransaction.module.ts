import { Module } from '@nestjs/common';
import { DailyTransactionRepository } from './dailyTransaction.repository';

@Module({
  providers: [DailyTransactionRepository],
})
export class DailyTransactionModule {}
