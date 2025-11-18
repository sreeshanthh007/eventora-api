

export interface IHandleServicePaymentFailedUseCase{
    execute(serviceId:string) : Promise<void>
}