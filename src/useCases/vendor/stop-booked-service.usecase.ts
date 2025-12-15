import { IBookingRepository } from "@entities/repositoryInterfaces/booking/booking.repository.interface";
import { IWalletRepository } from "@entities/repositoryInterfaces/wallet/wallet.repository.interface";
import { IStopBookedServiceUseCase } from "@entities/useCaseInterfaces/vendor/stop-booked-service.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { createTransaction } from "@mappers/WalletMapper";
import { COMMISSIONS, ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";



@injectable()
export class StopBookedServiceUseCase implements IStopBookedServiceUseCase{

    constructor(
        @inject("IBookingRepository") private _bookingRepo : IBookingRepository,
        @inject("IWalletRepository") private _walletRepo : IWalletRepository,
    ){}


    async execute(bookingId: string, vendorId: string): Promise<void> {
        
        const booking = await this._bookingRepo.findBooking(bookingId)

        if(!booking){
            throw new CustomError(ERROR_MESSAGES.NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        if(booking.vendorId?.toString()!==vendorId){
            throw new CustomError(ERROR_MESSAGES.UNAUTHORIZED_ACCESS,HTTP_STATUS.UNAUTHORIZED)
        }

        if(booking.status!=="ongoing"){
            throw new CustomError(ERROR_MESSAGES.SERVICE_STOP_COMPLETED_ERROR,HTTP_STATUS.BAD_REQUEST)
        }

        await this._bookingRepo.updateBookingStatus(bookingId,"completed");

        const amountforVendor = COMMISSIONS.SERVICE_COMMISSION_FOR_VENDOR(booking.amount)
   
        const transactionForVendor = createTransaction("serviceBooking","service",bookingId,amountforVendor,"credit");

        const transactionForAdmin = createTransaction("fundReleased","service",bookingId,amountforVendor,"debit")


        await this._walletRepo.transfer("admin",vendorId,amountforVendor,transactionForAdmin,transactionForVendor)

       

    }
}