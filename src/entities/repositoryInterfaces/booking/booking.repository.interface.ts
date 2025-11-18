

import { IBookingEntity } from "@entities/models/booking.entity";
import { TBookingEntityWithPopulatedService, TBookingEntityWithPopulatedServiceForClient } from "@entities/models/populated-types/service-populated.type";
import { BookingDTO } from "@shared/dtos/booking.dto";





export interface IBookingRepository{
    findBooking(bookingId:string) : Promise<IBookingEntity | null>
    createBooking(booking:BookingDTO) :Promise<void>
    findBookedServices(vendorId:string,skip:number,limit:number,searchTerm?:string) : Promise<{bookings:TBookingEntityWithPopulatedService[] | []; total:number}>
    findBookedServicesForClient(clientId:string,skip:number,limit:number,searchTerm:string) : Promise<{bookings:TBookingEntityWithPopulatedServiceForClient[] | [];total:number}>
    findAlreadyBookedServiceByClients(clientId:string,bookingId?:string) : Promise<IBookingEntity | null>
    updateBookingStatus(bookingId:string,status:string) : Promise<void>
    findBookingsWithStatusPending(currentTime:Date,fifteenMinutesLater:Date) : Promise<IBookingEntity[] | null>
    findBookingsWithStatusOngoing() : Promise<IBookingEntity[] | null>
    updateNotificationSentStatus(bookingId:string,isSend:boolean) : Promise<void>
    findBookingsAfterAllBookings(serviceId:string,startDate:Date,endDate:Date) : Promise<IBookingEntity[] | null>
    
}