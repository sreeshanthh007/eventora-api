import Stripe from "stripe";

export interface IServicebookingStripeService {
    createPaymentIntent(bookingType:string,amount:number,currency:string,vendorId:string,serviceId:string,clientId:string,bookingData:{slotStart:string,slotEnd:string,name:string,email:string,phone:string}) : Promise<Stripe.PaymentIntent>
}