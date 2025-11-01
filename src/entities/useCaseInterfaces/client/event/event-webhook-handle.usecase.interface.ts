


export interface ITicketPurchase {
  ticketType: string;
  quantity: number;
  pricePerTicket: number;
}
export interface IHandleEventWebHookUseCase {
    execute(eventId:string,userId:string,tickets:ITicketPurchase[],paymentId:string) : Promise<void>
}