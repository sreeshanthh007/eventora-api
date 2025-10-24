

export interface WalletDTO{
    balance:number
    userType:string
    userId:string
    walletId:string
}



type TPaymentStatus = "debit" | "credit";
type TPaymentType = "Refund" | "ticketBooking" | "top-up" | "serviceBooking" | "partialRefund";
export type TResourceType = "Event" | "service";

export interface TPaymentFor {
  resourceType: TResourceType;
  resourceId: string; 
}


export interface IWalletResponseDTO{
    balance:number
    userType:string
    userId:string
    walletId:string
    transactions:{
            currency:string
            paymentStatus:TPaymentStatus
            amount:number
            date:Date
            paymentType:TPaymentType
            paymentFor:string
    }[]
}


export interface TransactionDTO{
    currency?:string
    paymentStatus:TPaymentStatus
    amount:number
    date:Date,
    paymentType:TPaymentType
    paymentFor:TPaymentFor

}