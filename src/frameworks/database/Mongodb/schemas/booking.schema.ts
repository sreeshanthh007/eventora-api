import { Schema } from "mongoose";
import { IBookingModel } from "../models/booking.model";


export const bookingSchema = new Schema<IBookingModel>(

    {
        bookingId:{type:String,required:true},

        clientId: { type: Schema.Types.ObjectId,ref:"Client",required:true },

        serviceId: { type: Schema.Types.ObjectId,ref:"service",required:true },
        
        vendorId: { type: Schema.Types.ObjectId,ref:"Vendor",required:true },

        email:{type:String,required:true},
        
        name:{type:String,required:true},

        phone:{type:String,required:true},

        bookingSlot: {
            startDateTime: { type: Date, required: true },
            endDateTime: { type: Date, required: true }, 
        },
        status:{
            type:String,
            enum:["pending","ongoing","completed","cancelled"],
            default:"pending"
        },

        paymentStatus:{
            type:String,
            enum:["pending","successfull","failed","refunded"],
            default:"pending"
        },
        paymentId:{type:String,required:true},
        amount:{type:Number,required:true},

    },


    {
        timestamps:true
    }
)

bookingSchema.index({ vendorId: 1 });
bookingSchema.index({bookingSlot:1});