import { IBookingRepository } from "@entities/repositoryInterfaces/booking/booking.repository.interface";
import { inject, injectable } from "tsyringe";
import cron from "node-cron"
import { createTransaction } from "@mappers/WalletMapper";
import { IWalletRepository } from "@entities/repositoryInterfaces/wallet/wallet.repository.interface";


@injectable()
export class ServiceAutoCompleteCron{

    constructor(
        @inject("IBookingRepository") private _bookingRepo : IBookingRepository,
        @inject("IWalletRepository") private _walletRepo : IWalletRepository
    ){}

    public start(){
        cron.schedule("*/5 * * * *",async()=>{

            try {
                await this.processService();
            } catch (error) {
                console.log("error while running serviceAutoCompletionCron",error)
            }
        });
    }


    private async processService(){

        const now = new Date()

        const ongoingBookings = await this._bookingRepo.findBookingsWithStatusOngoing()

        if(!ongoingBookings?.length) return 
        
        for(const booking of ongoingBookings){
            const slotEndTime = new Date(booking.bookingSlot.slotEndTime)

            if(slotEndTime<=now){
                const amountForVendor = booking.amount * 0.80

                const transactionForAdmin = createTransaction("fundReleased","service",booking.bookingId,amountForVendor,"debit")
                const transactionForVendor = createTransaction("serviceBooking","service",booking.bookingId,amountForVendor,"credit")

                await this._walletRepo.transfer("admin",booking.vendorId!,amountForVendor,transactionForAdmin,transactionForVendor)
            }
        }
    }
}