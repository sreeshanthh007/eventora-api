

export interface IApproveVendorUseCase{
    execute(vendorId:string) : Promise<void>
}