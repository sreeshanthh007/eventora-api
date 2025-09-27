
import { IUserEntity } from "@entities/models/user.entity";
import { IVendorEntity } from "@entities/models/vendor.entity";
import { RequestedVendorTableDTO, VendorResponseDTO } from "@shared/dtos/user.dto";

export const toVendorResponse = (vendor:IUserEntity) : VendorResponseDTO=>{
    return {
        _id:vendor._id.toString(),
        name:vendor.name,
        email:vendor.email,
        role:"vendor",
        phone:vendor.phone,
        place:vendor.place,
        about:vendor.about,
        vendorStatus:vendor.vendorStatus,
        submissionDate:vendor.createdAt?.toLocaleDateString(),
        rejectionReason:vendor.rejectionReason
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



export function mapVendorToDTO(vendor: IVendorEntity): VendorResponseDTO {
  return {
    _id: vendor._id.toString(),
    vendorId: vendor.vendorId!,
    name: vendor.name,
    email: vendor.email,
    phone: vendor.phone,
    role: "vendor",
    profilePicture: vendor.profilePicture,
    place: vendor.place,
    about: vendor.about,
    vendorStatus: vendor.vendorStatus,
    submissionDate: vendor.createdAt?.toLocaleDateString(),
  };
}