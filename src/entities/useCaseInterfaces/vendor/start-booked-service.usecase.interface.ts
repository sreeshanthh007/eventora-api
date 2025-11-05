

export interface IStartBookedServiceUseCase{
    execute(bookingId:string,vendorId:string) : Promise<void>
}