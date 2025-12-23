

export interface IHandleToggleServiceByVendorsUseCase { 
  execute(serviceId:string) : Promise<void>
}