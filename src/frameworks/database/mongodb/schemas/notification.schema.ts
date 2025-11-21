import { Schema } from "mongoose";
import { INotificationModel } from "../models/notification.model";



export const NotificationSchema = new Schema<INotificationModel>(
    {
        notificationId:{
            type:String,
            required:true
        },

        userId:{
            type:String,
            required:true
        },

        title:{
            type:String,
            required:true
        },

        message:{
            type:String,
            required:true
        },

        isRead:{
            type:Boolean,
            default:false
        }
    },

    {
        timestamps:true
    }
)


