import Stripe from "stripe"


export interface IStripeService{
    
    createPaymentIntent(bookingType:string,amount:number,currency:string,eventId:string,userId:string, tickets: { ticketType: string; pricePerTicket: number; quantity: number }[]) : Promise<Stripe.PaymentIntent>
}