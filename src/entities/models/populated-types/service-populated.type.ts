import { IBookingEntity } from "../booking.entity";


export type TBookingEntityWithPopulatedService = Omit<IBookingEntity,"serviceId"> & {
     serviceId: {
        serviceTitle: string;
    };
}