import { TTicketEntityWithEventPopulated } from "@entities/models/populated-types/ticket-populated.type";
import { ITicketEntity } from "@entities/models/ticket.entity";
import { IPaginatedTicketDetailsDTO, paginatedTicketDTO } from "@shared/dtos/ticket.dto";





export function mapToTicketDTO(ticket:TTicketEntityWithEventPopulated) : paginatedTicketDTO{

    return {
        
        ticketId:ticket.ticketId,
        email:ticket.email,
        eventId:ticket.eventId._id!.toString(),
        amount:ticket.amount,
        qrCodeLink:ticket.qrCodeLink,
        paymentStatus:ticket.paymentStatus,
        ticketStatus:ticket.ticketStatus,
        ticketType:ticket.ticketType,
        quantity:ticket.quantity,
       title:ticket.title!,
        eventSchedule:ticket.eventId.eventSchedule,
       Images:ticket.eventId.Images,
    }
}



export function mapTicketsForVerifyAttendiesDetails(ticket:ITicketEntity) : IPaginatedTicketDetailsDTO{

    return {
        name:ticket.name,
        email:ticket.email,
        qrCode:ticket.qrCodeLink,
        ticketId:ticket.ticketId,
        ticketType:ticket.ticketType,
        isCheckedIn:ticket.isCheckedIn!
    }
}