import { Schema } from "mongoose";
import { IMessageModel } from "../models/message.model";


export const messageSchema = new Schema<IMessageModel>(
    {
        messageId:{type:String,required:true},

        chatRoomId:{type:String,ref:"chatRoom",required:true},

        senderId:{type:String,required:true},

        receiverId:{type:String,required:true},

        messageType:{type:String,enum:["text","image","video"],required:true},

        content:{type:String,default:null},

        mediaUrl:{type:String,default:null},

        status:{type:String,enum:["sent","delivered","read"],default:"sent"},


    },

    {
        timestamps: { createdAt: "createdAt", updatedAt: false },
    }
);