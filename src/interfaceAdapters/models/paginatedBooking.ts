import { ClientPaginatedBookingDTO, VendorPaginatedBookingDTO } from "@shared/dtos/booking.dto";
import { ServiceBookingofVendorstoAdminDTO } from "@shared/dtos/service-booking-dto";


export interface PaginatedVendorBookingsDTO{
    bookings:VendorPaginatedBookingDTO[]
    total:number
}


export interface PaginatedClientBookingDTO{
    bookings:ClientPaginatedBookingDTO[]
    total:number
}


export interface PaginatedServiceBookingofVendorDTO{
    bookings:ServiceBookingofVendorstoAdminDTO[]
    total:number
}