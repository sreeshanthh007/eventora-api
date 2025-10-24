

export interface IScanAndVerifyTicketsUseCase{
    execute(eventId:string,ticketId:string,ticketType:string) : Promise<void>
}