import { Schema } from "mongoose";
import { ITransactionModel } from "../models/transaction.model";


export const transactionSchema = new Schema<ITransactionModel>(

    {
        walletId:{type:String,required:true},

        currency:{type:String,required:true},

        paymentStatus:{type:String,enum:["debit","credit"],required:true},

        amount:{type:Number,required:true},

        date:{type:Date,requierd:true},

        paymentType:{type:String,enum:["refund","ticketBooking","top-up","serviceBooking"]},

        paymentFor:{resourceType:String,enum:["event","service"],
            resourceId:{type:Schema.Types.ObjectId,required:true,refPath:"paymentFor.resourceType"}
        }
    },

    {
        timestamps:true
    }
)