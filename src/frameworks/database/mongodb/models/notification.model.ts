import { INotificationEntity } from "@entities/models/notification.entity";
import { model, ObjectId } from "mongoose";
import { NotificationSchema } from "../schemas/notification.schema";




export interface INotificationModel extends Omit<INotificationEntity,"_id">,Document{
    _id:ObjectId;
}


export const NotificationModel = model<INotificationModel>("Notification",NotificationSchema)

