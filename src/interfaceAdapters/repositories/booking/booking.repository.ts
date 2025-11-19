import { IBookingEntity } from "@entities/models/booking.entity";
import { TBookingEntityWithPopulatedService, TBookingEntityWithPopulatedServiceForClient } from "@entities/models/populated-types/service-populated.type";
import { IServiceEntity } from "@entities/models/service.entity";
import { IVendorEntity } from "@entities/models/vendor.entity";
import {  IBookingRepository } from "@entities/repositoryInterfaces/booking/booking.repository.interface";
import { bookingModel } from "@frameworks/database/mongodb/models/booking.model";
import { BookingDTO } from "@shared/dtos/booking.dto";
import { FilterQuery,  Types } from "mongoose";
import { injectable } from "tsyringe";


@injectable()
export class BookingRepository implements IBookingRepository{




    async findBooking(bookingId: string): Promise<IBookingEntity | null> {
        
        return await bookingModel.findOne({bookingId})
    }
    
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


    async findAlreadyBookedServiceByClients(clientId: string,bookingId:string): Promise<IBookingEntity | null> {
        return await bookingModel.findOne({clientId:clientId,bookingId:bookingId})
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
            await bookingModel.find(filter).sort({createdAt:-1}).skip(skip).limit(limit).populate<{serviceId:Pick<IServiceEntity,"serviceTitle" | "_id">}>({
                path:"serviceId",
                select:"_id serviceTitle"
            })
            .populate<{vendorId:Pick<IVendorEntity,"name" | "profilePicture" | "email" | "phone" | "_id">}>({
                path:"vendorId",
                select:"_id name email profilePicture phone"
            })
            .lean(),
            bookingModel.countDocuments(filter)
        ]);

    const mappedBooking: TBookingEntityWithPopulatedServiceForClient[] = bookings.map(each => ({
        ...each,
        clientId: each.clientId.toString(),
        vendorId: {
            _id: each.vendorId?._id?.toString() || "",
            name: each.vendorId?.name || "",
            email: each.vendorId?.email || "",
            profilePicture: each.vendorId?.profilePicture || "",
            phone: each.vendorId?.phone || ""
        },
        serviceId: {
            _id: each.serviceId?._id?.toString() || "",
            serviceTitle: each.serviceId?.serviceTitle || ""
        }
        }));


        return {bookings:mappedBooking,total:total}
 
    }


    async updateBookingStatus(bookingId: string,status:string): Promise<void> {
        
        await bookingModel.updateOne(
            {bookingId:bookingId},
            {$set:{status:status}},
            {new:true}
        )
    }


    async findBookingsWithStatusPending(currentTime: Date, fifteenMinutesLater: Date): Promise<IBookingEntity[] | null> {
        
        return await bookingModel.find({status:"pending","bookingSlot.slotStartTime":{$gte:currentTime,$lte:fifteenMinutesLater},notificationSent:false})
    }

    async updateNotificationSentStatus(bookingId: string, isSend: boolean): Promise<void> {
        await bookingModel.findOneAndUpdate({bookingId},{notificationSent:isSend})
    }


    async findBookingsWithStatusOngoing(): Promise<IBookingEntity[] | null> {
        return await bookingModel.find({status:"ongoing"})
    }


    async findBookingsAfterAllBookings(serviceId: string, startDate: Date, endDate: Date): Promise<IBookingEntity[] | null> {
        return await bookingModel.find({
            serviceId:serviceId,
            "bookingSlot.slotStartTime":{
                $gte:new Date(startDate),
                $lte:new Date(endDate)
            },
            status:{$in:["pending","ongoing"]}
        })
    }
}