import { ITicketEntity } from "@entities/models/ticket.entity";
import { paginatedTicketDTO } from "@shared/dtos/ticket.dto";



export function mapToTicketDTO(ticket:ITicketEntity) : paginatedTicketDTO{

    return {

        ticketId:ticket.ticketId,
        name:ticket.name,
        email:ticket.email,
        amount:ticket.amount,
        qrCodeLink:ticket.qrCodeLink,
        paymentStatus:ticket.paymentStatus,
        ticketStatus:ticket.ticketStatus,
        ticketType:ticket.ticketType,
        quantity:ticket.quantity,
       title:ticket.eventName!,
       eventSchedule:ticket.eventDate!
    }
}