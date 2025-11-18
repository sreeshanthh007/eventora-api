import {  TPaymentStatus } from "@entities/models/booking.entity";
import { TBookingEntityWithPopulatedBookingDetailsForAdmin, TBookingEntityWithPopulatedService, TBookingEntityWithPopulatedServiceForClient } from "@entities/models/populated-types/service-populated.type";
import { BookingDTO, ClientPaginatedBookingDTO, VendorPaginatedBookingDTO } from "@shared/dtos/booking.dto";
import {  ServiceBookingofVendorstoAdminDTO } from "@shared/dtos/service-booking-dto";



export function mapBookingstoVendorBookedServices(booking:TBookingEntityWithPopulatedService) : VendorPaginatedBookingDTO{

    return {
        bookingId:booking.bookingId,
        name:booking.name,
        email:booking.email,
        phone:booking.phone,
        bookingSlot:{
            startDate:booking.bookingSlot.startDate,
            slotStartTime:booking.bookingSlot.slotStartTime,
            slotEndTime:booking.bookingSlot.slotEndTime 
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
            startDate:booking.bookingSlot.startDate,
            slotStartTime:booking.bookingSlot.slotStartTime,
            slotEndTime:booking.bookingSlot.slotEndTime
        },
        vendorId:{
          _id:booking.vendorId._id,
          name:booking.vendorId.name,
          email:booking.vendorId.email,
          profilePicture:booking.vendorId.profilePicture,
          phone:booking.vendorId.phone
        },
        serviceId:{
          _id:booking.serviceId._id,
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
  startDate: string | Date;
  slotStartTime: string | Date;
  slotEndTime: string | Date;
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
      startDate: new Date(data.startDate),
      slotStartTime: new Date(data.slotStartTime),
      slotEndTime:new Date(data.slotEndTime)
    },
    email: data.email,
    name: data.name,
    phone: data.phone,
    paymentId: data.paymentIntentId,
    status: data.status ?? "pending",
    paymentStatus: data.paymentStatus ?? "successfull",
  };
}


export function mapBookingDetailsofVendorsForAdminDTO(booking:TBookingEntityWithPopulatedBookingDetailsForAdmin) : ServiceBookingofVendorstoAdminDTO{

  return {

    name:booking.name,
    email:booking.email,
    phone:booking.phone,
    bookingslot:{
      startDate:booking.bookingSlot.startDate,
      slotStartTime:booking.bookingSlot.slotStartTime,
      slotEndTime:booking.bookingSlot.slotEndTime
    },
    status:booking.status,
    paymentStatus:booking.paymentStatus,
    clientId:{
      name:booking.clientId.name,
      email:booking.clientId.email,
      profileImage:booking.clientId.profileImage
    },
    vendorId:{
      name:booking.vendorId.name,
      email:booking.vendorId.email,
      profilePicture:booking.vendorId.profilePicture
    },
    serviceId:{
      serviceTitle:booking.serviceId.serviceTitle,
      servicePrice:booking.serviceId.servicePrice
    }
  }
}