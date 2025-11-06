

export interface BookingDTO{
        bookingId:string
        clientId:string;
        serviceId:string
        vendorId:string
        email:string
        name:string
        phone:string
        currency:string
        bookingSlot:{
            startDate:Date
            slotStartTime:Date
            slotEndTime:Date
        }
        status:"pending" | "ongoing" | "cancelled" | "completed"
        paymentStatus:"pending" | "successfull" | "refunded" | "failed"
        paymentId:string
        amount:number
        createdAt?:Date
        updatedAt?:Date
}


export interface VendorPaginatedBookingDTO{
    bookingId:string
    name:string
    email:string
    phone:string
    bookingSlot:{
        startDate:Date,
        slotStartTime:Date,
        slotEndTime:Date
    },
    status:"pending" | "ongoing" | "cancelled" | "completed"
    paymentStatus:"pending" | "successfull" | "refunded" | "failed"
    amount:number,
    serviceId:{
        serviceTItle:string
    }
}

export interface ClientPaginatedBookingDTO{
    bookingId:string
    name:string
    email:string
    phone:string
     bookingSlot:{
        startDate:Date,
        slotStartTime:Date,
        slotEndTime:Date,
    },
    vendorId:{
        _id:string
        name:string
        email:string
        profilePicture:string
        phone:string
    },
    serviceId:{
        _id:string
        serviceTitle:string
    }
    status:"pending" | "ongoing" | "cancelled" | "completed"
    paymentStatus:"pending" | "successfull" | "refunded" | "failed"
    amount:number

}