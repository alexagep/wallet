import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class WalletTransactionDto {
  @ApiProperty({
    description: 'The amount of money to add or subtract from the wallet',
    example: 100,
  })
  @IsNumber()
  @IsPositive()
  amount: number;
}
