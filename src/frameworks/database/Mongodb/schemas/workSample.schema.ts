import { Schema } from "mongoose";
import { IWorkSampleModel } from "../models/workSample.model";



export const workSampleschema = new Schema<IWorkSampleModel>(

    {
        title:{type:String,required:true},

        description:{type:String,required:true},

        images:{type:[String],required:true},

        vendorId:{type:Schema.Types.ObjectId,ref:"Vendor",required:true}
    },

    {
        timestamps:true
    }
)