import Stripe from "stripe";


export interface IRetryEventPaymentUseCase{
    execute(ticketId:string) : Promise<Stripe.PaymentIntent>
}