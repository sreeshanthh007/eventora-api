
import { IVendorEntity } from "@entities/models/vendor.entity";


export interface IEditVendorProfileUseCase {
    execute(vendorId:string,updateData:Partial<IVendorEntity>) : Promise<void>
}

