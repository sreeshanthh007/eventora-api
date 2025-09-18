import { Schema } from "mongoose";
import { IBookingModel } from "../models/booking.model";


export const BookingSchema = new Schema<IBookingModel>(
    {
        vendorId:{type:Schema.Types.ObjectId,ref:"Vendor",required:true},

        clientId:{type:Schema.Types.ObjectId,ref:"Client",required:true},

        serviceId:{type:Schema.Types.ObjectId,ref:"Service",required:true},

        date:[{
            type:Date,
            required:true
        }],

        vendorApproval:{type:String,enum:["pending","approved","rejected"],default:"Pending"},

        email:{type:String,required:true},

        name:{type:String,required:true},
        
        phone:{type:String,required:true},

        rejectionReason:{type:String,required:true},

        status: {
        type: String,
        enum: ['Pending', 'Rejected', 'Completed', 'Cancelled'],
        default: "Pending"
    },

      isComplete: {
        type: Boolean,
        default: false
    }
    },

    {
        timestamps:true
    }
)