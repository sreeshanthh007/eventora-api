import { ITicketPurchaseDTO } from "@shared/dtos/ticket.dto"


export interface IHandleEventPaymentFailedUseCase{
     execute(eventId:string,userId:string,tickets:ITicketPurchaseDTO[],paymentId:string) : Promise<void>
}