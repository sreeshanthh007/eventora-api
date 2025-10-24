

export interface ServiceBookingCreationDTO {
    vendorId: string;
    serviceId: string
    bookingData: {
        slotStart: string;
        slotEnd: string;
        name: string;
        email: string;
        phone: string;
    };
    amount: number;
    currency: string;
}