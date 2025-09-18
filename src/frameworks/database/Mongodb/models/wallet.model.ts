import { IWalletEntity } from "@entities/models/wallet.entity";
import { model, ObjectId } from "mongoose";
import { walletSchema } from "../schemas/wallet.schema";


export interface IWalletModel extends Omit<IWalletEntity,"_id">,Document{
    _id:ObjectId
}

export const walletModel = model<IWalletModel>("Wallet",walletSchema)