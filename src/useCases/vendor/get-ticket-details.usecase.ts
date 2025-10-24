import { ITicketRepository } from "@entities/repositoryInterfaces/ticket/ticket-repository-interface";
import { IGetTicketDetailsUseCase } from "@entities/useCaseInterfaces/vendor/get-ticket-details.usecase.interface";
import { mapTicketsForVerifyAttendiesDetails } from "@mappers/TicketMapper";
import { PaginatedTicketDetails } from "interfaceAdpaters/models/PaginatedTicketDetails";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetTicketDetailsUseCase implements IGetTicketDetailsUseCase{

    constructor(
        @inject("ITicketRepository") private _ticketRepo : ITicketRepository
    ){}


    async execute(eventId: string, page: number, limit: number, search: string): Promise<PaginatedTicketDetails> {
        
        const validPageNumber = Math.max(1,page || 1)

        const skip = (validPageNumber - 1)*limit

        const {tickets,total} = await this._ticketRepo.findPaginatedTicketDetails(eventId,skip,limit,search);

        const mappedTickets = tickets.map(mapTicketsForVerifyAttendiesDetails)

        return {
            tickets:mappedTickets,
            total:Math.ceil(total/limit)
        }
    }
}