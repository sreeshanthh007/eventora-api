import { IWalletEntity } from "@entities/models/wallet.entity";
import { IWalletRepository, walletDetails } from "@entities/repositoryInterfaces/wallet/wallet.repository.interface";
import { walletModel } from "@frameworks/database/Mongodb/models/wallet.model";
import { TransactionDTO } from "@shared/dtos/wallet.dto";


export class WalletRepository implements IWalletRepository{
    
   async createWallet(walletDetails: walletDetails): Promise<void> {
       
        await walletModel.create(walletDetails)
   }


   async findWalletDetailsByUserId(userId: string): Promise<IWalletEntity | null> {
       return await walletModel.findOne({userId})
   }

  async findWalletByUserTypeAndUpdate(userType: string, transaction: TransactionDTO, amount: number): Promise<void> {
      await walletModel.findOneAndUpdate(
        {userType:userType},
        {$push:{transactions:transaction},$inc:{balance:amount}},
      )
  }

  async findWalletByUserIdAndUpdate(userId: string, transaction: TransactionDTO, amount: number): Promise<void> {
      await walletModel.findOneAndUpdate(
          {userId:userId},
          {$push:{transactions:transaction},$inc:{balance:amount}}
      )
  }

   

}