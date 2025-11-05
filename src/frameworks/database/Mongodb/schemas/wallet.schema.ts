
import { Schema } from "mongoose";
import { IWalletModel } from "../models/wallet.model";


export const walletSchema = new Schema<IWalletModel>(
    {
        balance:{type:Number,default:0},

        userId:{type:String,requird:true},

        userType:{type:String,enum:["client","vendor","admin"],required:true},

        walletId:{type:String,required:true},

     transactions: [{
        currency: { type: String, required: true , default:"INR" },
        paymentStatus: { type: String, enum: ["debit", "credit"], required: true },
        amount: { type: Number, required: true },
        date: { type: Date, required: true },
        paymentType: { type: String, enum: ["Refund","ticketBooking","top-up","serviceBooking","fundReleased"], required: true },
        paymentFor: {
        resourceType: { type: String, enum: ["Event", "service"], required: true },
        resourceId: { type: String, required:true }
    }
  }]
    },

    {
        timestamps:true
    }
)