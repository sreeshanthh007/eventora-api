

export interface IToggleStatusUseCase{
    execute(eventId:string,isActive:boolean) : Promise<void>
}