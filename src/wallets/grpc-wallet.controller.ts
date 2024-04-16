import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { WalletsService } from './wallets.service';
import { WalletTransactionDto } from './dto/wallet-transaction-request-dto';
import { TransactionResponseDto } from './dto/wallet-transaction-response-dto';
import { GetBalanceRequestDto } from './dto/get-balance-response-dto';
import { BalanceResponseDto } from './dto/get-balance-request-dto';

@Controller()
export class GrpcWalletController {
  constructor(private walletsService: WalletsService) {}

  @GrpcMethod('WalletsService', 'GetBalance')
  async getBalance(data: any): Promise<BalanceResponseDto> {
    const { user_id } = data;
    const balance = await this.walletsService.getBalance(user_id);
    return balance;
  }

  @GrpcMethod('GrpcService', 'UpdateBalance')
  async updateBalance(data: {
    params: GetBalanceRequestDto;
    body: WalletTransactionDto;
  }): Promise<TransactionResponseDto> {
    const { params, body } = data;
    const result = await this.walletsService.addOrSubtractMoney(params, body);
    return result;
  }
}
