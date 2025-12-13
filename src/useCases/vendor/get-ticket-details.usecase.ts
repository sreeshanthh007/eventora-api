import { ITicketRepository } from "@entities/repositoryInterfaces/ticket/ticket-repository-interface";
import { IGetTicketDetailsUseCase } from "@entities/useCaseInterfaces/vendor/get-ticket-details.usecase.interface";
import { mapTicketsForVerifyAttendiesDetails } from "@mappers/TicketMapper";
import { PAGINATION } from "@shared/constants";
import { PaginatedTicketDetails } from "interfaceAdapters/models/PaginatedTicketDetails";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetTicketDetailsUseCase implements IGetTicketDetailsUseCase{

    constructor(
        @inject("ITicketRepository") private _ticketRepo : ITicketRepository
    ){}


    async execute(eventId: string, page: number, limit: number, search: string): Promise<PaginatedTicketDetails> {
        
      const safePage = Math.max(
        PAGINATION.PAGE,
        page || PAGINATION.PAGE
      )
      
      const safeLimit = Math.min(
        PAGINATION.MAX_LIMIT,
        Math.max(1, limit || PAGINATION.LIMIT)
      );
       

        const skip = (safePage - 1)*safeLimit

        const {tickets,total} = await this._ticketRepo.findPaginatedTicketDetails(eventId,skip,limit,search);

        const mappedTickets = tickets.map(mapTicketsForVerifyAttendiesDetails)

        return {
            tickets:mappedTickets,
            total:Math.ceil(total/limit)
        }
    }
}