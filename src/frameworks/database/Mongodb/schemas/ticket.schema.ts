import { Schema } from "mongoose";
import { ITicketModel } from "../models/ticket.model";


export const ticketSchema : Schema = new Schema<ITicketModel>(
    {
        ticketId:{type:String,required:true},

        clientId:{type:Schema.Types.ObjectId,ref:"Client",required:true},

        email:{type:String,required:true},

        name:{type:String,required:true},

        eventId:{type:Schema.Types.ObjectId,ref:"Event",required:true},

        qrCodeLink:{type:String,required:true},

        ticketStatus:{type:String,enum:['used', 'refunded', 'unused'],default:'unused'},

        amount:{type:Number,required:false},

        ticketType:{type:String,required:false,default:"normal"},

        paymentStatus:{type:String,enum:["pending","successfull","failed"],default:"successful"},

        // paymentTransactionId:{type:Schema.Types.ObjectId,ref:"Payment",required:false},  

        quantity:{type:Number,required:true},
    },

    {
        timestamps:true
    }
)