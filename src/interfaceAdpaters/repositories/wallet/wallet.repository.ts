import { IWalletRepository, walletDetails } from "@entities/repositoryInterfaces/wallet/wallet.repository.interface";
import { walletModel } from "@frameworks/database/Mongodb/models/wallet.model";


export class WalletRepository implements IWalletRepository{
    
   async createWallet(walletDetails: walletDetails): Promise<void> {
       
        await walletModel.create(walletDetails)
   }
}