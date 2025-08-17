

export interface IRejectVendorUseCase {
    execute(vendorId:string) : Promise<void>
}
