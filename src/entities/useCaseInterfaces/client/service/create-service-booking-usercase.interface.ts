import Stripe from "stripe";


export interface ICreateServiceBookingUseCase {
    execute(bookingType:string,clientId:string,vendorId:string,serviceId:string,bookingData:{selectedDate:string,selectedSlotTime:string,name:string,email:string,phone:string},amount:number,currency:string) : Promise<Stripe.PaymentIntent>
}