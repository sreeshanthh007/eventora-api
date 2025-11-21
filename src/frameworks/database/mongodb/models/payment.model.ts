import { IPaymentEntity } from "@entities/models/payment.entity";
import { model, ObjectId } from "mongoose";
import { paymentSchema } from "../schemas/payment.schema";


export interface IPaymentModel extends  Omit<IPaymentEntity,"_id">,Document{
    _id:ObjectId
}


export const paymentModel = model<IPaymentModel>("Payment",paymentSchema)