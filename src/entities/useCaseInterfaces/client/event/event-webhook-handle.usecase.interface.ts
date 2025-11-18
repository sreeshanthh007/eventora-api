import { ITicketPurchaseDTO } from "@shared/dtos/ticket.dto";




export interface IHandleEventWebHookUseCase {
    execute(eventId:string,userId:string,tickets:ITicketPurchaseDTO[],paymentId:string,vendorId:string) : Promise<void>
}