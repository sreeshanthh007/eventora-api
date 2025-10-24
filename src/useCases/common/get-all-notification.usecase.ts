import { INotificationRepository } from "@entities/repositoryInterfaces/notification/notification.repository.interface";
import { IGetAllNotificationUseCase } from "@entities/useCaseInterfaces/get-all-notification.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { mapNotificationToDTO } from "@mappers/NotificationMapper";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { NotificationDTO } from "@shared/dtos/notification.dto";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetAllNotificationUseCase implements IGetAllNotificationUseCase{
    constructor(
        @inject("INotificationRepository") private _notificationRepo : INotificationRepository
    ){}

    async execute(userId: string): Promise<NotificationDTO[]> {
        
        const notifications = await this._notificationRepo.findNotificationsById(userId)

        if(!notifications){
            throw new CustomError(ERROR_MESSAGES.NOTIFICATION_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        const mappedNotification = notifications.map((each)=>mapNotificationToDTO(each))

        return mappedNotification
    }
}