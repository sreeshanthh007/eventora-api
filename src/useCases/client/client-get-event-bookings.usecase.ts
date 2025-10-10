import { ITicketEntity } from "@entities/models/ticket.entity";
import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { ITicketRepository } from "@entities/repositoryInterfaces/ticket/ticket-repository-interface";
import { IClientGetEventBookingUseCase } from "@entities/useCaseInterfaces/client/client-get-event-booking.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { mapToTicketDTO } from "@mappers/TicketMapper";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { paginatedBookedEvents } from "interfaceAdpaters/models/paginatedBookedEvents";
import { FilterQuery } from "mongoose";
import { inject, injectable } from "tsyringe";



@injectable()
export class ClientGetEventBookingsUseCase implements IClientGetEventBookingUseCase{

    constructor(
        @inject("ITicketRepository") private _ticketRepo:ITicketRepository,
        @inject("IClientRepository") private _clientRepo:IClientRepository
    ){}



   async execute(clientId: string, page: number, limit: number, search: string): Promise<paginatedBookedEvents> {
       
        const client = await this._clientRepo.findById(clientId)

        if(!client){
            throw new CustomError(
                ERROR_MESSAGES.NOT_FOUND,
                HTTP_STATUS.BAD_REQUEST
            )
        }
        
        const filter : FilterQuery<ITicketEntity> = {}

        if(search){

            filter.$or = [
                {eventName:{$regex:search,$options:"i"}},
                {ticketId:{$regex:search,$options:"i"}}
            ]
        }


        const validPageNumber = Math.max(1,page || 1)

        const skip = (validPageNumber-1)*limit


        const {tickets,total} =  await this._ticketRepo.findTicketsByClientId(filter,clientId,skip,limit)


        const mappedTickets = tickets.map(ticket => mapToTicketDTO(ticket));

     
        
        return {
            bookedEvents:mappedTickets,
            total:Math.ceil(total/limit)
        }
   }
}