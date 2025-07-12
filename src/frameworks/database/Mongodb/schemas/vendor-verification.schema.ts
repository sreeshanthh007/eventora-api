import mongoose, { Schema } from "mongoose";
import { IVendorVerificationModel } from "../models/vendor-verification.model";

export const vendorVerificationSchema = new Schema<IVendorVerificationModel>(
    {
        vendorId:{type:Schema.Types.ObjectId , ref:"Vendor",required:true},
        businessName:{type:String},

        name:{type:String,required:true},

        email:{type:String,required:true},

        place:{type:String,required:true},

        contactNumber:{type:String,required:true},

        idProof:{type:String,required:true},

        status:{type:String,enum:["pending","rejected","approved"], default:"pending"},

        rejectionReason:{type:String,required:true},

        verifiedAt:{type:Date},
    },

    {
        timestamps:true
    }
);
