
import { IUserEntity } from "@entities/models/user.entity";
import { IVendorEntity } from "@entities/models/vendor.entity";
import { RequestedVendorTableDTO } from "@shared/dtos/user.dto";

export const toVendorResponse = (vendor:IUserEntity)=>{
    return {
        _id:vendor._id,
        name:vendor.name,
        email:vendor.email,
        role:vendor.role,
        phone:vendor.phone,
        place:vendor.place,
        about:vendor.about,
        vendorStatus:vendor.vendorStatus
    }
}


export const toRequestedVendorTableDTO =(
    vendor:IVendorEntity
) : RequestedVendorTableDTO =>{
    return {
        _id:vendor._id.toString(),
        name:vendor.name,
        email:vendor.email,
        vendorStatus:vendor.vendorStatus,
        idProof:vendor.idProof,
    }
}

