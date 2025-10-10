

export interface IChangeVendorPasswordUseCase{
    execute(vendorId:string,currentPassword:string,newPassword:string) : Promise<void>
}