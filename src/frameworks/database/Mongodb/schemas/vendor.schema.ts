import { Schema } from "mongoose";
import { ROLES } from "../../../../shared/constants";
import { IVendorModel } from "../models/vendor.model";



    export const VendorSchema = new Schema<IVendorModel>(
        {
            vendorId:{type:String,required:true},

            name:{type:String,required:true},

            email:{type:String,required:true,unique:true},

            password:{type:String},

            role:{type:String,enum:ROLES,required:true,default:"vendor"},
    
            profilePicture:{type:String},

            phone:{type:String},

            about:{type:String},

            idProof:{type:String,required:true},

            place:{type:String},

            rejectionReason:{type:String,required:false},

            status:{type:String,default:"active"},

            vendorStatus:{type:String,enum:["pending","approved","rejected"],default:"pending"},
        },
        {
            timestamps:true
        }
    )

VendorSchema.index({status:1})
