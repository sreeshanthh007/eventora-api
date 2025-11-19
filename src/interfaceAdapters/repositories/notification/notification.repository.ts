import { INotificationEntity } from "@entities/models/notification.entity";
import { INotificationRepository } from "@entities/repositoryInterfaces/notification/notification.repository.interface";
import { NotificationModel } from "@frameworks/database/mongodb/models/notification.model";



export class NotificationRepository implements INotificationRepository{
    async saveNotification(notification: { notificationId: string; userId: string; title: string; message: string; isRead?: boolean; }): Promise<void> {
            await NotificationModel.create(notification)
    }

    async findNotificationsById(userId: string): Promise<INotificationEntity[] | null> {
        return await NotificationModel.find({userId}).sort({createdAt:-1})
    }

    async markAsReadNotification(userId: string, notificationId: string): Promise<void> {
        await NotificationModel.updateOne(
            {_id:notificationId,userId:userId},
            {$set:{isRead:true}}
        );
    } 

}