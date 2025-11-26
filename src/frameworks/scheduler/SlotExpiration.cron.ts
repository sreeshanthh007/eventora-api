import { IServiceRepository } from "@entities/repositoryInterfaces/vendor/service/service.repository.interface";
import { inject, injectable } from "tsyringe";
import cron from "node-cron"
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { INotificationService } from "@entities/serviceInterfaces/notification.service.interface";
import { FCM_NOTIFICATION_MESSAGE } from "@shared/constants";


@injectable()
export class SlotExpirationCron {

    constructor(
        @inject("IServiceRepository") private _serviceRepo : IServiceRepository,
        @inject("IVendorRepository") private _vendorRepo : IVendorRepository,
        @inject("INotificationService") private _notificationService : INotificationService
    ){}

    public start(){
        cron.schedule("0 1 * * *",async()=>{
            try {
                await this.processSlotExpiration();
            } catch (error) {
                console.log("error while running slot expiration cron",error)
            }
        })
    }



    private async processSlotExpiration(){

        const today = new Date()
        today.setHours(0,0,0,0)

        const expiredServices = await this._serviceRepo.findExpiredSlots(today)

        for(const service of expiredServices!){

            const vendor = await this._vendorRepo.findById(service.vendorId!)

            if(vendor?.fcmToken){
                await this._notificationService.sendNotification(
                    service.vendorId!,
                    vendor.fcmToken,
                    {
                        title:FCM_NOTIFICATION_MESSAGE.SEND_EXPIRED_SLOTS_NOTIFICATION.title,
                        body:FCM_NOTIFICATION_MESSAGE.SEND_EXPIRED_SLOTS_NOTIFICATION.body
                    }
                )
            }
        }
        
    }
}