

export interface IHandleServiceBookingWebhookUseCase{
    execute(vendorId:string,serviceId:string,clientId:string,currency:string,bookingData:{slotStart:string,slotEnd:string,name:string,email:string,phone:string},amount:number,paymentIntentId:string) : Promise<void>
}