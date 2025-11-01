import { INotificationRepository } from "@entities/repositoryInterfaces/notification/notification.repository.interface";
import { IMarkAsReadNotificationUseCase } from "@entities/useCaseInterfaces/client/mark-as-read-notification.usecase.interface";
import { inject, injectable } from "tsyringe";



@injectable()
export class MarkAsReadNotificaionUseCase implements IMarkAsReadNotificationUseCase{
    constructor(
        @inject("INotificationRepository") private _notiticationRepo : INotificationRepository,
    ){}


    async execute(userId: string, notificationId: string): Promise<void> {
        

        await this._notiticationRepo.markAsReadNotification(userId,notificationId)
        
    } 
}