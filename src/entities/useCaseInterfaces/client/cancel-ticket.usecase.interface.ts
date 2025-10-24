

export interface ICancelTicketUseCase{
    execute(ticketId:string,clientId:string,eventId:string) : Promise<void>
}