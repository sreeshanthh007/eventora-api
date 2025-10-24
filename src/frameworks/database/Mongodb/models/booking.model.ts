import { IBookingEntity } from "@entities/models/booking.entity";
import { model, ObjectId } from "mongoose";
import { bookingSchema } from "../schemas/booking.schema";


export interface IBookingModel extends Omit<IBookingEntity,"_id" | "clientId" | "vendorId" | "serviceId">,Document{
    _id:ObjectId;
    clientId:ObjectId;
    vendorId:ObjectId;
    serviceId:ObjectId;
}

export const bookingModel = model<IBookingModel>("Booking",bookingSchema);