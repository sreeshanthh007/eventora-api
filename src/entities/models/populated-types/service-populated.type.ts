import { IBookingEntity } from "../booking.entity";
import { IServiceEntity } from "../service.entity";


export type TBookingEntityWithPopulatedService = Omit<IBookingEntity,"serviceId"> & {
     serviceId: {
        serviceTitle: string;
    };
}

export type TBookingEntityWithPopulatedServiceForClient = Omit<IBookingEntity,"vendorId" | "serviceId"> & {
    serviceId:{
        serviceTitle:string
    },
    vendorId:{
        name:string
        email:string
        profilePicture:string
        phone:string
    }
}

export type TServiceEntityWithPopulatedVendorForClient = Omit<IServiceEntity,"vendorId"> & {
    vendorId:{
        _id:string
        name?:string
        email?:string
        place?:string
        profilePicture?:string
    }
}