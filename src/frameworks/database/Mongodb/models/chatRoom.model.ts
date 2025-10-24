import { IChatRoomEntity } from "@entities/models/chatRoom.entity";
import { model, ObjectId } from "mongoose";
import { chatRoomSchema } from "../schemas/chatRoom.schema";


export interface IChatRoomModel extends Omit<IChatRoomEntity,"_id">,Document{
    _id:ObjectId
}

export const chatModel = model<IChatRoomModel>("chatRoom",chatRoomSchema)