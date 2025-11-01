import { IServiceModel } from "../models/service.model";
import { Schema } from "mongoose";


export const ServiceSchema = new Schema<IServiceModel>(
    {
        vendorId:{type:String,ref:"Vendor",required:true},


        serviceTitle:{type:String,required:true},

        yearsOfExperience:{type:Number,required:true},

        serviceDescription:{type:String,required:true},

        serviceDuration:{type:Number,required:true},

        servicePrice:{type:Number,required:true},

        additionalHourPrice:{type:Number,required:true},

        cancellationPolicies:{type:[String],required:true},

        categoryId:{type:String,required:true},
        
        termsAndConditions:{type:[String],required:true},

        status:{type:String,enum:["active","blocked"],default:"active"},


    schedule:{
      frequency:{type:String,enum:["DAILY","WEEKLY","MONTHLY","YEARLY","ONCE"],required:true},
      startDate: { type: Date, required: true }, 
      endDate: { type: Date, required: true },   
      startTime: { type: String, required: true }, 
      endTime: { type: String, required: true },
      duration: { type: Number, required: true }, 
      capacity:{type:Number},
      workingDays: [{ type: Number, required: true }], 
    },
    holidays: [{ type: Date }],
    },
    {
        timestamps:true
    }
)