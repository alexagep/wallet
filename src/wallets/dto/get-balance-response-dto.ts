import { ApiProperty } from '@nestjs/swagger';

import { IsUUID, Validate } from 'class-validator';
import { CheckWalletExistence } from '../constraint/check-user-is-exist';

export class GetBalanceRequestDto {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @IsUUID()
  @Validate(CheckWalletExistence)
  user_id: string;
}
