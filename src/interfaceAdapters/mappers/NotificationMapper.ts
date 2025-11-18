import { INotificationEntity } from "@entities/models/notification.entity";
import { NotificationDTO } from "@shared/dtos/notification.dto";


export function mapNotificationToDTO(notification:INotificationEntity) : NotificationDTO{

    return{
        title:notification.title,
        notificationId:notification.notificationId,
        isRead:notification.isRead,
        message:notification.message,
        createdAt:notification.createdAt
    }
}