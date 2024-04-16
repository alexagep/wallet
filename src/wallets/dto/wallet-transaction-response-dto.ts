import { ApiProperty } from '@nestjs/swagger';

export class TransactionResponseDto {
  @ApiProperty({
    description: 'Message indicating the success or failure of the transaction',
    example: 'Transaction successful',
  })
  reference_id: string;
}
