

import { IBookingEntity } from "@entities/models/booking.entity";
import { TBookingEntityWithPopulatedService } from "@entities/models/populated-types/service-populated.type";


export interface BookingData{
        clientId:string;
        serviceId:string
        vendorId:string
        email:string
        name:string
        phone:string
        bookingSlot:{
            startDateTime:Date
            endDateTime:Date
        }
        status:"pending" | "ongoing" | "cancelled" | "completed"
        paymentStatus:"pending" | "successfull" | "refunded" | "failed"
        paymentId:string
        amount:number
        createdAt?:Date
        updatedAt?:Date
}

export interface IBookingRepository{
    createBooking(booking:BookingData) :Promise<void>
    findBookedServices(vendorId:string,skip:number,limit:number,searchTerm?:string) : Promise<{bookings:TBookingEntityWithPopulatedService[] | []; total:number}>
    findAlreadyBookedServiceByClients(clientId:string) : Promise<IBookingEntity | null>
    // findClientBookedServices(clientId:string,skip:number,limit:number,searchTerm?:string) : Promise<{bookings:IBookingEntity[] | []; total:number}>
}