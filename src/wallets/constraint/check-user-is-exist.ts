import { PipeTransform, BadRequestException } from '@nestjs/common';
import { WalletRepository } from '../wallets.repository';

// @(async: true, name: "CheckWalletExist")
// export class CheckWalletExist implements PipeTransform {
//   constructor(private readonly walletRepository: WalletRepository) {}

//   async validate(user_id: string) {
//     const userExists = await this.walletRepository.userExists(user_id);
//     if (!userExists) {
//       throw new BadRequestException(`wallet for user with userId: ${user_id} not found`);
//     }
//     return true; // Returning the user_id after validation
//   }
// }


