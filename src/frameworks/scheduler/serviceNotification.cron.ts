
import { IBookingRepository } from "@entities/repositoryInterfaces/booking/booking.repository.interface";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { INotificationService } from "@entities/serviceInterfaces/notification.service.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, FCM_NOTIFICATION_MESSAGE, HTTP_STATUS } from "@shared/constants";
import cron from "node-cron"
import { inject, injectable } from "tsyringe";


@injectable()
export class ServiceNotificationCron  {
    constructor(
        @inject("IBookingRepository") private _bookingRepo : IBookingRepository,
        @inject("IVendorRepository") private _vendorRepo : IVendorRepository,
        @inject("INotificationService") private _notificationService : INotificationService
    ){}


   public start(){
    cron.schedule("*/3 * * * *",async()=>{
        try {
            await this.sendUpcomingServiceNotification()
        } catch (error) {
            console.log("error while running service Tracker",error)
        }
    })
   }


    private async sendUpcomingServiceNotification(){
  

        const now = new Date()

        const fiveMinutesLater = new Date(now.getTime() + 5 * 60 * 1000);

        const bookings = await this._bookingRepo.findBookingsWithStatusPending(now,fiveMinutesLater);

        if(!bookings?.length) return ;

        for(const booking of bookings){
            const vendor  = await this._vendorRepo.findById(booking.vendorId!)
            if(!vendor){
                throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
            }

            if(booking.status=="pending"){
                if(vendor.fcmToken){
                    await this._notificationService.sendNotification(
                    booking.vendorId!,vendor.fcmToken,{
                    title:FCM_NOTIFICATION_MESSAGE.SEND_UPCOMING_SERVICE_NOTIFICATION.title(vendor.name),
                    body:FCM_NOTIFICATION_MESSAGE.SEND_UPCOMING_SERVICE_NOTIFICATION.body(booking.name)
                }
                )
                }
            }
            await this._bookingRepo.updateNotificationSentStatus(booking.bookingId,true)
        }
    }
}