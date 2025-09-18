import { ITransactionEntity } from "@entities/models/transaction.entity";
import { model, ObjectId } from "mongoose";
import { transactionSchema } from "../schemas/transaction.schema";



export interface ITransactionModel extends Omit<ITransactionEntity,"_id">,Document{
    _id:ObjectId
}

export const transactionModel = model<ITransactionModel>("Transaction",transactionSchema)