import { ITicketRepository } from "@entities/repositoryInterfaces/ticket/ticket-repository-interface";
import { IEventRepository } from "@entities/repositoryInterfaces/vendor/event/event.repository.interface";
import { IWalletRepository } from "@entities/repositoryInterfaces/wallet/wallet.repository.interface";
import { ICancelTicketUseCase } from "@entities/useCaseInterfaces/client/event/cancel-ticket.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { createTransaction } from "@mappers/WalletMapper";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";


@injectable()
export class CancelTicketUseCase implements ICancelTicketUseCase{

    constructor(
        @inject("ITicketRepository") private _ticketRepo : ITicketRepository,
        @inject("IWalletRepository") private _walletRepo : IWalletRepository,
        @inject("IEventRepository") private _eventRepo : IEventRepository,
    ){}


    async execute(ticketId: string,clientId:string,eventId:string): Promise<void> {
        
        const ticketExist = await this._ticketRepo.findTicketById(ticketId)

        if(!ticketExist){
            throw new CustomError(ERROR_MESSAGES.TICKET_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        const eventByVendor = await this._eventRepo.findHostIdFromEvents(eventId)

       
        const vendorId = eventByVendor!.hostId._id.toString()
     
        const amountForClient = ticketExist.amount * 0.5
        const amountForVendor = ticketExist.amount * 0.5


        const clientTransaction  = createTransaction("Refund","Event",ticketId,amountForClient,"credit")
        

        const vendorTransaction  = createTransaction("partialRefund","Event",ticketId,amountForVendor,"credit")
        
            
        
        await this._ticketRepo.findTicketByIdAndCancel(ticketId)
        await this._walletRepo.findWalletByUserIdAndUpdate(clientId,clientTransaction,amountForClient)
        await this._walletRepo.findWalletByUserIdAndUpdate(vendorId,vendorTransaction,amountForVendor)
    
       

        
        
    }
}