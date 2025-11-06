import { Schema } from "mongoose";
import { IChatRoomModel } from "../models/chatRoom.model";


export const chatRoomSchema = new Schema<IChatRoomModel>(
    {
        chatRoomId:{type:String,required:true},

        clientId:{type:String,required:true},

        vendorId:{type:String,required:true}
    },
    {
        timestamps:true
    }
);
