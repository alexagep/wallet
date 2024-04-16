import { ApiProperty } from '@nestjs/swagger';

export class BalanceResponseDto {
  @ApiProperty({
    description: 'The current balance of the user',
    example: 500,
  })
  balance: number;
}
