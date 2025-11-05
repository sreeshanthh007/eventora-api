import { IWalletEntity } from "@entities/models/wallet.entity";
import { IWalletResponseDTO, TransactionDTO } from "@shared/dtos/wallet.dto";



export function mapWalletDetailstoDTO(wallet:IWalletEntity) : IWalletResponseDTO{

    return{
        walletId:wallet.walletId,
        balance:wallet.balance,
        userType:wallet.userType,
        userId:wallet.userId,
        transactions:wallet.transactions.map(transaction=>({
            currency:transaction.currency,
            paymentStatus:transaction.paymentStatus,
            amount:transaction.amount,
            date:transaction.date,
            paymentType:transaction.paymentType,
            paymentFor:transaction.paymentFor.resourceType
        }))
    }
}

  export function createTransaction(
    paymentType: "Refund" | "partialRefund" | "ticketBooking" | "serviceBooking" | "fundReleased",
    resourceType: "Event" | "service",
    resourceId: string,
    amount: number,
    status: "credit" | "debit"
  ): TransactionDTO {
    return {
      paymentStatus: status,
      paymentFor: { resourceType, resourceId },
      amount,
      date: new Date(),
      paymentType,
    };
  }