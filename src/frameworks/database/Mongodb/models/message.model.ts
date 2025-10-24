import { IMessageEntity } from "@entities/models/message.entity";
import { model, ObjectId } from "mongoose";


export interface IMessageModel extends Omit<IMessageEntity,"_id">,Document{
    _id:ObjectId
}

export const messageModel = model<IMessageModel>("message")