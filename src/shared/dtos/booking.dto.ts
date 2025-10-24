

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
            startDateTime:Date
            endDateTime:Date
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
    currency:string
    bookingSlot:{
        startDateTIme:Date,
        endDateTime:Date
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
    currency:string
     bookingSlot:{
        startDateTIme:Date,
        endDateTime:Date
    },
    status:"pending" | "ongoing" | "cancelled" | "completed"
    paymentStatus:"pending" | "successfull" | "refunded" | "failed"
    amount:number

}