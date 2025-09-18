
import { Schema } from "mongoose";
import { IWalletModel } from "../models/wallet.model";


export const walletSchema = new Schema<IWalletModel>(
    {
        balance:{type:Number,default:0},

        userId:{type:String,requird:true},

        userType:{type:String,enum:["client","vendor"],required:true},

        walletId:{type:String,required:true}
    },

    {
        timestamps:true
    }
)