import { IVendorEntity } from "@entities/models/vendor.entity";



export interface IGetVendorDetailsUseCase {
    execute(vendorId:string) : Promise<Partial<IVendorEntity>>
}