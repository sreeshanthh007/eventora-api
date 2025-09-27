

import { UpdateVendorProfileDTO } from "@shared/dtos/user.dto";


export interface IUpdateVendorPersonalInformationUseCase {
    execute(vendorId:string,updateData:UpdateVendorProfileDTO) : Promise<void>
}