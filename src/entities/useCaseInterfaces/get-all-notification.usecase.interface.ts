import { NotificationDTO } from "@shared/dtos/notification.dto";

export interface NotificationResponse {
  notifications:  NotificationDTO[];
}
export interface IGetAllNotificationOfVendorUseCase {
    execute(userId:string) : Promise<NotificationResponse>
}