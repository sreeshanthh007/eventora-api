import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { INotificationService } from "@entities/serviceInterfaces/notification.service.interface";
import { IRejectVendorUseCase } from "@entities/useCaseInterfaces/admin/reject-vendor.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { SocketService } from "@services/socket/socket.service";
import { inject, injectable } from "tsyringe";
import { vendorStatus } from "@shared/constants";


@injectable()
export class RejectVendorUseCase implements IRejectVendorUseCase{
    constructor(
        @inject("IVendorRepository") private vendorRepo : IVendorRepository,
        @inject("INotificationService") private notificationService : INotificationService
    ){}
    async execute(vendorId: string,rejectReason:string): Promise<void> {
        
        const isVendorExist = await this.vendorRepo.findById(vendorId)

        if(!isVendorExist){
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        await this.vendorRepo.findByIdAndUpdateVendorStatus(vendorId,vendorStatus.REJECTED,rejectReason);

        const io = SocketService.getIO()

        io.to(`vendor_${vendorId}`).emit("vendorRejected",{_id:vendorId,status:"rejected"}) 

        if(isVendorExist.fcmToken){

            await this.notificationService.sendNotification(
                vendorId,
                isVendorExist.fcmToken,
                {title:"Account Rejected",body:"Your account has been rejected"}
            )
        }

    }
}