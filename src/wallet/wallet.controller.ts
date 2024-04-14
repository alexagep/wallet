import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
// swagger
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
// service
import { WalletService } from 'src/wallet/wallet.service';
// Dto
import { BalanceResponseDto } from 'src/wallet/dto/get-balance-request-dto';
import { GetBalanceRequestDto } from 'src/wallet/dto/get-balance-response-dto';
import { WalletTransactionDto } from 'src/wallet/dto/wallet-transaction-request-dto';
import { TransactionResponseDto } from 'src/wallet/dto/wallet-transaction-response-dto';

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @ApiCreatedResponse({
    type: GetBalanceRequestDto,
    description: 'return the current balance of a user',
  })
  @Get('balance')
  async getBalance(
    @Query('user_id') user_id: GetBalanceRequestDto,
  ): Promise<BalanceResponseDto> {
    const balance = await this.walletService.getBalance(user_id);
    return balance;
  }

  @ApiCreatedResponse({
    type: WalletTransactionDto,
    description: "allow adding or subtracting money from a user's wallet",
  })
  @ApiNotFoundResponse()
  @Post('money')
  async updateBalance(
    @Query('user_id') user_id: GetBalanceRequestDto,
    @Body() body: WalletTransactionDto,
  ): Promise<TransactionResponseDto> {
    const result = await this.walletService.addOrSubtractMoney(user_id, body);
    return result;
  }
}
