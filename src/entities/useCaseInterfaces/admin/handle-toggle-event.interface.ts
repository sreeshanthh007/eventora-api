
export interface IHandleToggleEventByAdminUseCase{
  execute(eventId:string,isActive:boolean) : Promise<void>
}