

import { IBookingEntity } from "@entities/models/booking.entity";
import { TBookingEntityWithPopulatedService, TBookingEntityWithPopulatedServiceForClient } from "@entities/models/populated-types/service-populated.type";
import { BookingDTO } from "@shared/dtos/booking.dto";





export interface IBookingRepository{
    createBooking(booking:BookingDTO) :Promise<void>
    findBookedServices(vendorId:string,skip:number,limit:number,searchTerm?:string) : Promise<{bookings:TBookingEntityWithPopulatedService[] | []; total:number}>
    findBookedServicesForClient(clientId:string,skip:number,limit:number,searchTerm:string) : Promise<{bookings:TBookingEntityWithPopulatedServiceForClient[] | [];total:number}>
    findAlreadyBookedServiceByClients(clientId:string) : Promise<IBookingEntity | null>
    
}