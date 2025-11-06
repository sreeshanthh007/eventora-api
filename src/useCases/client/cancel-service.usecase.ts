import { IBookingRepository } from "@entities/repositoryInterfaces/booking/booking.repository.interface";
import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IWalletRepository } from "@entities/repositoryInterfaces/wallet/wallet.repository.interface";
import { ICancelServiceUseCase } from "@entities/useCaseInterfaces/client/service/cancel-service.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { createTransaction } from "@mappers/WalletMapper";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";


@injectable()
export class CancelServiceUseCase implements ICancelServiceUseCase{

    constructor(
        @inject("IBookingRepository") private bookingRepo : IBookingRepository,
        @inject("IWalletRepository") private _walletRepo : IWalletRepository,
        @inject("IClientRepository") private _clientRepo : IClientRepository,
        @inject("IVendorRepository") private _vendorRepo : IVendorRepository
    ){}

    async execute(clientId: string, vendorId: string, serviceId: string,bookingId:string): Promise<void> {
        
        const client = await this._clientRepo.findById(clientId)
        const vendor = await this._vendorRepo.findById(vendorId)

        if(!client || !vendor){
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

       const bookedService = await this.bookingRepo.findAlreadyBookedServiceByClients(clientId)

       if(!bookedService){
        throw new CustomError(ERROR_MESSAGES.NOT_FOUND,HTTP_STATUS.NOT_FOUND)
       }

       if(bookedService.status=="completed" || bookedService.status=="cancelled" || bookedService.status=="ongoing"){
        throw new CustomError(ERROR_MESSAGES.CANNOT_CANCEL_SERVICE,HTTP_STATUS.BAD_REQUEST)
       }

       await this.bookingRepo.updateBookingStatus(bookingId,"cancelled");
       
       const amountForClient = bookedService.amount * 0.20
       const amountForVendor = bookedService.amount * 0.80

       const transactionForClient = createTransaction("Refund","service",serviceId,amountForClient,"credit")
       const transactionForVendor = createTransaction("partialRefund","service",serviceId,amountForVendor,"credit")

       await this._walletRepo.findWalletByUserIdAndUpdate(clientId,transactionForClient,amountForClient)
       await this._walletRepo.findWalletByUserIdAndUpdate(vendorId,transactionForVendor,amountForVendor)

        
    }
}