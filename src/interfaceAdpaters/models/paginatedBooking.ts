import { ClientPaginatedBookingDTO, VendorPaginatedBookingDTO } from "@shared/dtos/booking.dto";


export interface PaginatedVendorBookingsDTO{
    bookings:VendorPaginatedBookingDTO[]
    total:number
}


export interface PaginatedClientBookingDTO{
    bookings:ClientPaginatedBookingDTO[]
    total:number
}