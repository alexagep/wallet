import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { WalletRepository } from './wallet.repository';
import { UserExistsPipe } from './constraint/check-user-is-exist';

@Module({
  controllers: [WalletController],
  providers: [WalletService, WalletRepository, UserExistsPipe]
})
export class WalletModule {}
