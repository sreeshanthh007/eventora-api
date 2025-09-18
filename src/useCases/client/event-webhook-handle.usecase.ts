import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { ITicketRepository } from "@entities/repositoryInterfaces/ticket/ticket-repository-interface";
import { IEventRepository } from "@entities/repositoryInterfaces/vendor/event/event.repository.interface";
import { IQrCodeService } from "@entities/serviceInterfaces/qr-code-service.interface";
import { IHandleEventWebHookUseCase } from "@entities/useCaseInterfaces/client/event-webhook-handle.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { generateRandomUUID } from "@frameworks/security/randomid.bcrypt";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { TicketDTO } from "@shared/dtos/ticket.dto";
import { ObjectId } from "mongoose";
import { inject, injectable } from "tsyringe";



@injectable()
export class EventWebHookHandleUseCase implements IHandleEventWebHookUseCase{
    constructor(
        @inject("IEventRepository") private _eventRepo : IEventRepository,
        @inject("IClientRepository") private _clientRepo : IClientRepository,
        @inject("ITicketRepository") private _ticketRepo : ITicketRepository,
        @inject("IQRCodeService") private _qrCodeService : IQrCodeService
    ){}


    async execute(eventId: string, userId: string, ticketType: string,amount:number,paymentId:string,quantity:number): Promise<void> {
        
        const eventExist = await this._eventRepo.findById(eventId);

        const userExist = await this._clientRepo.findById(userId)

        

        if(!userExist){
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND,HTTP_STATUS.BAD_REQUEST)
        }

        if(!eventExist){
            throw new CustomError(ERROR_MESSAGES.ID_NOT_FOUND,HTTP_STATUS.BAD_REQUEST)
        }   


        if(ticketType){
            const ticketOption = eventExist.tickets?.find(t=>t.ticketType==ticketType)

            if(!ticketOption){
                throw new CustomError(ERROR_MESSAGES.NOT_FOUND,HTTP_STATUS.BAD_REQUEST)
                
            }

            if(ticketOption.totalTickets - (ticketOption.bookedTickets || 0) < quantity){
                throw new CustomError("Not Enough Ticket Available",HTTP_STATUS.BAD_REQUEST)
            } 
        }else{
            if(eventExist.totalTicket - (eventExist.bookedTickets || 0) < quantity ){
                throw new CustomError("Not Enough Ticket Avilable",HTTP_STATUS.BAD_REQUEST)
            }
        }

        const qrCode = await this._qrCodeService.generateQrCode(`${eventId}:${userId}:${ticketType}`);

        const ticketId = generateRandomUUID()

        const ticket : TicketDTO = {
            clientId:userId,
            email:userExist.email,
            name:userExist.name,
            eventId:eventId,
            qrCodeLink:qrCode,
            amount:amount,
            ticketType:ticketType,
            paymentTransactionId:paymentId,
            quantity:quantity,
            ticketId:ticketId,
            ticketStatus:'unused',
            paymentStatus:"pending"
        }


        await this._ticketRepo.createTicket(ticket);

        await this._eventRepo.updateAfterTicketBooking(eventId,quantity,ticketType)
     
    }
}