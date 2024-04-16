import { BadRequestException } from '@nestjs/common';
import { WalletsRepository } from '../wallets.repository';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true, name: 'CheckWalletExistence' })
export class CheckWalletExistence implements ValidatorConstraintInterface {
  constructor(private readonly walletRepository: WalletsRepository) {}

  async validate(user_id: string) {
    const userExists = await this.walletRepository.findOne({ user_id });
    if (!userExists) {
      throw new BadRequestException(
        `wallet for user with userId: ${user_id} not found`,
      );
    }
    return true;
  }
}
