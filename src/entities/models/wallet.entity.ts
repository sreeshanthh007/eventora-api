



export interface IWalletEntity {
    balance: number;
    userId: string;
    userType: "client" | "vendor" | "admin";
    walletId: string;
    createdAt: Date;
    updatedAt: Date;
    transactions: {
        currency: string;
        paymentStatus: "debit" | "credit";
        amount: number;
        date: Date;
        paymentType: "Refund" | "ticketBooking" | "top-up" | "serviceBooking";
        paymentFor: {
            resourceType: "Event" | "service";
            resourceId: string; 
        };
    }[];
}