import Stripe from "stripe"


export interface IStripeService{
    
    createPaymentIntent(amount:number,currency:string,eventId:string,userId:string,ticketType:string,quantity:number) : Promise<Stripe.PaymentIntent>
}