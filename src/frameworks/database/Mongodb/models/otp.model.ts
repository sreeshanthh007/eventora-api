

import { Document, ObjectId, model } from "mongoose";
import { IOtpEntity } from "@entities/models/otp.entity";
import { OtpSchema } from "../schemas/otp.schema";


export interface IOtpModel extends IOtpEntity,Document{
    _id:ObjectId
}

export const OtpModel = model("otp",OtpSchema)