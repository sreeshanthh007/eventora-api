

export interface ServiceBookingCreationDTO {
    vendorId: string;
    serviceId: string
    bookingData: {
        selectedDate: string;
        selectedSlotTime: string;
        name: string;
        email: string;
        phone: string;
    };
    amount: number;
    currency: string;
}


export interface ServiceBookingofVendorstoAdminDTO{
    name:string
    email:string
    phone:string
    bookingslot:{
        startDate:Date,
        slotStartTime:Date,
        slotEndTime:Date
    }
    status:string
    paymentStatus:string
    serviceId:{
        serviceTitle:string,
        servicePrice:number

    }
    clientId:{
        name:string
        email:string
        profileImage:string
    }
    vendorId:{
        name:string
        email:string
        profilePicture:string
    }
}