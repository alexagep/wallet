import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
// swagger
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
// service
import { WalletsService } from 'src/wallets/wallets.service';
// Dto
import { BalanceResponseDto } from 'src/wallets/dto/get-balance-request-dto';
import { GetBalanceRequestDto } from 'src/wallets/dto/get-balance-response-dto';
import { WalletTransactionDto } from 'src/wallets/dto/wallet-transaction-request-dto';
import { TransactionResponseDto } from 'src/wallets/dto/wallet-transaction-response-dto';

@ApiTags('Wallet')
@Controller('wallet')
export class WalletsController {
  constructor(private walletsService: WalletsService) {}

  @ApiCreatedResponse({
    type: GetBalanceRequestDto,
    description: 'return the current balance of a user',
  })
  @Get(':user_id/balance')
  async getBalance(
    @Param() params: GetBalanceRequestDto,
  ): Promise<BalanceResponseDto> {
    const balance = await this.walletsService.getBalance(params);
    return balance;
  }

  @ApiCreatedResponse({
    type: WalletTransactionDto,
    description: "allow adding or subtracting money from a user's wallet",
  })
  @ApiNotFoundResponse()
  @Post(':user_id/money')
  async updateBalance(
    @Param() params: GetBalanceRequestDto,
    @Body() body: WalletTransactionDto,
  ): Promise<TransactionResponseDto> {
    const result = await this.walletsService.addOrSubtractMoney(params, body);
    return result;
  }
}
