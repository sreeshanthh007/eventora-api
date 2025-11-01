import { IBookingEntity } from "@entities/models/booking.entity";
import { TBookingEntityWithPopulatedService, TBookingEntityWithPopulatedServiceForClient } from "@entities/models/populated-types/service-populated.type";
import { IServiceEntity } from "@entities/models/service.entity";
import { IVendorEntity } from "@entities/models/vendor.entity";
import {  IBookingRepository } from "@entities/repositoryInterfaces/booking/booking.repository.interface";
import { bookingModel } from "@frameworks/database/Mongodb/models/booking.model";
import { BookingDTO } from "@shared/dtos/booking.dto";
import { FilterQuery, Types } from "mongoose";
import { injectable } from "tsyringe";


@injectable()
export class BookingRepository implements IBookingRepository{

    async createBooking(booking: BookingDTO): Promise<void> {
        await bookingModel.create({
            ...booking,
            clientId:new Types.ObjectId(booking.clientId),
            vendorId:new Types.ObjectId(booking.vendorId),
            serviceId:new Types.ObjectId(booking.serviceId)
        });
    }

    async findBookedServices(vendorId: string, skip: number, limit: number, searchTerm?: string): Promise<{ bookings: TBookingEntityWithPopulatedService[] | []; total: number; }> {
        
        const filter : FilterQuery<IBookingEntity> = {vendorId:vendorId}

        if(searchTerm){
            filter.$or=[
                {email:{$regex:searchTerm}},
                {name:{$regex:searchTerm}},
                {phone:{$regex:searchTerm}}
            ];
        }

        const [bookings,total] = await Promise.all([
             await bookingModel.find(filter).sort({createAt:-1}).limit(limit).skip(skip).populate<{serviceId:Pick<IServiceEntity,"serviceTitle">}>({
                path:"serviceId",
                select:"serviceTitle"
             }).lean(),
             bookingModel.countDocuments(filter)
        ]);

        const formattedBookings : TBookingEntityWithPopulatedService[] = bookings.map((each)=>({
            ...each,
            clientId:each.clientId.toString(),
            vendorId:each.vendorId.toString(),
             serviceId: {
             serviceTitle: each.serviceId?.serviceTitle || "",
            },
        }));

        return {bookings:formattedBookings,total}

    }


    async findAlreadyBookedServiceByClients(clientId: string): Promise<IBookingEntity | null> {
        return await bookingModel.findOne({clientId:clientId})
    }


    async findBookedServicesForClient(clientId: string, skip: number, limit: number, searchTerm: string): Promise<{ bookings: TBookingEntityWithPopulatedServiceForClient[] | []; total: number; }> {
        
        const filter : FilterQuery<IBookingEntity> = {clientId:clientId}


        if(searchTerm){
            filter.$or = [
                {email:{$regex:searchTerm,$options:"i"}},
                {name:{$regex:searchTerm,$options:"i"}}
            ]
        }

        const [bookings,total] = await Promise.all([
            await bookingModel.find(filter).sort({createdAt:-1}).skip(skip).limit(limit).populate<{serviceId:Pick<IServiceEntity,"serviceTitle">}>({
                path:"serviceId",
                select:"serviceTitle"
            })
            .populate<{vendorId:Pick<IVendorEntity,"name" | "profilePicture" | "email" | "phone">}>({
                path:"vendorId",
                select:"name email profilePicture phone"
            })
            .lean(),
            bookingModel.countDocuments(filter)
        ]);

    const mappedBooking: TBookingEntityWithPopulatedServiceForClient[] = bookings.map(each => ({
        ...each,
        clientId: each.clientId.toString(),
        vendorId: {
            name: each.vendorId?.name,
            email: each.vendorId?.email,
            profilePicture: each.vendorId?.profilePicture || "",
            phone:each.vendorId?.phone
        },
        serviceId: {
            serviceTitle: each.serviceId?.serviceTitle
        }
        }));


        return {bookings:mappedBooking,total:total}
 
    }
}