import { ObjectId } from "mongoose"



export interface IWalletEntity{

    balance:number
    userId:ObjectId | string
    userType:string
    walletId:string
}