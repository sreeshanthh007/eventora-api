import { IWalletEntity } from "@entities/models/wallet.entity"
import { TransactionDTO } from "@shared/dtos/wallet.dto"



export interface walletDetails {
    balance:number
    walletId:string
    userType:string
    userId:string
}
export interface IWalletRepository {
    createWallet(walletDetails:walletDetails) : Promise<void>
    findWallet(userId:string) : Promise<IWalletEntity | null>
    findWalletDetailsByUserId(userId:string,type:string,skip:number,limit:number) : Promise<{wallet:IWalletEntity | null; total:number}>
    findWalletByUserTypeAndUpdate(userType:string,transaction:TransactionDTO,amount:number) : Promise<void>
     findWalletByUserIdAndUpdate(userId:string,transaction:TransactionDTO,amount:number) : Promise<void>
     transfer(fromUserId:string,toUserId:string,amount:number,adminTransaction:TransactionDTO,vendorTransaction:TransactionDTO) : Promise<void>
}