

export interface IUpdateEventStatusUseCase{
    execute(eventId:string,eventStatus:string) : Promise<void>
}