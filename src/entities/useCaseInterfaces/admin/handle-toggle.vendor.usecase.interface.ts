export interface IHandleToggleVendorUseCase{
    execute(vendorId:string,status:string) : Promise<void>
}

