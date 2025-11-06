

export interface IStopBookedServiceUseCase{
    execute(bookingId:string,vendorId:string) : Promise<void>
}