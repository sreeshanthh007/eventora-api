import {  TPaymentStatus } from "@entities/models/booking.entity";
import { TBookingEntityWithPopulatedService, TBookingEntityWithPopulatedServiceForClient } from "@entities/models/populated-types/service-populated.type";
import { BookingDTO, ClientPaginatedBookingDTO, VendorPaginatedBookingDTO } from "@shared/dtos/booking.dto";



export function mapBookingstoVendorBookedServices(booking:TBookingEntityWithPopulatedService) : VendorPaginatedBookingDTO{

    return {
        bookingId:booking.bookingId,
        name:booking.name,
        email:booking.email,
        phone:booking.phone,
        bookingSlot:{
            startDateTIme:booking.bookingSlot.startDateTime,
            endDateTime:booking.bookingSlot.endDateTime 
        },
        status:booking.status,
        amount:booking.amount,
        paymentStatus:booking.paymentStatus as TPaymentStatus,
        serviceId:{
          serviceTItle:booking.serviceId.serviceTitle
        }
    }
}


export function mapBookingstoClientBookedService(booking:TBookingEntityWithPopulatedServiceForClient) : ClientPaginatedBookingDTO{

    return{
        bookingId:booking.bookingId,
        name:booking.name,
        email:booking.email,
        phone:booking.phone,
        bookingSlot:{
            startDateTIme:booking.bookingSlot.startDateTime,
            endDateTime:booking.bookingSlot.endDateTime
        },
        vendorId:{
          name:booking.vendorId.name,
          email:booking.vendorId.email,
          profilePicture:booking.vendorId.profilePicture,
          phone:booking.vendorId.phone
        },
        serviceId:{
          serviceTitle:booking.serviceId.serviceTitle
        },
        status:booking.status,
        amount:booking.amount,
        paymentStatus:booking.paymentStatus as TPaymentStatus
    }
}


export function mapToBookingDTO(data: {
  bookingId: string;
  clientId: string;
  vendorId: string;
  serviceId: string;
  currency: string;
  amount: number;
  slotStart: string | Date;
  slotEnd: string | Date;
  email: string;
  name: string;
  phone: string;
  paymentIntentId: string;
  status?: "pending" | "ongoing" | "cancelled" | "cancelled";
  paymentStatus?: "pending" | "successfull" | "failed";
}): BookingDTO {
  return {
    bookingId: data.bookingId,
    clientId: data.clientId,
    vendorId: data.vendorId,
    serviceId: data.serviceId,
    currency: data.currency,
    amount: data.amount,
    bookingSlot: {
      startDateTime: new Date(data.slotStart),
      endDateTime: new Date(data.slotEnd),
    },
    email: data.email,
    name: data.name,
    phone: data.phone,
    paymentId: data.paymentIntentId,
    status: data.status ?? "pending",
    paymentStatus: data.paymentStatus ?? "successfull",
  };
}