import { IServiceModel } from "../models/service.model";
import { Schema } from "mongoose";


export const ServiceSchema = new Schema<IServiceModel>(
    {
        vendorId:{type:Schema.Types.ObjectId,ref:"Vendor",required:true},


        serviceTitle:{type:String,required:true},

        yearsOfExperience:{type:Number,required:true},

        serviceDescription:{type:String,required:true},

        serviceDuration:{type:Number,required:true},

        servicePrice:{type:Number,required:true},

        additionalHourPrice:{type:Number,required:true},

        cancellationPolicies:{type:[String],required:true},

        categoryId:{type:Schema.Types.ObjectId,required:true},
        
        termsAndConditions:{type:[String],required:true},

        status:{type:String,enum:["active","blocked"],default:"active"}
    },
    {
        timestamps:true
    }
)