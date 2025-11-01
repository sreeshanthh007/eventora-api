import { IBookingRepository } from "@entities/repositoryInterfaces/booking/booking.repository.interface";
import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { IServiceRepository } from "@entities/repositoryInterfaces/vendor/service/service.repository.interface";
import { IWalletRepository } from "@entities/repositoryInterfaces/wallet/wallet.repository.interface";
import { INotificationService } from "@entities/serviceInterfaces/notification.service.interface";
import { ILockService } from "@entities/serviceInterfaces/ticket-lock-service.interface";
import { IHandleServiceBookingWebhookUseCase } from "@entities/useCaseInterfaces/client/service/handle-service-booking-webhook.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { generateRandomUUID } from "@frameworks/security/randomid.bcrypt";
import { mapToBookingDTO } from "@mappers/BookingMapper";
import { createTransaction } from "@mappers/WalletMapper";
import { ERROR_MESSAGES, FCM_NOTIFICATION_MESSAGE, HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";



@injectable()
export class HandleServiceBookingWebhookUseCase implements IHandleServiceBookingWebhookUseCase{
    
    constructor(
        @inject("IServiceRepository") private _serviceRepo : IServiceRepository,
        @inject("IWalletRepository") private _walletRepo : IWalletRepository,
        @inject("IClientRepository") private _clientRepo : IClientRepository,
        @inject("IBookingRepository") private _bookingRepo : IBookingRepository,
        @inject("IRedisLockService") private _lockService : ILockService,
        @inject("INotificationService") private _notificationService : INotificationService
    ){}


   async execute(vendorId:string,serviceId: string, clientId: string, currency: string, bookingData: { slotStart: string; slotEnd: string; name: string; email: string; phone: string; }, amount: number, paymentIntentId: string): Promise<void> {
       
            const serviceExist = await this._serviceRepo.findById(serviceId)

            const userExist = await this._clientRepo.findById(clientId)

           

            if(!serviceExist){
            throw new CustomError(ERROR_MESSAGES.NOT_FOUND,HTTP_STATUS.NOT_FOUND)
            }
        
        const slot = serviceExist.slots?.find((each)=>each.startDateTime?.toISOString()===bookingData.slotStart
        && each.endDateTime?.toISOString()===bookingData.slotEnd
        );

        if(!slot){
        throw new CustomError(ERROR_MESSAGES.SLOT_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        if(slot.bookedCount! >= slot.capacity!){
        throw new CustomError(ERROR_MESSAGES.SLOT_CAPACITY_EXCEEDED,HTTP_STATUS.BAD_REQUEST)
        }
        
        const bookingId = generateRandomUUID()

        

        const booking = mapToBookingDTO({
            bookingId:bookingId,
            clientId:clientId,
            vendorId:vendorId,
            serviceId:serviceId,
            currency:currency,
            amount:amount,
            slotStart:new Date(bookingData.slotStart),
            slotEnd:new Date(bookingData.slotEnd),
            email:bookingData.email,
            name:bookingData.name,
            phone:bookingData.phone,
            paymentIntentId:paymentIntentId,
            status:"pending",
            paymentStatus:"successfull"
        });


        const transaction  = createTransaction("serviceBooking","service",serviceId,amount,"credit")
        

        const startDate = new Date(bookingData.slotStart)
        const endDate = new Date(bookingData.slotEnd)
   
        await this._bookingRepo.createBooking(booking)
        await this._walletRepo.findWalletByUserTypeAndUpdate("admin",transaction,amount)
        await this._serviceRepo.findByIdAndUpdateBookedCount(serviceId,startDate,endDate)
        await this._lockService.releaseLock(serviceId,bookingData.slotStart,clientId)

        if(userExist?.fcmToken){
            this._notificationService.sendNotification(
                clientId,
            userExist.fcmToken,
            {
                title:FCM_NOTIFICATION_MESSAGE.SERVICE_BOOKING_SUCCESS.title,
                body:FCM_NOTIFICATION_MESSAGE.SERVICE_BOOKING_SUCCESS.body
            }
        )
    }


   }
}