
import { IVendorEntity } from "@entities/models/vendor.entity";


export interface IUpdateVendorPersonalInformationUseCase {
    execute(vendorId:string,updateData:Partial<IVendorEntity>) : Promise<void>
}

