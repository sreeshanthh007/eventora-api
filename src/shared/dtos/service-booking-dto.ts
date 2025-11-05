

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