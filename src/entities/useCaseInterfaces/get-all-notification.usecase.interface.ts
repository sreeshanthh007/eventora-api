import { NotificationDTO } from "@shared/dtos/notification.dto";

export interface IGetAllNotificationUseCase{
  execute(userId:string) : Promise<NotificationDTO[]>
}