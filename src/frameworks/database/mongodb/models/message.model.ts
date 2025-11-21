import { IMessageEntity } from "@entities/models/message.entity";
import { model, ObjectId } from "mongoose";
import { messageSchema } from "../schemas/message.schema";


export interface IMessageModel extends Omit<IMessageEntity,"_id">,Document{
    _id:ObjectId
}

export const messageModel = model<IMessageModel>("message",messageSchema)