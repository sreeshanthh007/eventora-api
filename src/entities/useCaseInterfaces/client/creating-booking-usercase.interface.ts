import { TicketItemDTO } from "@shared/dtos/event-booking.dto";
import Stripe from "stripe";


export interface ICreateBookingUseCase{
    execute(bookingType:string,amount:number,currency:string,eventId:string,userId:string,tickets:TicketItemDTO[]) : Promise<Stripe.PaymentIntent>
}