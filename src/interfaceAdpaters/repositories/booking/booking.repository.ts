import { IBookingEntity } from "@entities/models/booking.entity";
import { TBookingEntityWithPopulatedService } from "@entities/models/populated-types/service-populated.type";
import { IServiceEntity } from "@entities/models/service.entity";
import { BookingData, IBookingRepository } from "@entities/repositoryInterfaces/booking/booking.repository.interface";
import { bookingModel } from "@frameworks/database/Mongodb/models/booking.model";
import { FilterQuery, Types } from "mongoose";
import { injectable } from "tsyringe";


@injectable()
export class BookingRepository implements IBookingRepository{

    async createBooking(booking: BookingData): Promise<void> {
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
                {phone:{regex:searchTerm}}
            ];
        }

        const [bookings,total] = await Promise.all([
             await bookingModel.find(filter).sort({createAt:-1}).limit(limit).skip(skip).populate<{serviceId:Pick<IServiceEntity,"serviceTitle">}>({
                path:"serviceId",
                select:"serviceTitle"
             }),
            await bookingModel.countDocuments(filter)
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


    // async findClientBookedServices(clientId: string, skip: number, limit: number, searchTerm?: string): Promise<{ bookings: IBookingEntity[] | []; total: number; }> {
        
    //     const filter : FilterQuery<IBookingEntity> = {clientId:clientId}

    //     if(searchTerm){
    //         filter.$or=[
    //             {bookingId:{$regex:searchTerm}},
    //             {email:{$regex:searchTerm}}
    //         ]
    //     }

    //     const [bookings,total] = await Promise.all([
    //         await bookingModel.find(filter).sort({createdAt:-1}).limit(limit).lean(),
    //         await bookingModel.countDocuments(filter)
    //     ]);
        
    // }
}