import { ITicketRepository } from "@entities/repositoryInterfaces/ticket/ticket-repository-interface";
import { IScanAndVerifyTicketsUseCase } from "@entities/useCaseInterfaces/vendor/scan-and-verify-tickets.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";


@injectable()
export class ScanAndVerifyTicketsUseCase implements IScanAndVerifyTicketsUseCase{

    constructor(
        @inject("ITicketRepository") private _ticketRepo : ITicketRepository
    ){}

    async execute(eventId: string, ticketId: string,ticketType:string): Promise<void> {
        
        const ticket = await this._ticketRepo.findTicketById(ticketId)

        if(!ticket){
            throw new CustomError(ERROR_MESSAGES.TICKET_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        if(ticket.eventId.toString()!==eventId){
            throw new CustomError(ERROR_MESSAGES.INVALID_TICKET_FOR_EVENT,HTTP_STATUS.BAD_REQUEST)
        }

        if(ticket.ticketType!==ticketType){
            throw new CustomError(ERROR_MESSAGES.INVALIID_TICKET_TYPE,HTTP_STATUS.BAD_REQUEST)
        }


        await this._ticketRepo.findTicketsByIdAndVerifyTicket(ticketId)


    }
}