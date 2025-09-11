"use strict";
// import { INotificationRepository } from "@entities/repositoryInterfaces/notification/notification.repository.interface";
// import { IGetAllNotificationOfVendorUseCase, NotificationResponse } from "@entities/useCaseInterfaces/get-all-notification.usecase.interface";
// import { CustomError } from "@entities/utils/custom.error";
// import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
// import { inject, injectable } from "tsyringe";
// @injectable()
// export class VendorNotificationsUseCase implements IGetAllNotificationOfVendorUseCase{
//     constructor(
//         @inject("INotificationRepository") private _notificationRepo : INotificationRepository
//     ){}
//     async execute(userId: string): Promise<NotificationResponse> {
//         const vendor = await this._notificationRepo.findNotificationsById(userId)
//         if(!vendor){
//             throw new CustomError(ERROR_MESSAGES.NOT_FOUND,HTTP_STATUS.NOT_FOUND)
//         }
//     }
// }
