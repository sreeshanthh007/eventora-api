

export interface IRejectVendorUseCase {
 execute(vendorId:string,rejectReason:string) : Promise<void>
}
