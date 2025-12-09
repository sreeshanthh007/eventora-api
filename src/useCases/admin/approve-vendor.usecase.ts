import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { INotificationService } from "@entities/serviceInterfaces/notification.service.interface";
import { IApproveVendorUseCase } from "@entities/useCaseInterfaces/admin/approve-vendor.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, FCM_NOTIFICATION_MESSAGE, HTTP_STATUS } from "@shared/constants";
import { SocketService } from "@services/socket/socket.service";
import { inject, injectable } from "tsyringe";
import { vendorStatus } from "@shared/constants";



@injectable()
    export class ApproveVendorUseCase implements IApproveVendorUseCase{
        constructor(
            @inject("IVendorRepository") private vendorRepo : IVendorRepository,
            @inject("INotificationService") private notificationService : INotificationService
        ){}

        async execute(vendorId: string): Promise<void> {

            const vendorExist = await this.vendorRepo.findById(vendorId)

            if(!vendorExist){
                throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
            }


            await this.vendorRepo.findByIdAndUpdateVendorStatus(vendorId,vendorStatus.APPROVED)

            const io = SocketService.getIO()


            io.to(`vendor_${vendorId}`).emit("vendorApproved",{_id:vendorId,status:"approved"})

            if(vendorExist.fcmToken){
                await this.notificationService.sendNotification(
                    vendorId,
                    vendorExist.fcmToken,
                    {
                        title:FCM_NOTIFICATION_MESSAGE.VENDOR_APPROVED.title,
                        body:FCM_NOTIFICATION_MESSAGE.VENDOR_APPROVED.body
                    }
                )
            }
        }
    }