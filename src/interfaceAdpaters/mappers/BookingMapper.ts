import { IBookingEntity, TPaymentStatus } from "@entities/models/booking.entity";
import { TBookingEntityWithPopulatedService } from "@entities/models/populated-types/service-populated.type";
import { BookingDTO, ClientPaginatedBookingDTO, VendorPaginatedBookingDTO } from "@shared/dtos/booking.dto";



export function mapBookingstoVendorBookedServices(booking:TBookingEntityWithPopulatedService) : VendorPaginatedBookingDTO{

    return {
        bookingId:booking.bookingId,
        name:booking.name,
        email:booking.email,
        phone:booking.phone,
        currency:booking.currency,
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


export function mapBookingstoClientBookedService(booking:IBookingEntity) : ClientPaginatedBookingDTO{

    return{
        bookingId:booking.bookingId,
        name:booking.name,
        email:booking.email,
        phone:booking.phone,
        currency:booking.currency,
        bookingSlot:{
            startDateTIme:booking.bookingSlot.startDateTime,
            endDateTime:booking.bookingSlot.endDateTime
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