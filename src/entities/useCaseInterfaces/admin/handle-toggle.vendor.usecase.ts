export interface IHandleToggleVendorUseCase{
    execute(vendorid:string,status:string) : Promise<void
}

