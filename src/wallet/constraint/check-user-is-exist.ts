import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { WalletRepository } from '../wallet.repository';
import { GetBalanceRequestDto } from '../dto/get-balance-response-dto';


@Injectable()
export class UserExistsPipe implements PipeTransform {
  constructor(private readonly walletRepository: WalletRepository) {}

  async transform(value: GetBalanceRequestDto) {
    const userId = value.user_id;
    const userExists = await this.walletRepository.userExists(userId);
    if (!userExists) {
      throw new BadRequestException('User not found');
    }
    return userId; // Returning the user_id after validation
  }
}


