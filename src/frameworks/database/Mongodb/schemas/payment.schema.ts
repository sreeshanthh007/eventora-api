import { Schema } from "mongoose";
import { IPaymentModel } from "../models/payment.model";


export const paymentSchema = new Schema<IPaymentModel>(
    {
        amount:{type:Number,required:true},
        
        currency:{type:String,required:true},

        paymentId:{type:String,required:true},

        purpose:{type:String,enum:["ticketBooking","serviceBooking"]},

        receiverId:{type:Schema.Types.ObjectId,ref:"Vendor"},

        status:{type:String,enum:["pending","success","failed"]},

        ticketId:{type:String,required:true},

        userId:{type:Schema.Types.ObjectId,ref:"Client",required:true},

       bookingId:{type:Schema.Types.ObjectId,ref:"Booking"}
    }
)