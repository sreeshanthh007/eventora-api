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

            category:{type:Schema.Types.ObjectId,ref:"Category",default:null},
    
            profilePicture:{type:String},

            phone:{type:String},

            bio:{type:String},

            place:{type:String},

            status:{type:String,default:"active"},
            

        },
        {
            timestamps:true
        }
    )

VendorSchema.index({status:1})
