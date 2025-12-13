
import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { ITicketRepository } from "@entities/repositoryInterfaces/ticket/ticket-repository-interface";
import { IClientGetEventBookingUseCase } from "@entities/useCaseInterfaces/client/event/client-get-event-booking.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { mapToTicketDTO } from "@mappers/TicketMapper";
import { ERROR_MESSAGES, HTTP_STATUS, PAGINATION } from "@shared/constants";
import { paginatedBookedEvents } from "interfaceAdapters/models/paginatedBookedEvents";
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
        
        

        const safePage = Math.max(
          PAGINATION.BOOKED_EVENT_PAGINATION.PAGE,
          page || PAGINATION.BOOKED_EVENT_PAGINATION.PAGE
        )
        
        const safeLimit = Math.min(
          PAGINATION.BOOKED_EVENT_PAGINATION.MAX_LIMIT,
          Math.max(1, limit || PAGINATION.BOOKED_EVENT_PAGINATION.LIMIT)
        );
        
        
   
        
        const skip = (safePage-1)*safeLimit


        const {tickets,total} =  await this._ticketRepo.findTicketsByClientId(search,clientId,skip,limit)

       
       
        
        const mappedTickets = tickets.map(ticket => mapToTicketDTO(ticket));
 
        
     
        
        return {
            bookedEvents:mappedTickets,
            total:Math.ceil(total/limit)
        }
   }
}