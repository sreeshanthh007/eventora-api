

export interface IToggleServiceStatusUseCase{
    execute(serviceId:string) : Promise<void>
}