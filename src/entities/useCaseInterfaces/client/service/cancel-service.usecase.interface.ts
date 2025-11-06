
export interface ICancelServiceUseCase{
    execute(clientId:string,vendorId:string,serviceId:string,bookingId:string) : Promise<void>
}