import { Schema } from "mongoose";
import { IRatingModel } from "../models/rating.model";


export const RatingSchema = new Schema<IRatingModel>(
    {
        clientId:{type:Schema.Types.ObjectId,ref:"Client",required:true},

        serviceId:{type:Schema.Types.ObjectId,ref:"Service",required:true},

        description:{type:String,required:true},

        rating:{type:Number,min:1,max:5,required:true}
    },

    {
        timestamps:true
    }
)