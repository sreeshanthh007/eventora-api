import { IBookingRepository } from "@entities/repositoryInterfaces/booking/booking.repository.interface";
import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { IServiceRepository } from "@entities/repositoryInterfaces/vendor/service/service.repository.interface";
import { IWalletRepository } from "@entities/repositoryInterfaces/wallet/wallet.repository.interface";
import { IUUIDGeneratorService } from "@entities/serviceInterfaces/generate-random-uuid.interface";
import { INotificationService } from "@entities/serviceInterfaces/notification.service.interface";
import { ILockService } from "@entities/serviceInterfaces/ticket-lock-service.interface";
import { IHandleServiceBookingWebhookUseCase } from "@entities/useCaseInterfaces/client/service/handle-service-booking-webhook.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { mapToBookingDTO } from "@mappers/BookingMapper";
import { createTransaction } from "@mappers/WalletMapper";
import { ERROR_MESSAGES, FCM_NOTIFICATION_MESSAGE, HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";
import { toZonedTime } from 'date-fns-tz';

@injectable()
export class HandleServiceBookingWebhookUseCase implements IHandleServiceBookingWebhookUseCase {
    private readonly TIMEZONE = "Asia/Kolkata";

    constructor(
        @inject("IServiceRepository") private _serviceRepo: IServiceRepository,
        @inject("IWalletRepository") private _walletRepo: IWalletRepository,
        @inject("IClientRepository") private _clientRepo: IClientRepository,
        @inject("IBookingRepository") private _bookingRepo: IBookingRepository,
        @inject("IRedisLockService") private _lockService: ILockService,
        @inject("INotificationService") private _notificationService: INotificationService,
        @inject("IUUIDGeneratorService") private _generateUUID: IUUIDGeneratorService
    ) { }

    async execute(
        vendorId: string,
        serviceId: string, 
        clientId: string, 
        currency: string, 
        bookingData: { selectedDate: string; selectedSlotTime: string; name: string; email: string; phone: string; }, 
        amount: number, 
        paymentIntentId: string
    ): Promise<void> {
        const serviceExist = await this._serviceRepo.findById(serviceId);
        const userExist = await this._clientRepo.findById(clientId);

        if (!serviceExist) {
            throw new CustomError(ERROR_MESSAGES.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }
        
        if (serviceExist.status == "blocked") {
            throw new CustomError(ERROR_MESSAGES.SERVICE_BOOKING_BLOCKED_ERROR, HTTP_STATUS.BAD_REQUEST);
        }

        const bookingId = this._generateUUID.generate();

   
        const [startTimeStr, endTimeStr] = bookingData.selectedSlotTime.split(' - ');
        

        const startDateTimeIST = `${bookingData.selectedDate}T${startTimeStr}:00`;
        const endDateTimeIST = `${bookingData.selectedDate}T${endTimeStr}:00`;
        

        const slotStartTime = toZonedTime(new Date(startDateTimeIST), this.TIMEZONE);
        const slotEndTime = toZonedTime(new Date(endDateTimeIST), this.TIMEZONE);
     
        const startDate = toZonedTime(
            new Date(`${bookingData.selectedDate}T${startTimeStr}:00`),
            this.TIMEZONE
        );

         console.log("NEW TIMEZONE CODE RUNNING:", {
        selectedDate: bookingData.selectedDate,
        selectedSlotTime: bookingData.selectedSlotTime,
        slotStartTime_IST: startTimeStr,
        slotStartTime_UTC: slotStartTime.toISOString()
        });

        const booking = mapToBookingDTO({
            bookingId: bookingId,
            clientId: clientId,
            vendorId: vendorId,
            serviceId: serviceId,
            currency: currency,
            amount: amount,
            startDate: startDate,
            slotStartTime: slotStartTime,  
            slotEndTime: slotEndTime,       
            email: bookingData.email,
            name: bookingData.name,
            phone: bookingData.phone,
            paymentIntentId: paymentIntentId,
            status: "pending",
            paymentStatus: "successfull"
        });

       

        const transaction = createTransaction("serviceBooking", "service", serviceId, amount, "credit");

        await this._bookingRepo.createBooking(booking);
        await this._walletRepo.findWalletByUserTypeAndUpdate("admin", transaction, amount);

        await this._lockService.releaseServiceLock(
            serviceId, 
            bookingData.selectedDate, 
            bookingData.selectedSlotTime, 
            clientId
        );

        if (userExist?.fcmToken) {
            this._notificationService.sendNotification(
                clientId,
                userExist.fcmToken,
                {
                    title: FCM_NOTIFICATION_MESSAGE.SERVICE_BOOKING_SUCCESS.title,
                    body: FCM_NOTIFICATION_MESSAGE.SERVICE_BOOKING_SUCCESS.body
                }
            );
        }
    }
}