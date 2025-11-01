import { INotificationEntity } from "@entities/models/notification.entity";


export interface INotificationRepository {
  saveNotification(notification: {
    notificationId: string;
    userId: string;
    title: string;
    message: string;
    isRead?: boolean;
  }): Promise<void>;

  findNotificationsById(userId:string) : Promise<INotificationEntity[] | null>

  markAsReadNotification(userId:string,notificationId:string) : Promise<void>
}