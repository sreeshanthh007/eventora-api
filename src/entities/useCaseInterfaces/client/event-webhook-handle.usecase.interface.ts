



export interface IHandleEventWebHookUseCase {
    execute(eventId:string,userId:string,ticketType:string,amount:number,paymentId:string,quantity:number) : Promise<void>
}