
import { Document , ObjectId , model } from "mongoose";
import { IVendorVerificationEntity } from "@entities/models/vendor-verification.entity";
import { vendorVerificationSchema } from "../schemas/vendor-verification.schema";

export interface IVendorVerificationModel extends Omit<IVendorVerificationEntity,"_id">,Document{
    _id:ObjectId
}

export const vendorVerificationModel = model<IVendorVerificationModel>("vendorVerification",vendorVerificationSchema)