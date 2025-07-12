
import { IOtpModel } from "../models/otp.model";
import { Schema } from "mongoose";

export  const OtpSchema = new Schema<IOtpModel>(
    {
        otp:{type:String,required:true},

        email:{type:String},

        expiresAt:{type:Date,required:true,expires:60}
    },
    {
        timestamps:true
    }
)