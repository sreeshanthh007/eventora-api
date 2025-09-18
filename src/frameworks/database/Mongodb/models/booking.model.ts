import { IBookingEntity } from "@entities/models/booking.entity";
import { model, ObjectId } from "mongoose";
import { BookingSchema } from "../schemas/booking.schema";


export interface IBookingModel extends Omit<IBookingEntity,"_id">,Document{

    _id:ObjectId
}

export const bookingModel = model<IBookingModel>("Booking",BookingSchema)